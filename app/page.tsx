"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// UI
import SwitchTheme from "@/components/ui/switch-theme";
import Keyboard from "@/components/ui/keyboard";

// Pages
import Calendar from "@/components/pages/calendar";
import DashboardPage from "@/components/pages/dashboard";
import FocusPage from "@/components/pages/focus";
import NotesPage from "@/components/pages/notes";
import TasksPage from "@/components/pages/tasks";
import SettingsPage from "@/components/pages/settings";
import Profile from "@/components/pages/profile";
import Panel from "@/components/pages/panel";
import War from "@/components/pages/war";
import Calculator from "@/components/pages/calculator";
import MoviesPage from "@/components/pages/googels";
import LoginPage from "@/components/pages/login";

// 3D
import Earth from "@/components/3d/Earth";
import SolarSystem from "@/components/3d/SolarSystem";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState<string>("home");

  const apps: Record<string, ReactNode> = {
    panel: <Panel setActiveApp={setActiveApp} />,
    tasks: <TasksPage setActiveApp={setActiveApp} />,
    calendar: <Calendar setActiveApp={setActiveApp} />,
    notes: <NotesPage setActiveApp={setActiveApp} />,
    focus: <FocusPage setActiveApp={setActiveApp} />,
    dashboard: <DashboardPage setActiveApp={setActiveApp} />,
    settings: <SettingsPage setActiveApp={setActiveApp} />,
    earth: <Earth />,
    system: <SolarSystem />,
    profile: <Profile />,
    war: <War />,
    calculator: <Calculator setActiveApp={setActiveApp} />,
    googels: <MoviesPage setActiveApp={setActiveApp} />,
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-yellow-700">
      <SwitchTheme />

      {/* STATUS BAR */}

      {/* LAPTOP CONTAINER */}
      <div className="relative flex flex-col items-center justify-center perspective-1000">
        {/* SCREEN */}
        <div
          className="
            relative bg-black w-[990px] h-[555px]
            rounded-xl shadow-2xl border-[18px] border-gray-900
            overflow-y-auto overflow-x-hidden
            transform rotateX-10 origin-bottom
            translate-y-[90px]
          "
        >
          {activeApp === "home" ? (
            <LoginPage setActiveApp={setActiveApp} />
          ) : (
            apps[activeApp] ?? <Panel setActiveApp={setActiveApp} />
          )}
        </div>

        {/* KEYBOARD */}
        <div className="mt-4">
          <Keyboard />
        </div>
      </div>
    </main>
  );
}
