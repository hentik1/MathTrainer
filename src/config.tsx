import React from 'react';
import { useState } from 'react';
import './mode.css';
import Survival from './Survival';
import Time from './Time';
import { modeProps, GameModeProps, MenuProps } from './interface';
import { findDifficulty } from './util';

function Config({ selected, gamemode, hideMenu }: modeProps & GameModeProps & MenuProps) {

    const [difficulty, setDifficulty] = useState(0);

    const surv = <Survival difficulty={difficulty} selected={selected} hideMenu={hideMenu} />;
    const time = <Time difficulty={difficulty} selected={selected} hideMenu={hideMenu} />;

    if (!selected) {
        return null;
    }
    const difficulties: number[] | undefined = findDifficulty(selected)!;


    return (
        <>
            {difficulty === 0 ?
                <div className="configWrapper">
                    <div className="plusEasy" onClick={() => setDifficulty(difficulties[0])}>
                        Easy
                    </div>
                    <div className="plusMedium" onClick={() => setDifficulty(difficulties[1])}>
                        Medium
                    </div>
                    <div className="plusHard" onClick={() => setDifficulty(difficulties[2])}>
                        Hard
                    </div>
                </div >
                : gamemode === "survival" ? surv : time
            }
        </>
    );
}

export default Config;