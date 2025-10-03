'use strict';

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let expression = "";

// Sound generator using OscillatorNode
function playSound(freq) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
  osc.stop(ctx.currentTime + 0.3);
}

buttons.forEach(btn => {
  // Hover effects
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.1)";
    if (btn.classList.contains("clear")) {
      btn.style.background = "#ff4d4d"; // darker red on hover
    } else if (btn.classList.contains("operator")) {
      btn.style.background = "#a0c4ff"; // blue hover
    } else if (btn.classList.contains("equal")) {
      btn.style.background = "#90ee90"; // green hover
    } else {
      btn.style.background = "#d1d1d1"; // normal buttons
    }
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    if (btn.classList.contains("clear")) {
      btn.style.background = "#ff6666";
    } else {
      btn.style.background = "#e0e0e0";
    }
  });

  // Click actions + sounds
  btn.addEventListener("click", () => {
    if (!isNaN(btn.textContent)) playSound(300);        // Numbers
    else if (btn.textContent === "=") playSound(600);   // Equals
    else if (btn.classList.contains("clear")) playSound(200); // Clear
    else playSound(450);                                // Operators & symbols

    if (btn.textContent === "=") {
      try {
        expression = eval(expression).toString();
        display.value = expression;
      } catch {
        expression = "";
        display.value = "Error";
      }
    } else if (btn.classList.contains("clear")) {
      expression = "";
      display.value = "";
    } else {
      expression += btn.textContent;
      display.value = expression;
    }
  });
});
