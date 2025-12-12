"use client";

import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 bg-gray-700 text-white rounded bg-blue-950"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
