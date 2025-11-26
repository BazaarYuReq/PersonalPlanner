"use client";
import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const LS_KEY = "planner_tasks_v1";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks((prev) => [...prev, { id: Date.now(), title, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
