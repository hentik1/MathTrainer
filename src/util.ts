import { randomInt } from 'mathjs';

export const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-'];

export const isValidKey = (string: string) => {
    for (let i = 0; i < validKeys.length; i++) {
        if (validKeys[i] === string) {
            return true;
        }
    }
    return false;
}

export const randomPlus = (numRange: number) => {
    let rand1 = randomInt(1, numRange);
    let rand2 = randomInt(1, numRange);

    return rand1 + " + " + rand2;
}

export const randomMinus = (numRange: number) => {
    let rand1 = randomInt(1, numRange);
    let rand2 = randomInt(1, numRange);

    return rand1 + " - " + rand2;
}

export const randomMulti = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);

    return rand1 + " * " + rand2;
}

export const randomDivide = (numRange: number) => {
    let rand1 = randomInt(2, numRange);
    let rand2 = randomInt(2, numRange);

    return rand1 + " / " + rand2;
}