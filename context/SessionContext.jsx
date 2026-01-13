"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const start = (minutes) => {
    const secs = minutes * 60;
    setSecondsLeft(secs);
    setTotalSeconds(secs);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setSecondsLeft(0);
    setTotalSeconds(0);
  };

  return (
    <SessionContext.Provider
      value={{ secondsLeft, totalSeconds, running, start, stop }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession outside provider");
  return ctx;
}
