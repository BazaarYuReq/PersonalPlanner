"use client";

const KeyButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`key-3d relative cursor-pointer bg-transparent p-0 border-none ${className}`}
      aria-label={`key-${label}`}
    >
      <span className="key-shadow absolute inset-0 rounded-[10px] bg-[hsl(0_0%_0%_/_0.25)] [transform:translateY(2px)] will-change-[transform]"></span>

      <span className="key-edge absolute inset-0 rounded-[10px] bg-[linear-gradient(to_left,hsl(340_100%_16%)_0%,hsl(340_100%_32%)_8%,hsl(340_100%_32%)_92%,hsl(340_100%_16%)_100%)] pointer-events-none"></span>

      <span className="key-front relative block text-white rounded-[10px] bg-[hsl(345_100%_47%)] text-[1rem] px-[20px] py-[10px] will-change-[transform] [transform:translateY(-4px)] flex items-center justify-center select-none">
        {label}
      </span>
    </button>
  );
};

export default function Keyboard({ onKey }) {
  const keyRows = [
    [
      { label: "`" },
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "0" },
      { label: "-" },
      { label: "=" },
      { label: "Backspace", className: "w-[120px]" },
    ],
    [
      { label: "Tab", className: "w-[90px]" },
      { label: "Q" },
      { label: "W" },
      { label: "E" },
      { label: "R" },
      { label: "T" },
      { label: "Y" },
      { label: "U" },
      { label: "I" },
      { label: "O" },
      { label: "P" },
      { label: "[" },
      { label: "]" },
      { label: "\\", className: "w-[90px]" },
    ],
    [
      { label: "Caps", className: "w-[110px]" },
      { label: "A" },
      { label: "S" },
      { label: "D" },
      { label: "F" },
      { label: "G" },
      { label: "H" },
      { label: "J" },
      { label: "K" },
      { label: "L" },
      { label: ";" },
      { label: "'" },
      { label: "Enter", className: "w-[130px]" },
    ],
    [
      { label: "Shift", className: "w-[140px]" },
      { label: "Z" },
      { label: "X" },
      { label: "C" },
      { label: "V" },
      { label: "B" },
      { label: "N" },
      { label: "M" },
      { label: "," },
      { label: "." },
      { label: "/" },
      { label: "Shift", className: "w-[140px]" },
    ],
    [
      { label: "Ctrl", className: "w-[90px]" },
      { label: "Win", className: "w-[90px]" },
      { label: "Alt", className: "w-[90px]" },
      { label: "Space", className: "w-[350px]" },
      { label: "Alt", className: "w-[90px]" },
      { label: "Fn", className: "w-[90px]" },
      { label: "Ctrl", className: "w-[90px]" },
    ],
  ];

  return (
    <div className="flex flex-col gap-4 mx-auto p-4 bg-orange-500 px-2 border-5  w-[950px] rounded-lg ">
      {keyRows.map((row, i) => (
        <div key={i} className="flex gap-3 justify-center">
          {row.map((key, idx) => (
            <KeyButton
              key={idx}
              label={key.label}
              className={key.className}
              onClick={() =>
                onKey ? onKey(key.label) : console.log("Key:", key.label)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
