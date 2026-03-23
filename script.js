const form = document.getElementById("form");
const phone = document.getElementById("phone");
const output = document.getElementById("output");
const memberIdText = document.getElementById("memberId");
const barcodeBox = document.getElementById("barcodeBox");

function getMemberId(num) {
  return "FC-" + num;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const num = phone.value.replace(/\D/g, "");

  if (num.length !== 10) {
    output.innerHTML = "Please enter a valid 10-digit phone number.";
    output.style.color = "red";
    barcodeBox.classList.add("hidden");
    return;
  }

  let data = JSON.parse(localStorage.getItem("users")) || {};

  if (!data[num]) {
    data[num] = {
      id: getMemberId(num),
      visits: 1
    };
  } else {
    data[num].visits += 1;
  }

  const visits = data[num].visits;
  const id = data[num].id;

  const greeting =
    visits === 1
      ? "Welcome to Frictionless Cafe Rewards."
      : "Welcome back to Frictionless Cafe Rewards.";

  output.style.color = "";

  output.innerHTML = `
    <b>${greeting}</b><br><br>
    Member ID: ${id}<br>
    ${visits}/10 drinks away from your next reward!
  `;

  if (visits >= 10) {
    output.innerHTML += `
      <br><br>
      🎉 Free drink unlocked!<br>
      📱 Check your texts to redeem.
    `;
  }

  localStorage.setItem("users", JSON.stringify(data));

  memberIdText.innerText = id;
  barcodeBox.classList.remove("hidden");

  JsBarcode("#barcode", id, {
    format: "CODE128",
    displayValue: false,
    width: 2,
    height: 80,
    margin: 10
  });

  phone.value = "";
});
