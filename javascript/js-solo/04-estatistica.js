const average = (...numbers) => {
  const sum = numbers.reduce((accum, currentNum) => accum + currentNum, 0);
  return sum / numbers.length;
};

const weightAverage = (...entries) => {
  // se não tiver weight - null, undefined - o valor será 1 [e não irá transformar em boolean]
  const sum = entries.reduce(
    (accum, { number, weight }) => accum + number * (weight ?? 1),
    0,
  );
  const weightSum = entries.reduce(
    (accum, currentEntry) => accum + (currentEntry.weight ?? 1),
    0,
  );
  return sum / weightSum;
};

const mediam = (...numbers) => {
  const orderedNumbers = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(orderedNumbers.length / 2);
  if (orderedNumbers.length % 2 !== 0) {
    return orderedNumbers[middle];
  } else {
    const firstMedian = orderedNumbers[middle - 1];
    const secondMedian = orderedNumbers[middle];
    return average(firstMedian, secondMedian);
  }
};

const mode = (...numbers) => {
  const quantities = numbers.map((num) => [
    num,
    numbers.filter((n) => num === n).length,
  ]);
  quantities.sort((a, b) => b[1] - a[1]);
  return quantities[0][0];
};

console.log(`Média Aritmética Simples: ${average(3, 6, 10, 9)}`);
console.log(
  `Média Ponderada: ${weightAverage(
    { number: 9, weight: 3 },
    { number: 7 },
    { number: 10, weight: 1 },
  )}`,
);
console.log(`Mediana ${mediam(2, 5, 99, 4, 42, 7)}`);
console.log(`Mediana ${mediam(15, 14, 8, 7, 3)}`);
console.log(`Moda: ${mode(1, 1, 5, 4, 3, 4, 0, 5, 3, 4, 4, 2)}`);
