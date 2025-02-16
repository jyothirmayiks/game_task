let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;
let typingTimeout;
let lastTypingTime = 0;

window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("shadow").style.display = "none";
  document.getElementById("shadow-dialogue").style.display = "none";
  document.getElementById("riddle-scene").style.display = "none";

  document.body.addEventListener("click", playBackgroundMusic, { once: true });
};


let bgm = new Audio("audio/scary-witch-horror-background-laugh-vocal-250001.mp3");
bgm.loop = true;
bgm.volume = 0.5;

function playBackgroundMusic() {
  bgm.play().catch((e) => console.log("Music autoplay blocked, user interaction needed"));
}


let typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
typingSound.volume = 0.3;

function playTypingSound() {
  let now = Date.now();
  if (now - lastTypingTime > 50) { 
    typingSound.currentTime = 0;
    typingSound.play();
    lastTypingTime = now;
  }
}


let buttonClickSound = new Audio("audio/mixkit-select-click-1109.wav");
buttonClickSound.volume = 0.5;

function playButtonClickSound() {
  buttonClickSound.currentTime = 0;
  buttonClickSound.play();
}


function progressStory() {
  if (isTyping) return;

  console.log(`Step: ${step}`);

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This door is locked... What’s this? A riddle?", () => {
      step++;
      document.body.addEventListener("click", progressStory, { once: true });
    });
  } else if (step === 1) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; Solve the riddle, Ellie. Only then will the mansion reveal its secrets.", () => {
      step++;
      document.body.addEventListener("click", progressStory, { once: true });
    });
  } else if (step === 2) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; Fine. Let’s see...", () => {
      step++;
      document.body.addEventListener("click", progressStory, { once: true });
    });
  } else if (step === 3) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("riddle-scene").style.display = "block";
    document.getElementById("riddle-text").innerText =
      "Riddle; I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?";
  }
}


function checkRiddle() {
  playButtonClickSound();
  let answer = document.getElementById("riddle-input").value.toLowerCase();
  if (answer === "echo") {
    document.getElementById("riddle-scene").style.display = "none";
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; Echo... That makes sense. The door is opening!", () => {
      step++;
      setTimeout(() => {
        window.location.href = "trial2.html";
      }, 1000);
    });
  } else {
    alert("Incorrect answer. Try again.");
  }
}


function typeText(text, callback) {
  let dialogueElement = document.getElementById("dialogue-text");
  dialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  function type() {
    if (currentIndex < currentText.length) {
      dialogueElement.innerHTML += currentText.charAt(currentIndex);
      playTypingSound();
      currentIndex++;
      typingTimeout = setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  type();
}


function typeTextShadow(text, callback) {
  let shadowDialogueElement = document.getElementById("shadow-text");
  shadowDialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  function type() {
    if (currentIndex < currentText.length) {
      shadowDialogueElement.innerHTML += currentText.charAt(currentIndex);
      playTypingSound();
      currentIndex++;
      typingTimeout = setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  type();
}
