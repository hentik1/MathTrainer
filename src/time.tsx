import { useState, useEffect } from 'react';
import { MenuProps, configProps } from './interface';
import { evaluate } from 'mathjs';
import { setLocalStorage, isValidKey, selectedMode, periodConvert, symbolConvert, isValidInput, backspace } from './util';
import Lost from './Lost';
import useCountdown from './util';

function Time({ difficulty, selected, hideMenu }: configProps & MenuProps) {
    const TIME = 45;
    const [started, setStarted] = useState(false);

    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [lostGame, setLostGame] = useState(false);

    const mode = selectedMode(selected);
    const [output, setOutput] = useState(mode(difficulty));

    const { secondsLeft, start, stop } = useCountdown();

    useEffect(() => {
        start(TIME);
        setStarted(true);
    }, [])

    useEffect(() => {
        if (secondsLeft <= 0 && started) {
            setLocalStorage("Time", selected, difficulty, score);
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
                    setOutput(mode(difficulty));
                    setScore((prevScore) => prevScore + 1);
                } else {
                    setInput("");
                    stop();
                    start(secondsLeft - 3);
                    setOutput(mode(difficulty));
                }
            }
        }

        document.addEventListener('keydown', handleKey, false);
        return () => {
            document.removeEventListener('keydown', handleKey, false);
        };
    },);

    const refreshGame = () => {
        start(TIME);
        setLostGame(false);
        setScore(0);
        setOutput(mode(difficulty));
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

    return (
        <>
            {lostGame ? <Lost score={score} difficulty={difficulty} hideMenu={hideMenu} selected={selected} refreshGame={refreshGame} /> :
                <div className={lostGame ? "modeWrapper hidden" : "modeWrapper"}>
                    <div style={secondsLeft > TIME / 3 ? greenTimeBox : redTimeBox} className="timer"></div>
                    <div className="output">{output}</div>
                    <div className="input">{input}</div>
                </div>}
        </>
    );
}

export default Time;