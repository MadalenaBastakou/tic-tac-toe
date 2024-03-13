const startBtn = document.getElementById("start-btn");
const popUp = document.querySelector(".popup");
const gotItBtn = document.getElementById("got-it-btn");
const plNames = document.querySelector(".player-names");
const submitBtn = document.getElementById("submit-btn");
const pIn1 = document.getElementById("pIn1");
const pIn2 = document.getElementById("pIn2");
const p1Field = document.getElementById("p1");
const p2Field = document.getElementById("p2");
const p1Count = document.getElementById("p1count");
const p2Count = document.getElementById("p2count");
const O = document.getElementById("O");
const X = document.getElementById("X");
const winnerBox = document.querySelector(".winner");
const winnerText = document.getElementById("winner");
const backdrop = document.getElementById("backdrop");
const restartBtn = document.getElementById("restart-btn");
const congratsMess = document.getElementById("congrats");
const winAudio = document.getElementById("win-audio");
const loseAudio = document.getElementById("lose-audio");

let sum1 = 0;
let sum2 = 0;

//game rules pop up window
startBtn.addEventListener("click", function () {
  popUp.style.display = "block";
  backdrop.style.display = "block";
  startBtn.style.display = "none";
});

gotItBtn.addEventListener("click", function () {
  plNames.style.display = "flex";
  popUp.style.display = "none";
  gotItBtn.style.display = "none";
});

//creating two players
function Player(marker, name) {
  this.name = name;
  this.marker = marker;
}

let player1;
let player2;
let player;

submitBtn.addEventListener("click", function () {
  backdrop.style.display = "none";
  plNames.style.display = "none";
  p1Field.textContent = pIn1.value;
  p2Field.textContent = pIn2.value;
  p1Count.textContent = "O:";
  p2Count.textContent = "X:";
  player1 = new Player("O", pIn1.value);
  player2 = new Player("X", pIn2.value);
  O.style.display = "block";
  X.style.display = "block";
  player = player1;
});

let player1Arr = [];
let player2Arr = [];

function checkForTie() {
  const allCellsFilled = Array.from(cells).every(
    (cell) => cell.textContent !== ""
  );
  const isWinner = checkWin(player1Arr) || checkWin(player2Arr);

  if (allCellsFilled && !isWinner) {
    winnerBox.style.display = "block";
    backdrop.style.display = "block";
    congratsMess.textContent = "! Oh no !";
    winnerText.textContent = `It's a tie`;
    restartBtn.style.display = "block";
    loseAudio.play();
  }
}

//game play
const cells = document.querySelectorAll(".cell");
let currentCell;
for (let cell of cells) {
  cell.addEventListener("click", function () {
    currentCell = cell.getAttribute("data-index");
    if (player === player1 && cell.textContent === "") {
      cell.textContent = player1.marker;
      player = player2;
      player1Arr.push(parseInt(currentCell));
      if (player1Arr.length >= 3) {
        if (checkWin(player1Arr)) {
          sum1++;
          endGame(player1);
        } else if (player1Arr.length + player2Arr.length === 9) {
          checkForTie();
        }
      }
    } else if (player === player2 && cell.textContent === "") {
      cell.textContent = player2.marker;
      player = player1;
      player2Arr.push(parseInt(currentCell));
      if (player2Arr.length >= 3) {
        if (checkWin(player2Arr)) {
          sum2++;
          endGame(player2);
        } else if (player1Arr.length + player2Arr.length === 9) {
          checkForTie();
        }
      }
    }
    checkForTie();
  });
}

function checkWin(array) {
  const winningCombinations = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  return winningCombinations.some((subArray) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => array.includes(index));
    });
  });
}

function endGame(player) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
  winAudio.play();
  congratsMess.textContent = "!! Congratulations !!";
  winnerText.textContent = `${player.name} is the winner`;
  winnerBox.style.display = "block";
  backdrop.style.display = "block";
  restartBtn.style.display = "block";
}

function resetGame() {
  for (let cell of cells) {
    cell.textContent = "";
  }
  player1Arr = [];
  player2Arr = [];

  player = player1;
  p1Field.textContent = pIn1.value;
  p2Field.textContent = pIn2.value;
  p1Count.textContent = "O: " + sum1;
  p2Count.textContent = "X: " + sum2;
}

restartBtn.addEventListener("click", function () {
  resetGame();
  winnerBox.style.display = "none";
  backdrop.style.display = "none";
});
