if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (error) => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}

const startGameButton = document.getElementById('start-game-button');
const countdownTimer = document.getElementById('countdown-timer');
const countdownDisplay = document.getElementById('countdown');
const gameOverScreen = document.getElementById('game-over-screen');
const resultDisplay = document.getElementById('result');

let countdownInterval;
let countdownSeconds = 10;
let startTime;
let timerInterval;

startGameButton.addEventListener('click', startGame);

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        clearInterval(countdownInterval);
        startTimer();
    } else if (document.visibilityState === 'visible') {
        stopTimer();
    }
});

function startGame() {
    startGameButton.classList.add('hidden');
    countdownTimer.classList.remove('hidden');
    countdownDisplay.textContent = countdownSeconds;
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    countdownSeconds--;
    countdownDisplay.textContent = countdownSeconds;
    if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        showLoserScreen();
    }
}

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
    }
    timerInterval = setInterval(() => {
        console.log('Timer running...');
    }, 1000); // Update timer every second
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    const elapsed = Date.now() - startTime;
    if (countdownSeconds > 0) {
        resultDisplay.textContent = `Game Over! Elapsed Time: ${Math.floor(elapsed / 1000)}s`;
    } else {
        resultDisplay.textContent = `Game Over! Elapsed Time: 0s`;
    }
    showGameOverScreen();
}

function showLoserScreen() {
    countdownTimer.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    resultDisplay.textContent = 'Game Over! Elapsed Time: 0s';
}

function showGameOverScreen() {
    countdownTimer.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
}
