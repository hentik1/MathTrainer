import React, { useState } from 'react';
import './App.css';
import Mode from './Mode';

function Menu() {
    const [menu, setMenu] = useState(true);

    const [plus, setPlus] = useState(false);
    const [minus, setMinus] = useState(false);
    const [multi, setMulti] = useState(false);
    const [divide, setDivide] = useState(false);
    const [selected, setSelected] = useState("");

    const modes = [plus, minus, multi, divide];
    const setModes = [setPlus, setMinus, setMulti, setDivide];
    const modesText: string[] = ["Addition", "Subtraction", "Multiplication", "Division"];

    const handleMode = (number: number) => {
        setFalse();
        setModes[number](!modes[number]);
        setSelected(modesText[number]);
        if (selected === modesText[number]) {
            setSelected("");
        }
    }

    const setFalse = () => {
        setPlus(false);
        setMinus(false);
        setMulti(false);
        setDivide(false);
    }

    const hideMenu = () => {
        setMenu(false);
    }

    return (
        <>
            <div className={menu ? "menu" : "menu hidden"}>
                <div className="contentW">
                    <div className="menuHeader">MathTrainer</div>
                    <div className={plus ? "all selected" : "all"} onClick={() => handleMode(0)}>
                        Addition +
                    </div>
                    <div className={minus ? "all selected" : "all"} onClick={() => handleMode(1)}>
                        Subtraction -
                    </div>
                    <div className={multi ? "all selected" : "all"} onClick={() => handleMode(2)}>
                        Multiplication ×
                    </div>
                    <div className={divide ? "all selected" : "all"} onClick={() => handleMode(3)}>
                        Division ÷
                    </div>
                </div>
            </div>

            <Mode selected={selected} hideMenu={hideMenu} />
        </>
    );
}

export default Menu;