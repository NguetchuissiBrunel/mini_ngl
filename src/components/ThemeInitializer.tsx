'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
    useEffect(() => {
        // Check initial preference, default to light if no preference, or system preference
        if (document.documentElement.classList.contains('dark') ||
            (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return null;
}
