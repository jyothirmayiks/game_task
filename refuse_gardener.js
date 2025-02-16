let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;


const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/scary-music-box-for-spooky-scenes-165983.mp3");


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
    typeText("Ellie; I won’t trust anyone. I’ll find the truth myself.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; This secret room... It holds the key to everything.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; I can destroy the mansion or seal it forever. What should I do?", () => {
      step++;
    });
  } else if (step === 3) {
    setTimeout(() => {
      document.getElementById("dialogue-box").style.display = "none";
      document.getElementById("choice-buttons").style.display = "flex";
    }, 1000); 
  }
}


document.getElementById("choice1").addEventListener("click", () => {
  window.location.href = "destroy_mansion.html"; 
});

document.getElementById("choice2").addEventListener("click", () => {
  window.location.href = "seal_mansion.html"; 
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
