import React, { useState } from 'react';
import './menu.css';
import Settings from './settings';
import Record from './record';
import Mode from './mode';

function Menu() {
    const [plus, setPlus] = useState(false);
    const [minus, setMinus] = useState(false);
    const [multi, setMulti] = useState(false);
    const [divide, setDivide] = useState(false);
    const [selected, setSelected] = useState("");

    const handleMode = (number: number) => {
        const modes = [plus, minus, multi, divide];
        const setModes = [setPlus, setMinus, setMulti, setDivide];
        const modesText = ["Addition", "Subtraction", "Multiplication", "Division"];
        setFalse();

        for (let i = 0; i < modes.length; i++) {
            if (i === number) {
                setModes[i](!modes[i]);
                setSelected(modesText[i]);
            }
        };
    }

    const setFalse = () => {
        setPlus(false);
        setMinus(false);
        setMulti(false);
        setDivide(false);
    }

    return (
        <>
            <Settings />
            <Record />
            <div className="menu">
                <div className="contentW">
                    <div className={plus ? "all selected" : "all"} onClick={() => handleMode(0)}>
                        Addition
                    </div>
                    <div className={minus ? "all selected" : "all"} onClick={() => handleMode(1)}>
                        Subtraction
                    </div>
                    <div className={multi ? "all selected" : "all"} onClick={() => handleMode(2)}>
                        Multiplication
                    </div>
                    <div className={divide ? "all selected" : "all"} onClick={() => handleMode(3)}>
                        Division
                    </div>
                </div>
            </div>
            {plus ? <Mode selected={selected} /> : null}
            {minus ? <Mode selected={selected} /> : null}
            {multi ? <Mode selected={selected} /> : null}
            {divide ? <Mode selected={selected} /> : null}
        </>
    );
}

export default Menu;