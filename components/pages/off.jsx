"use client";

import { motion } from "framer-motion";

export default function Off() {
  return (
    <main className="relative w-full h-full bg-black overflow-hidden pointer-events-none">
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-900" />

      {/* Screen glow fade */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black"
      />

      {/* Power indicator (very subtle) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 right-6 text-green-500 text-sm"
      >
        ●
      </motion.div>

      {/* Optional text (comment out if you want pure black) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-6 text-xs text-white/40 tracking-wide"
      >
        Powered Off
      </motion.p>
    </main>
  );
}
