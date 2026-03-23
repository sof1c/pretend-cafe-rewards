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

  let num = phone.value.replace(/\D/g, "");

  if (num.length !== 10) {
    output.innerHTML = "Enter a valid 10-digit number";
    return;
  }

  let data = JSON.parse(localStorage.getItem("users")) || {};

  if (!data[num]) {
    data[num] = {
      id: getMemberId(num),
      visits: 1
    };
  }

  let visits = data[num].visits;
  let id = data[num].id;

  let greeting =
    visits === 1
      ? "Welcome to Frictionless Cafe Rewards."
      : "Welcome back to Frictionless Cafe Rewards.";

  output.innerHTML = `
    <b>${greeting}</b><br><br>
    Member ID: ${id}<br>
    Visits: ${visits}/10
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

  JsBarcode("#barcode", id);

  phone.value = "";
});
