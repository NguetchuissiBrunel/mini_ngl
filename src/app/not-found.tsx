'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] flex items-center justify-center p-4">
            {/* Background patterns */}
            <div className="absolute inset-0 hearts-bg opacity-30 pointer-events-none" />

            {/* Floating hearts animation */}
            <FloatingHearts />

            <div className="relative z-10 max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="relative">
                        <Heart
                            size={120}
                            className="text-rose-500 dark:text-rose-600 animate-pulse"
                            fill="currentColor"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-1/2 left-0 h-2 bg-white/70 dark:bg-rose-950/70 rotate-[35deg] translate-y-[-50%] origin-center shadow-sm"
                        />
                    </div>
                    <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: 20, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute -bottom-4 -right-4 bg-white dark:bg-rose-900 px-4 py-2 rounded-2xl shadow-xl border border-rose-100 dark:border-rose-800"
                    >
                        <span className="text-4xl font-bold text-rose-600 dark:text-rose-400">404</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-dancing font-bold text-rose-900 dark:text-rose-100 mb-4">
                        Oups ! Le lien s'est brisé...
                    </h1>
                    <p className="text-lg text-rose-700 dark:text-rose-300 mb-10 font-medium">
                        Même Cupidon peut se tromper de cible parfois. Cette page n'existe pas ou a été déplacée.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 group"
                        >
                            <Home size={20} className="group-hover:animate-bounce" />
                            <span>Retour à l'accueil</span>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold rounded-2xl transition-all border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/60 active:scale-95"
                        >
                            <ArrowLeft size={20} />
                            <span>Page précédente</span>
                        </button>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-16 text-sm text-rose-600 dark:text-rose-500 font-bold uppercase tracking-widest"
                >
                    Cupid is lost in space
                </motion.p>
            </div>
        </div>
    );
}
