//divs e sections
const sectionLineupForm = document.querySelector(".lineupForm");
const playerForm = document.querySelector(".playerInfos");
const sectionLineup = document.querySelector(".teamLineup");
const sectionDeletePlayer = document.querySelector(".deletePlayerForm");
//listas
const players = [];
const playersPositionsList = [
  "Atacante",
  "Zagueiro",
  "Goleiro",
  "Lateral",
  "Meio-Campo",
];
//botoes
const toScalePlayer = document.getElementById("submitPlayer");
const toDeletePlayer = document.getElementById("deletePlayer");
const confirmDeletePlayer = document.getElementById("deletePlayerId");
//funcionalidades
const cleanForm = () => {
  document
    .querySelectorAll('.playerInfos input:not([type="radio"])')
    .forEach((input) => (input.value = ""));

  document
    .querySelectorAll('.playerInfos input[type="radio"]')
    .forEach((input) => (input.checked = false));
};
const disableButton = (button) => {
  button.disabled = true;
};

const findPlayersByNumber = (number) => {
  return players.find((player) => player.number === number);
};

const displayPlayers = () => {
  sectionLineup.innerHTML = "";
  const titleLineup = document.createElement("h2");
  titleLineup.textContent = "Jogadores Escalados:";
  sectionLineup.append(breakLine(), titleLineup);
  players.forEach((player) => {
    const playerInfo = document.createElement("p");
    playerInfo.textContent = `Nome: ${player.name} \nNúmero: ${player.number} \nPosição: ${player.position}`;
    sectionLineup.append(playerInfo);
  });
};
//criando elementos
const breakLine = () => {
  return document.createElement("br");
};

const makeButton = (type, id, text) => {
  const newButton = document.createElement("button");
  newButton.type = type;
  newButton.id = id;
  newButton.textContent = text;
  newButton.style.width = "200px";

  return newButton;
};

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
    input.required = true;

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
  //campos do form
  const newPlayerName = makeInput("text", "playerName");
  newPlayerName.style.width = "200px";
  newPlayerName.required = true;
  const newPlayerNumber = makeInput("number", "shirtNumber");
  newPlayerNumber.required = true;
  newPlayerNumber.style.width = "200px";
  newPlayerNumber.type = "number";
  newPlayerNumber.min = 1;
  newPlayerNumber.max = 99;
  newPlayerNumber.step = 1;
  const newPlayerPosition = inputRadio(playersPositionsList, "positionPlayer");
  newPlayerPosition.required = true;

  //estilizacao dos campos do form
  playerForm.style.marginTop = "30px";
  playerForm.style.display = "flex";
  playerForm.style.flexDirection = "column";

  //adicionando campos no form
  playerForm.append(
    makeLabel("nome", "Nome do Jogador: "),
    newPlayerName,
    breakLine(),
    makeLabel("shirtName", "Número da Camisa:"),
    newPlayerNumber,
    breakLine(),
    makeLabel("positionPlayer", "Posição do Jogador:"),
    newPlayerPosition,
  );

  //botão de salvar info
  const saveFormPlayer = makeButton(
    "submit",
    "saveFormPlayer",
    "Salvar Informações",
  );
  saveFormPlayer.style.marginTop = "30px";
  playerForm.append(saveFormPlayer);

  saveFormPlayer.addEventListener("click", (event) => {
    event.preventDefault();
    if (!playerForm.checkValidity()) {
      return alert('Os campos devem ser preenchidos corretamente!')
    } else {
      const playerPosition = document.querySelector(
        'input[name="positionPlayer"]:checked',
      );
      const newPlayer = {
        name: newPlayerName.value,
        number: Number(newPlayerNumber.value),
        position: playerPosition.value,
      };
      if (confirm("Deseja salvar estas informações?")) {
        players.push(newPlayer);
        cleanForm();
        displayPlayers();
        players.length <= 0
          ? disableButton(toDeletePlayer)
          : (toDeletePlayer.disabled = false);
      } else {
        alert("Informações não salvas!");
      }
    }
  });
  return playerForm;
}

//botoes
toScalePlayer.addEventListener("click", () => {
  sectionLineupForm.append(makeForm());
  disableButton(toScalePlayer);
});

toDeletePlayer.addEventListener("click", (event) => {
  event.preventDefault();
  sectionDeletePlayer.hidden = false;
});

confirmDeletePlayer.addEventListener("click", (event) => {
  event.preventDefault();
  const deletedPlayerNumber = Number(document.getElementById("deletedPlayer").value);
  const playerToDelete = findPlayersByNumber(deletedPlayerNumber);
  if (!playerToDelete) {
    alert("Jogador não encontrado!");
  } else {
    confirm(`Deseja remover o jogador ${playerToDelete.name} da escalação?`)
      ? players.splice(players.indexOf(playerToDelete), 1)
      : alert("Jogador não removido!");
    displayPlayers();
    sectionDeletePlayer.hidden = true;
  }

  console.log(players);

  if (players.length <= 0) {
    disableButton(toDeletePlayer);
    sectionLineup.innerHTML = "";
  }
});
