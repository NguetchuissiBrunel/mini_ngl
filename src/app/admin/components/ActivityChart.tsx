'use client';

import { BarChart3, TrendingUp } from 'lucide-react';
import { mockChartData } from '../data/mockData';
import { motion } from 'framer-motion';

export default function ActivityChart() {
    const maxValue = Math.max(...mockChartData.datasets[0].data);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/40 dark:bg-rose-950/20 backdrop-blur-md rounded-3xl p-6 border border-rose-200/50 dark:border-rose-800/20 shadow-2xl shadow-rose-400/5"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-rose-800 dark:text-rose-100 flex items-center gap-2">
                        <BarChart3 className="text-rose-500" />
                        Activité Hebdomadaire
                    </h2>
                    <p className="text-sm text-rose-600/60 dark:text-rose-400/60 mt-1 font-medium italic">
                        Analyse des flux de communication
                    </p>
                </div>

                <div className="flex bg-rose-100/50 dark:bg-rose-900/30 p-1 rounded-2xl border border-rose-200/30">
                    <button className="px-4 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20">7 Jours</button>
                    <button className="px-4 py-1.5 text-rose-600/60 dark:text-rose-300/60 text-xs font-bold hover:text-rose-600">30 Jours</button>
                </div>
            </div>

            {/* Graph Area */}
            <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-4 px-2">
                    {mockChartData.labels.map((label, index) => {
                        const value1 = mockChartData.datasets[0].data[index];
                        const value2 = mockChartData.datasets[1].data[index];
                        const height1 = (value1 / maxValue) * 100;
                        const height2 = (value2 / maxValue) * 100;

                        return (
                            <div key={label} className="flex-1 h-full flex flex-col items-center group">
                                <div className="flex-1 w-full flex items-end justify-center gap-1 mb-3">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height1}%` }}
                                        transition={{ delay: index * 0.1, duration: 1, ease: "easeOut" }}
                                        className="w-full max-w-[12px] bg-gradient-to-t from-rose-500 to-pink-400 rounded-full relative group-hover:brightness-110 shadow-lg shadow-rose-500/20"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            {value1}
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height2}%` }}
                                        transition={{ delay: index * 0.12, duration: 1, ease: "easeOut" }}
                                        className="w-full max-w-[12px] bg-rose-300 dark:bg-rose-700 rounded-full relative group-hover:brightness-110 shadow-lg"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            {value2}
                                        </div>
                                    </motion.div>
                                </div>
                                <span className="text-[10px] font-bold text-rose-500/60 uppercase tracking-tighter">
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Metrics Footer */}
            <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-10 mt-10 pt-8 border-t border-rose-100/50 dark:border-rose-800/20">
                <div className="space-y-1 min-w-[120px]">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-none">Total Reçus</p>
                    <div className="text-xl font-bold text-rose-900 dark:text-rose-100">
                        {mockChartData.datasets[0].data.reduce((a, b) => a + b, 0)}
                    </div>
                </div>
                <div className="space-y-1 min-w-[140px]">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-none">Moyenne Quotidienne</p>
                    <div className="text-xl font-bold text-rose-900 dark:text-rose-100">
                        {Math.round(mockChartData.datasets[0].data.reduce((a, b) => a + b, 0) / 7)}
                    </div>
                </div>
                <div className="space-y-1 min-w-[150px]">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-none">Tendance</p>
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                        <TrendingUp size={16} />
                        <span>+18.5%</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 border-l border-rose-100/50 dark:border-rose-800/20 pl-6 h-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Reçus</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-300 dark:bg-rose-700 shadow-sm" />
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Envoyés</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
