function menu() {
  return prompt(
    "- Escolha a Operação -\n" +
      "1. Listar Vagas\n" +
      "2. Criar Vaga\n" +
      "3. Visualizar Vaga\n" +
      "4. Inscrever Candidato\n" +
      "5. Deletar Vaga\n" +
      "6. Encerrar Programa",
  );
}

//achadores
function getIdJob(arr, id) {
  return arr.some((item) => item.id === id);
}

function getObjectJob(arr, id) {
  return arr.find((item) => item.id === id);
}

function candidatesList(arr, id) {
  const job = getObjectJob(arr, id);
  const currentList = job ? job.candidates.join(", ") : "\n- Não há candidatos";
  const final_list = "\n- Candidatos: " + currentList;
  return job.candidates.length <= 0
    ? ""
    : ("\n- Quantidade de candidatos: " + job.candidates.length).concat(
        final_list,
      );
}

function showInformation(arr, id) {
  if (!getIdJob(arr, id)) {
    alert("Este ID não esta registrado");
  } else {
    const arrDetailed = getObjectJob(arr, id);
    const qnt_candidates = arrDetailed.candidates.length;
    alert(
      "Vaga: " +
        arrDetailed.id +
        "\n- Nome: " +
        arrDetailed.name +
        "\n- Descrição: " +
        arrDetailed.description +
        "\n- Data Limite: " +
        arrDetailed.limit_date +
        candidatesList(arr, id),
    );
  }
}

//validadores
function validationId(newId) {
  let isOk = false;
  do {
    if (!getIdJob(job_openings, newId)) {
      isOk = true;
    } else {
      console.log("id existente");
      newId = Math.floor(Math.random() * 10);
    }
  } while (!isOk);
  return newId;
}

function validationDate(newDate) {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  return regexDate.test(newDate);
}

//opcao 01 - visualizar geral
function showJobs(arr) {
  if (arr.length <= 0) {
    alert("Não há vagas de trabalho no momento!");
  } else {
    arr.forEach((job) => {
      const qnt_candidates = job.candidates.length;
      alert(
        "Vaga: " +
          job.id +
          "\n- Nome: " +
          job.name +
          "\n- Quantidade de Candidatos: " +
          (qnt_candidates <= 0 ? "Sem candidatos" : qnt_candidates + "\n"),
      );
    });
  }
}

//opcao 02 - criar
function createNewJob() {
  const newJob = {
    id: validationId(Math.floor(Math.random() * 10)),
    name: prompt("Entre com o nome da vaga"),
    description: prompt("Entre com a descrição da vaga"),
    limit_date: prompt("Entre com a data limite (YYYY-MM-DD)"),
    candidates: [],
  };

  validationDate(newJob.limit_date)
    ? true && confirm("Confirma as informações?")
      ? job_openings.push(newJob)
      : alert("Informações não salvas")
    : alert("Data inválida!");
}

//opcao 03 - detalhes
function showJob(arr, jobId) {
  if (arr.length <= 0) {
    alert("Não há vagas de trabalho no momento!");
  } else {
    showInformation(arr, jobId);
  }
}
//opcao 04 - deletar
function deleteJob(arr, jobId) {
  const jobToDelete = arr.findIndex((item) => item.id === jobId);
  if (jobToDelete !== -1) {
    arr.splice(jobToDelete, 1);
  } else {
    alert("Não há vagas para deletar");
  }
}

//opcao 05 - increver
function addCandidate(arr, jobId) {
  const nameCandidate = prompt("Digite o nome do candidato");

  if (getIdJob(arr, jobId) === false) {
    alert("A vaga não existe, ou o ID esta incorreto");
  } else {
    showInformation(arr, jobId);
    if (confirm("Deseja confirmar a inscrição do candidato nesta vaga?")) {
      const currentJob = getObjectJob(arr, jobId);
      currentJob.candidates.push(nameCandidate);
    }
  }
}

//variáveis
let isContinue = true;
let currentIdOperation;
const job_openings = [];

//fluxo
do {
  let operation = menu();
  switch (operation) {
    case "1":
      //lista de todas as vagas
      showJobs(job_openings);
      break;
    case "2":
      //criar uma nova vaga
      createNewJob();
      console.log(job_openings);
      break;
    case "3":
      //infos detalhadas de um vaga x
      currentIdOperation = parseInt(
        prompt("Qual o ID da vaga que deseja ver mais informações?"),
      );
      showJob(job_openings, currentIdOperation);
      break;
    case "4":
      //add um candidato em uma vaga x
      currentIdOperation = parseInt(
        prompt("Digite o Id da vaga para registrar "),
      );
      addCandidate(job_openings, currentIdOperation);
      break;
    case "5":
      //deletar uma vaga x
      currentIdOperation = parseInt(
        prompt("Digite o Id da vaga que queira deletar "),
      );
      deleteJob(job_openings, currentIdOperation);
      break;
    case "6":
      //encerrar programa
      isContinue = !confirm("Confirme o encerramento do programa");
      break;
    default:
      //default de opção inválida
      alert("Operação Inválida");
      break;
  }
} while (isContinue);
