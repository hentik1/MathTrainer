import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { setLocalStorage, setTotalSolved, isValidKey, backspace, selectedMode, periodConvert, symbolConvert, isValidInput } from './util';
import { MenuProps, configProps } from './interface';
import Lost from './Lost';

function Survival({ difficulty, difficultyText, selected }: configProps & MenuProps) {
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [lostGame, setLostGame] = useState(false);

    const mode = selectedMode(selected);

    const [output, setOutput] = useState(mode(difficulty[0], difficulty[1]));

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            let key = event.key;

            if (key === "Backspace") {
                setInput(backspace(input));
            } else if (isValidKey(key) && input.length < 7) {
                setInput((prevInput) => prevInput + key);
            } else if (key === "Enter" && isValidInput(input)) {
                if (evaluate(symbolConvert(output)) === periodConvert(input)) {
                    setInput("");
                    setOutput(mode(difficulty[0], difficulty[1]));
                    setScore((prevScore) => prevScore + 1);
                    setTotalSolved();
                } else {
                    setLocalStorage("Survival", selected, difficultyText, score);
                    setInput("");
                    setLostGame(true);
                }
            }
        }

        if (!lostGame) document.addEventListener('keydown', handleKey, true);
        return () => {
            document.removeEventListener('keydown', handleKey, true);
        };
    },);

    const refreshGame = () => {
        setLostGame(false);
        setScore(0);
        setOutput(mode(difficulty[0], difficulty[1]));
    }
    if (!selected) {
        return null;
    }
    return (
        <>
            {lostGame ? <Lost score={score} refreshGame={refreshGame} /> :
                <div className="modeWrapper">
                    <div className="output">{output}</div>
                    <div className="input">{input}</div>
                </div>
            }
        </>
    );
}

export default Survival;
