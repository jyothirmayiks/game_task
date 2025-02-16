let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;

const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const backgroundMusic = new Audio("audio/scary-sound-effect-298866.mp3");
const buttonClickSound = new Audio("audio/mixkit-select-click-1109.wav");


window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("book-cipher").style.display = "none";
  document.getElementById("book-found").style.display = "none";

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
    typeText("Ellie; This library is massive. How do I find the right book?", () => {
      step++;
      document.body.addEventListener("click", progressStory, { once: true });
    });
  } else if (step === 1) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("book-cipher").style.display = "block";
    document.body.removeEventListener("click", progressStory);
  } else if (step === 2) {
    document.getElementById("book-found").style.display = "block";

    setTimeout(() => {
      step++; 
      progressStory(); 
    }, 2000); 
  } else if (step === 3) {
    document.getElementById("book-found").style.display = "none";
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; A map! It shows a hidden garden deep within the mansion. What secrets could it hold?", () => {
      step++;
      document.body.addEventListener("click", progressStory, { once: true });
    });
  } else if (step === 4) {
    setTimeout(() => {
      window.location.href = "garden.html"; 
    }, 1000); 
  }
}

function checkBook() {
  let answer = document.getElementById("book-input").value.toLowerCase();
  if (answer === "book") {
    document.getElementById("book-cipher").style.display = "none";
    document.getElementById("book-found").style.display = "block";
    
    step++; 
    setTimeout(() => {
      progressStory(); 
    }, 1000);
  } else {
    document.getElementById("book-input").value = "";
    document.getElementById("book-input").placeholder = "Incorrect. Try again.";
  }
}


function handleButtonClick(action) {
  buttonClickSound.play();
  action();
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
