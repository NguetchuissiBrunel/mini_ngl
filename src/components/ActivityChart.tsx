'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { mockChartData } from '../data/mockData';

export default function ActivityChart() {
    const [timeRange, setTimeRange] = useState('week');

    const maxValue = Math.max(...mockChartData.datasets[0].data);

    return (
        <div className="bg-white/70 dark:bg-rose-950/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-200/50 dark:border-rose-800/50 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                        Activité des messages
                    </h2>
                    <p className="text-sm text-rose-600/70 dark:text-rose-400/70 mt-1">
                        Évolution sur 7 jours
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {['week', 'month', 'quarter'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                    ? 'bg-rose-500 dark:bg-rose-600 text-white'
                                    : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800'
                                }`}
                        >
                            {range === 'week' ? '7j' : range === 'month' ? '30j' : '90j'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Graphique simplifié avec barres CSS */}
            <div className="h-48 sm:h-64">
                <div className="flex items-end justify-between h-full gap-1 sm:gap-2 px-2 sm:px-4">
                    {mockChartData.labels.map((label, index) => {
                        const value1 = mockChartData.datasets[0].data[index];
                        const value2 = mockChartData.datasets[1].data[index];
                        const height1 = (value1 / maxValue) * 80;
                        const height2 = (value2 / maxValue) * 80;

                        return (
                            <div key={label} className="flex flex-col items-center flex-1 h-full">
                                <div className="flex items-end justify-center w-full gap-0.5 sm:gap-1 h-5/6">
                                    <div
                                        className="w-1/2 bg-rose-400 dark:bg-rose-500 rounded-t-sm transition-all hover:opacity-80"
                                        style={{ height: `${height1}%` }}
                                        title={`Reçus: ${value1}`}
                                    />
                                    <div
                                        className="w-1/2 bg-rose-300 dark:bg-rose-600 rounded-t-sm transition-all hover:opacity-80"
                                        style={{ height: `${height2}%` }}
                                        title={`Envoyés: ${value2}`}
                                    />
                                </div>
                                <span className="text-xs text-rose-600/70 dark:text-rose-400/70 mt-2">
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Légende */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-rose-400 dark:bg-rose-500 rounded-sm" />
                        <span className="text-xs sm:text-sm text-rose-600 dark:text-rose-400">
                            Messages reçus
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-rose-300 dark:bg-rose-600 rounded-sm" />
                        <span className="text-xs sm:text-sm text-rose-600 dark:text-rose-400">
                            Messages envoyés
                        </span>
                    </div>
                </div>
            </div>

            {/* Statistiques résumées */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-rose-100/50 dark:border-rose-800/30">
                <div className="text-center">
                    <p className="text-xs text-rose-600/70 dark:text-rose-400/70">Total cette semaine</p>
                    <p className="text-lg sm:text-xl font-bold text-rose-800 dark:text-rose-300 mt-1">
                        {mockChartData.datasets[0].data.reduce((a, b) => a + b, 0)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-rose-600/70 dark:text-rose-400/70">Maximum quotidien</p>
                    <p className="text-lg sm:text-xl font-bold text-rose-800 dark:text-rose-300 mt-1">
                        {maxValue}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-rose-600/70 dark:text-rose-400/70">Tendance</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            +24%
                        </span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-xs text-rose-600/70 dark:text-rose-400/70">Moyenne/jour</p>
                    <p className="text-lg sm:text-xl font-bold text-rose-800 dark:text-rose-300 mt-1">
                        {Math.round(mockChartData.datasets[0].data.reduce((a, b) => a + b, 0) / 7)}
                    </p>
                </div>
            </div>
        </div>
    );
}