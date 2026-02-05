'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check initial preference, default to light if no preference, or system preference
        if (document.documentElement.classList.contains('dark') ||
            (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/30 dark:bg-[#3E2723]/60 backdrop-blur-md border border-white/50 dark:border-rose-950/30 shadow-lg transition-all hover:scale-110 active:scale-95 text-rose-600 dark:text-rose-600 pointer-events-auto cursor-pointer"
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
}
