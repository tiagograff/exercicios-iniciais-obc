//elementos do DOM
const form = document.querySelector(".playersForm");
const gamePlataform = document.querySelector("main");
const plataform = document.querySelector('.plataform')
const cells = document.querySelectorAll(".cell");
const player01Input = document.getElementById("player01");
const player02Input = document.getElementById("player02");
const statusTurn = document.querySelector(".playerTurn");
const showResultOnDisplay = document.querySelector(".winner");
const divResult = document.querySelector(".result");
const resetButton = document.getElementById('resetBtn')
//variaveis
let namePlayer01 = null;
let namePlayer02 = null;
let winner = null;
let gameStarted = false;
let gameFinished = false;
let nextTurn = true;
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

function cleanBoard(){
  board.forEach((row) => {
    row.fill('')
  })
  cells.forEach((cell) => {
    cell.textContent = ""
    cell.classList.remove('activeWinPlace')
  })
}

function winPlace(){
  board.flat()

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

function resetGame(){
    plataform.classList.remove('finishGame')
    cleanBoard()
    gameFinished = false
    divResult.style.display = 'none'
    winner = null
    currentTurn = player01Caracter
    renderTurn()
    resetButton.disabled = true
}

function getPlayersName() {
  namePlayer01 = player01Input.value;
  namePlayer02 = player02Input.value;
  if (namePlayer01.length <= 0 || namePlayer02.length <= 0) {
    alert(
      "Preencha os campos com no máximo 10 caracteres",
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

function paintCells(winningCells){
  winningCells.forEach((cell) => {
    const row = Math.floor(cell / 3)
    const col = cell % 3
    document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.add('activeWinPlace')
  })
}

function canPlayHere(row, col) {
  console.log(board[row][col])
  if (board[row][col].length === 0) {
    nextTurn = true;
    return true;
  } else {
    nextTurn = false;
    return false;
  }
}

function makePlay(row, col) {
  canPlayHere(row, col)
    ? (board[row][col] = currentTurn)
    : alert("Não é possível jogar neste campo!");
}

function renderBoard(currentCell) {
  if (!gameFinished){
    currentCell.innerText = currentTurn;
  }
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
      showResultOnDisplay.classList.remove('draw')
      gameFinished = true;
      plataform.classList.add('finishGame')
      paintCells(win)
      return;
    }
    if (!checkBoard.includes("")) {
      plataform.classList.add('finishGame')
      showResultOnDisplay.classList.add('draw')
      winner = "Empate";
      gameFinished = true;
    }
  }
}

function showWinner() {
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

cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    let currentCell = event.currentTarget;
    makePlay(Number(currentCell.dataset.row), Number(currentCell.dataset.col));
    if (nextTurn) {
      renderBoard(currentCell);
      resultGameCheck();
      if (!gameFinished) {
        turnChange();
        renderTurn();
      } else {
        showWinner()
        resetButton.disabled = false
      }
    }
  });
});

//eventos do DOM
document.getElementById("createNewGameBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  getPlayersName();
  if (gameStarted) {
    resetButton.disabled = true
    showGame();
    renderTurn();
  }
});

document.getElementById("cancelBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (confirm("Deseja mesmo cancelar essa partida?")) {
    resetGame()
    gameStarted = false
    showForm();
  } else {
    alert("Retornando para partida atual");
  }
});

document.getElementById("resetBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (gameFinished) {
    resetGame()
  } else {
    alert('Partida não acabada e não cancelada')
  }
});
