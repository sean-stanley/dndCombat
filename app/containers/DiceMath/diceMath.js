import { countBy } from 'lodash';

function diceMath(diceString = '1d4') {
  const [diceNum, dieSize] = diceString.split('d');
  return {
    minimum: parseInt(diceNum, 10),
    maximum: diceNum * dieSize,
    resultCount: dieSize ** diceNum,
    getAverage,
    getResults,
    getResultCounts,
    getProbability,
    getProbabilityGreatherThan,
    getProbabilityLessThan,
    getUniqueResults,
  };

  // Public Methods
  function getAverage() {
    const min = 1 * diceNum;
    const max = diceNum * dieSize;
    return (max + min) / 2;
  }

  function getResults() {
    const results = [];

    function recursiveResultsGenerator(previousResult = 0, depth = 1) {
      return function (result) {
        // console.log(`die ${depth}/${diceNum} -- result ${result}/${dieSize}`);
      //  if (dieCounter >= dieSize ** diceNum) {
        if (depth == diceNum) {
          results.push(previousResult + result);
        } else {
          const nextDepth = depth + 1;
          arrayOfNumbers(dieSize).forEach(recursiveResultsGenerator(result + previousResult, nextDepth));
        }
      };
    }

    arrayOfNumbers(dieSize).forEach(recursiveResultsGenerator());
    this.results = results;
    return this;
  }

  function getResultCounts() {
    if (this.results) {
      return countBy(this.results, Math.floor);
    }
    const results = this.getResults().results;
    return countBy(results, Math.floor);
  }

  function getUniqueResults() {
    return [...Array((this.maximum - this.minimum) + 1).keys()].map((v) => v + this.minimum);
  }

  function getProbability(firstNumber, secondNumber) {
    const results = this.results || this.getResults().results;
    if (!secondNumber) {
      return results.reduce((t, r) => r === firstNumber ? t + 1 : t, 0) / results.length;
    }
    return results.reduce((t, r) => r >= firstNumber && r <= secondNumber ? t + 1 : t, 0) / results.length;
  }

  function getProbabilityGreatherThan(min) {
    return this.getProbability(min, this.maximum);
  }

  function getProbabilityLessThan(max) {
    return this.getProbability(this.minimum, max);
  }
}

function arrayOfNumbers(end, start = 1) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
// console.log(arrayOfNumbers(6));
console.log(diceMath('8d6').getProbabilityGreatherThan(30));

console.log(diceMath('8d6').getProbabilityLessThan(20));


export default diceMath;
