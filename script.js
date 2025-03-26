let timer;
let timeLeft = 0;
let running = false;

const timerDisplay = document.getElementById("timer");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("hideUI").addEventListener("click", hideUI);
document.getElementById("exitFullScreen").addEventListener("click", showUI);

function startTimer() {
    if (running) return;
    timeLeft = (parseInt(hoursInput.value) || 0) * 3600 +
               (parseInt(minutesInput.value) || 0) * 60 +
               (parseInt(secondsInput.value) || 0);
    if (timeLeft <= 0) return;
    running = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay(timeLeft);
        } else {
            clearInterval(timer);
            shakeScreen();
            countUp();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    if (confirm("💀 I GIVE UP? 😢")) {
        timeLeft = 0;
        updateDisplay(timeLeft);
        running = false;
        clearInterval(timer);
    }
}

function updateDisplay(time) {
    let hrs = Math.floor(time / 3600).toString().padStart(2, '0');
    let mins = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    let secs = (time % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

function hideUI() {
    document.getElementById("container").classList.add("hidden");
    document.getElementById("exitFullScreen").classList.remove("hidden");
}

function showUI() {
    document.getElementById("container").classList.remove("hidden");
    document.getElementById("exitFullScreen").classList.add("hidden");
}

function shakeScreen() {
    let intensity = 10;
    let duration = 2000;
    let start = Date.now();
    let interval = setInterval(() => {
        let timePassed = Date.now() - start;
        if (timePassed >= duration) {
            clearInterval(interval);
            document.body.style.transform = "translate(0, 0)";
            return;
        }
        let x = (Math.random() * intensity * 2) - intensity;
        let y = (Math.random() * intensity * 2) - intensity;
        document.body.style.transform = `translate(${x}px, ${y}px)`;
    }, 50);
}

function countUp() {
    let count = 0;
    timer = setInterval(() => {
        count++;
        updateDisplay(count);
    }, 1000);
}
