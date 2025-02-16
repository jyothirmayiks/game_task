let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/the-secret-garden-184534.mp3");
const buttonClickSound = new Audio("audio/mixkit-select-click-1109.wav");


backgroundMusic.loop = true;
backgroundMusic.volume = 0.5; 


window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("choice-buttons").style.display = "none";

  
  document.body.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    }
  }, { once: true });

  progressStory();
};

function progressStory() {
  if (isTyping) return;

  console.log(`Step: ${step}`); 

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Gardener; You’ve done well, Ellie. The garden is restored.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Gardener; But there’s something you must know. The sisterhood’s power comes at a cost.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Gardener; Will you accept this power and continue the legacy, reject it and walk away, or embrace your true self and find balance?", () => {
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
  window.location.href = "accept_power.html"; 
});

document.getElementById("choice2").addEventListener("click", () => {
  playButtonClick();
  window.location.href = "reject_power.html"; 
});

document.getElementById("choice3").addEventListener("click", () => {
  playButtonClick();
  window.location.href = "embrace_true_self.html"; 
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
