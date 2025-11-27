"use client";
import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const LS_KEY = "planner_tasks_v1";
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task (default to "todo")
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      status: "todo", // "todo" | "progress" | "done"
    };
    setTasks((prev) => [...prev, newTask]);
  }

  // Move a task between columns (drag/drop)
  function moveTask(id, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, addTask, moveTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
