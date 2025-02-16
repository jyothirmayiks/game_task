let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/witch-256816.mp3");


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
    typeText("Ellie; I choose to embrace my true self. I am not bound by the curse or the shadows.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; I feel the power of the sisterhood flowing through me, but it’s balanced. I am in control.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; I will restore the sisterhood and protect this world. This is my destiny.", () => {
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
    window.location.href = "index.html"; 
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
