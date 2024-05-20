import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import {
  setTotalSolved,
  isValidKey,
  backspace,
  selectedMode,
  periodConvert,
  symbolConvert,
  isValidInput,
} from "./util";
import { MenuProps, configProps } from "./interface";
import Keypad from "./Keypad";

function Endless({
  difficulty,
  difficultyText,
  selected,
  reverse,
}: configProps & MenuProps) {
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const mode = selectedMode(selected);
  const [output, setOutput] = useState(
    mode(difficulty[0], difficulty[1], reverse)
  );

  const handleQuit = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      let key = event.key;

      if (key === "Backspace") {
        setInput(backspace(input));
      } else if (isValidKey(key) && input.length < 7) {
        setInput((prevInput) => prevInput + key);
      } else if (key === "Enter" && isValidInput(input)) {
        if (evaluate(output[1]) === periodConvert(input)) {
          setInput("");
          setOutput(mode(difficulty[0], difficulty[1], reverse));
          setCorrect((prevCorrect) => prevCorrect + 1);
          setTotalSolved();
        } else {
          setInput("");
          setOutput(mode(difficulty[0], difficulty[1], reverse));
          setWrong((prevWrong) => prevWrong + 1);
        }
      }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
    };
  });

  if (!selected) {
    return null;
  }
  return (
    <>
      <>
        <div className="mt-4 w-full h-full flex flex-col items-center text-5xl">
          <div className="flex flex-row">
            <div className="p-4">
              {reverse ? (
                <>
                  {symbolConvert(output[0])} {input ? input : "?"} {output[2]}
                </>
              ) : (
                <>
                  {symbolConvert(output[0])} = {input}
                </>
              )}
            </div>
          </div>
          {localStorage.getItem("keypadState") === "true" ? <Keypad /> : null}
        </div>
        <div className="m-4 absolute top-0 left-0 text-3xl">
          <div className="p-4 text-green-400">{correct}</div>
          <div className=" p-4 text-red-400">{wrong}</div>
        </div>
        <div className="m-4 absolute top-0 right-0 text-3xl">
          <div className="m-10 hover:text-red-400" onClick={() => handleQuit()}>
            Quit
          </div>
        </div>
      </>
    </>
  );
}

export default Endless;
