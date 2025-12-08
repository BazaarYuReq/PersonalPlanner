"use client";
import { useState, useEffect, useRef } from "react";

export default function FocusPage() {
  const [mode, setMode] = useState("focus"); // focus | short | long
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const times = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function switchMode(m) {
    setMode(m);
    setSeconds(times[m]);
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  function format(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div className="dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Focus Timer</h1>

      {/* Mode Switcher */}
      <div className="flex gap-4 mb-6">
        {["focus", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 dark:text-white"
            }`}
          >
            {m === "focus"
              ? "Focus"
              : m === "short"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="text-7xl font-bold text-center mb-6">
        {format(seconds)}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => switchMode(mode)}
          className="px-6 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
