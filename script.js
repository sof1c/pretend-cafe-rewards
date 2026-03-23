const form = document.getElementById("rewardsForm");
const phoneInput = document.getElementById("phone");
const message = document.getElementById("message");

// Format phone while typing
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

// Submit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cleanedPhone = phoneInput.value.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanedPhone)) {
    message.innerHTML = "Please enter a valid 10-digit phone number.";
    message.style.color = "red";
    return;
  }

  // Fake rewards progress (always starts at 1 for simulation)
  const visits = 1;
  const goal = 10;

  message.innerHTML = `
    <span style="color: green; font-weight: bold;">
      Success! You’ve joined Frictionless Café Rewards.
    </span>
    <br><br>
    ☕ Keep checking in to earn free drinks!
    <br>
    ⭐ You are <strong>${visits}/${goal}</strong> of the way to a free drink.
  `;

  form.reset();
});
