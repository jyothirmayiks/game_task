let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("shadow").style.display = "none";
  document.getElementById("shadow-dialogue").style.display = "none";

  let backgroundMusic = new Audio("audio/dramatic-hit(chosic.com).mp3"); 
  backgroundMusic.volume = 0.6; 
  backgroundMusic.play();
};

function progressStory() {
  if (isTyping) return;

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This place... It feels like it’s alive. What am I even doing here?");
  } else if (step === 1) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; You made the right choice, Ellie. But the mansion will test you. Be prepared.");
  } else if (step === 2) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; Test me? What kind of test?");
  } else if (step === 3) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; The kind that separates the worthy from the forgotten. Proceed carefully!");
  } else if (step === 4) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; I don’t have time for this... But I need to know the truth.");
  } else if (step === 5) {
    setTimeout(() => {
        window.location.href = "entrance.html";
    }, 1000);
  }

  step++;
}


let typingSound = new Audio("audio/keyboard-typing-4-292591.mp3"); 

function playTypingSound() {
  typingSound.loop = true; 
  typingSound.volume = 0.2; 
  typingSound.play();
}

function stopTypingSound() {
  typingSound.pause();
  typingSound.currentTime = 0;
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
