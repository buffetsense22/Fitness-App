let steps = 0;
let workoutTimer;

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

// Timer
function startWorkout() {
  const seconds = parseInt(document.getElementById("workout-select").value);
  let remaining = seconds;
  document.getElementById("timer-display").textContent = `Time Left: ${remaining}s`;

  clearInterval(workoutTimer);
  workoutTimer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(workoutTimer);
      document.getElementById("timer-display").textContent = "Workout complete!";
      navigator.vibrate?.(300);
    } else {
      document.getElementById("timer-display").textContent = `Time Left: ${remaining}s`;
    }
  }, 1000);
}
