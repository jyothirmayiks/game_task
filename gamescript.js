let step = 0;

window.onload = function() {
    document.getElementById("game-container").addEventListener("click", progressStory);
    document.querySelector('.ellie-container').style.display = "none"; 
};

function progressStory() {
    if (step === 0) {
        document.querySelector('.ellie-container').style.display = "block"; 
    } else if (step === 1) {
        document.getElementById("thought-box").style.display = "block";
        document.getElementById("thought-text").innerText = "Where did this letter come from?";
    } else if (step === 2) {
        document.getElementById("thought-text").innerText = "I don’t remember receiving this...";
    } else if (step === 3) {
        document.getElementById("popup").style.display = "block";
        document.getElementById("thought-box").style.display = "none";
    } else if (step === 4) {
        document.getElementById("popup").style.display = "none";
        document.getElementById("thought-box").style.display = "block";
        document.getElementById("ellie").style.display = "none";  
        document.getElementById("ellie-shocked").style.display = "block"; 
        document.getElementById("thought-text").innerText = "Wait... What was that noise?";
    } else if (step === 5) {
        document.getElementById("shadow").style.display = "block"; 
    } else if (step === 6) {
        document.getElementById("thought-box").style.display = "none";
        document.getElementById("shadow-dialogue").style.display = "block";
        document.getElementById("shadow-dialogue").style.opacity = "1"; 
    } else if (step === 7) {
        setTimeout(() => {
            document.getElementById("shadow-dialogue").style.display = "none";
            document.getElementById("choice-container").style.display = "flex"; 
        }, 1000);
    }

    step++;
}

function selectChoice(choice) {
    if (choice === 1) {
        window.location.href = "trial1.html";
    } else if (choice === 2) {
        location.reload();
    }
}
