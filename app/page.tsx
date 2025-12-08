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
import { Switch } from "@radix-ui/react-switch";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState("home");

  // Map names → components
  const apps = {
    home: <AutoCarousel />,
    tasks: <TaskCarousel />,
    heatmap: <CalendarHeatmap />,
    preview: <TaskCardPreview />,
    calendar: <Calendar />,
    notes: <NotesPage />,
    focus: <FocusPage />,
    dashboard: <DashboardPage />,
  };

  return (
    <div className="px-6 text-white max-w-full min-h-screen pb-32 overflow-x-auto">
      {/* --- Fake Computer Screen --- */}
      <div className="relative bg-black w-[1440px] h-[800px] translate-x-[385px] translate-y-[90px] rounded-xl overflow-hidden shadow-lg border-20 border-gray-800">
        {apps[activeApp]} {/* <-- Dynamic switching */}
      </div>
      <div className="bg-gray-500 w-[275px] h-[250px] translate-x-[970px] translate-y-[90px]"></div>
      <div className="bg-gray-700 w-[475px] h-[35px] translate-x-[870px] translate-y-[70px] rounded-md"></div>

      {/* --- App Buttons / Taskbar --- */}
      <div
        className="fixed bg-gray-800 w-[700px] h-[40px] 
                      right-10 bottom-10 rounded-md flex gap-4 items-center px-3"
      >
        <button
          onClick={() => setActiveApp("home")}
          className="text-sm hover:text-blue-400"
        >
          Home
        </button>

        <button
          onClick={() => setActiveApp("tasks")}
          className="text-sm hover:text-blue-400"
        >
          Tasks
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
        <Switch className="bg-white w-[20px] h-[20px]" />
      </div>

      {/* Keyboard */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-[900px]"></div>
    </div>
  );
}
