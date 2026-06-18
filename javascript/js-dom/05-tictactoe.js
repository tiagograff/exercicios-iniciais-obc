//elementos do DOM
const form = document.querySelector(".playersForm");
const gamePlataform = document.querySelector('main');
const player01Input = document.getElementById('player01')
const player02Input = document.getElementById('player02')
//variaveis
let currentPlayer01 = null
let currentPlayer02 = null
let gameStarted = false
let gameFinished = false

//funcoes
function cleanForm() {
  player01Input.value = ''
  player02Input.value = ''
}

function showGame() {
    form.style.display = 'none';
    gamePlataform.style.display = 'block';
}

function showForm(){
    form.style.display = 'flex';
    gamePlataform.style.display = 'none';
}

function getPlayersName() {
  currentPlayer01 = player01Input.value
  currentPlayer02 = player02Input.value
  if (currentPlayer01.length <= 0 || currentPlayer02.length <= 0){
    alert('Os campos de nome devem estar preenchidos de 1 até no máximo 10 caracteres')
    cleanForm()
    gameStarted = false
  }else if (typeof currentPlayer01 !== 'string' && typeof currentPlayer02 !== 'string'){
    alert('O nome dos jogadores devem ser do tipo texto')
    cleanForm()
    gameStarted = false
  }else{
    cleanForm()
    gameStarted = true
  }
}

//funcao de verificacao de vencedor/empate

//eventos do DOM
document.getElementById("createNewGameBtn").addEventListener("click", (ev) => {
  ev.preventDefault()
  getPlayersName()
  if (gameStarted){
    showGame()
  }
});

document.getElementById("cancelBtn").addEventListener("click", (ev) => {
  ev.preventDefault()
  if (confirm('Deseja mesmo cancelar essa partida?')){
  //limpar campo (plataforma)
    showForm()
  }else{
    alert('Retornando para partida atual')
  }
})

document.getElementById('resetBtn').addEventListener("click", (ev) => {
  ev.preventDefault()
  //verificar se a partida terminou para poder começar outra
})
