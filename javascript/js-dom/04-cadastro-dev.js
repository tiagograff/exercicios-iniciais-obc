//botoes
const formBtn = document.getElementById("createFormBtn");
const renderBtn = document.getElementById("renderDevsBtn");
//elementos
const sectionDevs = document.querySelector(".devInformations");
const renderArea = document.getElementById("renderArea");
//listas
const devsList = [];

//funcionalidades
const cleanForm = () => {
  document
    .querySelectorAll('.devFormInfos input:not([type="radio"])')
    .forEach((input) => (input.value = ""));

  document
    .querySelectorAll('.devFormInfos input[type="radio"]')
    .forEach((input) => (input.checked = false));
};

const createRenderDevsBtn = () => {
  const renderBtn = document.createElement("button");
  renderBtn.id = "renderDevsBtn";
  renderBtn.innerText = "Mostrar Devs Cadastrados";
  renderBtn.style.maxWidth = "max-content";
  sectionDevs.appendChild(renderBtn);

  //evento para o botao
renderBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  renderArea.replaceChildren();

  const renderList = document.createElement("ul");

  devsList.forEach((dev) => {
    const devItem = document.createElement("li");
    let skills = "";
    dev.experiences.forEach((exp) => {
      skills += `\n- ${exp.tech} (${exp.experience})`;
    });

        devItem.textContent =
        `Nome: ${dev.name}${skills}`;

        renderList.appendChild(devItem);
    });

    renderArea.appendChild(renderList);
    });
};

//form
formBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  const devNameInput = document.getElementById("devName").value;
  if (devNameInput.trim() === "") {
    alert("Digite o nome do dev para criar o form");
  } else {
    const newDev = {
        name: devNameInput,
        experiences: []
    }

    devsList.push(newDev);
    const subtitle = document.querySelector(".subtitle");
    subtitle.innerText = `Informações de ${devNameInput}`;

    const form = document.querySelector(".devFormInfos");
    form.hidden = false;
    formBtn.disabled = true;

    const devInformations = document.getElementById("techsDev");

    document.getElementById("saveInfosBtn").addEventListener("click", (ev) => {
      ev.preventDefault();
      const techYearsXp = document.querySelector('input[name="xpDev"]:checked');

      const newExperience = {
        tech: devInformations.value,
        experience: techYearsXp.value,
      };
      if (form.checkVisibility()) {
        newDev.experiences.push(newExperience);
        cleanForm();
      } else {
        alert("Preencha o formuláro corretamente");
      }
      if (!sectionDevs.querySelector("#renderDevsBtn")) {
        createRenderDevsBtn();
      }
    });
  }
});
