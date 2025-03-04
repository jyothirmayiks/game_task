let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;

const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const whisperSound = new Audio("audio/whispering-desert-storm-horror-95836.mp3");

window.onload = function () {
    document.querySelector(".ellie-container").style.display = "none";
    document.getElementById("shadow").style.display = "none";
};

function progressStory() {
    if (isTyping) return; 

    if (step === 0) {
        document.querySelector(".ellie-container").style.display = "block";
    } else if (step === 1) {
        document.getElementById("dialogue-box").style.display = "block";
        typeText("Ellie; Where did this letter come from?");
    } else if (step === 2) {
        typeText("Ellie; I don’t remember receiving this...");
    } else if (step === 3) {
        document.getElementById("popup").style.display = "block";
        document.getElementById("dialogue-box").style.display = "none"; 
        playWhisperSound();
    } else if (step === 4) {
        document.getElementById("popup").style.display = "none";
        document.getElementById("dialogue-box").style.display = "block";
        typeText("Ellie; Wait... What was that noise?");
    } else if (step === 5) {
        document.getElementById("dialogue-box").style.display = "none";
        document.getElementById("shadow").style.display = "block";
    } else if (step === 6) {
        document.getElementById("shadow-dialogue").style.display = "block";
        typeTextShadow("Shadow; Ellie, you are the last descendant of the Witch Sisterhood. Prove your worth at the abandoned mansion tonight. Fail, and your lineage ends here.");
    } else if (step === 7) {
        document.getElementById("dialogue-box").style.display = "block";
        document.getElementById("shadow").style.display = "block";
        document.getElementById("shadow-dialogue").style.display = "none";
        typeText("Ellie; What? Who are you? Why should I believe you?");
    } else if (step === 8) {
        document.getElementById("dialogue-box").style.display = "none";
        document.getElementById("shadow").style.display = "block";
        document.getElementById("shadow-dialogue").style.display = "block";
        typeTextShadow("Shadow; I have no reason to lie. You’ll find the truth at the mansion.");
    } else if (step === 9) {
        document.getElementById("dialogue-box").style.display = "block";
        document.getElementById("shadow").style.display = "block";
        document.getElementById("shadow-dialogue").style.display = "none";
        typeText("Ellie; This is ridiculous... But I have to know the truth.");
    } else if (step === 10) {
        document.getElementById("dialogue-box").style.display = "none";
        document.getElementById("shadow").style.display = "block";
        document.getElementById("shadow-dialogue").style.display = "block";
        typeTextShadow("Shadow; The choice is yours. But hesitate, and you may lose the only chance you have.");
    } else if (step === 11) {
        document.getElementById("dialogue-box").style.display = "block";
        document.getElementById("shadow").style.display = "none";
        typeText("Ellie; Why is he asking me to go there? Is this a trap? Anyway, I’ll go.");
    } else if (step === 12) {
        setTimeout(() => {
            window.location.href = "mansion.html";
        }, 1000);
    }

    step++;
}


function playTypingSound() {
    typingSound.loop = true;
    typingSound.play();
}


function stopTypingSound() {
    typingSound.pause();
    typingSound.currentTime = 0;
}


function playWhisperSound() {
    whisperSound.play();
}


function typeText(text) {
    let dialogueElement = document.getElementById("dialogue-text");
    dialogueElement.innerHTML = "";
    currentText = text;
    currentIndex = 0;
    isTyping = true;
    
    playTypingSound();

    function type() {
        if (currentIndex < currentText.length) {
            dialogueElement.innerHTML += currentText.charAt(currentIndex);
            currentIndex++;
            setTimeout(type, typingSpeed);
        } else {
            isTyping = false;
            stopTypingSound();
        }
    }

    type();
}


function typeTextShadow(text) {
    let shadowDialogueElement = document.getElementById("shadow-text");
    shadowDialogueElement.innerHTML = "";
    currentText = text;
    currentIndex = 0;
    isTyping = true;
    
    playTypingSound(); 

    function type() {
        if (currentIndex < currentText.length) {
            shadowDialogueElement.innerHTML += currentText.charAt(currentIndex);
            currentIndex++;
            setTimeout(type, typingSpeed);
        } else {
            isTyping = false;
            stopTypingSound(); 
        }
    }

    type();
}
