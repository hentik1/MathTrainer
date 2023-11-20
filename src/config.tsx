import React from 'react';
import { useState } from 'react';
import './mode.css';
import Survival from './survival';
import Time from './time';
import { modeProps, GameModeProps } from './interface';

function Config({ selected, gamemode }: modeProps & GameModeProps) {

    const [clicked, setClicked] = useState(false);
    const [max, setMax] = useState(0);
    const [easy, setEasy] = useState(false);
    const [medium, setMedium] = useState(false);
    const [hard, setHard] = useState(false);

    const mode = gamemode;
    const surv = <Survival max={max} selected={selected} />;
    const time = <Time max={max} selected={selected} />;

    const handleEasy = () => {
        setMax(16);
        setEasy(true);
        setClicked(true);
    }
    const handleMedium = () => {
        setMax(99);
        setMedium(true)
        setClicked(true)
    }
    const handleHard = () => {
        setMax(999);
        setHard(true);
        setClicked(true);
    }

    return (
        <>
            <div className={clicked ? "configWrapper hidden" : "configWrapper"}>
                <div className="plusEasy" onClick={handleEasy}>
                    Easy
                </div>
                <div className="plusMedium" onClick={handleMedium}>
                    Medium
                </div>
                <div className="plusHard" onClick={handleHard}>
                    Hard
                </div>
            </div>
            {easy ? easy && mode === "survival" ? surv : time : null}
            {medium ? medium && mode === "survival" ? surv : time : null}
            {hard ? hard && mode === "survival" ? surv : time : null}
        </>
    );
}

export default Config;