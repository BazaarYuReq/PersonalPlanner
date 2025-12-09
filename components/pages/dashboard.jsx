"use client";
import { useTasks } from "../../context/TasksContext";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/ui/progressbar";

export default function DashboardPage() {
  const { tasks } = useTasks();
  const [mood, setMood] = useState("");
  const [newMood, setNewMood] = useState("");

  // Task stats
  const totalTasks = tasks.length;
  const doneTasksCount = tasks.filter((t) => t.status === "done").length;
  const completionPercent = totalTasks
    ? Math.round((doneTasksCount / totalTasks) * 100)
    : 0;

  useEffect(() => {
    const savedMood = localStorage.getItem("moodToday");
    if (savedMood) setMood(savedMood);
  }, []);

  // Filter tasks
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  // Optional: highlight upcoming tasks (due today)
  const today = new Date().toISOString().split("T")[0];
  const upcomingTasks = tasks.filter((t) => t.dueDate === today);

  const saveMood = () => {
    localStorage.setItem("moodToday", newMood);
    setMood(newMood);
    setNewMood("");
  };

  const renderTaskList = (taskList) =>
    taskList.slice(0, 5).map((task) => (
      <li
        key={task.id}
        className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 transition flex justify-between items-center"
      >
        <span>• {task.title}</span>
        {task.priority && (
          <span
            className={`ml-2 px-2 py-0.5 text-xs rounded ${
              task.priority === "high"
                ? "bg-red-500 text-white"
                : task.priority === "medium"
                ? "bg-yellow-400 text-black"
                : "bg-green-400 text-black"
            }`}
          >
            {task.priority}
          </span>
        )}
      </li>
    ));

  return (
    <div className="dark:text-white flex flex-col items-center justify-center w-[62vw] p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <ProgressBar progress={completionPercent} />
        <p className="text-right text-gray-400 dark:text-gray-300 mt-1">
          {completionPercent}% Completed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* To Do */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">To Do</h2>
          <p>Tasks: {todoTasks.length}</p>
          <ul className="space-y-2">{renderTaskList(todoTasks)}</ul>
          {todoTasks.length > 5 && (
            <button className="mt-2 text-blue-500 hover:underline">
              View All
            </button>
          )}
        </div>

        {/* In Progress */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">In Progress</h2>
          <p>Tasks: {progressTasks.length}</p>
          <ul className="space-y-2">{renderTaskList(progressTasks)}</ul>
          {progressTasks.length > 5 && (
            <button className="mt-2 text-blue-500 hover:underline">
              View All
            </button>
          )}
        </div>

        {/* Done */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Done</h2>
          <p>Tasks: {doneTasks.length}</p>
          <ul className="space-y-2">{renderTaskList(doneTasks)}</ul>
          {doneTasks.length > 5 && (
            <button className="mt-2 text-blue-500 hover:underline">
              View All
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      {upcomingTasks.length > 0 && (
        <div className="p-6 border dark:border-gray-700 rounded-lg mt-6 w-full max-w-6xl">
          <h2 className="text-xl font-bold mb-3">Tasks Due Today</h2>
          <ul className="space-y-2">{renderTaskList(upcomingTasks)}</ul>
        </div>
      )}

      {/* Mood Section */}
      <div className="p-6 border dark:border-gray-700 rounded-lg mt-6 w-full max-w-6xl">
        <h2 className="text-xl font-bold mb-3">Your Mood</h2>
        {mood ? (
          <div className="text-4xl mb-3">{mood}</div>
        ) : (
          <p className="mb-3">No mood logged yet</p>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="How do you feel?"
            value={newMood}
            onChange={(e) => setNewMood(e.target.value)}
            className="px-3 py-1 rounded border dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex-1"
          />
          <button
            onClick={saveMood}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
