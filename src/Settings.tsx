import React, { useState } from "react";
import Statistics from "./Statistics";
import { settingsProps } from "./interface";
import KeypadConfig from "./KeypadConfig";

function Settings(settings: settingsProps) {
  const [stats, setStats] = useState(false);

  //Localstorage må huske valget endres senere
  const [keypad, setKeypad] = useState(true);

  const handleKeypad = () => {
    setStats(false);
    setKeypad(!keypad);
  };
  const handleStats = () => {
    setKeypad(false);
    setStats(!stats);
  };

  return (
    <>
      <div
        className={
          settings
            ? "absolute left-52 top-0 p-1 bg-teal-950 h-full w-36 flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <div
          className={
            stats
              ? "p-1 m-2 text-xl bg-teal-700 rounded duration-300 hover:cursor-pointer translate-x-2"
              : "p-1 m-2 text-xl bg-teal-900 rounded hover:translate-x-2 hover:cursor-pointer duration-300"
          }
          onClick={() => handleStats()}
        >
          <div className="p-1">View Stats</div>
        </div>

        <div
          className={
            keypad
              ? "p-1 m-2 text-xl bg-teal-700 rounded duration-300 hover:cursor-pointer translate-x-2"
              : "p-1 m-2 text-xl bg-teal-900 rounded hover:translate-x-2 hover:cursor-pointer duration-300"
          }
          onClick={() => handleKeypad()}
        >
          <div className="p-1">Keypad</div>
        </div>
      </div>
      {stats ? <Statistics /> : null}
      {keypad ? <KeypadConfig /> : null}
    </>
  );
}

export default Settings;
