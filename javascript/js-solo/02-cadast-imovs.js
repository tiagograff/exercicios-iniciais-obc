let properties = [];
let isContinue = true;

do {
  let response = prompt(
    "Selecione a Operação\n1. Salvar Imóvel\n2. Veja os Imóveis\n3. Sair",
  );
  switch (response) {
    case "1":
      let newPropety = {
        owner: prompt("Nome do proprietário"),
        numRooms: Number(prompt("Número de quartos")),
        numBath: Number(prompt("Número de banheiros")),
        hasGarage: Boolean(confirm("Tem garagem?")),
      };
      newPropety.numRooms < 0 || newPropety.numBath < 0
        ? alert("Valores negativos")
        : properties.push(newPropety);
      break;
    case "2":
      if (properties.length <= 0) {
        alert("Lista de imóveis vazia!");
      } else {
        for (let i = 0; properties.length > i; i++) {
          alert(
            "Imóveis no total: " +
              properties.length +
              "\n Imóvel atual: " +
              [i + 1] +
              "\n - Proprietário: " +
              properties[i].owner +
              "\n - Quartos: " +
              properties[i].numRooms +
              "\n - Banheiros: " +
              properties[i].numBath +
              "\n - Com garagem? " +
              properties[i].hasGarage,
          );
        }
      }
      break;
    case "3":
      isContinue = !confirm("Confirme para sair");
      break;
    default:
      alert("Opção Inválida!");
      break;
  }
} while (isContinue);

console.log(properties);
