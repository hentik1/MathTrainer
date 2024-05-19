import React, { useState } from "react";

function KeypadConfig() {
  const [toggled, setToggled] = useState(
    localStorage.getItem("keypadState") === "true"
  );
  const handleToggled = () => {
    setToggled(!toggled);
    if (toggled) {
      localStorage.setItem("keypadState", "false");
    } else {
      localStorage.setItem("keypadState", "true");
    }
  };
  return (
    <div className="absolute left-[22.5rem] w-[calc(100%-23rem)] h-full flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <div
          onClick={handleToggled}
          className={toggled ? "p-2 text-3xl bg-teal-700" : "p-2 text-3xl"}
        >
          On
        </div>
        <div
          onClick={handleToggled}
          className={toggled ? "p-2 text-3xl" : "p-2 text-3xl bg-teal-700"}
        >
          Off
        </div>
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
}

export default KeypadConfig;
