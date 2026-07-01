let waitingLine = ["Frank Ocean", "Lorde", "Rosalia"];
let isContinue = true;
let currentPatient;
let response;
do {
  response = prompt(
    "Digite a Operação:\n1. Ver Lista\n2. Novo Paciente\n3. Consultar Paciente\n4. Sair",
  );
  switch (response) {
    case "1":
      waitingLine.length <= 0
        ? alert("Lista Vazia!")
        : alert("Lista de Espera:\n" + waitingLine);
      break;
    case "2":
      let newPatient = prompt("Nome do Paciente");
      waitingLine.push(newPatient);
      break;
    case "3":
      if (waitingLine.length <= 0) {
        alert("Não há pacientes para consultar");
      } else {
        currentPatient = waitingLine.shift();
        alert("Paciente " + currentPatient + " foi atendido!");
      }
      break;
    case "4":
      isContinue = !confirm("Confirme para sair");
      break;
    default:
      alert("Opção Inválida!");
      break;
  }
} while (isContinue === true);
