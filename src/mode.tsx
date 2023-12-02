import { useState } from 'react';
import './mode.css';
import { modeProps, MenuProps } from './interface';
import Config from './Config';

function Mode({ selected, hideMenu }: modeProps & MenuProps) {
    const [gamemode, setGameMode] = useState("");

    const handleSurv = () => {
        hideMenu();
        setGameMode("survival");
    }

    const handleTime = () => {
        hideMenu();
        setGameMode("time");
    }

    if (!selected) {
        return null;
    }

    return (
        <>
            {gamemode === "" ?
                <>
                    <div className="headerWrapper">
                        <div className="header2">
                            {selected}
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="time" onClick={handleTime}>
                            Time
                            <br></br>
                            Control
                        </div>
                        <div className="surv" onClick={handleSurv}>
                            Survival
                        </div>
                    </div>
                </>
                : <Config selected={selected} gamemode={gamemode} hideMenu={hideMenu} />
            }
        </>
    );
}

export default Mode;