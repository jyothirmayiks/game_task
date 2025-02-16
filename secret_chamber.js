let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;

window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("choice-buttons").style.display = "none";
  progressStory();
};

function progressStory() {
  if (isTyping) return;

  console.log(`Step: ${step}`); 

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie: This journal... It contains a ritual. Should I perform it?", () => {
      step++;
      document.getElementById("choice-buttons").style.display = "flex";
    });
  }
}

document.getElementById("choice1").addEventListener("click", () => {
  window.location.href = "ritual.html"; 
});

document.getElementById("choice2").addEventListener("click", () => {
  window.location.href = "destroy_journal.html"; 
});

function typeText(text, callback) {
  let dialogueElement = document.getElementById("dialogue-text");
  dialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  function type() {
    if (currentIndex < currentText.length) {
      dialogueElement.innerHTML += currentText.charAt(currentIndex);
      currentIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      if (callback) callback(); 
    }
  }

  type();
}