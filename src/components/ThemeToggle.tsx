'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <button 
      onClick={toggleDarkMode} 
      className="p-2.5 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-secondary/5 flex items-center justify-center shadow-sm active:scale-95"
      title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <span className="text-lg leading-none">{isDarkMode ? '🌞' : '🌙'}</span>
    </button>
  );
}
