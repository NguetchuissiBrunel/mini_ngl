'use client';

import { useEffect, useState } from 'react';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        // Increased count to 150
        const newHearts = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position 0-100%
            delay: -(Math.random() * 40), // Negative delay to start mid-animation (screen full immediately)
            duration: 20 + Math.random() * 20, // Slower float
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    // Light: Intense rose | Dark: High contrast neon rose
                    className="absolute bottom-[-50px] opacity-0 animate-float-up text-rose-400/80 dark:text-rose-600/60"
                    style={{
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                    }}
                >
                    {/* Small hearts only (width="20") */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="filter drop-shadow-sm"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default FloatingHearts;
