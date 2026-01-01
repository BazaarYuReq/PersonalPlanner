"use client";

import { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// ---------- Simple Auth Context (NO components) ----------
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (password) => {
    if (password === "12345") {
      setUser({ name: "Bilegdemberel" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ---------- Login Page ----------
export default function LoginPage({ setActiveApp }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === "12345") {
      setActiveApp("panel");
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black ">
      {/* wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-9 to-black" />
      <div className="absolute inset-0 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 hover:scale-105 transition duration-500 ease-in-out"
      >
        <div className="w-[300px] rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-2xl border border-white/20 flex flex-col items-center gap-5">
          {/* avatar */}
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl">
            👤
          </div>

          {/* username */}
          <h1 className="text-white text-lg font-medium tracking-wide">
            Bilegdemberel
          </h1>

          {/* password */}
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            animate={error ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-xl bg-white/20 px-4 py-2 text-white placeholder-white/60 outline-none border border-white/30"
          />

          {/* login */}
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-white/90 py-2 text-black font-medium hover:bg-white transition"
          >
            Log In
          </button>

          <p className="text-xs text-white/50">
            Press Enter to log in with password:12345
          </p>
        </div>
      </motion.div>
    </div>
  );
}
