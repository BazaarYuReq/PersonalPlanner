"use client";
import { useState } from "react";
import ReturnButton from "../ui/returnbutton";

export default function Calculator({ setActiveApp }) {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setDisplay(eval(display).toString());
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => setDisplay("");
  const del = () => setDisplay((prev) => prev.slice(0, -1));

  const btn =
    "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-800/20 transition rounded-xl p-4 text-xl";

  return (
    <main>
      <ReturnButton setActiveApp={setActiveApp} />
      <div className="w-[945px] bg-black p-9 rounded-2xl text-white items-center justify-center ">
        {/* Display */}
        <div className="bg-zinc-900 rounded-xl p-4 mb-4 text-right text-2xl min-h-[56px]">
          {display || "0"}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clear}
            className={`${btn} col-span-2 bg-red-600 hover:bg-red-500`}
          >
            C
          </button>
          <button onClick={del} className={btn}>
            ⌫
          </button>
          <button onClick={() => handleClick("/")} className={btn}>
            ÷
          </button>

          <button onClick={() => handleClick("7")} className={btn}>
            7
          </button>
          <button onClick={() => handleClick("8")} className={btn}>
            8
          </button>
          <button onClick={() => handleClick("9")} className={btn}>
            9
          </button>
          <button onClick={() => handleClick("*")} className={btn}>
            ×
          </button>

          <button onClick={() => handleClick("4")} className={btn}>
            4
          </button>
          <button onClick={() => handleClick("5")} className={btn}>
            5
          </button>
          <button onClick={() => handleClick("6")} className={btn}>
            6
          </button>
          <button onClick={() => handleClick("-")} className={btn}>
            −
          </button>

          <button onClick={() => handleClick("1")} className={btn}>
            1
          </button>
          <button onClick={() => handleClick("2")} className={btn}>
            2
          </button>
          <button onClick={() => handleClick("3")} className={btn}>
            3
          </button>
          <button onClick={() => handleClick("+")} className={btn}>
            +
          </button>

          <button
            onClick={() => handleClick("0")}
            className={`${btn} col-span-2`}
          >
            0
          </button>
          <button onClick={() => handleClick(".")} className={btn}>
            .
          </button>
          <button
            onClick={calculate}
            className="bg-green-600 hover:bg-green-500 rounded-xl p-4 text-xl"
          >
            =
          </button>
        </div>
      </div>
    </main>
  );
}
