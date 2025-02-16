let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const explosionSound = new Audio("audio/large-underwater-explosion-190270.mp3");
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
    typeText("Ellie; The artifact... It’s so powerful. I can feel it surging through me!", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; But—wait. Something’s not right. The energy... it’s too much!", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; No! It’s—", () => {
      step++;
      setTimeout(() => {
        triggerExplosion();
      }, 2000); 
    });
  } else if (step === 3) {
    typeText("*A deafening explosion shakes the chamber, engulfing everything in flames.*", () => {
      step++;
      setTimeout(() => {
        gameOver();
      }, 3000); 
    });
  }
}

function triggerExplosion() {
  explosionSound.volume = 0.8;
  explosionSound.play();
  document.body.style.backgroundColor = "red"; 
  setTimeout(() => {
    document.body.style.backgroundColor = "black"; 
  }, 500);
}

function gameOver() {
  document.body.innerHTML = `
    <div style="text-align:center; color:white; font-size:2rem; margin-top:20%;">
      <h1>Game Over</h1>
      <p>The artifact's power was too much to handle.</p>
      <button onclick="restartGame()" style="padding:10px 20px; font-size:1.2rem;">Try Again</button>
    </div>
  `;
  backgroundMusic.pause();
}

function restartGame() {
  location.reload(); 
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
