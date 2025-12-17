"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap from "@/components/ui/calendarheatmap";
import ReturnButton from "@/components/ui/returnbutton";

const moods = ["💖", "😊", "😐", "😞", "😭"];

export default function ProfileSettingsPage({ setActiveApp }) {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [xp, setXp] = useState(120);
  const [level, setLevel] = useState(3);
  const [streak, setStreak] = useState(7);

  // Load from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedMood = localStorage.getItem("moodToday");
    const savedXP = localStorage.getItem("userXP");
    const savedLevel = localStorage.getItem("userLevel");
    const savedStreak = localStorage.getItem("userStreak");

    if (savedName) setName(savedName);
    if (savedMood) setMood(savedMood);
    if (savedXP) setXp(Number(savedXP));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedStreak) setStreak(Number(savedStreak));

    if (savedMood) fetchRecommendation(savedMood, savedName || "User");
  }, []);

  const saveName = (e) => {
    setName(e.target.value);
    localStorage.setItem("userName", e.target.value);
  };

  const saveMood = (m) => {
    setMood(m);
    localStorage.setItem("moodToday", m);
    fetchRecommendation(m, name || "User");

    setXp((prev) => {
      const newXP = prev + 10;
      localStorage.setItem("userXP", newXP);
      return newXP;
    });

    if (xp % 100 === 0) {
      setLevel((prev) => {
        const newLevel = prev + 1;
        localStorage.setItem("userLevel", newLevel);
        return newLevel;
      });
    }
  };

  const fetchRecommendation = async (mood, username) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, name: username }),
      });

      const data = await res.json();
      setRecommendation(data.suggestions);
    } catch {
      setRecommendation("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <main>
      {/* HEADER */} <ReturnButton setActiveApp={setActiveApp} />
      <div className="max-w-4xl mx-auto p-6 space-y-10 text-gray-900 dark:text-white h-screen overflow-y-scroll">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          Profile & Settings
        </h1>

        {/* PROFILE CARD */}
        <section className="bg-pink-100/60 dark:bg-pink-900/40 p-6 rounded-3xl shadow-lg border border-pink-200/50 backdrop-blur">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 shadow-inner" />

            <div>
              <h2 className="text-2xl font-bold">{name || "Your Name"}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Level {level} • {xp} XP • 🔥 {streak}-day streak
              </p>
            </div>
          </div>
        </section>

        {/* NAME SETTING */}
        <section className="bg-blue-100/50 dark:bg-blue-900/40 p-6 rounded-3xl shadow border border-blue-200/40">
          <h2 className="text-xl font-bold mb-2">Your Name</h2>
          <input
            value={name}
            onChange={saveName}
            placeholder="Enter your name..."
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-gray-800 focus:ring-2 ring-blue-300 outline-none"
          />
        </section>

        {/* MOOD SELECTOR */}
        <section className="bg-purple-100/50 dark:bg-purple-900/40 p-6 rounded-3xl shadow border border-purple-200/40">
          <h2 className="text-xl font-bold mb-2">Today's Mood</h2>

          <div className="flex gap-4 mb-4">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => saveMood(m)}
                className={`text-4xl p-2 rounded-2xl transition-all ${
                  mood === m
                    ? "bg-purple-400 text-white shadow-lg scale-110"
                    : "bg-white/70 dark:bg-gray-800"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* AI SUGGESTION */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800 border border-purple-200/40">
            {loading ? "✨ Generating advice..." : recommendation}
          </div>
        </section>

        {/* CALENDAR HEATMAP */}
        <section className="bg-pink-50/80 dark:bg-pink-900/30 p-6 rounded-3xl shadow border border-pink-200/40">
          <h2 className="text-xl font-bold mb-4">Activity Heatmap</h2>
          <CalendarHeatmap />
        </section>

        {/* RESET BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={resetAll}
            className="px-6 py-3 text-white bg-red-400 rounded-2xl shadow hover:bg-red-500 transition"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </main>
  );
}
