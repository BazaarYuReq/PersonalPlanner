"use client";

import { useState, useEffect, useRef } from "react";

export default function FocusPage() {
  // Timer System
  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Gamification System
  const [xp, setXP] = useState(0);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastSession, setLastSession] = useState("");

  const times = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  // Load Gamification Data
  useEffect(() => {
    const savedXP = localStorage.getItem("xp");
    const savedCoins = localStorage.getItem("coins");
    const savedStreak = localStorage.getItem("streak");
    const savedLast = localStorage.getItem("lastSession");

    if (savedXP) setXP(parseInt(savedXP));
    if (savedCoins) setCoins(parseInt(savedCoins));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLast) setLastSession(savedLast);
  }, []);

  // Save Gamification Data
  function saveGamification(xpVal, coinVal, streakVal, dateVal) {
    localStorage.setItem("xp", xpVal);
    localStorage.setItem("coins", coinVal);
    localStorage.setItem("streak", streakVal);
    localStorage.setItem("lastSession", dateVal);
  }

  // Timer Logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            handleSessionComplete();
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

  // Session Completion Handling
  function handleSessionComplete() {
    const today = new Date().toLocaleDateString();

    let newXP = xp + 30;
    let newCoins = coins + 10;
    let newStreak = streak;

    // Streak Logic
    if (lastSession !== today) newStreak += 1;

    setXP(newXP);
    setCoins(newCoins);
    setStreak(newStreak);
    setLastSession(today);

    saveGamification(newXP, newCoins, newStreak, today);

    alert(`🎉 Session Complete! +30 XP, +10 Coins, 🔥 Streak: ${newStreak}`);
  }

  function format(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  // Circular Timer % for ring animation
  const percent = (seconds / times[mode]) * 100;

  return (
    <div className="dark:text-white text-center px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">⏱️ Focus Mode</h1>

      {/* XP / Coins / Streak */}
      <div className="flex justify-center gap-6 mb-10">
        <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <p className="text-lg font-semibold">⭐ XP</p>
          <p className="text-2xl font-bold">{xp}</p>
        </div>

        <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <p className="text-lg font-semibold">💰 Coins</p>
          <p className="text-2xl font-bold">{coins}</p>
        </div>

        <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <p className="text-lg font-semibold">🔥 Streak</p>
          <p className="text-2xl font-bold">{streak} days</p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        {["focus", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-5 py-2 rounded-xl transition-all ${
              mode === m
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-300"
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

      {/* Circular Timer */}
      <div className="relative w-60 h-60 mx-auto mb-8">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="#333"
            strokeWidth="15"
            fill="none"
          />
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="#3b82f6"
            strokeWidth="15"
            fill="none"
            strokeDasharray="628"
            strokeDashoffset={(628 * (100 - percent)) / 100}
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold">
          {format(seconds)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-8 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => switchMode(mode)}
          className="px-8 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
