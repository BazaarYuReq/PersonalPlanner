"use client";

export default function ReturnButton({ setActiveApp }) {
  return (
    <div className="flex gap-2 p-2">
      {/* Red (Close → Go to Panel) */}
      <button
        onClick={() => setActiveApp("panel")} // <-- change "home" to "panel"
        className="h-4 w-4 rounded-full bg-red-500 border border-red-700 shadow-inner hover:bg-red-600 transition"
      />

      {/* Yellow (Minimize) */}
      <button
        onClick={() => alert("Minimize not supported in browser")}
        className="h-4 w-4 rounded-full bg-yellow-400 border border-yellow-600 shadow-inner hover:bg-yellow-500 transition"
      />

      {/* Green (Fullscreen) */}
      <button
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        className="h-4 w-4 rounded-full bg-green-500 border border-green-700 shadow-inner hover:bg-green-600 transition"
      />
    </div>
  );
}
