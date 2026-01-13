"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext(null);
const STORAGE_KEY = "study_data_v1";

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  /* ---------- Load ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCategories(JSON.parse(saved) || []);
  }, []);

  /* ---------- Save ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  /* ---------- Mutators ---------- */
  const addCategory = (name) => {
    if (!name.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, chapters: [] },
    ]);
  };

  const addChapter = (categoryId, title) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              chapters: [
                ...c.chapters,
                { id: crypto.randomUUID(), title, tasks: [] },
              ],
            }
          : c
      )
    );
  };

  const addTask = (categoryId, chapterId, title) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id !== categoryId
          ? c
          : {
              ...c,
              chapters: c.chapters.map((ch) =>
                ch.id !== chapterId
                  ? ch
                  : {
                      ...ch,
                      tasks: [
                        ...ch.tasks,
                        {
                          id: crypto.randomUUID(),
                          title,
                          sessions: [],
                        },
                      ],
                    }
              ),
            }
      )
    );
  };

  const addSessionToTask = (categoryId, chapterId, taskId, seconds) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id !== categoryId
          ? c
          : {
              ...c,
              chapters: c.chapters.map((ch) =>
                ch.id !== chapterId
                  ? ch
                  : {
                      ...ch,
                      tasks: ch.tasks.map((t) =>
                        t.id !== taskId
                          ? t
                          : {
                              ...t,
                              sessions: [
                                ...t.sessions,
                                {
                                  id: crypto.randomUUID(),
                                  seconds,
                                  date: Date.now(),
                                },
                              ],
                            }
                      ),
                    }
              ),
            }
      )
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        addChapter,
        addTask,
        addSessionToTask,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategories outside provider");
  return ctx;
}
