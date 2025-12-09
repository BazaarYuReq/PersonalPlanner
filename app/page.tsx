"use client";

import { useState } from "react";

// Import your components
import AutoCarousel from "@/components/ui/autocarousel";
import TaskCarousel from "@/components/ui/task-carousel";
import CalendarHeatmap from "@/components/ui/calendarheatmap";
import TaskCardPreview from "@/components/ui/taskcardpreview";
import Keyboard from "@/components/ui/keyboard";
import Calendar from "@/components/pages/calendar";
import DashboardPage from "@/components/pages/dashboard";
import FocusPage from "@/components/pages/focus";
import NotesPage from "@/components/pages/notes";
import TasksPage from "@/components/pages/tasks";
import SettingsPage from "@/components/pages/settings";
import Profile from "@/components/pages/profile";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState("home");

  const apps = {
    home: <AutoCarousel />,
    tasks: <TaskCarousel />,
    heatmap: <CalendarHeatmap />,
    preview: <TaskCardPreview />,
    calendar: <Calendar />,
    notes: <NotesPage />,
    focus: <FocusPage />,
    dashboard: <DashboardPage />,
    tasks: <TasksPage />,
    settings: <SettingsPage />,
    profile: <Profile />,
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-auto z-10">
      {/* --- Cozy Room Wall Background --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-800 to-gray-600"></div>

      {/* --- Window showing City --- */}
      <div className="absolute inset-0 z-0 flex justify-center items-start pt-24 z-[25] w-[100vw] h-[100vh]">
        <div className="w-[30vw] h-[50vh] bg-black/70 border-8 border-gray-700 rounded-lg overflow-hidden relative shadow-lg">
          {/* Cityscape */}
          <div
            className="absolute inset-0 z-50 w-[30vw] h-[50vh]"
            style={{
              backgroundImage: "url('/city-night.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.8)",
            }}
          ></div>

          {/* Subtle Clouds */}
          <div
            className="absolute inset-0 z-0 w-[50vw] h-[50vh] bg-blue-900"
            style={{
              backgroundImage: "url('/clouds.png')",
              backgroundRepeat: "repeat-x",
              backgroundSize: "cover",
              animation: "moveClouds 200s linear infinite",
              opacity: 0.3,
            }}
          ></div>
        </div>
      </div>

      {/* --- Keyframes for Clouds --- */}
      <style>{`
        @keyframes moveClouds {
          0% { background-position: 0 0; }
          100% { background-position: 2000px 0; }
        }
      `}</style>

      {/* --- Fake Computer Screen --- */}
      <div
        className="
          relative z-20 bg-black w-[1440px] h-[800px]
          translate-x-[385px] translate-y-[90px]
          rounded-xl shadow-lg border-20 border-gray-800
          overflow-y-auto overflow-x-hidden
          scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600
        "
      >
        {apps[activeApp]}
      </div>

      {/* Other UI Elements */}
      <div className="bg-gray-500 w-[275px] h-[250px] translate-x-[955px] translate-y-[90px] z-20 relative"></div>
      <div className="bg-gray-700 w-[475px] h-[35px] translate-x-[855px] translate-y-[70px] rounded-md z-20 relative"></div>

      {/* --- Taskbar --- */}
      <div className="fixed bg-gray-800 w-[700px] h-[40px] right-10 bottom-10 rounded-md flex gap-4 items-center px-3 z-20">
        <button
          onClick={() => setActiveApp("home")}
          className="text-sm hover:text-blue-400"
        >
          Home
        </button>
        <button
          onClick={() => setActiveApp("calendar")}
          className="text-sm hover:text-blue-400"
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveApp("notes")}
          className="text-sm hover:text-blue-400"
        >
          Notes
        </button>
        <button
          onClick={() => setActiveApp("focus")}
          className="text-sm hover:text-blue-400"
        >
          Focus
        </button>
        <button
          onClick={() => setActiveApp("dashboard")}
          className="text-sm hover:text-blue-400"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveApp("tasks")}
          className="text-sm hover:text-blue-400"
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveApp("settings")}
          className="text-sm hover:text-blue-400"
        >
          Settings
        </button>
        <button
          onClick={() => setActiveApp("profile")}
          className="text-sm hover:text-blue-400"
        >
          Profile
        </button>
      </div>
    </div>
  );
}
