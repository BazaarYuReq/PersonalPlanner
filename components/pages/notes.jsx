"use client";

import { useState, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";
import { Loader2 } from "lucide-react";
import ReturnButton from "@/components/ui/returnbutton";

export default function NotesPage({ setActiveApp }) {
  const { notes, setNotes } = useNotes();
  const [saving, setSaving] = useState(false);

  // Auto-save logic
  useEffect(() => {
    setSaving(true);
    const timeout = setTimeout(() => {
      localStorage.setItem("notes", notes);
      setSaving(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [notes]);

  return (
    <main>
      <ReturnButton setActiveApp={setActiveApp} />
      <div className="w-full px-4 md:px-8 pt-6 dark:text-white ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-purple-700 dark:bg-purple-900 py-3 z-10 rounded-xl ">
          <h1 className="text-3xl font-bold">Notes</h1>

          {/* Saving indicator */}
          {saving ? (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Loader2 className="animate-spin h-4 w-4" />
              <span className="text-sm">Saving…</span>
            </div>
          ) : (
            <span className="text-lg text-green-500">Saved</span>
          )}
        </div>
        {/* Notes Container */}
        <div className="bg-yellow-500 dark:bg-gray-900 rounded-2xl shadow p-4 md:p-6 transition">
          <textarea
            className="w-full h-[550px] bg-transparent resize-none focus:outline-none text-lg leading-relaxed"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes..."
          />
        </div>
      </div>
    </main>
  );
}
