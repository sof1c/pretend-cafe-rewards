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
    message.textContent = "Please enter a valid 10-digit phone number.";
    message.style.color = "red";
    return;
  }

  message.textContent = "Success! You’ve joined Frictionless Cafe Rewards.";
  message.style.color = "green";

  form.reset();
});
