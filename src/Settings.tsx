import React, { useState } from 'react';
import './App.css';
import Statistics from './Statistics';


function Settings() {

    const [toggle, setToggle] = useState(false);
    const [stats, setStats] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return (
        <>
            <div className={toggle ? "settings" : "settingsHidden"}>
                <div className="toggle" onClick={handleToggle}>
                    {toggle ? "×" : "|||"}
                </div>

                <div className={stats ? "statsOn" : "statsOff"} onClick={() => setStats(!stats)}>
                    <div>
                        {stats ? "Statistics On" : "Statistics Off"}
                    </div>
                </div>
            </div>
            {stats ? <Statistics /> : null}
        </>
    );
}

export default Settings;
