import React, { useState, useEffect } from 'react';
import { randomInt } from 'mathjs';

const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let prev = 0;

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
        if (string.includes(numbers[i])) {
            return true;
        }
    }
    return false;
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

export const randomPlus = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);
    while (rand1 + rand2 === prev) {
        rand1 = randomInt(2, numRange);
        rand2 = randomInt(2, numRange);
    }

    prev = rand1 + rand2;
    console.log(prev);
    return rand1 + " + " + rand2;
}

export const randomMinus = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);

    return rand1 + " - " + rand2;
}

export const randomMulti = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);

    return rand1 + " × " + rand2;
}

export const randomDivide = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);

    // generate new numbers if answer has more than two decimals or answer is 1
    while (((rand1 / rand2) % 1).toString().length > 4 || rand1 / rand2 === 1) {
        console.log("new gen");
        rand1 = randomInt(2, numRange);
        rand2 = randomInt(2, numRange);
    }
    return rand1 + " ÷ " + rand2;
}

export const selectedMode = (selected: string) => {
    const modes = [randomPlus, randomMinus, randomMulti, randomDivide];
    const selectedText = ["Addition", "Subtraction", "Multiplication", "Division"];

    for (let i = 0; i < selectedText.length; i++) {
        if (selected === selectedText[i]) {
            return modes[i]
        }
    }
    return modes[0];
}

export default function useCountdown() {
    const [secLeft, setSecLeft] = useState(0);

    useEffect(() => {
        if (secLeft <= 0) return;

        const timeout = setTimeout(() => {
            setSecLeft(secLeft - 1);
        }, 1000)

        return () => clearTimeout(timeout);

    }, [secLeft])

    function start(sec: number) {
        setSecLeft(sec);
    }

    return { secLeft, start };
}