"use client";

import { motion } from "framer-motion";

export default function AutoCarousel() {
  const features = [
    { title: "📊 Dashboard", text: "Your progress at a glance." },
    { title: "📝 Tasks", text: "Create and track tasks." },
    { title: "📚 Notes", text: "Organize your notes cleanly." },
    { title: "📅 Calendar", text: "See your schedule easily." },
    { title: "⏱ Focus Mode", text: "Boost productivity instantly." },
    { title: "⚙️ Settings", text: "Customize your planner." },
  ];

  function Marquee({ speed, reverse, reverseOrder }) {
    const base = reverseOrder ? [...features].reverse() : features;

    // duplicate so animation has no gaps
    const items = [...base, ...base];

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
    <div className="w-full overflow-hidden py-12 bg-black">
      {/* Row 1 — normal order */}
      <Marquee speed={18} reverse={false} reverseOrder={false} />

      {/* Row 2 — reversed order */}
      <Marquee speed={22} reverse={true} reverseOrder={true} />
    </div>
  );
}
