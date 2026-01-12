"use client";
import { useState, useEffect } from "react";
import ReturnButton from "@/components/ui/returnbutton";
/* ---------- LocalStorage helpers ---------- */
const STORAGE_KEY = "categoryTasks";

const loadCategories = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export default function CategoryTaskManager( {setActiveApp} ) {
  const [categories, setCategories] = useState(loadCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newChapter, setNewChapter] = useState("");
  const [newTask, setNewTask] = useState("");

  /* ---------- SAVE to localStorage ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  /* ---------- Helpers ---------- */
  const activeCategory = categories.find(c => c.id === activeCategoryId);

  const addCategory = () => {
    if (!newCategory.trim()) return;

    const updated = [
      ...categories,
      { id: crypto.randomUUID(), name: newCategory, chapters: [] }
    ];

    setCategories(updated);
    setActiveCategoryId(updated[updated.length - 1].id);
    setNewCategory("");
  };

  const addChapter = () => {
    if (!newChapter.trim() || !activeCategory) return;

    setCategories(categories.map(cat =>
      cat.id === activeCategoryId
        ? {
            ...cat,
            chapters: [
              ...cat.chapters,
              { id: crypto.randomUUID(), name: newChapter, tasks: [] }
            ]
          }
        : cat
    ));
    setNewChapter("");
  };

  const addTask = (chapterId) => {
    if (!newTask.trim()) return;

    setCategories(categories.map(cat =>
      cat.id === activeCategoryId
        ? {
            ...cat,
            chapters: cat.chapters.map(ch =>
              ch.id === chapterId
                ? {
                    ...ch,
                    tasks: [
                      ...ch.tasks,
                      { id: crypto.randomUUID(), title: newTask, done: false }
                    ]
                  }
                : ch
            )
          }
        : cat
    ));
    setNewTask("");
  };

  const toggleTask = (chapterId, taskId) => {
    setCategories(categories.map(cat =>
      cat.id === activeCategoryId
        ? {
            ...cat,
            chapters: cat.chapters.map(ch =>
              ch.id === chapterId
                ? {
                    ...ch,
                    tasks: ch.tasks.map(t =>
                      t.id === taskId ? { ...t, done: !t.done } : t
                    )
                  }
                : ch
            )
          }
        : cat
    ));
  };

  /* ---------- UI ---------- */
  return (<div className=" h-full gap-4"> 
    <section>
        <ReturnButton setActiveApp={setActiveApp} />
        </section>
    <div className="flex h-[50vh] gap-4 p-2">
      
      {/* Categories */}
      <aside className="w-1/4 bg-zinc-900 p-4 rounded-xl">
        <h2 className="font-bold mb-2">Categories</h2>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg mb-1 ${
              activeCategoryId === cat.id ? "bg-indigo-600" : "bg-zinc-800"
            }`}
          >
            📁 {cat.name}
          </button>
        ))}

        <input
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category"
          className="mt-2 w-full p-2 rounded bg-zinc-800"
        />

        <button
          onClick={addCategory}
          className="mt-2 w-full bg-indigo-500 p-2 rounded"
        >
          + Add Category
        </button>
      </aside>

      {/* Chapters & Tasks */}
      <main className="flex-1 bg-zinc-900 p-4 rounded-xl overflow-auto">
        {!activeCategory ? (
          <p className="text-zinc-400">Select a category</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">{activeCategory.name}</h2>

            {/* Add Chapter */}
            <div className="flex gap-2 mb-4">
              <input
                value={newChapter}
                onChange={e => setNewChapter(e.target.value)}
                placeholder="Chapter name (any difficulty)"
                className="flex-1 p-2 rounded bg-zinc-800"
              />
              <button
                onClick={addChapter}
                className="bg-indigo-500 px-4 rounded"
              >
                + Chapter
              </button>
            </div>

            {activeCategory.chapters.map(ch => (
              <div key={ch.id} className="mb-4 p-3 bg-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">{ch.name}</h3>

                {ch.tasks.map(task => (
                  <label
                    key={task.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(ch.id, task.id)}
                    />
                    <span className={task.done ? "line-through text-zinc-400" : ""}>
                      {task.title}
                    </span>
                  </label>
                ))}

                <div className="flex gap-2 mt-2">
                  <input
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="New task"
                    className="flex-1 p-2 rounded bg-zinc-700"
                  />
                  <button
                    onClick={() => addTask(ch.id)}
                    className="bg-green-500 px-3 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
   </div>
  );
}
