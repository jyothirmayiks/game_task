let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/terror-heights-dark-ambience-230667.mp3");


backgroundMusic.loop = true;
backgroundMusic.volume = 0.9;


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
    typeText("Ellie; The mansion is sealed. The curse is trapped inside.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; But... I can’t leave. The seal binds me to this place.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; I’ve saved the world, but at what cost?", () => {
        setTimeout(showGameOver, 2000); 
    });
  }
}

function showGameOver() {
    let gameOverScreen = document.getElementById("game-over");
    gameOverScreen.style.visibility = "visible";
    gameOverScreen.style.opacity = "1";
  }
  
 
  function restartGame() {
    window.location.href = "garden.html"; 
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
