import React from 'react';
import { useState } from 'react';
import './mode.css';
import Survival from './survival';
import { modeProps } from './interface';

function Config({ selected }: modeProps) {

    const [clicked, setClicked] = useState(false);
    const [max, setMax] = useState(0);
    const [easy, setEasy] = useState(false);
    const [medium, setMedium] = useState(false);
    const [hard, setHard] = useState(false);


    const handleEasy = () => {
        setMax(9);
        setEasy(true);
        setClicked(true);
    }
    const handleMedium = () => {
        setMedium(true)
        setClicked(true);
        setMax(99);
    }
    const handleHard = () => {
        setHard(true);
        setClicked(true);
        setMax(999);
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
            {easy ? <Survival max={max} selected={selected} /> : null}
            {medium ? <Survival max={max} selected={selected} /> : null}
            {hard ? <Survival max={max} selected={selected} /> : null}
        </>
    );
}

export default Config;