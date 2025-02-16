let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/horror-hit-logo-142395.mp3");


backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;


window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";

  
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
    typeText("Ellie; It’s done. The mansion is destroyed.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; But the curse... It’s spreading! What have I done?", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; I’ve doomed everyone.", () => {
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
