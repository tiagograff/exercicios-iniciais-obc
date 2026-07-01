function triangle() {
  let base = prompt("Valor da base");
  let height = prompt("Valor da altura");
  Number(base, height);
  return ((base * height) / 2).toFixed(2);
}

function rectangle() {
  let base = prompt("Valor da base");
  let height = prompt("Valor da altura");
  Number(base, height);
  return (base * height).toFixed(2);
}

function square() {
  let side = prompt("Valor do lado");
  Number(side);
  return (side ** 2).toFixed(2);
}

function trapeze() {
  let largerBase = prompt("Valor da base maior");
  let smallerBase = prompt("Valor da base menor");
  let height = prompt("Valor da altura");
  Number(largerBase, smallerBase, height);
  return (((largerBase + smallerBase) * height) / 2).toFixed(2);
}

function circle() {
  const PI = 3.14;
  let radius = prompt("Valor do raio");
  Number(radius);
  return PI * Math.pow(radius, 2).toFixed(2);
}

function menu() {
  return Number(
    prompt(
      "Selecione a Operação:\n1. Triângulo\n2. Retângulo\n3. Quadrado\n4. Trapézio\n5. Círuclo\n6. Sair",
    ),
  );
}

let isContinue = true;

do {
  let result;

  let option = menu();

  switch (option) {
    case 1:
      result = triangle();
      alert("O resultado é: " + result);
      break;
    case 2:
      result = rectangle();
      alert("O resultado é: " + result);
      break;
    case 3:
      result = square();
      alert("O resultado é: " + result);
      break;
    case 4:
      result = trapeze();
      alert("O resultado é: " + result);
      break;
    case 5:
      result = circle();
      alert("O resultado é: " + result);
      break;
    case 6:
      isContinue = !confirm("Confirme sua saída");
      break;
    default:
      alert("Operação inválida");
      break;
  }
} while (isContinue);
