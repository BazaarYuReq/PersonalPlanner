"use client";

import ReturnButton from "@/components/ui/returnbutton";
import SessionPanel from "@/components/SessionPanel";

export default function PomodoroPage({ setActiveApp }) {
  return (
    <main className="p-6">
      <ReturnButton setActiveApp={setActiveApp} />

      <SessionPanel />
    </main>
  );
}
