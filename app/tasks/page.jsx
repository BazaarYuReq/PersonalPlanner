"use client";

import { useState } from "react";
import { useTasks } from "../../context/TasksContext"; // adjust the path if needed

export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    addTask(newTask.trim());
    setNewTask("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Add Task */}
      <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </form>

      {/* Tasks List */}
      <ul className="space-y-2">
        {tasks.length === 0 && <li>No tasks yet!</li>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
