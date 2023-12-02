import { useState, useEffect } from 'react';
import { randomInt } from 'mathjs';

const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const selectedText = ["Addition", "Subtraction", "Multiplication", "Division"];


export const difficulties = {
    Addition: {
        Easy: [1, 25],
        Medium: [10, 100],
        Hard: [20, 1000]
    },
    Subtraction: {
        Easy: [1, 25],
        Medium: [10, 100],
        Hard: [20, 1000]
    },
    Multiplication: {
        Easy: [2, 10],
        Medium: [2, 20],
        Hard: [10, 25]
    },
    Division: {
        Easy: [2, 10],
        Medium: [2, 20],
        Hard: [10, 25]
    }
}


// Same sequence as selectedText
export const difficultyMax = [
    [25, 150, 999],
    [25, 150, 999],
    [10, 15, 25],
    [10, 15, 25],
];

const difficultySums = [
    [5, 25, 100],
    [5, 25, 100],
    [10, 25, 40],
    [10, 25, 40],
]

export const findDifficulty = (string: string) => {
    for (let i = 0; i < selectedText.length; i++) {
        if (selectedText[i] === string) {
            return difficultyMax[i];
        }
    }
}

export const setLocalStorage = (mode: string, selected: string, difficulty: number, score: number) => {
    const getItem = localStorage.getItem(`${mode + selected + difficulty}`);
    const setItem = () => localStorage.setItem(`${mode + selected + difficulty}`, `${score}`);
    if (getItem === null) {
        setItem();
    }
    else if (score > parseInt(getItem)) {
        setItem();
        console.log("123");
    }
}

export const isValidKey = (string: string) => {
    for (let i = 0; i < validKeys.length; i++) {
        if (validKeys[i] === string) {
            return true;
        }
    }
    return false;
}

export const isValidInput = (string: string) => {
    for (let i = 0; i < numbers.length; i++) {
        if (string.includes(numbers[i]) && string.length <= 7) {
            return true;
        }
    }
    return false;
}

export const backspace = (string: string) => {
    return (string: string) => string !== "" ? string.substring(0, string.length - 1) : "";
}

export const periodConvert = (string: string) => {
    return parseFloat(string.replace(",", "."));
}

export const symbolConvert = (string: string) => {
    if (string.includes("÷")) {
        return string.replace("÷", "/");
    }
    return (string.replace("×", "*"));
}

export const randomPlus = (max: number) => {
    let rand1 = randomInt(2, max);
    let rand2 = randomInt(2, max);

    return rand1 + " + " + rand2;
}

export const randomMinus = (max: number) => {
    let rand1 = randomInt(2, max);
    let rand2 = randomInt(2, max);

    return rand1 + " - " + rand2;
}

export const randomMulti = (max: number) => {
    let rand1 = randomInt(2, max);
    let rand2 = randomInt(2, max);

    return rand1 + " × " + rand2;
}

export const randomDivide = (max: number) => {
    let rand1 = randomInt(2, max);
    let rand2 = randomInt(2, max);

    // generate new numbers if answer has more than two decimals or answer is 1
    while (((rand1 / rand2) % 1).toString().length > 4 || rand1 / rand2 === 1) {
        console.log("new gen");
        rand1 = randomInt(2, max);
        rand2 = randomInt(2, max);
    }
    return rand1 + " ÷ " + rand2;
}

const modes = [randomPlus, randomMinus, randomMulti, randomDivide];
export const selectedMode = (selected: string) => {
    for (let i = 0; i < selectedText.length; i++) {
        if (selected === selectedText[i]) {
            return modes[i]
        }
    }
    return modes[0];
}

export default function useCountdown() {
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 0.1);
        }, 100)

        return () => clearTimeout(timeout);

    }, [secondsLeft])

    function start(seconds: number) {
        setSecondsLeft(seconds);
    }
    function stop() {
        setSecondsLeft(0);
    }

    return { secondsLeft, start, stop };
}