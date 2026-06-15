//elementos
const sectionDevs = document.querySelector(".devInformations");
const form = document.querySelector(".devFormInfos");
const inputName = document.getElementById("devName");
//botoes
const createFormBtn = document.getElementById("createFormBtn");
const saveDevInfoBtn = document.getElementById("saveInfosBtn");
//listas
const devsList = [];
//variavel
let currentDev = null;

//funcionalidades
const cleanForm = () => {
  document
    .querySelectorAll('.devFormInfos input:not([type="radio"])')
    .forEach((input) => (input.value = ""));

  document
    .querySelectorAll('.devFormInfos input[type="radio"]')
    .forEach((input) => (input.checked = false));
};

const createNewDev = () => {
  const devName = inputName.value;

  if (devName.trim() === "") {
    alert("Digite o nome do dev para criar o form");
    return;
  }

  currentDev = {
    name: devName,
    experiences: [],
  };

  devsList.push(currentDev);
};

const createRenderDevsBtn = () => {
  const renderBtn = document.createElement("button");

  renderBtn.id = "renderDevsBtn";
  renderBtn.innerText = "Mostrar Devs Cadastrados";
  renderBtn.style.maxWidth = "max-content";

  renderBtn.addEventListener("click", renderDevs);

  sectionDevs.appendChild(renderBtn);
};

const finishCurrentDev = () => {
  currentDev = null;

  inputName.value = "";

  createFormBtn.disabled = false;

  form.hidden = true;
};

//funcoes
const createForm = (devName) => {
  const subtitle = document.querySelector(".subtitle");
  subtitle.innerText = `Informações de ${devName}`;

  form.hidden = false;
  createFormBtn.disabled = true;
};

const saveInfosDev = (dev) => {
  const techYearsXp = document.querySelector('input[name="xpDev"]:checked');
  const devInformations = document.getElementById("techsDev");

  if (form.checkVisibility()) {
    dev.experiences.push({
      tech: devInformations.value,
      experience: techYearsXp.value,
    });
    cleanForm();
    finishCurrentDev();
  } else {
    alert("Preencha o formuláro corretamente");
  }
  if (!sectionDevs.querySelector("#renderDevsBtn")) {
    createRenderDevsBtn();
  }
  console.log(devsList)
};

const renderDevs = () => {
  let renderList = document.getElementById("renderList");

  if (!renderList) {
    renderList = document.createElement("ul");
    renderList.id = "renderList";
    sectionDevs.appendChild(renderList);
  }

  renderList.replaceChildren();

  devsList.forEach((dev) => {
    const devItem = document.createElement("li");
    let skills = "";
    dev.experiences.forEach((exp) => {
      skills += ` - ${exp.tech} (${exp.experience})`;
    });
    devItem.textContent = `Nome: ${dev.name}${skills}.`;

    renderList.appendChild(devItem);
  });
};
// ----
//eventos do dom
createFormBtn.addEventListener("click", () => {
  createNewDev();

  if (currentDev) {
    createForm(currentDev.name);
  }
});

saveDevInfoBtn.addEventListener("click", () => {
  !currentDev ? null : saveInfosDev(currentDev);
});
