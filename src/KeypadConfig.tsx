import React, { useState } from "react";
import Keypad from "./Keypad";

function KeypadConfig() {
  const [toggled, setToggled] = useState(
    localStorage.getItem("keypadState") === "true"
  );

  const [type, setType] = useState(
    localStorage.getItem("keypadType") === "split"
  );

  const handleToggled = () => {
    setToggled(!toggled);
    if (toggled) {
      localStorage.setItem("keypadState", "false");
    } else {
      localStorage.setItem("keypadState", "true");
    }
  };

  const handleType = () => {
    setType(!type);
    if (type) {
      localStorage.setItem("keypadType", "default");
    } else {
      localStorage.setItem("keypadType", "split");
    }
  };
  return (
    <div className="absolute left-[22.5rem] w-[calc(100%-23rem)] h-full flex flex-col items-center justify-center">
      <div className="flex flex-row cursor-pointer">
        <div
          onClick={handleToggled}
          className={toggled ? "p-2 text-3xl bg-teal-700 rounded" : "p-2 text-3xl rounded"}
        >
          On
        </div>
        <div
          onClick={handleToggled}
          className={toggled ? "p-2 text-3xl rounded" : "p-2 text-3xl bg-teal-700 rounded"}
        >
          Off
        </div>
      </div>
      <div className="flex flex-row cursor-pointer m-8">
        <div
          onClick={handleType}
          className={type ? "p-2 text-3xl rounded" : "p-2 text-3xl bg-teal-700 rounded"}
        >
          Default
        </div>
        <div
          onClick={handleType}
          className={type ? "p-2 text-3xl bg-teal-700 rounded" : "p-2 text-3xl rounded"}
        >
          Split
        </div>
      </div>
      {toggled ? <Keypad /> : null}
    </div>
  );
}

export default KeypadConfig;
