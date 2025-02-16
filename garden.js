let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/the-secret-garden-184534.mp3");
const buttonClickSound = new Audio("audio/mixkit-select-click-1109.wav");


window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("choice-buttons").style.display = "none";

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();

  progressStory();
};

function progressStory() {
  if (isTyping) return;

  console.log(`Step: ${step}`); 

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This garden... It’s beautiful, but something feels off.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Gardener; You must be Ellie. I’ve been expecting you.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Gardener; This garden holds the secrets of your lineage. Help me restore it, and I’ll tell you more.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 3) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("choice-buttons").style.display = "flex";
  }
}


document.getElementById("choice1").addEventListener("click", () => {
  playButtonClick();
  window.location.href = "help_gardener.html"; 
});

document.getElementById("choice2").addEventListener("click", () => {
  playButtonClick();
  window.location.href = "refuse_gardener.html"; 
});

function typeText(text, callback) {
  let dialogueElement = document.getElementById("dialogue-text");
  dialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  typingSound.loop = true;
  typingSound.play(); 

  function type() {
    if (currentIndex < currentText.length) {
      dialogueElement.innerHTML += currentText.charAt(currentIndex);
      currentIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      typingSound.pause();
      typingSound.currentTime = 0; 
      if (callback) callback(); 
    }
  }

  type();
}

function playButtonClick() {
  buttonClickSound.play();
}
