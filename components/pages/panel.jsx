"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AppLauncher({ setActiveApp }) {
  const apps = [
    { label: "Tasks", key: "tasks", emoji: "📝" },
    { label: "Calendar", key: "calendar", emoji: "📅" },
    { label: "Notes", key: "notes", emoji: "📚" },
    { label: "Focus", key: "focus", emoji: "⏱️" },
    { label: "Dashboard", key: "dashboard", emoji: "📊" },
    { label: "Earth 3D", key: "earth", emoji: "🌍" },
    { label: "Solar System", key: "system", emoji: "☀️" },
    { label: "War-game", key: "war", emoji: "🌍" },
  ];

  const [lastClick, setLastClick] = useState(null);

  // Handle double-click
  const handleDoubleClick = (key) => {
    const now = Date.now();
    if (lastClick && now - lastClick.time < 300 && lastClick.key === key) {
      // Double click detected
      setActiveApp(key);
    } else {
      setLastClick({ key, time: now });
    }
  };

  return (
    <div className="w-full h-full relative p-10 text-white">
      {apps.map((app, index) => {
        // Calculate neat grid positions
        const row = Math.floor(index / 3);
        const col = index % 3;
        const gap = 200;

        return (
          <motion.button
            key={app.key}
            onClick={() => handleDoubleClick(app.key)}
            drag
            dragConstraints={{ top: 0, left: 0, right: 1200, bottom: 600 }}
            className="
              absolute flex flex-col items-center justify-center
             hover:bg-blue-900 transition-all
              rounded-xl shadow-lg cursor-grab active:cursor-
              p-6 font-semibold text-white text-lg w-[110px] h-[110px]
              select-none
            "
            style={{
              top: 50 + row * gap,
              left: 50 + col * gap,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl mb-2">{app.emoji}</span>
            {app.label}
          </motion.button>
        );
      })}
    </div>
  );
}
