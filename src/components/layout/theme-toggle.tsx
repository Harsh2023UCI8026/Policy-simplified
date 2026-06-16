'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const handleToggle = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log("[ThemeToggle] Clicked toggle. Previous theme:", theme, "Resolved:", resolvedTheme, "-> Setting to:", nextTheme);
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer"
        disabled
      >
        <Moon className="w-5 h-5 text-slate-400" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-500 animate-[spin_40s_linear_infinite]" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
