import React, { useState } from 'react';
import './App.css';
import Numpad from './Numpad';


function Settings() {

    const [toggle, setToggle] = useState(false);
    const [numpad, setNumpad] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleNumpad = () => {
        setNumpad(!numpad);
    }

    return (
        <>
            <div className={toggle ? "settings" : "settingsHidden"}>
                <div className="toggle" onClick={handleToggle}>
                    {toggle ? "×" : "|||"}
                </div>

                <div className={numpad ? "toggleNumpad selected" : "toggleNumpad"} onClick={handleNumpad}>
                    <div>
                        Numpad
                    </div>
                </div>
            </div>
            {numpad && <Numpad />}
        </>
    );
}

export default Settings;