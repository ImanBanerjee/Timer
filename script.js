let timer;
let totalSeconds = 0;
let running = false;

function setTimer() {
    let h = parseInt(document.getElementById("hours").value) || 0;
    let m = parseInt(document.getElementById("minutes").value) || 0;
    let s = parseInt(document.getElementById("seconds").value) || 0;
    totalSeconds = h * 3600 + m * 60 + s;
    updateDisplay();
}

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    document.getElementById("timer").innerText = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (totalSeconds > 0 && !running) {
        running = true;
        timer = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timer);
                shakeScreen();
                startCountUp();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    let confirmReset = confirm("NEVER GIVE UP! 😭");
    if (confirmReset) {
        clearInterval(timer);
        totalSeconds = 0;
        running = false;
        updateDisplay();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function hideUI() {
    if (running) return;
    document.getElementById("controls").style.display = "none";
    document.getElementById("exitFullScreen").style.display = "block";
    document.getElementById("timer").style.fontSize = "150px";
}

function showUI() {
    document.getElementById("controls").style.display = "block";
    document.getElementById("exitFullScreen").style.display = "none";
    document.getElementById("timer").style.fontSize = "100px";
}

function shakeScreen() {
    let body = document.body;
    let intensity = 5;
    let duration = 2000;
    let startTime = Date.now();

    function shake() {
        let elapsed = Date.now() - startTime;
        if (elapsed < duration) {
            let x = (Math.random() * intensity * 2) - intensity;
            let y = (Math.random() * intensity * 2) - intensity;
            body.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            body.style.transform = "";
        }
    }
    shake();
}

function startCountUp() {
    let countUpTime = 0;
    setInterval(() => {
        countUpTime++;
        let hours = Math.floor(countUpTime / 3600);
        let minutes = Math.floor((countUpTime % 3600) / 60);
        let seconds = countUpTime % 60;
        document.getElementById("timer").innerText = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}
