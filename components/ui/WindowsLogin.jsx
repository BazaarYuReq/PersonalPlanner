"use client";

import { useState } from "react";

export default function WindowsLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Dummy auth logic: replace with your own
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin && onLogin();
    } else {
      setError("Incorrect username or password");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-screen h-screen relative bg-blue-900 flex items-center justify-center overflow-hidden">
      {/* Background blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-900 blur-xl -z-10"></div>

      <div className="flex flex-col items-center bg-gray-800/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px]">
        {/* Avatar */}
        <div className="w-28 h-28 mb-4 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          <img
            src="/user-avatar.png" // Replace with your avatar
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Username */}
        {!showPassword && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShowPassword(true);
              }}
              className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowPassword(true)}
              className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Next
            </button>
          </>
        )}

        {/* Password */}
        {showPassword && (
          <>
            <p className="text-white mb-4 text-lg">{username}</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mb-4 p-3 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Sign In
            </button>
          </>
        )}

        {/* Footer */}
        <p className="text-gray-300 mt-6 text-sm">
          Windows-style login for your web app
        </p>
      </div>
    </div>
  );
}
