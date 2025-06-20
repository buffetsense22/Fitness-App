let steps = 0;
let workoutTimer;

document.getElementById("toggle-dark").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Step Counter
if (window.DeviceMotionEvent) {
  let lastY = null;
  window.addEventListener("devicemotion", (event) => {
    let y = event.accelerationIncludingGravity.y;
    if (lastY !== null && Math.abs(y - lastY) > 1.2) {
      steps++;
      document.getElementById("step-count").textContent = steps;
    }
    lastY = y;
  });
}

function startWorkout() {
  const seconds = parseInt(document.getElementById("workout-select").value);
  const timerDisplay = document.getElementById("timer-display");

  const modal = document.getElementById("workout-modal");
  const modalCount = document.getElementById("modal-count");
  const modalQuote = document.getElementById("modal-quote");
  const startSound = document.getElementById("start-sound");

  const quotes = [
    "Push yourself. No one else is going to do it for you.",
    "Sweat is just fat crying.",
    "You don’t have to be extreme, just consistent.",
    "Small steps every day.",
    "No excuses. Just do it."
  ];

  modal.classList.remove("hidden");
  modalQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  let count = 3;
  modalCount.textContent = count;

  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      modalCount.textContent = count;
    } else if (count === 0) {
      modalCount.textContent = "Go!";
      navigator.vibrate?.(150);
      startSound.play();
    } else {
      clearInterval(countdown);
      modal.classList.add("hidden");

      // Start actual timer
      let remaining = seconds;
      timerDisplay.textContent = `Time Left: ${remaining}s`;

      workoutTimer = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearInterval(workoutTimer);
          timerDisplay.textContent = "Workout complete!";
          navigator.vibrate?.(300);
        } else {
          timerDisplay.textContent = `Time Left: ${remaining}s`;
        }
      }, 1000);
    }
  }, 1000);
}
