'use client';

import { Heart } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

export default function LoadingScreen() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-300 flex items-center justify-center">
            {/* Background patterns */}
            <div className="absolute inset-0 hearts-bg opacity-100 pointer-events-none" />

            {/* Floating hearts animation */}
            <FloatingHearts />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-rose-400/20 dark:bg-rose-500/20 blur-3xl rounded-full" />
                    <div className="relative bg-white/40 dark:bg-rose-950/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 dark:border-rose-800/30 shadow-2xl animate-float">
                        <div className="relative inline-block">
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-rose-500 animate-pulse"
                            >
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                    fill="currentColor"
                                    fillOpacity="0.2"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Heart className="text-rose-500 w-10 h-10 fill-rose-500 animate-heartbeat" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-3xl font-dancing font-bold text-rose-600 dark:text-rose-500 animate-pulse">
                        Chargement...
                    </h2>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </div>
    );
}
