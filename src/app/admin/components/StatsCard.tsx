import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'rose' | 'pink' | 'red' | 'green' | 'blue';
    delay?: number;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    color = 'rose',
    delay = 0
}: StatsCardProps) {
    const colorClasses = {
        rose: {
            bg: 'bg-rose-100/50 dark:bg-rose-900/30',
            text: 'text-rose-600 dark:text-rose-400',
            value: 'text-rose-800 dark:text-rose-100',
            glow: 'shadow-rose-400/20 dark:shadow-rose-500/10'
        },
        pink: {
            bg: 'bg-pink-100/50 dark:bg-pink-900/30',
            text: 'text-pink-600 dark:text-pink-400',
            value: 'text-pink-800 dark:text-pink-100',
            glow: 'shadow-pink-400/20 dark:shadow-pink-500/10'
        },
        red: {
            bg: 'bg-red-100/50 dark:bg-red-900/30',
            text: 'text-red-600 dark:text-red-400',
            value: 'text-red-800 dark:text-red-100',
            glow: 'shadow-red-400/20 dark:shadow-red-500/10'
        },
        green: {
            bg: 'bg-green-100/50 dark:bg-green-900/30',
            text: 'text-green-600 dark:text-green-400',
            value: 'text-green-800 dark:text-green-100',
            glow: 'shadow-green-400/20 dark:shadow-green-500/10'
        },
        blue: {
            bg: 'bg-blue-100/50 dark:bg-blue-900/30',
            text: 'text-blue-600 dark:text-blue-400',
            value: 'text-blue-800 dark:text-blue-100',
            glow: 'shadow-blue-400/20 dark:shadow-blue-500/10'
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-white/40 dark:bg-rose-950/20 backdrop-blur-md rounded-3xl p-6 border border-rose-200/50 dark:border-rose-800/20 shadow-xl ${colorClasses[color].glow} transition-all duration-300 group`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-rose-600/60 dark:text-rose-400/60 text-xs sm:text-sm font-bold uppercase tracking-widest">
                        {title}
                    </p>
                    <p className={`text-3xl sm:text-4xl font-bold mt-2 ${colorClasses[color].value}`}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>

                    {trend && (
                        <div className="flex items-center gap-1 mt-3">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'}`}>
                                {trend.isPositive ? '+' : ''}{trend.value}%
                            </span>
                            <span className="text-[10px] sm:text-xs text-rose-500/50 dark:text-rose-500/40 font-medium">
                                vs hier
                            </span>
                        </div>
                    )}
                </div>

                <div className={`p-4 rounded-2xl ${colorClasses[color].bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClasses[color].text}`} />
                </div>
            </div>
        </motion.div>
    );
}
