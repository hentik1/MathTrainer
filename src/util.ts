import { useState, useEffect } from 'react';
import { randomInt } from 'mathjs';

const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const selectedText = ["Addition", "Subtraction", "Multiplication", "Division"];
const difficultiesText = ["Easy", "Medium", "Hard"];
const difficulties = {
    Addition: {
        Easy: [1, 25],
        Medium: [10, 100],
        Hard: [50, 1000]
    },
    Subtraction: {
        Easy: [1, 25],
        Medium: [10, 100],
        Hard: [50, 1000]
    },
    Multiplication: {
        Easy: [2, 10],
        Medium: [2, 15],
        Hard: [10, 25]
    },
    Division: {
        Easy: [2, 10],
        Medium: [2, 15],
        Hard: [10, 25]
    }
}

export const findDifficulty = (selected: string, difficulty: string) => {
    if (selectedText.includes(selected) && difficultiesText.includes(difficulty)) {
        return (difficulties as any)[selected][difficulty];
    } else {
        return [1, 2];
    }
}

export const setLocalStorage = (mode: string, selected: string, difficulty: string, score: number) => {
    const getItem = localStorage.getItem(`${mode + selected + difficulty}`);
    const setItem = () => localStorage.setItem(`${mode + selected + difficulty}`, `${score}`);
    if (getItem === null) {
        setItem();
    }
    else if (score > parseInt(getItem)) {
        setItem();
    }
}

export const setTotalSolved = () => {
    const getItem = localStorage.getItem("TotalSolved");
    if (getItem === null) {
        localStorage.setItem("TotalSolved", "1");
    } else {
        localStorage.setItem("TotalSolved", `${parseInt(getItem) + 1}`);
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

export const randomPlus = (min: number, max: number) => {
    let rand1 = randomInt(min, max);
    let rand2 = randomInt(min, max);

    return rand1 + " + " + rand2;
}

export const randomMinus = (min: number, max: number) => {
    let rand1 = randomInt(min, max);
    let rand2 = randomInt(min, max);

    return rand1 + " - " + rand2;
}

export const randomMulti = (min: number, max: number) => {
    let rand1 = randomInt(min, max);
    let rand2 = randomInt(min, max);

    return rand1 + " × " + rand2;
}

export const randomDivide = (min: number, max: number) => {
    let rand1 = randomInt(min, max);
    let rand2 = randomInt(min, max);

    // generate new numbers if answer has more than two decimals or answer is 1
    while (((rand1 / rand2) % 1).toString().length > 4 || rand1 / rand2 === 1) {
        rand1 = randomInt(min, max);
        rand2 = randomInt(min, max);
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