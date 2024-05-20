import { useState } from "react";
import { modeProps, MenuProps } from "./interface";
import Survival from "./Survival";
import Time from "./Time";
import Endless from "./Endless";
import { findDifficulty } from "./util";
import TimeIcon from "./icons/TimeIcon";
import SurvIcon from "./icons/SurvIcon";
import EndlessIcon from "./icons/EndlessIcon";

function Mode({ selected, hideMenu }: modeProps & MenuProps) {
  const [gamemode, setGameMode] = useState("");
  const [reverse, setReverse] = useState(false);
  const [difficulty, setDifficulty] = useState([0, 0]);
  const [difficultyText, setDifficultyText] = useState("");

  const handleSurv = () => {
    hideMenu();
    setGameMode("survival");
  };

  const handleTime = () => {
    hideMenu();
    setGameMode("time");
  };

  const handleEndless = () => {
    hideMenu();
    setGameMode("endless");
  };

  const handleChecked = () => {
    setReverse(!reverse);
  };

  if (!selected) {
    return null;
  }

  const difficulties: string[] = ["Easy", "Medium", "Hard"];

  const handleDifficulty = (number: number) => {
    setDifficulty(findDifficulty(selected, difficulties[number]));
    setDifficultyText(difficulties[number]);
  };

  return (
    <>
      {gamemode === "" ? (
        <div className=" w-screen h-screen flex justify-center pl-52">
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-black">{selected}</div>
            <div className="flex flex-row justify-center rounded-xl bg-teal-900 p-1">
              <div
                className="p-2 m-1 w-28 h-24 rounded   bg-teal-950 flex flex-col items-center justify-around group cursor-pointer hover:bg-teal-700 hover:stroke-slate-200"
                onClick={handleTime}
              >
                <div className="">Time Control</div>
                <TimeIcon />
              </div>
              <div
                className="p-2 m-1 w-28 h-24  rounded-xl bg-teal-950 flex flex-col items-center justify-around group cursor-pointer hover:bg-teal-700"
                onClick={handleSurv}
              >
                <div className="">Survival</div>
                <SurvIcon />
              </div>
              <div
                className="p-2 m-1 w-28 h-24 rounded-xl bg-teal-950 flex flex-col items-center justify-around group cursor-pointer hover:bg-teal-700"
                onClick={handleEndless}
              >
                <div className="">Endless</div>
                <EndlessIcon />
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div
                className="flex flex-row cursor-pointer"
                onClick={handleChecked}
              >
                <div
                  className={reverse ? "text-2xl" : "text-2xl text-teal-700"}
                >
                  Normal
                </div>
                <svg
                  className={
                    reverse ? "duration-300" : "rotate-[180deg] duration-300"
                  }
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <div
                  className={reverse ? "text-2xl text-teal-700" : "text-2xl"}
                >
                  Reverse
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : difficultyText === "" ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <div
            className="text-4xl p-2 m-4 hover:text-green-400"
            onClick={() => handleDifficulty(0)}
          >
            Easy
          </div>
          <div
            className="text-4xl p-2 m-4 hover:text-yellow-400"
            onClick={() => handleDifficulty(1)}
          >
            Medium
          </div>
          <div
            className="text-4xl p-2 m-4 hover:text-red-400"
            onClick={() => handleDifficulty(2)}
          >
            Hard
          </div>
        </div>
      ) : gamemode === "survival" ? (
        <Survival
          difficultyText={difficultyText}
          difficulty={difficulty}
          selected={selected}
          reverse={reverse}
          hideMenu={hideMenu}
        />
      ) : gamemode === "time" ? (
        <Time
          difficultyText={difficultyText}
          difficulty={difficulty}
          selected={selected}
          reverse={reverse}
          hideMenu={hideMenu}
        />
      ) : (
        <Endless
          difficultyText={difficultyText}
          difficulty={difficulty}
          selected={selected}
          reverse={reverse}
          hideMenu={hideMenu}
        />
      )}
    </>
  );
}

export default Mode;
