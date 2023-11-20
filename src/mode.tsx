import { useState, useContext } from 'react';
import './mode.css';
import { modeProps, MenuProps } from './interface';
import Config from './config';

function Mode({ selected, updateMenu }: modeProps & MenuProps) {
    const [clicked, setClicked] = useState(false);
    const [gamemode, setGameMode] = useState("");

    const handleSurv = () => {
        setClicked(!clicked);
        updateMenu(false);
        setGameMode("survival");
    }

    const handleTime = () => {
        setClicked(!clicked);
        updateMenu(false);
        setGameMode("time");
    }



    return (
        <>
            <div className={clicked ? "headerWrapper hidden" : "headerWrapper"}>
                <div className="header2">
                    {selected}
                </div>
            </div>
            <div className={clicked ? "wrapper hidden" : "wrapper"}>
                <div className="time" onClick={handleTime}>
                    Time Control
                </div>
                <div className="surv" onClick={handleSurv}>
                    Survival
                </div>
            </div>

            {clicked ? <Config selected={selected} gamemode={gamemode} /> : null}
        </>
    );
}

export default Mode;