"use client";
import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const LS_KEY = "planner_notes_v1";
  const [notes, setNotes] = useState("");

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setNotes(saved);
  }, []);

  // Save to localStorage when notes change
  useEffect(() => {
    localStorage.setItem(LS_KEY, notes);
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
