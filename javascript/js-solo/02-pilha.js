let cheap = ["carta 1", "carta 2", "carta 3"];
let response;
let isContinue = true;

do {
  response = prompt(
    "Escolha a Operação:\n1.Adicionar uma carta\n2.Puxar uma carta\n3.Sair\n Quantidade de cartas: " +
      cheap.length,
  );
  switch (response) {
    case "1":
      let newCard = prompt("Nome da carta");
      cheap.unshift(newCard);
      break;
    case "2":
      if (cheap.length > 0) {
        let currentCard = cheap.shift();
        alert("A carta " + currentCard + " foi retirada");
      } else {
        alert("Não há cartas para retirar");
      }
      break;
    case "3":
      isContinue = !confirm("Confirme a tua saida");
      break;
    default:
      alert("Opção Inválida");
      break;
  }
} while (isContinue);
