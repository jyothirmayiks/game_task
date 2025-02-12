document.addEventListener("DOMContentLoaded", function () {
    startCountdown();

   
    document.getElementById("mark-power").addEventListener("click", function () {
        showPopup("ending-power");
    });

    document.getElementById("mark-ruin").addEventListener("click", function () {
        showPopup("ending-ruin");
    });

    document.getElementById("mark-wisdom").addEventListener("click", function () {
        showPopup("ending-wisdom");
    });

    document.getElementById("mark-oblivion").addEventListener("click", function () {
        showPopup("ending-oblivion");
    });
});

function startCountdown() {
    let count = 3;
    let countdownText = document.getElementById("countdown-text");

    let countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownText.innerText = `Starting in ${count}...`;
        } else {
            clearInterval(countdownInterval);
            document.getElementById("countdown-screen").style.display = "none";
            document.getElementById("game-session").classList.remove("hidden");
        }
    }, 1000);
}

function showPopup(id) {
    document.getElementById("game-session").classList.add("hidden");
    document.getElementById(id).classList.remove("hidden");
}

function restartGame() {
    window.location.href = "index.html";
}

function unlockGift() {
    document.getElementById("ending-wisdom").classList.add("hidden");
    document.getElementById("gift-box").classList.remove("hidden");
}

function showNextPopup() {
    document.getElementById('gift-box').classList.add('hidden'); 
    document.getElementById('witchMarkPopup').classList.remove('hidden'); 
}

