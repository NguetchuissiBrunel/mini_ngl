import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'rose' | 'pink' | 'red' | 'green' | 'blue';
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    color = 'rose'
}: StatsCardProps) {
    const colorClasses = {
        rose: {
            bg: 'bg-rose-100 dark:bg-rose-900/50',
            text: 'text-rose-600 dark:text-rose-400',
            value: 'text-rose-800 dark:text-rose-300',
        },
        pink: {
            bg: 'bg-pink-100 dark:bg-pink-900/50',
            text: 'text-pink-600 dark:text-pink-400',
            value: 'text-pink-800 dark:text-pink-300',
        },
        red: {
            bg: 'bg-red-100 dark:bg-red-900/50',
            text: 'text-red-600 dark:text-red-400',
            value: 'text-red-800 dark:text-red-300',
        },
        green: {
            bg: 'bg-green-100 dark:bg-green-900/50',
            text: 'text-green-600 dark:text-green-400',
            value: 'text-green-800 dark:text-green-300',
        },
        blue: {
            bg: 'bg-blue-100 dark:bg-blue-900/50',
            text: 'text-blue-600 dark:text-blue-400',
            value: 'text-blue-800 dark:text-blue-300',
        },
    };

    return (
        <div className="bg-white/70 dark:bg-rose-950/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-200/50 dark:border-rose-800/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-rose-600/80 dark:text-rose-400/80 text-xs sm:text-sm font-medium">
                        {title}
                    </p>
                    <p className={`text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 ${colorClasses[color].value}`}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>

                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {trend.isPositive ? '+' : ''}{trend.value}%
                            </span>
                            <span className="text-xs text-rose-500/60 dark:text-rose-500/60">
                                vs hier
                            </span>
                        </div>
                    )}
                </div>

                <div className={`p-2 sm:p-3 rounded-full ${colorClasses[color].bg}`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses[color].text}`} />
                </div>
            </div>
        </div>
    );
}