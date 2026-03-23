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
  const goal = 10;

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
      visits: 0
    };
    isNewUser = true;
  }

  // Add visit
  data[num].visits += 1;

  let visits = data[num].visits;
  const id = data[num].id;

  const greeting = isNewUser
    ? "Welcome to Frictionless Cafe Rewards."
    : "Welcome back to Frictionless Cafe Rewards.";

  output.style.color = "";

  // 🎉 EXACTLY 10 → reward
  if (visits === goal) {
    output.innerHTML = `
      <b>${greeting}</b><br><br>
      Member ID: ${id}<br><br>
      🎉 Congrats! We’ve texted you your free reward.
    `;

    // 🔁 reset AFTER showing reward
    data[num].visits = 0;

  } else {
    // 🛑 never allow negatives
    const visitsLeft = Math.max(goal - visits, 0);

    output.innerHTML = `
      <b>${greeting}</b><br><br>
      Member ID: ${id}<br>
      ${visitsLeft} visit${visitsLeft === 1 ? "" : "s"} until your next reward!
    `;
  }

  // Save AFTER logic
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
