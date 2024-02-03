import React from 'react';
import { useState } from 'react';
import Survival from './Survival';
import Time from './Time';
import { modeProps, GameModeProps, MenuProps } from './interface';
import { findDifficulty } from './util';

function Config({ selected, gamemode, hideMenu }: modeProps & GameModeProps & MenuProps) {

    const [difficulty, setDifficulty] = useState([0, 0]);
    const [difficultyText, setDifficultyText] = useState("");

    const difficulties: string[] = ["Easy", "Medium", "Hard"];

    const handleDifficulty = (number: number) => {
        setDifficulty(findDifficulty(selected, difficulties[number]))
        setDifficultyText(difficulties[number]);
    }

    if (!selected) {
        return null;
    }

    return (
        <>
            {difficulty[0] === 0 ?
                <div className="configWrapper">
                    <div className="plusEasy" onClick={() => handleDifficulty(0)}>
                        Easy
                    </div>
                    <div className="plusMedium" onClick={() => handleDifficulty(1)}>
                        Medium
                    </div>
                    <div className="plusHard" onClick={() => handleDifficulty(2)}>
                        Hard
                    </div>
                </div >
                : gamemode === "survival" ?
                    <Survival difficultyText={difficultyText} difficulty={difficulty} selected={selected} hideMenu={hideMenu} />
                    : <Time difficultyText={difficultyText} difficulty={difficulty} selected={selected} hideMenu={hideMenu} />
            }
        </>
    );
}

export default Config;