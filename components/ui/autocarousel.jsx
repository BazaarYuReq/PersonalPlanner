"use client";

import { motion } from "framer-motion";

export default function FixedScreenCarousel() {
  const features = [
    { title: "👀 Profile", text: "Create & grow your profile." },
    { title: "📊 Dashboard", text: "Your progress at a glance." },
    { title: "📝 Tasks", text: "Create and track tasks." },
    { title: "📚 Notes", text: "Organize your notes cleanly." },
    { title: "📅 Calendar", text: "See your schedule easily." },
    { title: "⏱ Focus Mode", text: "Boost productivity instantly." },
    { title: "⚙️ Settings", text: "Customize your planner." },
  ];

  function Marquee({ speed, reverse, reverseOrder }) {
    const base = reverseOrder ? [...features].reverse() : features;
    const items = [...base, ...base]; // duplicated for no-gap scrolling

    return (
      <motion.div
        className="flex gap-6 py-4"
        animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((f, i) => (
          <div
            key={i}
            className="w-[240px] md:w-[260px] bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{f.text}</p>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <div
      className="
        fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        w-[90vw] max-w-[900px] 
        h-[480px]
        bg-black/80 backdrop-blur-xl
        border border-gray-800 rounded-3xl 
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
        overflow-hidden
        flex flex-col justify-center
        z-50
      "
    >
      <Marquee speed={18} reverse={false} reverseOrder={false} />
      <Marquee speed={22} reverse={true} reverseOrder={true} />
    </div>
  );
}
