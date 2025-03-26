let timer;
let timeLeft = 600;
let isRunning = false;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setTime() {
    let minutes = parseInt(document.getElementById("minutes").value);
    let seconds = parseInt(document.getElementById("seconds").value);

    if (isNaN(minutes) || minutes < 0) minutes = 0;
    if (isNaN(seconds) || seconds < 0 || seconds > 59) seconds = 0;

    if (minutes === 0 && seconds === 0) {
        alert("Please enter a valid time!");
        return;
    }

    timeLeft = minutes * 60 + seconds;
    updateDisplay();
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            if (document.getElementById("loop").checked) {
                setTime();
                startTimer();
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 600;
    updateDisplay();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

updateDisplay();
