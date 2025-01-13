let moves = 0;
let startTime = null;
let timerInterval;
let flippedCards = [];
let matchedCards = [];
const cards = document.querySelectorAll(".game-block");// All cards
const leaderboard = document.getElementById("leaderboard"); // Leaderboard modal
const flipSound = document.getElementById("flipSound"); // the sound of flip card
let scores = JSON.parse(localStorage.getItem("scores")) || []; // Get saved scores

let restart = document.getElementById('restart')
restart.addEventListener('click',()=>{
    location.reload();
});

// Start the timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
        const seconds = (elapsedTime % 60).toString().padStart(2, "0");
        document.getElementById("game-time").textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Handle card flip
cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (flippedCards.length < 2 && !card.classList.contains("is-flipped") && !matchedCards.includes(card)) {
            card.classList.add("is-flipped");
            flippedCards.push(card);

            // sound play when flip card
            setTimeout(() => {
                flipSound.play();
            }, 50);

            if (flippedCards.length === 2) {
                moves++;
                document.querySelector(".tries span").textContent = moves;
                checkMatch();
            }
        }
    });
});
// Check if two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (
        firstCard.querySelector(".back p").textContent ===
        secondCard.querySelector(".back p").textContent
    ) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        // Play match sound
        const matchSound = document.getElementById("matchSound");
        matchSound.currentTime = 0;
        matchSound.play();

        if (matchedCards.length === cards.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("is-flipped"));
            flippedCards = [];
        }, 1000);
    }
}

// End the game
function endGame() {
    stopTimer();
    const elapsedTime = document.getElementById("game-time").textContent;
    const currentScore = { moves, time: elapsedTime };
    scores.push(currentScore);
    scores.sort((a, b) => a.moves - b.moves || a.time.localeCompare(b.time)); // ^^Sort by moves and time
    localStorage.setItem("scores", JSON.stringify(scores)); // ^^Save to localStorage
    showLeaderboard(currentScore);
}

// Show leaderboard
function showLeaderboard(currentScore) {
    document.getElementById("current-moves").textContent = currentScore.moves;
    document.getElementById("leaderboard-time").textContent = currentScore.time;
  
    const scoresContainer = document.getElementById("scores");
    scoresContainer.innerHTML = ""; // ^^Clear previous scores
  
    scores.slice(0, 5).forEach((score, index) => {
        const scoreItem = document.createElement("p");
        scoreItem.textContent = `#${index + 1} - Moves: ${score.moves}, Time: ${score.time}`;
        scoresContainer.appendChild(scoreItem);
    });
  
    leaderboard.style.display = "block"; // ^^Show the leaderboard
    leaderboard.style.visibility = "visible"; 
    // Play the celebration sound
    const celebrateSound = document.getElementById("celebrate-Sound");
    celebrateSound.play();
  }

// Shuffle cards
function shuffleCards() {
    const cardArray = Array.from(cards);
    cardArray.forEach((card) => card.classList.remove("is-flipped"));

    const shuffled = cardArray.sort(() => Math.random() - 0.5);
    const parent = cardArray[0].parentNode;

    shuffled.forEach((card) => parent.appendChild(card));
}

// Restart the game
document.getElementById("restart-button").addEventListener("click", () => {
    moves = 0;
    matchedCards = [];
    flippedCards = [];
    document.querySelector(".tries span").textContent = moves;
    leaderboard.style.display = "none";
    leaderboard.style.visibility = "hidden"; 
    leaderboard.style.opacity = "0";
    cards.forEach((card) => card.classList.remove("is-flipped"));
    shuffleCards();
// Reset timer
  clearInterval(timerInterval); 
// Start fresh timer
  startTimer(); 
});

// Start the game
function startGame() {
    moves = 0;
    matchedCards = [];
    flippedCards = [];
    document.querySelector(".tries span").textContent = moves;
    leaderboard.style.display = "none";
    shuffleCards();
    startTimer();
}

startGame();
