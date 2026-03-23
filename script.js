const form = document.getElementById("rewardsForm");
const phoneInput = document.getElementById("phone");
const message = document.getElementById("message");
const barcodeSection = document.getElementById("barcodeSection");
const memberIdText = document.getElementById("memberIdText");

function generateMemberId(phone) {
  return `FC-${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
}

phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  if (value.length > 6) {
    phoneInput.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
  } else if (value.length > 3) {
    phoneInput.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 0) {
    phoneInput.value = `(${value}`;
  } else {
    phoneInput.value = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cleanedPhone = phoneInput.value.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanedPhone)) {
    message.innerHTML = "Please enter a valid 10-digit phone number.";
    message.style.color = "red";
    barcodeSection.classList.add("hidden");
    return;
  }

  const storageKey = "frictionlessCafeMembers";
  const members = JSON.parse(localStorage.getItem(storageKey)) || {};

  if (!members[cleanedPhone]) {
    members[cleanedPhone] = {
      memberId: generateMemberId(cleanedPhone),
      visits: 0
    };
  }

  const memberId = members[cleanedPhone].memberId;
  const visits = members[cleanedPhone].visits || 0;
  const goal = 10;
  const remaining = Math.max(goal - visits, 0);

  localStorage.setItem(storageKey, JSON.stringify(members));

  if (visits >= goal) {
    message.innerHTML = `
      <span style="color: green; font-weight: bold;">
        🎉 You’ve unlocked a free drink!
      </span>
      <br><br>
      <strong>Member ID:</strong> ${memberId}
      <br>
      <strong>Rewards Progress:</strong> ${visits}/${goal}
      <br><br>
      📱 A reward code has been sent to your phone number.
      <br>
      Please check your text messages and show it to your barista to redeem.
    `;
  } else {
    message.innerHTML = `
      <span style="color: green; font-weight: bold;">
        Success! You’ve joined Frictionless Cafe Rewards.
      </span>
      <br><br>
      <strong>Member ID:</strong> ${memberId}
      <br>
      <strong>Rewards Progress:</strong> ${visits}/${goal}
      <br>
      ☕ Keep checking in to earn free rewards.
      <br>
      ${remaining} more visit${remaining === 1 ? "" : "s"} until your free drink.
    `;
  }

  message.style.color = "";
  memberIdText.textContent = `Member ID: ${memberId}`;
  barcodeSection.classList.remove("hidden");

  JsBarcode("#memberBarcode", memberId, {
    format: "CODE128",
    displayValue: false,
    width: 2,
    height: 80,
    margin: 10
  });

  form.reset();
});
