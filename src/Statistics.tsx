import React, { useState } from "react";
import SurvIcon from "./icons/SurvIcon";
import TimeIcon from "./icons/TimeIcon";

function Statistics() {
  const [survival, setSurvival] = useState(false);
  const [time, setTime] = useState(false);
  const [total, setTotal] = useState(false);

  const [add, setAdd] = useState(false);
  const [sub, setSub] = useState(false);
  const [multi, setMulti] = useState(false);
  const [div, setDiv] = useState(false);
  const mode = [add, sub, multi, div];
  const modeText = ["Addition", "Subtraction", "Multiplication", "Division"];
  const setMode = [setAdd, setSub, setMulti, setDiv];
  const [modeString, setModeString] = useState("");

  const gameModes = [survival, time, total];
  const gameModesText = ["Survival", "Time", "Total"];
  const setGameModes = [setSurvival, setTime, setTotal];
  const [gameModeString, setGameModeString] = useState("");
  const handleToggle = (number: number) => {
    setGameModes.forEach((e) => e(false));
    setMode.forEach((e) => e(false));
    setGameModes[number](!gameModes[number]);
    setGameModeString(gameModesText[number]);
  };

  const handleToggle2 = (number: number) => {
    setMode.forEach((e) => e(false));
    setMode[number](!mode[number]);
    setModeString(modeText[number]);
  };

  const getHighScore = (gameMode: string, mode: string, difficulty: string) =>
    localStorage.getItem(gameMode + mode + difficulty) || 0;

  return (
    <>
      <div className="absolute left-[22.5rem] w-[calc(100%-23rem)] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-xl p-2">
          {localStorage.getItem("TotalSolved")
            ? `You have solved ${localStorage.getItem("TotalSolved")} problems`
            : null}
        </div>
        <div className="flex flex-row p-2">
          <div
            className={survival ? "stats-options bg-teal-700" : "stats-options"}
            onClick={() => handleToggle(0)}
          >
            <SurvIcon />
            <div>Survival</div>
          </div>
          <div
            className={time ? "stats-options bg-teal-700" : "stats-options"}
            onClick={() => handleToggle(1)}
          >
            <TimeIcon />
            <div>Time Control</div>
          </div>
        </div>
        {survival || time ? (
          <div className="flex items-center justify-center text-xl p-2">
            <div>
              <div
                className={
                  add ? "stats-options2 bg-teal-700" : "stats-options2"
                }
                onClick={() => handleToggle2(0)}
              >
                <div className="flex justify-center items-center">
                  <div>Addition</div>
                </div>
              </div>
              <div
                className={
                  sub ? "stats-options2 bg-teal-700" : "stats-options2"
                }
                onClick={() => handleToggle2(1)}
              >
                Subtraction
              </div>
            </div>
            <div>
              <div
                className={
                  multi ? "stats-options2 bg-teal-700" : "stats-options2"
                }
                onClick={() => handleToggle2(2)}
              >
                Multiplication
              </div>
              <div
                className={
                  div ? "stats-options2 bg-teal-700" : "stats-options2"
                }
                onClick={() => handleToggle2(3)}
              >
                Division
              </div>
            </div>
          </div>
        ) : null}
        {add || sub || multi || div ? (
          <div className="flex flex-row m-4 text-xl">
            <div className="flex flex-row m-2">
              Easy: {getHighScore(gameModeString, modeString, "Easy")}
            </div>
            <div className="flex flex-row  m-2">
              Medium: {getHighScore(gameModeString, modeString, "Medium")}
            </div>
            <div className="flex flex-row  m-2">
              Hard: {getHighScore(gameModeString, modeString, "Hard")}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Statistics;
