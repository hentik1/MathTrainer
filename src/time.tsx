import { useState, useEffect } from 'react';
import { MenuProps, configProps } from './interface';
import { evaluate } from 'mathjs';
import { setLocalStorage, setTotalSolved, isValidKey, selectedMode, periodConvert, symbolConvert, isValidInput, backspace } from './util';
import Lost from './Lost';
import useCountdown from './util';

function Time({ difficulty, difficultyText, selected }: configProps & MenuProps) {
    const TIME = 45;
    const [started, setStarted] = useState(false);

    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [lostGame, setLostGame] = useState(false);

    const mode = selectedMode(selected);
    const [output, setOutput] = useState(mode(difficulty[0], difficulty[1]));

    const { secondsLeft, start, stop } = useCountdown();
    const numpad = localStorage.getItem("numpad");

    useEffect(() => {
        start(TIME);
        setStarted(true);
    }, [])

    useEffect(() => {
        if (secondsLeft <= 0 && started) {
            setLocalStorage("Time", selected, difficultyText, score);
            setLostGame(true);
            setInput("");
        }
    }, [secondsLeft])

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
                    stop();
                    start(secondsLeft + 1);
                    setOutput(mode(difficulty[0], difficulty[1]));
                    setScore((prevScore) => prevScore + 1);
                    setTotalSolved();
                } else {
                    setInput("");
                    stop();
                    start(secondsLeft - 3);
                    setOutput(mode(difficulty[0], difficulty[1]));
                }
            }
        }

        if (!lostGame) document.addEventListener('keydown', handleKey, true);
        return () => {
            document.removeEventListener('keydown', handleKey, true);
        };
    },);

    const refreshGame = () => {
        start(TIME);
        setLostGame(false);
        setScore(0);
        setOutput(mode(difficulty[0], difficulty[1]));
    }

    const greenTimeBox = {
        width: `${100 * (secondsLeft / TIME)}%`,
        height: "2rem",
        backgroundColor: "lightgreen",
        transition: "0.1s",
    }

    const redTimeBox = {
        width: `${100 * (secondsLeft / TIME)}%`,
        height: "2rem",
        backgroundColor: "red",
        transition: "0.1s",
    }
    if (!selected) {
        return null;
    }

    return (
        <>
            {lostGame ? <Lost score={score} refreshGame={refreshGame} /> :
                <div className={lostGame ? "modeWrapper hidden" : "modeWrapper"}>
                    <div style={secondsLeft > TIME / 3 ? greenTimeBox : redTimeBox} className="timer"></div>
                    <div className="output">{output}</div>
                    <div className="input">{input}</div>
                </div>}
        </>
    );
}

export default Time;