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

// Generate fake code (not shown, just simulated)
function generateRewardCode() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `CAFE-${randomDigits}`;
}

// Submit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cleanedPhone = phoneInput.value.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanedPhone)) {
    message.innerHTML = "Please enter a valid 10-digit phone number.";
    message.style.color = "red";
    return;
  }

  const storageKey = "frictionlessCafeRewards";
  const rewardsData = JSON.parse(localStorage.getItem(storageKey)) || {};

  if (!rewardsData[cleanedPhone]) {
    rewardsData[cleanedPhone] = {
      visits: 0,
      rewardCode: null
    };
  }

  rewardsData[cleanedPhone].visits += 1;

  const visits = rewardsData[cleanedPhone].visits;
  const goal = 10;
  const remaining = goal - visits;

  // On 10th visit, generate code (hidden)
  if (visits >= goal && !rewardsData[cleanedPhone].rewardCode) {
    rewardsData[cleanedPhone].rewardCode = generateRewardCode();
  }

  localStorage.setItem(storageKey, JSON.stringify(rewardsData));

  if (visits >= goal) {
    message.innerHTML = `
      <span style="color: green; font-weight: bold;">
        🎉 You’ve unlocked a free drink!
      </span>
      <br><br>
      📱 A reward code has been sent to your phone number.
      <br>
      Please check your text messages and show it to your barista to redeem.
    `;
  } else {
    message.innerHTML = `
      <span style="color: green; font-weight: bold;">
        Success! You’ve joined Frictionless Café Rewards.
      </span>
      <br><br>
      ☕ Keep checking in to earn free rewards!
      <br>
      ⭐ You are <strong>${visits}/${goal}</strong> of the way to a free drink.
      <br>
      ${remaining} more visit${remaining === 1 ? "" : "s"} until your free drink.
    `;
  }

  form.reset();
});
