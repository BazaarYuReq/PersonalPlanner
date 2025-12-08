"use client";
import { useState, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";

export default function NotesPage() {
  const [text, setText] = useState("");
  const { notes, setNotes } = useNotes();
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setText(saved);
  }, []);

  // Auto-save
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("notes", text);
    }, 500);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>

      <textarea
        className="w-full h-[500px] border p-4 rounded dark:bg-gray-800 dark:text-white"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes..."
      />
    </div>
  );
}
