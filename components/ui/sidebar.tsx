"use client";
import Link from "next/link";
import SwitchTheme from "../switch-theme";

export default function Sidebar() {
  return (
    <aside className="w-52 h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Planner</h1>

      <nav className="space-y-3 text-lg">
        <Link href="/" className="block dark:text-white">
        Home
        </Link>
        <Link href="/dashboard" className="block dark:text-white">
          Dashboard
        </Link>
        <Link href="/tasks" className="block dark:text-white">
          Tasks
        </Link>
        <Link href="/notes" className="block dark:text-white">
          Notes
        </Link>
        <Link href="/calendar" className="block dark:text-white">
          Calendar
        </Link>
        <Link href="/focus" className="block dark:text-white">
          Focus
        </Link>
        <Link href="/settings" className="block dark:text-white">
          Settings
        </Link>
        <SwitchTheme />
      </nav>
    </aside>
  );
}
