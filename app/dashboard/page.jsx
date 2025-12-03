"use client";
import { useTasks } from "../../context/TasksContext";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/ui/progressbar";

export default function DashboardPage() {
  const { tasks } = useTasks();
  const [mood, setMood] = useState("");
  // Calculate completion
  const totalTasks = tasks.length;
  const doneTasksCount = tasks.filter((t) => t.status === "done").length;
  const completionPercent = totalTasks
    ? Math.round((doneTasksCount / totalTasks) * 100)
    : 0;

  useEffect(() => {
    const savedMood = localStorage.getItem("moodToday");
    if (savedMood) setMood(savedMood);
  }, []);

  // Filter tasks by status
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="dark:text-white flex flex-col items-center justify-center w-[100vw] p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <ProgressBar/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* To Do */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">To Do</h2>
          <p>Tasks: {todoTasks.length}</p>
          <ul className="space-y-2">
            {todoTasks.slice(0, 5).map((task) => (
              <li key={task.id}>• {task.title}</li>
            ))}
          </ul>
        </div>

        {/* In Progress */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">In Progress</h2>
          <p>Tasks: {progressTasks.length}</p>
          <ul className="space-y-2">
            {progressTasks.slice(0, 5).map((task) => (
              <li key={task.id}>• {task.title}</li>
            ))}
          </ul>
        </div>

        {/* Done */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Done</h2>
          <p>Tasks: {doneTasks.length}</p>
          <ul className="space-y-2">
            {doneTasks.slice(0, 5).map((task) => (
              <li key={task.id}>• {task.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mood */}
      <div className="p-6 border dark:border-gray-700 rounded-lg mt-6 w-full max-w-6xl">
        <h2 className="text-xl font-bold mb-3">Your Mood</h2>
        {mood ? (
          <div className="text-4xl">{mood}</div>
        ) : (
          <p>No mood logged yet</p>
        )}
      </div>
      
  
    </div>
  );
}
