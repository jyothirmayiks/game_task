document.addEventListener("DOMContentLoaded", function () {
    startCountdown();

    document.getElementById("forward-clock").addEventListener("click", function () {
        document.getElementById("failure-popup").classList.remove("hidden");
        document.getElementById("failure-popup").style.display = "block"; 
    });

    document.getElementById("backward-clock").addEventListener("click", function () {
        document.getElementById("game-session").classList.add("hidden"); 
        document.getElementById("success-popup").classList.remove("hidden");
        document.getElementById("success-popup").style.display = "block"; 
    });

    document.getElementById("proceed-button").addEventListener("click", function () {
        document.getElementById("success-popup").classList.add("hidden"); 
        document.getElementById("success-popup").style.display = "none";  
        document.getElementById("completion-popup").classList.remove("hidden");
        document.getElementById("completion-popup").style.display = "block";  
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

function nextPhase() {
    document.getElementById("success-popup").classList.add("hidden");
    document.getElementById("success-popup").style.display = "none"; 
    document.getElementById("completion-popup").classList.remove("hidden"); 
    document.getElementById("completion-popup").style.display = "block";  
}

function unlockGift() {
    document.getElementById("completion-popup").classList.add("hidden");
    document.getElementById("completion-popup").style.display = "none";
    document.getElementById("gift-box").classList.remove("hidden");
    document.getElementById("gift-box").style.display = "block"; 
}

function showNextPopup() {
    document.getElementById("gift-box").classList.add("hidden");
    document.getElementById("gift-box").style.display = "none"; 
    document.getElementById("next-trial-popup").classList.remove("hidden");
    document.getElementById("next-trial-popup").style.display = "block";  
}

function nextTrial() {
    window.location.href = "trial3.html";
}

function restartGame() {
    location.reload();
}
