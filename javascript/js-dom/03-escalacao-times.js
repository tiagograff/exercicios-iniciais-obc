const toScaleButton = document.querySelector(".submitButton");
const sectionLineupForm = document.querySelector(".lineupForm");
const playerPositionForm = document.createElement("div");

const playersPositionsList = [
  "Atacante",
  "Zagueiro",
  "Goleiro",
  "Lateral",
  "Meio-Campo",
];

const makeInput = (inputType, inputName) => {
  const input = document.createElement("input");
  input.type = inputType;
  input.name = inputName;
  return input;
};

const makeLabel = (forInput, labelText) => {
  const label = document.createElement("label");
  label.forHtml = forInput;
  label.textContent = labelText;
  return label;
};

const inputRadio = (arr, nameInputRadio) => {
  const div = document.createElement("div");
  for (let i = 0; arr.length > i; i++) {
    const info = arr[i];
    const input = makeInput("radio", nameInputRadio);
    input.value = +info;
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
  const newPlayer = inputRadio(playersPositionsList, "postionPlayers");
  playerPositionForm.append(newPlayer);

  return newPlayer;
}

toScaleButton.addEventListener("click", () => {
  sectionLineupForm.append(makeForm());
  toScaleButton.disabled = "true";
});
