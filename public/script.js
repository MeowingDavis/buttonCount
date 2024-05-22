let clickCount = 0;
let timeLeft = 10;
let timer;
let gameStarted = false;

let highScore = localStorage.getItem("highScore") || 0;
const highScoreDisplay = document.getElementById("highScoreValue");
highScoreDisplay.textContent = highScore;

const clickArea = document.getElementById("clickArea");
const clickCountDisplay = document.getElementById("clickCount");
const timerText = document.getElementById("timerText");
const resetButton = document.getElementById("resetButton");

function updateClickCount() {
    if (!gameStarted) {
        startGame();
    }
    clickCount++;
    clickCountDisplay.textContent = clickCount;

    if (clickCount === 1) {
        playClickSound();
    }

    if (clickCount > highScore) {
        highScore = clickCount;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem("highScore", highScore);
    }
}

function updateTimer() {
    timeLeft--;
    timerText.textContent = timeLeft.toString();
    if (timeLeft === 0) {
        endGame();
    }
}

function startGame() {
    gameStarted = true;
    timerText.textContent = timeLeft.toString();
    clickArea.removeEventListener("click", startGame);
    clickArea.addEventListener("click", updateClickCount);
    timer = setInterval(updateTimer, 1000);
    clickArea.classList.add("clicked");
}

function endGame() {
    clearInterval(timer);
    clickArea.removeEventListener("click", updateClickCount);
    resetButton.style.display = "block";
    resetButton.addEventListener("click", resetGame);
    clickArea.classList.remove("clicked");
}


function resetGame() {
    clickCount = 0;
    timeLeft = 10;
    gameStarted = false;
    clickCountDisplay.textContent = clickCount;
    timerText.textContent = "Click to Start";
    resetButton.style.display = "none";
    clickArea.addEventListener("click", startGame);
    clickArea.classList.remove("clicked");
}

clickArea.addEventListener("click", startGame);
