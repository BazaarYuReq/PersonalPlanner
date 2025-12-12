"use client";

import TasksBoard from "../../components/ui/tasksboard";
import ReturnButton from "@/components/ui/returnbutton";

export default function TasksPage() {
  return (
    <main>
      {" "}
      <ReturnButton />
      <div className="p-6">
        <TasksBoard />
      </div>
    </main>
  );
}
