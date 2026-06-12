//botoes
const formBtn = document.getElementById("createFormBtn");

//funcionalidades
const cleanForm = () => {
  document
    .querySelectorAll('.devFormInfos input:not([type="radio"])')
    .forEach((input) => (input.value = ""));

  document
    .querySelectorAll('.devFormInfos input[type="radio"]')
    .forEach((input) => (input.checked = false));
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
      experience: [],
    };
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
        newDev.experience.push(newExperience);
        cleanForm()
      }
    });
  }
});
