import { useState } from "react";

export default function KeyboardToogle() {
  const [isOn, setIsOn] = useState(true); // true = screen visible, false = black

  return (
    <div className="relative">
      {/* Power Button */}
      <button
        onClick={() => setIsOn(!isOn)}
        className={`
          h-[52px] w-[70px] rounded-xl text-lg text-white
          transition-all duration-150
          ${isOn ? "bg-green-500 shadow-[0_0_20px_#22c55e]" : "bg-red-700"}
        `}
      >
        ⏻
      </button>

      {/* Screen */}
      <div
        className={`mt-4 h-[400px] w-full rounded-2xl transition-colors duration-300 ${
          isOn ? "bg-white" : "bg-black"
        }`}
      >
        {isOn && (
          <div className="p-4 text-black">
            {/* Put your keyboard component or other content here */}
            Keyboard ON
          </div>
        )}
      </div>
    </div>
  );
}
