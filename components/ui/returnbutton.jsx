// components/ui/ReturnButton.jsx
"use client";

export default function ReturnButton() {
  return (
    <div className="flex gap-2 fix translate-x-[0px] translate-y-[1px] p-2">
      {/* Red (Close) */}
      <button
        onClick={() => window.location.reload()}
        className="h-4 w-4 rounded-full bg-red-500 border border-red-700 shadow-inner hover:bg-red-600 transition"
      />

      {/* Yellow (Minimize) */}
      <button
        onClick={() => alert("Minimize not supported in browser")}
        className="h-4 w-4 rounded-full bg-yellow-400 border border-yellow-600 shadow-inner hover:bg-yellow-500 transition"
      />

      {/* Green (Fullscreen / Maximize) */}
      <button
        onClick={() => document.documentElement.requestFullscreen()}
        className="h-4 w-4 rounded-full bg-green-500 border border-green-700 shadow-inner hover:bg-green-600 transition"
      />
    </div>
  );
}
