let time = 600;
let isRunning = false;
let timerInterval;

function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById("timer").textContent = 
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    time = 600;
    updateDisplay();
}

// Initialize timer display
updateDisplay();
