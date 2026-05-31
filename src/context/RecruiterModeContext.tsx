"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type RecruiterModeContextType = {
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
};

const RecruiterModeContext = createContext<RecruiterModeContextType | undefined>(undefined);

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState<boolean>(false);

  // Load preferences from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recruiterMode");
    if (saved) {
      setRecruiterMode(saved === "true");
    }
  }, []);

  const toggleRecruiterMode = () => {
    setRecruiterMode((prev) => {
      const next = !prev;
      localStorage.setItem("recruiterMode", String(next));
      return next;
    });
  };

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterModeContext);
  if (!context) {
    throw new Error("useRecruiterMode must be used within a RecruiterModeProvider");
  }
  return context;
}
