import { useState, useEffect } from 'react';
import './mode.css';
import { evaluate } from 'mathjs';
import { setLocalStorage, isValidKey, backspace, selectedMode, periodConvert, symbolConvert, isValidInput } from './util';
import { MenuProps, configProps } from './interface';
import Lost from './Lost';
import Numpad from './Numpad';


function Survival({ difficulty, selected, hideMenu }: configProps & MenuProps) {
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [lostGame, setLostGame] = useState(false);

    const mode = selectedMode(selected);

    const [output, setOutput] = useState(mode(difficulty));

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
                    setOutput(mode(difficulty));
                    setScore((prevScore) => prevScore + 1);
                } else {
                    setLocalStorage("Survival", selected, difficulty, score);
                    setInput("");
                    setLostGame(true);
                }
            }
        }

        document.addEventListener('keydown', handleKey, true);
        return () => {
            document.removeEventListener('keydown', handleKey, true);
        };
    },);

    const refreshGame = () => {
        setLostGame(false);
        setScore(0);
        setOutput(mode(difficulty));
    }
    return (
        <>
            {lostGame ? <Lost score={score} difficulty={difficulty} hideMenu={hideMenu} selected={selected} refreshGame={refreshGame} /> :
                <div className="modeWrapper">
                    <div className="output">{output}</div>
                    <div className="input">{input}</div>
                </div>}
        </>
    );
}

export default Survival;