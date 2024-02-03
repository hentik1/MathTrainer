import React, { useState } from 'react';
import './App.css';


function Statistics() {

    const [survival, setSurvival] = useState(false);
    const [time, setTime] = useState(false);
    const [total, setTotal] = useState(false);

    const [add, setAdd] = useState(false);
    const [sub, setSub] = useState(false);
    const [multi, setMulti] = useState(false);
    const [div, setDiv] = useState(false);

    const gameNodes = [survival, time, total];
    const gameNodesText = ["Survival", "Time", "Total"];
    const setGameModes = [setSurvival, setTime, setTotal];
    const [gameModeString, setGameModeString] = useState("");
    const handleToggle = (number: number) => {
        setSurvival(false);
        setTime(false);
        setTotal(false);
        setAdd(false);
        setSub(false);
        setMulti(false);
        setDiv(false);
        setGameModes[number](!gameNodes[number]);
        setGameModeString(gameNodesText[number]);
    }

    const mode = [add, sub, multi, div];
    const modeText = ["Addition", "Subtraction", "Multiplication", "Division"];
    const setMode = [setAdd, setSub, setMulti, setDiv];
    const [modeString, setModeString] = useState("");
    const handleToggle2 = (number: number) => {
        setAdd(false);
        setSub(false);
        setMulti(false);
        setDiv(false);
        setMode[number](!mode[number]);
        setModeString(modeText[number]);
    }

    const getHighScore = (gameMode: string, mode: string, difficulty: string) => localStorage.getItem(gameMode + mode + difficulty);

    return (
        <>
            <div className="stats">
                <div className="statsLayer1">
                    <div className={survival ? "statsSurvival selected" : "statsSurvival"} onClick={() => handleToggle(0)}>
                        <div>
                            Survival
                        </div>
                    </div>
                    <div className={time ? "statsTime selected" : "statsTime"} onClick={() => handleToggle(1)}>
                        <div>
                            Time
                        </div>
                    </div>
                    <div className={total ? "statsTotal selected" : "statsTotal"} onClick={() => handleToggle(2)}>
                        <div>
                            Total
                        </div>
                    </div>
                </div>
                {survival || time ?
                    <div className="statsLayer2">
                        <div className={add ? "add selected" : "add"} onClick={() => handleToggle2(0)}>
                            Addition
                        </div>
                        <div className={sub ? "sub selected" : "sub"} onClick={() => handleToggle2(1)}>
                            Subtraction
                        </div>
                        <div className={multi ? "multi selected" : "multi"} onClick={() => handleToggle2(2)}>
                            Multiplication
                        </div>
                        <div className={div ? "div selected" : "div"} onClick={() => handleToggle2(3)}>
                            Division
                        </div>
                    </div> : null
                }
                {add || sub || multi || div ?
                    <div className="viewStats">
                        <div className="viewStatsEasy">
                            Easy
                            <div>
                                Highscore: {getHighScore(gameModeString, modeString, "Easy")}
                            </div>
                        </div>
                        <div className="viewStatsMedium">
                            Medium
                            <div>
                                Highscore: {getHighScore(gameModeString, modeString, "Medium")}
                            </div>
                        </div>
                        <div className="viewStatsHard">
                            Hard
                            <div>
                                Highscore: {getHighScore(gameModeString, modeString, "Hard")}
                            </div>
                        </div>
                    </div> : null
                }
                {total ?
                    <div className="viewTotal">
                        You have solved {localStorage.getItem("TotalSolved")} problems
                    </div> : null
                }
            </div>
        </>
    );
}

export default Statistics;