let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;
let isRunning = false;

const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const clockDisplay = document.getElementById('clock');

let rotationDegree = 0; // Start from 0 degrees
let secondsPassed = 0; // To count the seconds passed in each minute

function updateLoader() {
  const loader = document.querySelector('.loader');
  
  // Increment the rotation by a small amount every second
  rotationDegree += 6; // Increment by 6 degrees (so it moves gradually over 60 seconds)
  
  // If one minute has passed, reset rotation to 0 degrees (top)
  if (secondsPassed === 60) {
    rotationDegree = 0; // Reset rotation after full minute
    secondsPassed = 0; // Reset second counter
  }
  
  loader.style.transform = `rotate(${rotationDegree}deg)`; // Apply rotation
  
  secondsPassed++; // Increment the seconds counter
}

// Update loader position every second
setInterval(updateLoader, 1000);



// Stopwatch functionality
startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
});

function updateTime() {
    milliseconds += 1;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Digital Clock functionality
function updateClock() {
    const now = new Date();
    const hours = formatTime(now.getHours());
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);