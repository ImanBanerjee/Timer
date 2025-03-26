let timer;
let timeLeft = 600;
let isRunning = false;
let isCountingUp = false;
let countUpTime = 0;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setTime() {
    if (isCountingUp) return;

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
    if (isRunning || isCountingUp) return;
    
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            startShakeEffect();
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
    isCountingUp = false;
    countUpTime = 0;
    timeLeft = 600;
    updateDisplay();
}

/* Shake Effect & Start Count-Up Mode */
function startShakeEffect() {
    let container = document.getElementById("mainContainer");
    container.classList.add("shaking");

    setTimeout(() => {
        container.classList.remove("shaking");
        startCountUp();
    }, 3000); // Shake for 3 seconds
}

/* Count-Up Timer */
function startCountUp() {
    isCountingUp = true;
    timer = setInterval(() => {
        countUpTime++;
        let minutes = Math.floor(countUpTime / 60);
        let seconds = countUpTime % 60;
        document.getElementById("timer").innerText = `+${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

/* Fullscreen Mode */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/* Hide UI and Make Timer Big */
function hideUI() {
    if (timeLeft > 0 && isRunning) {
        alert("You cannot hide UI while the timer is running!");
        return;
    }

    document.getElementById("mainContainer").classList.add("full-view");
    document.getElementById("exitFullView").style.display = "block";
}

/* Restore UI */
function showUI() {
    document.getElementById("mainContainer").classList.remove("full-view");
    document.getElementById("exitFullView").style.display = "none";
}

updateDisplay();
