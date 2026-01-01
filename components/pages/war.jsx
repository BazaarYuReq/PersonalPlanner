"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReturnButton from "@/components/ui/returnbutton";

export default function War() {
  const [n1, setN1] = useState(500);
  const [n2, setN2] = useState(500);
  const [A1, setA1] = useState(50);
  const [A2, setA2] = useState(50);
  const [winner, setWinner] = useState(null);

  const decreaseNumber = (side) => {
    if (winner) return;

    setN1((prevN1) => {
      let newN1 = prevN1;
      let newN2 = n2;

      if (side === 1) newN1 = Math.max(prevN1 - 4, 0);

      if (newN1 === 0) {
        setWinner("Golden Empire WINS!!!");
        setA1(0);
        setA2(100);
      }

      return newN1;
    });

    setN2((prevN2) => {
      let newN2 = prevN2;
      let newN1 = n1;

      if (side === 2) newN2 = Math.max(prevN2 - 4, 0);

      if (newN2 === 0) {
        setWinner("Royal Nation WINS!!!");
        setA1(100);
        setA2(0);
      }

      return newN2;
    });

    // Territory shift
    if (side === 8) {
      setA1((p) => Math.max(p - 1, 0));
      setA2((p) => Math.min(p + 1, 100));
    }

    if (side === 9) {
      setA1((p) => Math.min(p + 1, 100));
      setA2((p) => Math.max(p - 1, 0));
    }
  };

  const reset = () => {
    setN1(500);
    setN2(500);
    setA1(50);
    setA2(50);
    setWinner(null);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "b") {
        decreaseNumber(2);
        decreaseNumber(9);
      }
      if (e.key.toLowerCase() === "k") {
        decreaseNumber(1);
        decreaseNumber(8);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [winner]); // ✅ correct dependency

  return (
    <main className="w-full h-full">
      <ReturnButton activeApp={activeApp} setActiveApp={setActiveApp} />

      {/* Top Bar */}
      <div className="w-full h-[10vh] bg-purple-600 flex items-center justify-around border-[10px] border-black">
        <div className="text-4xl">{n1}</div>

        <button
          onClick={reset}
          className="w-[300px] h-[80px] bg-white text-black text-xl font-bold border-2 border-black"
        >
          {winner || "RESET"}
        </button>

        <div className="text-4xl">{n2}</div>
      </div>

      {/* Battleground */}
      <div className="flex w-full h-[28vh]">
        {/* Royal Nation */}
        <div
          className="h-full cursor-pointer"
          style={{ width: `${A1}%` }}
          onClick={() => {
            decreaseNumber(2);
            decreaseNumber(9);
          }}
        >
          <Image
            src="/RN.webp"
            alt="Royal Nation"
            width={1000}
            height={1000}
            className="w-full h-full object-contain border-[5px] border-purple-600 bg-black shadow-[0_0_50px_5px_purple]"
          />
        </div>

        {/* Golden Empire */}
        <div
          className="h-full cursor-pointer"
          style={{ width: `${A2}%` }}
          onClick={() => {
            decreaseNumber(1);
            decreaseNumber(8);
          }}
        >
          <Image
            src="/empire_insignia.webp"
            alt="Empire"
            width={1000}
            height={1000}
            className="w-full h-full object-contain border-[5px] border-yellow-400 bg-white shadow-[0_0_20px_5px_gold]"
          />
        </div>
      </div>
    </main>
  );
}
