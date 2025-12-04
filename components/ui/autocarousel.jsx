"use client";

import { motion } from "framer-motion";

export default function FixedScreenCarousel({ setActiveApp }) {
  const features = [
    {
      title: "👀 Profile",
      text: "Create & grow your profile.",
      app: "profile",
    },
    {
      title: "📊 Dashboard",
      text: "Your progress at a glance.",
      app: "dashboard",
    },
    { title: "📝 Tasks", text: "Create and track tasks.", app: "tasks" },
    { title: "📚 Notes", text: "Organize your notes cleanly.", app: "notes" },
    {
      title: "📅 Calendar",
      text: "See your schedule easily.",
      app: "calendar",
    },
    {
      title: "⏱ Focus Mode",
      text: "Boost productivity instantly.",
      app: "focus",
    },
    { title: "⚙️ Settings", text: "Customize your planner.", app: "settings" },
  ];

  function Marquee({ speed, reverse, reverseOrder }) {
    const base = reverseOrder ? [...features].reverse() : features;
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
          <button
            key={i}
            onClick={() => setActiveApp(f.app)}
            className="w-[240px] md:w-[260px] bg-[#111827] border border-gray-800 
                     rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-105 
                     transition-all duration-200 cursor-pointer text-left"
          >
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{f.text}</p>
          </button>
        ))}
      </motion.div>
    );
  }

  return (
    <div
      className="
        fixed top-1/2 left-1/2 
        -translate-x-[450px] -translate-y-[590px]
        w-[90vw] max-w-[950px] 
        h-[534px]
        bg-black/80 backdrop-blur-xl
        border-[15px] border-gray-800 rounded-3xl 
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
