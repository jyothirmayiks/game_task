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

  console.log(`Step: ${step}`); // Debugging: Log the current step

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This place... it feels ancient. Like it hasn't been touched in centuries.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 1) {
    typeText("Ellie; What is that...? It’s... calling to me. I can feel it.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 2) {
    typeText("Ellie; No. This isn’t right. Something—someone—doesn’t want me here.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 3) {
    typeText("Ellie; But if this artifact is here, hidden away, then maybe... maybe it’s meant to stay that way.", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 4) {
    typeText("Ellie; What if this is my only way out? Do I take it... or leave it behind?", () => {
      step++;
      document.body.addEventListener("click", progressStory);
    });
  } else if (step === 5) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("choice-buttons").style.display = "flex";
    document.body.removeEventListener("click", progressStory); // Stop advancing on click
  }
}

// Handle button choices
document.getElementById("choice1").addEventListener("click", () => {
  window.location.href = "take_artifact.html"; 
});

document.getElementById("choice2").addEventListener("click", () => {
  window.location.href = "leave_artifact.html"; 
});

function typeText(text, callback) {
  let dialogueElement = document.getElementById("dialogue-text");
  dialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  // Play typing sound
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
      typingSound.currentTime = 0; // Reset sound
      if (callback) callback(); // Execute callback after typing is done
    }
  }

  type();
}
