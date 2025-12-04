"use client";
import { useState } from "react";

import Profile from "@/components/apps/Profile";
import Dashboard from "@/components/apps/Dashboard";
import Tasks from "@/components/apps/Tasks";
import Notes from "@/components/apps/Notes";
import Calendar from "@/components/apps/Calendar";
import Focus from "@/components/apps/Focus";
import Settings from "@/components/apps/Settings";

export default function ComputerScreen() {
  const [activeApp, setActiveApp] = useState(null);

  const apps = {
    profile: <Profile />,
    dashboard: <Dashboard />,
    tasks: <Tasks />,
    notes: <Notes />,
    calendar: <Calendar />,
    focus: <Focus />,
    settings: <Settings />,
  };

  return (
    <div
      className="w-[900px] h-[550px] bg-black/60 border border-gray-700 
                    rounded-xl p-4 shadow-xl backdrop-blur-lg"
    >
      {activeApp ? apps[activeApp] : <div className="text-white">Welcome</div>}
    </div>
  );
}
