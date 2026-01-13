"use client";

import { createContext, useContext, useState } from "react";

const ActiveTaskContext = createContext(null);

export function ActiveTaskProvider({ children }) {
  const [activeTask, setActiveTask] = useState(null);

  return (
    <ActiveTaskContext.Provider value={{ activeTask, setActiveTask }}>
      {children}
    </ActiveTaskContext.Provider>
  );
}

export function useActiveTask() {
  const ctx = useContext(ActiveTaskContext);
  if (!ctx) throw new Error("useActiveTask outside provider");
  return ctx;
}
