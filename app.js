let steps = 0;
let workoutTimer;
const quotes = [
  "Push yourself. No one else is going to do it for you.",
  "Sweat is just fat crying.",
  "You don’t have to be extreme, just consistent.",
  "Small steps every day.",
  "No excuses. Just do it."
];

document.getElementById("toggle-dark").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Step Counter (basic)
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
  const startSeq = document.getElementById("start-sequence");
  const startText = startSeq.querySelector(".start-text");
  const quoteText = document.getElementById("quote-text");
  const startSound = document.getElementById("start-sound");

  clearInterval(workoutTimer);
  startSeq.classList.remove("hidden");
  timerDisplay.textContent = "";
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  let count = 3;
  startText.textContent = count;

  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      startText.textContent = count;
    } else if (count === 0) {
      startText.textContent = "Go!";
      navigator.vibrate?.(150);
      startSound.play();
    } else {
      clearInterval(countdown);
      startSeq.classList.add("hidden");

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
