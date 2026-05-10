'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tamkinly_theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('tamkinly_theme', newDark ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full" aria-label="Toggle dark mode">
      {isDark ? <Sun className="w-5 h-5 text-[#3DD4B0]" /> : <Moon className="w-5 h-5 text-[#0F1C2E]" />}
    </Button>
  );
}
