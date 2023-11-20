import React, { useState, useEffect, useMemo, } from 'react';
import './mode.css';
import { evaluate } from 'mathjs';
import Lose from './lose';
import { isValidKey, selectedMode, periodConvert, symbolConvert, isValidInput } from './util';
import { configProps } from './interface';


function Survival({ max, selected }: configProps) {
    const [inp, setInp] = useState('');
    const [score, setScore] = useState(0);
    const [lost, setLost] = useState(false);

    //const mode = selectedMode(selected);

    const mode = useMemo(() => selectedMode(selected), []);

    const [out, setOut] = useState(mode(max));


    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            let key = event.key;

            if (key === "Backspace") {
                setInp((prevInp) => prevInp !== "" ? prevInp.substring(0, prevInp.length - 1) : "");
            } else if (isValidKey(key) && inp.length < 7) {
                setInp((prevInp) => prevInp + key);
            } else if (key === "Enter" && isValidInput(inp) && inp.length < 7) {
                console.log(evaluate(symbolConvert(out)));
                console.log(periodConvert(inp));
                if (evaluate(symbolConvert(out)) === periodConvert(inp)) {
                    setInp("");
                    setOut(mode(max));
                    setScore((prevScore) => prevScore + 1);
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
    },);

    return (
        <>
            <div className={lost ? "modeWrapper hidden" : "modeWrapper"}>
                <div className="output">{out}</div>
                <div className="input">{inp}</div>
            </div>

            {lost ? <Lose score={score} max={max} /> : null}
        </>
    );
}

export default Survival;