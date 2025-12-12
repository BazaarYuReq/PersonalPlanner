"use client";

import { useState } from "react";
import Image from "next/image";
import ReturnButton from "@/components/ui/returnbutton";

export default function War() {
  const [n1, setN1] = useState(200);
  const [n2, setN2] = useState(200);
  const [A1, setA1] = useState(50);
  const [A2, setA2] = useState(50);
  const [winner, setWinner] = useState(null);

  const decreaseNumber = (n) => {
    if (winner) return;

    if (n === 1) {
      const newN1 = Math.max(n1 - 4, 0);
      setN1(newN1);
    }
    if (n === 2) {
      const newN2 = Math.max(n2 - 4, 0);
      setN2(newN2);
    }
    if (n === 8) {
      const newA1 = A1 - 1;
      const newA2 = A2 + 1;
      setA1(newA1);
      setA2(newA2);
    }
    if (n === 9) {
      const newA1 = A1 + 1;
      const newA2 = A2 - 1;
      setA1(newA1);
      setA2(newA2);
    }

    if (n1 - 4 <= 0) {
      setWinner("Golden Empire WINS!!!");
      setA1(0);
      setA2(100);
    } else if (n2 - 4 <= 0) {
      setWinner("Royal Nation WINS!!!");
      setA1(100);
      setA2(0);
    }
  };

  const reset = () => {
    setN1(200);
    setN2(200);
    setA1(50);
    setA2(50);
    setWinner(null);
  };

  return (
    <main>
      <ReturnButton />
      <div className="w-full h-[100px] border-[10px] border-black">
        {/* Top Bar */}
        <div className="w-full h-[10vh] bg-purple-600 flex items-center justify-around">
          <div className="text-4xl">{n1}</div>
          <button
            onClick={reset}
            className="w-[300px] h-[100px] bg-white text-black text-xl font-bold border-2 border-black"
          >
            {winner || "RESET"}
          </button>
          <div className="text-4xl">{n2}</div>
        </div>

        {/* Battleground */}
        <div className="flex w-full h-[38vh]">
          {/* RN Area */}
          <div
            className="h-full"
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
              className="w-full h-[634px] object-contain border-[5px] border-purple-600 bg-black shadow-[0_0_50px_5px_purple] transition-all"
            />
          </div>

          {/* GE Area */}
          <div
            className="h-full"
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
              className="w-full h-[634px] object-contain border-[5px] border-yellow-400 bg-white shadow-[0_0_20px_5px_gold] transition-all"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
