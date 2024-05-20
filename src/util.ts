import { useState, useEffect } from "react";
import { randomInt } from "mathjs";

const validKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ",",
  ".",
  "-",
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const selectedText = ["Addition", "Subtraction", "Multiplication", "Division"];
const difficultiesText = ["Easy", "Medium", "Hard"];
const difficulties = {
  Addition: {
    Easy: [1, 25],
    Medium: [10, 100],
    Hard: [50, 1000],
  },
  Subtraction: {
    Easy: [1, 25],
    Medium: [10, 100],
    Hard: [50, 1000],
  },
  Multiplication: {
    Easy: [2, 10],
    Medium: [2, 15],
    Hard: [10, 25],
  },
  Division: {
    Easy: [2, 10],
    Medium: [2, 25],
    Hard: [10, 50],
  },
};

export const findDifficulty = (selected: string, difficulty: string) => {
  if (
    selectedText.includes(selected) &&
    difficultiesText.includes(difficulty)
  ) {
    return (difficulties as any)[selected][difficulty];
  } else {
    return [1, 2];
  }
};

export const setLocalStorage = (
  mode: string,
  selected: string,
  difficulty: string,
  score: number
) => {
  const getItem = localStorage.getItem(`${mode + selected + difficulty}`);
  const setItem = () =>
    localStorage.setItem(`${mode + selected + difficulty}`, `${score}`);
  if (getItem === null) {
    setItem();
  } else if (score > parseInt(getItem)) {
    setItem();
  }
};

export const setTotalSolved = () => {
  const getItem = localStorage.getItem("TotalSolved");
  if (getItem === null) {
    localStorage.setItem("TotalSolved", "1");
  } else {
    localStorage.setItem("TotalSolved", `${parseInt(getItem) + 1}`);
  }
};

export const isValidKey = (string: string) => {
  for (let i = 0; i < validKeys.length; i++) {
    if (validKeys[i] === string) {
      return true;
    }
  }
  return false;
};

export const isValidInput = (string: string) => {
  for (let i = 0; i < numbers.length; i++) {
    if (string.includes(numbers[i]) && string.length <= 7) {
      return true;
    }
  }
  return false;
};

export const backspace = (string: string) => {
  return (string: string) =>
    string !== "" ? string.substring(0, string.length - 1) : "";
};

export const periodConvert = (string: string) => {
  return parseFloat(string.replace(",", "."));
};

export const symbolConvert = (string: string) => {
  if (string.includes("/")) {
    return string.replace("/", "÷");
  }
  return string.replace("*", "×");
};

export const randomPlus = (min: number, max: number, reverse: boolean) => {
  let rand1 = randomInt(min, max);
  let rand2 = randomInt(min, max);
  let returned = [];
  if (reverse) {
    returned[0] = rand1 + " + ";
    returned[2] = `= ${rand1 + rand2}`;
    returned[1] = `${rand2}`;
  } else {
    returned[0] = rand1 + " + " + rand2;
    returned[1] = `${rand1} + ${rand2}`;
  }
  return returned;
};

export const randomMinus = (min: number, max: number, reverse: boolean) => {
  let rand1 = randomInt(min, max);
  let rand2 = randomInt(min, max);
  let returned = [];
  if (reverse) {
    returned[0] = rand1 + " - ";
    returned[2] = `= ${rand1 - rand2}`;
    returned[1] = `${rand2}`;
  } else {
    returned[0] = rand1 + " - " + rand2;
    returned[1] = `${rand1} - ${rand2}`;
  }
  return returned;
};

export const randomMulti = (min: number, max: number, reverse: boolean) => {
  let rand1 = randomInt(min, max);
  let rand2 = randomInt(min, max);
  let returned = [];
  if (reverse) {
    returned[0] = rand1 + " * ";
    returned[2] = `= ${rand1 * rand2}`;
    returned[1] = `${rand2}`;
  } else {
    returned[0] = rand1 + " * " + rand2;
    returned[1] = `${rand1} * ${rand2}`;
  }
  return returned;
};

export const randomDivide = (min: number, max: number, reverse: boolean) => {
  let rand1 = randomInt(min, max);
  let rand2 = randomInt(min, max);

  // generate new numbers if answer has more than two decimals or answer is 1
  while (((rand1 / rand2) % 1).toString().length > 4 || rand1 / rand2 === 1) {
    rand1 = randomInt(min, max);
    rand2 = randomInt(min, max);
  }
  let returned = [];
  if (reverse) {
    returned[0] = rand1 + " / ";
    returned[2] = `= ${rand1 / rand2}`;
    returned[1] = `${rand2}`;
  } else {
    returned[0] = rand1 + " / " + rand2;
    returned[1] = `${rand1} / ${rand2}`;
  }
  return returned;
};

const modes = [randomPlus, randomMinus, randomMulti, randomDivide];
export const selectedMode = (selected: string) => {
  for (let i = 0; i < selectedText.length; i++) {
    if (selected === selectedText[i]) {
      return modes[i];
    }
  }
  return modes[0];
};

export default function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 0.02);
    }, 20);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  function start(seconds: number) {
    setSecondsLeft(seconds);
  }
  function stop() {
    setSecondsLeft(0);
  }

  return { secondsLeft, start, stop };
}

export const validateCustom = (
  add: boolean,
  sub: boolean,
  multi: boolean,
  div: boolean,
  min: number,
  max: number,
  terms: number
) => {
  const operators = [add, sub, multi, div];
  let sum = 0;
  for (let i = 0; i < operators.length; i++) {
    if (operators[i]) sum++;
  }
  if (sum === 0) return false;
  if (min > max) return false;
  if (terms < 2 || terms > 9) return false;
  return true;
};

export const randomCustom = (
  add: boolean,
  sub: boolean,
  multi: boolean,
  div: boolean,
  min: number,
  max: number,
  terms: number
) => {
  let output = "";
  const customOperators = ["+", "-", "×", "÷"];
  const operators: boolean[] = [add, sub, multi, div];

  for (let i = 0; i < terms; i++) {
    let randOperator = randomInt(0, 4);
    while (!operators[randOperator]) {
      randOperator = randomInt(0, 4);
    }
    output += randomInt(min, max + 1);
    // If not last element add random operator
    if (i < terms - 1) {
      output += customOperators[randOperator];
    }
  }
  return output;
};
