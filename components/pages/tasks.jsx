"use client";

import TasksBoard from "../../components/ui/tasksboard";
import ReturnButton from "@/components/ui/returnbutton";

export default function TasksPage({ setActiveApp }) {
  return (
    <main className="w-full h-full">
      {/* Return Button */}
      <ReturnButton setActiveApp={setActiveApp} />

      {/* Tasks content */}
      <div className="p-6">
        <TasksBoard />
      </div>
    </main>
  );
}
