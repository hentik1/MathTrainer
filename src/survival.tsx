import React, { useState, useEffect } from 'react';
import './mode.css';
import { evaluate } from 'mathjs';
import Lose from './lose';
import { isValidKey, randomMinus, randomPlus, randomMulti, randomDivide } from './util';
import { configProps } from './interface';

function Survival({ max, selected }: configProps) {

    const [inp, setInp] = useState('');
    const [score, setScore] = useState(0);
    const [lost, setLost] = useState(false);

    const modes = [randomPlus, randomMinus, randomMulti, randomDivide];
    const selectedText = ["Addition", "Subtraction", "Multiplication", "Division"];
    let mode = randomPlus;

    for (let i = 0; i < selectedText.length; i++) {
        if (selected == selectedText[i]) {
            mode = modes[i];
        }
    }

    const [out, setOut] = useState(mode(max));

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            let key = event.key;

            if (key === "Backspace") {
                setInp((prevInp) => prevInp !== "" ? prevInp.substring(0, prevInp.length - 1) : "");
            } else if (isValidKey(key) && inp.length < 7) {
                setInp((prevInp) => prevInp + key);
            } else if (key === "Enter" && inp !== "" && inp.length < 7) {
                if (evaluate(out) == inp) {
                    setInp("");
                    setOut(mode(max));
                    setScore((prevScore => prevScore + 1));
                } else {
                    setLost(true);
                }

            } else if (inp.length < 7) {
                setInp((prevInp) => prevInp);
            }
        }

        document.addEventListener('keydown', handleKey, true);
        return () => {
            document.removeEventListener('keydown', handleKey, true);
        };
    }, [inp]);

    return (
        <>
            <div className={lost ? "test hidden" : "test"}>
                <div className="output">{out}</div>
                <div className="input">{inp}</div>
            </div>
            <div className={lost ? "score hidden" : "score"}>{score}</div>

            {lost ? <Lose score={score} max={max} /> : null}
        </>
    );
}

export default Survival;