"use client";

import { useState } from "react";

// Import your components
import SwitchTheme from "@/components/ui/switch-theme";
import TaskCarousel from "@/components/ui/task-carousel";
import CalendarHeatmap from "@/components/ui/calendarheatmap";
import TaskCardPreview from "@/components/ui/taskcardpreview";
import Calendar from "@/components/pages/calendar";
import DashboardPage from "@/components/pages/dashboard";
import FocusPage from "@/components/pages/focus";
import NotesPage from "@/components/pages/notes";
import TasksPage from "@/components/pages/tasks";
import SettingsPage from "@/components/pages/settings";
import Profile from "@/components/pages/profile";
import Earth from "@/components/3d/Earth";
import SolarSystem from "@/components/3d/SolarSystem";
import Panel from "@/components/pages/panel";
import ReturnButton from "@/components/ui/returnbutton";
import War from "@/components/pages/war";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState("home");

  // Define all apps except "home"
  const apps = {
    tasks: <TasksPage />,
    heatmap: <CalendarHeatmap />,
    preview: <TaskCardPreview />,
    calendar: <Calendar />,
    notes: <NotesPage />,
    focus: <FocusPage />,
    dashboard: <DashboardPage />,
    settings: <SettingsPage />,
    earth: <Earth />,
    system: <SolarSystem />,
    profile: <Profile />,
    war: <War />,
  };

  return (
    <main>
      <SwitchTheme />
      <div className="relative w-[200vw] h-[200vh] overflow-x-auto z-10">
        {/* Cozy Room Wall Background */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900 to-yellow-900"
          // style={{
          //   backgroundImage:
          //     "url('data:image/jpeg;base64,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')",
          // }}
        />

        {/* Fake Computer Screen */}
        <div
          className="
            relative z-20 bg-black w-[1440px] h-[800px]
            translate-x-[385px] translate-y-[90px]
            rounded-xl shadow-lg border-20 border-gray-800
            overflow-y-auto overflow-x-hidden
            scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600
          "
        >
          {activeApp === "home" ? (
            <Panel setActiveApp={setActiveApp} />
          ) : (
            apps[activeApp]
          )}
        </div>

        {/* Side Panels / Decor */}
        <div className="bg-gray-500 w-[275px] h-[250px] translate-x-[955px] translate-y-[90px] z-20 relative" />
        <div className="bg-gray-700 w-[475px] h-[35px] translate-x-[855px] translate-y-[70px] rounded-md z-20 relative" />
      </div>
    </main>
  );
}
