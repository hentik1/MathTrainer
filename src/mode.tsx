import React, { useEffect } from 'react';
import { useState } from 'react';
import './mode.css';
import { modeProps } from './interface';
import Config from './config';


function Mode({ selected }: modeProps) {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <div className={clicked ? "headerWrapper hidden" : "headerWrapper"}>
                <div className="header2">
                    {selected}
                </div>
            </div>
            <div className={clicked ? "wrapper hidden" : "wrapper"}>
                <div className="time">
                    Time Control
                </div>
                <div className="surv" onClick={handleClick}>
                    Survival
                </div>
            </div>

            {clicked ? <Config selected={selected} /> : null}
        </>
    );
}

export default Mode;