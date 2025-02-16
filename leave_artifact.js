let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const crumbleSound = new Audio("audio/exploding-building-1-185114.mp3");
const backgroundMusic = new Audio("audio/scary-music-box-for-spooky-scenes-165983.mp3");


backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";

  
  document.body.addEventListener(
    "click",
    () => {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
      }
    },
    { once: true }
  );

  progressStory();
};

function progressStory() {
  if (isTyping) return;

  console.log(`Step: ${step}`);

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; No... I can’t take it. Something about this feels... wrong.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; Wait—what's happening? The walls... they’re crumbling!", () => {
      step++;
      crumbleSound.volume = 0.7;
      crumbleSound.play(); 
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; No, no, no! I have to get out— *cough* The dust— I... I can’t breathe...", () => {
      step++;
      setTimeout(() => {
        fadeToBlack();
      }, 3000);
    });
  }
}

function fadeToBlack() {
  let fadeDiv = document.createElement("div");
  fadeDiv.style.position = "fixed";
  fadeDiv.style.top = "0";
  fadeDiv.style.left = "0";
  fadeDiv.style.width = "100%";
  fadeDiv.style.height = "100%";
  fadeDiv.style.backgroundColor = "black";
  fadeDiv.style.opacity = "0";
  fadeDiv.style.transition = "opacity 3s ease-in-out";
  document.body.appendChild(fadeDiv);

  setTimeout(() => {
    fadeDiv.style.opacity = "1";
  }, 100);
}

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
