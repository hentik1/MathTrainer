import { useState } from "react";
import BackspaceIcon from "./icons/BackspaceIcon";
import EnterIcon from "./icons/EnterIcon";

function Keypad() {
  const handleKey = (s: string) => {
    let keyEvent = new KeyboardEvent("keydown", {
      key: s,
    });
    document.dispatchEvent(keyEvent);
    console.log(s);
  };
  return (
    <>
      {localStorage.getItem("keypadType") === "default" ? (
        <div className="z-50 bg-teal-700 flex flex-col justify-center items-center absolute top-[calc(100%-11rem)] p-2 rounded">
          <div className="flex flex-row">
            <div className="keypad-keys" onClick={() => handleKey("7")}>
              7
            </div>
            <div className="keypad-keys" onClick={() => handleKey("8")}>
              8
            </div>
            <div className="keypad-keys" onClick={() => handleKey("9")}>
              9
            </div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
            <div className="keypad-keys" onClick={() => handleKey("Backspace")}>
              <BackspaceIcon />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="keypad-keys" onClick={() => handleKey("4")}>
              4
            </div>
            <div className="keypad-keys" onClick={() => handleKey("5")}>
              5
            </div>
            <div className="keypad-keys" onClick={() => handleKey("6")}>
              6
            </div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
          </div>
          <div className="flex flex-row">
            <div className="keypad-keys" onClick={() => handleKey("1")}>
              1
            </div>
            <div className="keypad-keys" onClick={() => handleKey("2")}>
              2
            </div>
            <div className="keypad-keys" onClick={() => handleKey("3")}>
              3
            </div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
          </div>
          <div className="flex flex-row">
            <div className="keypad-keys" onClick={() => handleKey("0")}>
              0
            </div>
            <div className="keypad-keys" onClick={() => handleKey(".")}>
              .
            </div>
            <div className="keypad-keys" onClick={() => handleKey("-")}>
              -
            </div>
            <div
              className="keypad-keysHidden"
              onClick={() => handleKey("")}
            ></div>
            <div className="keypad-keys" onClick={() => handleKey("Enter")}>
              <EnterIcon />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="z-50 bg-teal-700 flex flex-col absolute top-[calc(100%-11rem)] right-[calc(100%-11rem)] p-2 rounded">
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey("7")}>
                7
              </div>
              <div className="keypad-keys" onClick={() => handleKey("8")}>
                8
              </div>
              <div className="keypad-keys" onClick={() => handleKey("9")}>
                9
              </div>
            </div>
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey("4")}>
                4
              </div>
              <div className="keypad-keys" onClick={() => handleKey("5")}>
                5
              </div>
              <div className="keypad-keys" onClick={() => handleKey("6")}>
                6
              </div>
            </div>
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey("1")}>
                1
              </div>
              <div className="keypad-keys" onClick={() => handleKey("2")}>
                2
              </div>
              <div className="keypad-keys" onClick={() => handleKey("3")}>
                3
              </div>
            </div>
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey("0")}>
                0
              </div>
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
            </div>
          </div>
          <div className="z-50 bg-teal-700 flex flex-col absolute top-[calc(100%-11rem)] left-[calc(100%-11rem)] p-2 rounded">
            <div className="flex flex-row">
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
              <div
                className="keypad-keys"
                onClick={() => handleKey("Backspace")}
              >
                <BackspaceIcon />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey("-")}>
                -
              </div>
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
            </div>
            <div className="flex flex-row">
              <div className="keypad-keys" onClick={() => handleKey(".")}>
                .
              </div>
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
            </div>
            <div className="flex flex-row">
              <div
                className="keypad-keysHidden"
                onClick={() => handleKey("")}
              ></div>
              <div className="keypad-keys" onClick={() => handleKey("Enter")}>
                <EnterIcon />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Keypad;
