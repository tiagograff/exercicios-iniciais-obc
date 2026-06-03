//divs e sections
const sectionLineupForm = document.querySelector(".lineupForm");
const playerForm = document.querySelector(".playerInfos")
//listas
const players = []
const playersPositionsList = [
  "Atacante",
  "Zagueiro",
  "Goleiro",
  "Lateral",
  "Meio-Campo",
];
//botoes
const toScalePlayer = document.getElementById('submitPlayer')
//funcionalidades
const cleanForm = () => {
  const inputs = document.querySelectorAll('.playerInfos input')
  inputs.forEach(input => input.value = '')
  inputs.forEach(input => input.checked = false)
}
//criando elementos
const breakLine = () => {
  return document.createElement('br')
}

const makeButton = (type, id, text) => {
  const newButton = document.createElement('button')
  newButton.type = type
  newButton.id = id
  newButton.textContent = text
  newButton.style.width = '200px'

  return newButton
}

const makeInput = (inputType, inputName) => {
  const input = document.createElement("input");
  input.type = inputType;
  input.name = inputName;
  
  return input;
};

const makeLabel = (forInput, labelText) => {
  const label = document.createElement("label");
  label.htmlFor = forInput;
  label.textContent = labelText;
  return label;
};

const inputRadio = (arr, nameInputRadio) => {
  const div = document.createElement("div");
  for (let i = 0; arr.length > i; i++) {
    const info = arr[i];
    const input = makeInput("radio", nameInputRadio);
    input.value = info;
    input.id = "input-" + info;

    const label = makeLabel("input-" + info, info);
    const divOptions = document.createElement("div");
    divOptions.className = "radio-" + info;
    divOptions.append(input, label);
    div.append(divOptions);
  }
  return div;
};

function makeForm() {
  // campos do form
  const newPlayerName = makeInput('text', 'playerName')
  newPlayerName.style.width = '200px'
  const newPlayerNumber = makeInput('number','shirtNumber')
  newPlayerNumber.style.width = '200px'
  const newPlayerPosition= inputRadio(playersPositionsList, "positionPlayer");

  // estilizacao dos campos do form
  playerForm.style.marginTop = '30px'
  playerForm.style.display = 'flex'
  playerForm.style.flexDirection = 'column'

  // adicionando campos no form
  playerForm.append(makeLabel('nome','Nome do Jogador: '),newPlayerName, breakLine(),
  makeLabel('shirtName', 'Número da Camisa'), newPlayerNumber, breakLine(),
  makeLabel('positionPlayer','Posição do Jogador:'), newPlayerPosition);

  // botão de salvar info
  const saveFormPlayer = makeButton('submit','saveFormPlayer','Salvar Informações')
  saveFormPlayer.style.marginTop = '30px'
  playerForm.append(saveFormPlayer)

  saveFormPlayer.addEventListener("click", () =>{
    event.preventDefault()  
    const playerPosition = document.querySelector('input[name="positionPlayer"]:checked')
    const newPlayer = {
      name: newPlayerName.value,
      number: newPlayerNumber.value,
      position: playerPosition.value
    }
    if(confirm('Deseja salvar estas informações?')){
      players.push(newPlayer)
      cleanForm()
    } else {
      alert('Informações não salvas!')
    }

})

  return playerForm;
}

//botoes
toScalePlayer.addEventListener("click", () => {
  sectionLineupForm.append(makeForm());
  toScalePlayer.disabled = "true";
});
