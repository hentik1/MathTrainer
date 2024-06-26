import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import {
  setLocalStorage,
  setTotalSolved,
  isValidKey,
  backspace,
  selectedMode,
  periodConvert,
  symbolConvert,
  isValidInput,
} from "./util";
import { MenuProps, configProps } from "./interface";
import Lost from "./Lost";
import Keypad from "./Keypad";

function Survival({
  difficulty,
  difficultyText,
  selected,
  reverse,
}: configProps & MenuProps) {
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [lostGame, setLostGame] = useState(false);

  const mode = selectedMode(selected);

  const [output, setOutput] = useState(
    mode(difficulty[0], difficulty[1], reverse)
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      let key = event.key;

      if (key === "Backspace") {
        setInput(backspace(input));
      } else if (isValidKey(key) && input.length < 7) {
        setInput((prevInput) => prevInput + key);
      } else if (key === "Enter" && isValidInput(input)) {
        if (evaluate(output[1]) === periodConvert(input)) {
          console.log(output[0]);
          setInput("");
          setOutput(mode(difficulty[0], difficulty[1], reverse));
          setScore((prevScore) => prevScore + 1);
          setTotalSolved();
        } else {
          setLocalStorage("Survival", selected, difficultyText, score);
          setInput("");
          setLostGame(true);
        }
      }
    };

    if (!lostGame) document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
    };
  });

  const refreshGame = () => {
    setLostGame(false);
    setScore(0);
    setOutput(mode(difficulty[0], difficulty[1], reverse));
  };
  if (!selected) {
    return null;
  }
  return (
    <>
      {lostGame ? (
        <Lost score={score} refreshGame={refreshGame} />
      ) : (
        <div className="mt-4 w-full h-full flex flex-col items-center text-5xl">
          <div className="flex w-full justify-center">
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
      )}
    </>
  );
}

export default Survival;
