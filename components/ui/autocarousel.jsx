"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FixedScreenCarousel() {
  const router = useRouter();
  const [dashboardOn, setDashboardOn] = useState(false);

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

  // Reusable marquee
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
            onClick={() => router.push(`/${f.app}`)}
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

  // Desktop mode: use features icons
  const renderDesktop = () => (
    <div className="grid grid-cols-4 gap-6 p-8">
      {features.map((app, i) => (
        <button
          key={i}
          onClick={() => router.push(`/${app.app}`)}
          className="flex flex-col items-center justify-center w-24 h-24 bg-gray-800/70 dark:bg-gray-700 border border-gray-600 rounded-lg hover:scale-110 transition-all"
        >
          <span className="text-4xl">{app.title.split(" ")[0]}</span>
          <span className="text-sm mt-2">
            {app.title.replace(/^[^\s]+ /, "")}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="
        fixed top-1/2 left-1/2 
        -translate-x-[720px] -translate-y-[400px]
        w-[90vw] max-w-[1440px] 
        h-[800px]
        bg-black/80 backdrop-blur-xl
        border-[15px] border-gray-800 rounded-3xl 
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
        overflow-hidden
        flex flex-col justify-start
        z-50
      "
    >
      {/* Toggle Button */}
      <div className="pr-5 pt-5 flex justify-end">
        <button
          onClick={() => setDashboardOn(!dashboardOn)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          {dashboardOn ? "Desktop Mode" : "Carousel Mode"}
        </button>
      </div>

      {/* Main content */}
      {dashboardOn ? (
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">
            INFINITE SCROLL
          </h1>
          <Marquee speed={28} reverse={false} reverseOrder={false} />
          <Marquee speed={25} reverse={true} reverseOrder={true} />
        </div>
      ) : (
        <div className="flex-1 overflow-auto">{renderDesktop()}</div>
      )}
    </div>
  );
}
