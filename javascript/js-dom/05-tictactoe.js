//elementos do DOM
const form = document.querySelector(".playersForm");
const gamePlataform = document.querySelector("main");
const cells = document.querySelectorAll(".cell");
const player01Input = document.getElementById("player01");
const player02Input = document.getElementById("player02");
const statusTurn = document.querySelector(".playerTurn");
const showResultOnDisplay = document.querySelector(".winner");
const divResult = document.querySelector(".result");
//variaveis
let namePlayer01 = null;
let namePlayer02 = null;
let winner = null;
let gameStarted = false;
let gameFinished = false;
const player01Caracter = "X";
const player02Caracter = "0";
let currentTurn = player01Caracter;
//listas
const winningPositions = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//funcoes
function cleanForm() {
  player01Input.value = "";
  player02Input.value = "";
}

function showGame() {
  form.style.display = "none";
  gamePlataform.style.display = "block";
}

function showForm() {
  form.style.display = "flex";
  gamePlataform.style.display = "none";
}

function turnChange() {
  currentTurn === player01Caracter
    ? (currentTurn = player02Caracter)
    : (currentTurn = player01Caracter);
}

function getPlayersName() {
  namePlayer01 = player01Input.value;
  namePlayer02 = player02Input.value;
  if (namePlayer01.length <= 0 || namePlayer02.length <= 0) {
    alert(
      "Os campos de nome devem estar preenchidos de 1 até no máximo 10 caracteres",
    );
    cleanForm();
    gameStarted = false;
  } else if (
    typeof namePlayer01 !== "string" &&
    typeof namePlayer02 !== "string"
  ) {
    alert("O nome dos jogadores devem ser do tipo texto");
    cleanForm();
    gameStarted = false;
  } else {
    cleanForm();
    gameStarted = true;
  }
}

function renderTurn() {
  if (currentTurn === player01Caracter) {
    statusTurn.textContent = namePlayer01;
  } else {
    statusTurn.textContent = namePlayer02;
  }
}

function makePlay(row, col) {
  board[row][col] = currentTurn;
}

function renderBoard(button) {
  button.innerText = currentTurn;
}

function resultGameCheck() {
  const checkBoard = board.flat();

  for (const win of winningPositions) {
    const [a, b, c] = win;

    if (
      checkBoard[a] === checkBoard[b] &&
      checkBoard[b] === checkBoard[c] &&
      checkBoard[a] !== ""
    ) {
      winner = currentTurn;
      gameFinished = true;
      return;
    }
    if (!checkBoard.includes("")) {
      winner = "Empate";
      gameFinished = true;
    }
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    let currentCell = event.currentTarget;
    makePlay(Number(currentCell.dataset.row), Number(currentCell.dataset.col));
    renderBoard(currentCell);
    resultGameCheck();
    if (!gameFinished) {
      turnChange();
      renderTurn();
    } else {
      if (winner === "X") {
        showResultOnDisplay.textContent = namePlayer01;
        divResult.style.display = "flex";
      } else if (winner === "0") {
        showResultOnDisplay.textContent = namePlayer02;
        divResult.style.display = "flex";
      } else if (winner === "Empate") {
        showResultOnDisplay.textContent = "Empate";
        divResult.style.display = "flex";
      } else {
        console.error("erro na aplicação");
      }
    }
  });
});

//eventos do DOM
document.getElementById("createNewGameBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  getPlayersName();
  if (gameStarted) {
    showGame();
    renderTurn();
  }
});

document.getElementById("cancelBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (confirm("Deseja mesmo cancelar essa partida?")) {
    //limpar campo (plataforma)
    showForm();
  } else {
    alert("Retornando para partida atual");
  }
});

document.getElementById("resetBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  //verificar se a partida terminou para poder começar outra
});
