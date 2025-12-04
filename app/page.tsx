"use client";

import { useState } from "react";

// Import your components
import AutoCarousel from "@/components/ui/autocarousel";
import TaskCarousel from "@/components/ui/task-carousel";
import CalendarHeatmap from "@/components/ui/calendarheatmap";
import TaskCardPreview from "@/components/ui/taskcardpreview";
import Keyboard from "@/components/ui/keyboard";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState("home");

  // Map names → components
  const apps = {
    home: <AutoCarousel />,
    tasks: <TaskCarousel />,
    heatmap: <CalendarHeatmap />,
    preview: <TaskCardPreview />,
  };

  return (
    <div className="px-6 text-white max-w-full min-h-screen pb-32 overflow-x-auto">
      {/* --- Fake Computer Screen --- */}
      <div
        className="fixed bg-gray-900 w-[700px] h-[420px] 
                      right-10 bottom-40 rounded-lg p-4 overflow-hidden shadow-lg"
      >
        {apps[activeApp]} {/* <-- Dynamic switching */}
      </div>

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
          onClick={() => setActiveApp("heatmap")}
          className="text-sm hover:text-blue-400"
        >
          Heatmap
        </button>

        <button
          onClick={() => setActiveApp("preview")}
          className="text-sm hover:text-blue-400"
        >
          Preview
        </button>
      </div>

      {/* Keyboard */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-[900px]">

      </div>
    </div>
  );
}
