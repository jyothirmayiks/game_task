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
  document.getElementById("cipher-puzzle").style.display = "none";
  document.getElementById("chest-unlocked").style.display = "none";

  
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
    typeText("Ellie; I won’t play your games. There has to be another way out of here.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; No doors… no windows… just this strange writing on the table. What is this?", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; A cipher? Looks ancient… Maybe this is the key to escaping.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 3) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("cipher-puzzle").style.display = "block";
    document.body.removeEventListener("click", progressStory);
  }
}

function checkCipher() {
  let answer = document.getElementById("cipher-input").value.toLowerCase();
  if (answer === "the door is open but the forest never lets you go") {
    document.getElementById("cipher-puzzle").style.display = "none";
    document.getElementById("chest-unlocked").style.display = "block";
  } else {
    document.getElementById("cipher-input").value = "";
    document.getElementById("cipher-input").placeholder = "Incorrect. Try again.";
  }
}

document.getElementById("proceed-button").addEventListener("click", () => {
  window.location.href = "hidden_passage.html";
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
