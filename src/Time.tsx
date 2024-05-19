import { useState, useEffect } from "react";
import { MenuProps, configProps } from "./interface";
import { evaluate } from "mathjs";
import {
  setLocalStorage,
  setTotalSolved,
  isValidKey,
  selectedMode,
  periodConvert,
  symbolConvert,
  isValidInput,
  backspace,
} from "./util";
import Lost from "./Lost";
import Keypad from "./Keypad";
import useCountdown from "./util";

function Time({
  difficulty,
  difficultyText,
  selected,
  reverse,
  hideMenu,
}: configProps & MenuProps) {
  const TIME = 45;

  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [lostGame, setLostGame] = useState(false);

  const mode = selectedMode(selected);
  const [output, setOutput] = useState(
    mode(difficulty[0], difficulty[1], reverse)
  );

  const { secondsLeft, start, stop } = useCountdown();

  useEffect(() => {
    start(TIME);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0 && started) {
      setLocalStorage("Time", selected, difficultyText, score);
      setLostGame(true);
      setInput("");
    }
  }, [secondsLeft]);

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
          stop();
          start(secondsLeft + 1);
          setOutput(mode(difficulty[0], difficulty[1], reverse));
          setScore((prevScore) => prevScore + 1);
          setTotalSolved();
        } else {
          setInput("");
          stop();
          start(secondsLeft - 3);
          setOutput(mode(difficulty[0], difficulty[1], reverse));
        }
      }
    };

    if (!lostGame) document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
    };
  });

  const refreshGame = () => {
    start(TIME);
    setLostGame(false);
    setScore(0);
    setOutput(mode(difficulty[0], difficulty[1], reverse));
  };

  const greenTimeBox = {
    width: `${100 * (secondsLeft / TIME)}%`,
    backgroundColor: "lightgreen",
  };
  const orangeTimeBox = {
    width: `${100 * (secondsLeft / TIME)}%`,
    backgroundColor: "orange",
  };
  const redTimeBox = {
    width: `${100 * (secondsLeft / TIME)}%`,
    backgroundColor: "red",
  };

  if (!selected) {
    return null;
  }

  return (
    <>
      {lostGame ? (
        <Lost score={score} refreshGame={refreshGame} />
      ) : (
        <>
          <div
            style={
              secondsLeft > TIME / 2
                ? greenTimeBox
                : secondsLeft > TIME / 4
                ? orangeTimeBox
                : redTimeBox
            }
            className="h-10 absolute w-full"
          ></div>
          <div
            className={
              lostGame
                ? "hidden"
                : "-z-50 w-screen h-screen flex flex-col items-center text-6xl p-10"
            }
          >
            <div className="p-4 w-50%">{symbolConvert(output[0])}</div>
            <div className="p-4 w-50%">{input}</div>
            {localStorage.getItem("keypadState") === "true" ? <Keypad /> : null}
          </div>
        </>
      )}
    </>
  );
}

export default Time;
