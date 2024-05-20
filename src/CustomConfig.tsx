import { useState } from "react";
import { randomCustom, validateCustom } from "./util";

function CustomConfig() {
  const [add, setAdd] = useState(false);
  const [addValue, setAddValue] = useState([1, 1]);
  const [sub, setSub] = useState(false);
  const [subValue, setSubValue] = useState([1, 1]);
  const [multi, setMulti] = useState(false);
  const [multiValue, setMultiValue] = useState([1, 1]);
  const [div, setDiv] = useState(false);
  const [divValue, setDivValue] = useState([1, 1]);
  const operators = [add, sub, multi, div];
  const setOperators = [setAdd, setSub, setMulti, setDiv];
  const handleOperator = (n: number) => {
    setOperators[n](!operators[n]);
  };

  const [min, setMin] = useState(1);
  const handleMin = (n: string) => {
    setMin(parseInt(n));
  };

  const [max, setMax] = useState(1);
  const handleMax = (n: string) => {
    setMax(parseInt(n));
  };

  const [terms, setTerms] = useState(2);
  const handleTerms = (n: string) => {
    setTerms(parseInt(n));
  };

  const [output, setOutput] = useState("");
  const handleExample = () => {
    if (validateCustom(add, sub, multi, div, min, max, terms)) {
      setOutput(randomCustom(add, sub, multi, div, min, max, terms));
    }
  };

  return (
    /*
    <div className="w-full h-full flex flex-col content-center justify-center text-3xl">
      <div className="flex flex-col  justify-center content-center">
        <div className="flex flex-col justify-center content-center">
          <div className="flex flex-row mx-auto">
            Addition
            <div
              className={add ? "w-10 bg-red-500 hover:bg-red-100" : "w-10 bg-white hover:bg-red-100"}
              onClick={() => handleOperator(0)}
            ></div>
          </div>
          <div className="flex flex-row mx-auto">
            Subtraction
            <div
              className={sub ? "subBox on" : "subBox"}
              onClick={() => handleOperator(1)}
            ></div>
          </div>
          <div className="flex flex-row mx-auto">
            Multiplication
            <div
              className={multi ? "multiBox on" : "multiBox"}
              onClick={() => handleOperator(2)}
            ></div>
          </div>
          <div className="flex flex-row mx-auto">
            Division
            <div
              className={div ? "divBox on" : "divBox"}
              onClick={() => handleOperator(3)}
            ></div>
          </div>
        </div>
        <div className="flex flex-row justify-center content-center">
          Minimum {min} and Maximum {max}
          <input
            name="min"
            type="range"
            defaultValue="1"
            min="1"
            max="1000"
            onInput={(evt) => handleMin((evt.target as HTMLInputElement).value)}
          />
          <input
            name="max"
            type="range"
            defaultValue="1"
            min="1"
            max="1000"
            onInput={(evt) => handleMax((evt.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex flex-row justify-center content-center">
          Number of terms {terms}
          <input
            name="numTerms"
            type="range"
            defaultValue="2"
            min="2"
            max="9"
            onInput={(evt) =>
              handleTerms((evt.target as HTMLInputElement).value)
            }
          />
        </div>

        <button onClick={() => handleExample()}>Generate example</button>
        <button>Start</button>
      </div>
      <div className="flex flex-row justify-center content-center">
        {output}
      </div>
    </div> */
    <div className="w-svw h-svh flex flex-col items-center justify-center text-3xl pl-52">
      <div>
        Coming soon
      </div>
    </div>
  );
}

export default CustomConfig;
