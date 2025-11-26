"use client";

import { useEffect, useState } from "react";

const moods = ["😀", "🙂", "😐", "😞", "😡"];

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setName(savedName);

    const savedMood = localStorage.getItem("moodToday");
    if (savedMood) {
      setMood(savedMood);
      fetchRecommendation(savedMood, savedName || "User");
    }
  }, []);

  // Removed TypeScript annotation for JSX compatibility
  const saveName = (e) => {
    const val = e.target.value;
    setName(val);
    localStorage.setItem("userName", val);
  };

  const saveMood = (m) => {
    setMood(m);
    localStorage.setItem("moodToday", m);
    fetchRecommendation(m, name || "User");
  };

  const fetchRecommendation = async (mood, name) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, name }),
      });
      const data = await res.json();
      setRecommendation(data.suggestions);
    } catch (err) {
      console.error(err);
      setRecommendation("Failed to fetch suggestions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 dark:text-white">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Name */}
      <div>
        <h2 className="font-bold mb-2">Your Name</h2>
        <input
          value={name}
          onChange={saveName}
          placeholder="Enter your name..."
          className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Mood */}
      <div>
        <h2 className="font-bold mb-2">Today's Mood</h2>
        <div className="flex gap-4">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => saveMood(m)}
              className={`text-3xl p-2 rounded ${
                mood === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg text-purple-800 dark:text-purple-200">
          {loading
            ? "Generating suggestions..."
            : recommendation || "Select your mood to get AI suggestions."}
        </div>
      </div>

      {/* Reset */}
      <div>
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}
