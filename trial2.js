let step = 0;
let typingSpeed = 40;
let currentText = "";
let currentIndex = 0;
let isTyping = false;
let timer = 25;
let interval;
let matchedPairs = 0;

const symbols = ["🌙", "⚡", "🔥", "🌊", "🌙", "⚡", "🔥", "🌊"];
let flippedCards = [];

const typingSound = new Audio("audio/keyboard-typing-4-292591.mp3");
const clickSound = new Audio("audio/mixkit-select-click-1109.wav");
const backgroundSound = new Audio("audio/scary-echoing-hallway-ambience-211798.mp3");
const flipSound = new Audio("audio/card-sounds-35956.mp3"); 

window.onload = function () {
  document.getElementById("dialogue-box").style.display = "none";
  document.getElementById("shadow").style.display = "none";
  document.getElementById("shadow-dialogue").style.display = "none";
  document.getElementById("choice-buttons").style.display = "none";
  document.getElementById("memory-game").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("congratulations").style.display = "none";
  shuffleCards();

 
  backgroundSound.loop = true;
  backgroundSound.volume = 0.9;
  backgroundSound.play();

  document.body.addEventListener("click", progressStory);
};

function progressStory() {
  if (isTyping) return;

  if (step === 0) {
    document.getElementById("dialogue-box").style.display = "block";
    typeText("Ellie; This hallway... It’s endless. What is this place?");
  } else if (step === 1) {
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("shadow").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "block";
    typeTextShadow("Shadow; The Hall of Shadows. It reflects your deepest fears. Face them, or be lost forever.");
  } else if (step === 2) {
    document.getElementById("dialogue-box").style.display = "block";
    document.getElementById("shadow-dialogue").style.display = "none";
    typeText("Ellie; My fears?");
  } else if (step === 3) {
    document.getElementById("shadow").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("choice-buttons").style.display = "flex";
  }

  step++;
}


document.getElementById("choice1").addEventListener("click", () => {
  clickSound.play();
  document.getElementById("choice-buttons").style.display = "none";
  document.getElementById("memory-game").style.display = "block";
  startTimer();
});

document.getElementById("choice2").addEventListener("click", () => {
  clickSound.play();
  document.getElementById("choice-buttons").style.display = "none";
  setTimeout(() => {
    window.location.href = "path2.html";
  }, 500);
});

function shuffleCards() {
  const grid = document.getElementById("grid");
  grid.innerHTML = ""; 
  symbols.sort(() => Math.random() - 0.5);
  symbols.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = symbol;
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    flipSound.play();
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    if (matchedPairs === symbols.length / 2) {
      clearInterval(interval);
      document.getElementById("memory-game").style.display = "none";
      document.getElementById("congratulations").style.display = "block";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }
  flippedCards = [];
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Time Left: ${timer}`;

    if (timer === 0) {
      clearInterval(interval);
      document.getElementById("memory-game").style.display = "none";
      document.getElementById("game-over").style.display = "block";
    }
  }, 1000);
}

document.getElementById("replay-button").addEventListener("click", () => {
  clickSound.play();
  document.getElementById("game-over").style.display = "none";
  resetGame();
});

document.getElementById("proceed-button").addEventListener("click", () => {
  clickSound.play();
  window.location.href = "library.html";
});

function resetGame() {
  shuffleCards();
  timer = 25;
  matchedPairs = 0;
  startTimer();
  document.getElementById("memory-game").style.display = "block";
}


function typeText(text) {
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
      typingSound.loop = false; 
      typingSound.pause();
      typingSound.currentTime = 0;
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

  typingSound.loop = true;
  typingSound.play(); 

  function type() {
    if (currentIndex < currentText.length) {
      shadowDialogueElement.innerHTML += currentText.charAt(currentIndex);
      currentIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      typingSound.loop = false; 
      typingSound.pause();
      typingSound.currentTime = 0; 
    }
  }

  type();
}
