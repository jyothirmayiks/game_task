let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;

window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("shadow").style.display = "none";
  document.getElementById("shadow-dialogue").style.display = "none";
};

function progressStory() {
  if (isTyping) return;

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This place... It feels like it’s alive. What am I even doing here?");
  } else if (step === 1) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; You made the right choice, Ellie. But the mansion will test you. Be prepared.");
  } else if (step === 2) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; Test me? What kind of test?");
  } else if (step === 3) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; The kind that separates the worthy from the forgotten. Proceed carefully!");
  } else if (step === 4) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; I don’t have time for this... But I need to know the truth.");
  }

  step++;
}

function typeText(text) {
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
    }
  }

  type();
}

function typeTextShadow(text) {
  let shadowDialogueElement = document.getElementById("shadow-text");
  shadowDialogueElement.innerHTML = "";
  currentText = text;
  currentIndex = 0;
  isTyping = true;

  function type() {
    if (currentIndex < currentText.length) {
      shadowDialogueElement.innerHTML += currentText.charAt(currentIndex);
      currentIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
    }
  }

  type();
}