import React, { useState } from 'react';
import './app.css';
import Mode from './mode';

function Menu() {
    const [menu, setMenu] = useState(true);

    const updateMenu = () => {
        setMenu(!menu);
    }

    const [plus, setPlus] = useState(false);
    const [minus, setMinus] = useState(false);
    const [multi, setMulti] = useState(false);
    const [divide, setDivide] = useState(false);
    const [selected, setSelected] = useState("");

    const modes = [plus, minus, multi, divide];
    const setModes = [setPlus, setMinus, setMulti, setDivide];
    const modesText = ["Addition", "Subtraction", "Multiplication", "Division"];
    const mode = <Mode selected={selected} updateMenu={updateMenu} />;

    const handleMode = (number: number) => {
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
            {plus ? mode : null}
            {minus ? mode : null}
            {multi ? mode : null}
            {divide ? mode : null}
        </>
    );
}

export default Menu;