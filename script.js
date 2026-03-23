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
  let isNewUser = false;

  if (!data[num]) {
    data[num] = {
      id: getMemberId(num),
      visits: 1
    };
    isNewUser = true;
  } else {
    data[num].visits += 1;
  }

  localStorage.setItem("users", JSON.stringify(data));

  const visits = data[num].visits;
  const id = data[num].id;
  const visitsLeft = 10 - visits;

  const greeting = isNewUser
    ? "Welcome to Frictionless Cafe Rewards."
    : "Welcome back to Frictionless Cafe Rewards.";

  output.style.color = "";

  if (visits >= 10) {
    output.innerHTML = `
      <b>${greeting}</b><br><br>
      Member ID: ${id}<br><br>
      🎉 Congrats! We’ve texted you your free reward.<br><br>
      📱 Show this barcode to your barista to keep earning points.
    `;
  } else {
    output.innerHTML = `
      <b>${greeting}</b><br><br>
      Member ID: ${id}<br>
      ${visitsLeft} visit${visitsLeft === 1 ? "" : "s"} until your next reward!<br><br>
      📱 Show this barcode to your barista to earn your points.
    `;
  }

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
