import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { configProps } from './interface';
import { evaluate } from 'mathjs';
import { isValidKey, selectedMode, periodConvert, symbolConvert, isValidInput } from './util';
import Lose from './lose';
import useCountdown from './util';


function Time({ max, selected }: configProps) {

    const [inp, setInp] = useState('');
    const [score, setScore] = useState(0);
    const [lost, setLost] = useState(false);

    const mode = selectedMode(selected);
    const [out, setOut] = useState(mode(max));

    const { secLeft, start } = useCountdown();
    const TIME = 60;
    useMemo(() => start(TIME), []);
    setTimeout(() => {
        setInp("");
        setLost(true);
    }, TIME * 1000);

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
                    setInp("");
                    setOut(mode(max));
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

    const style1 = {
        width: `${40 * (secLeft / TIME)}vw`,
        height: "6vh",
        backgroundColor: "lightgreen",
        transition: "0.5s",
    }

    const style2 = {
        width: `${40 * (secLeft / TIME)}vw`,
        height: "6vh",
        backgroundColor: "red",
        transition: "0.5s",
    }

    return (
        <>
            <div className={lost ? "modeWrapper hidden" : "modeWrapper"}>
                <div style={secLeft > TIME / 3 ? style1 : style2} className="timer"></div>
                <div className="output">{out}</div>
                <div className="input">{inp}</div>
            </div>

            {lost ? <Lose score={score} max={max} /> : null}
        </>
    );
}

export default Time;