'use client';

import { useState, useMemo } from 'react';
import {
    Users,
    MessageSquare,
    Search,
    Shield,
    Calendar,
    LayoutDashboard,
    Bell,
    CheckCircle2,
    Clock,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

// Local Components
import StatsCard from './components/StatsCard';
import MessageCard from './components/MessageCard';
import ActivityChart from './components/ActivityChart';

// Icons for dynamic display
import FloatingHearts from '@/components/FloatingHearts';

// Mock Data
import {
    mockMessages,
    mockStats,
    getAnonymousMessages
} from './data/mockData';

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'today' | 'anonymous' | 'date'>('all');
    const [selectedDate, setSelectedDate] = useState('');

    // Filtered dataset
    const filteredMessages = useMemo(() => {
        let result = [...mockMessages];

        // Type Filter
        if (filter === 'today') result = result.filter(m => m.timestamp.includes('2024-02-14'));
        if (filter === 'anonymous') result = result.filter(m => m.isAnonymous);
        if (filter === 'date' && selectedDate) {
            result = result.filter(m => m.timestamp.includes(selectedDate));
        }

        // Search Filter
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            result = result.filter(m =>
                m.sender.toLowerCase().includes(query) ||
                m.receiver.toLowerCase().includes(query) ||
                m.content.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchTerm, filter, selectedDate]);

    // Engagement calculate
    const engagement = (mockStats.totalMessages / (mockStats.activeUsers || 1)).toFixed(1);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-500 overflow-x-hidden p-4 md:p-8">
            {/* Background elements */}
            <div className="fixed inset-0 hearts-bg opacity-30 pointer-events-none" />
            <FloatingHearts />

            <div className="relative z-10 max-w-7xl mx-auto space-y-10">

                {/* Navigation Bar / Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/40 dark:bg-rose-950/20 backdrop-blur-xl border border-white/50 dark:border-rose-800/10 p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-rose-400/5 transition-all"
                >
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-rose-500 text-white rounded-3xl shadow-lg shadow-rose-500/30 ring-4 ring-rose-500/10">
                            <Shield size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-rose-900 dark:text-rose-100 tracking-tight">
                                Admin Console
                            </h1>
                            <p className="text-xs md:text-sm text-rose-600/60 dark:text-rose-400/60 font-bold uppercase tracking-widest">
                                Mini NGL Dashboard
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 group-focus-within:text-rose-600 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pl-12 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-rose-950/40 border border-transparent focus:border-rose-400/40 focus:ring-4 focus:ring-rose-400/10 outline-none dark:text-white transition-all font-medium text-sm"
                            />
                        </div>
                        <button className="p-3 bg-white/80 dark:bg-rose-900/40 text-rose-500 rounded-2xl border border-rose-100 dark:border-rose-800/30 hover:bg-rose-500 hover:text-white transition-all shadow-sm relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-rose-900 rounded-full animate-ping" />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-rose-900 rounded-full" />
                        </button>
                    </div>
                </motion.header>

                {/* Action Bar (Filter) */}
                <div className="flex flex-wrap items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex flex-wrap items-center gap-3">
                        {[
                            { id: 'all', label: 'Global', icon: LayoutDashboard, count: mockMessages.length },
                            { id: 'today', label: 'Aujourd\'hui', icon: Calendar, count: mockStats.todayMessages },
                            { id: 'anonymous', label: 'Anonymes', icon: Users, count: getAnonymousMessages().length },
                        ].map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${filter === f.id
                                    ? 'bg-rose-500 text-white border-transparent shadow-lg shadow-rose-500/20 scale-105'
                                    : 'bg-white/40 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/10 hover:bg-rose-50 dark:hover:bg-rose-900/40'
                                    }`}
                            >
                                <f.icon size={16} />
                                <span>{f.label}</span>
                                <span className={`px-2 py-0.5 rounded-lg text-[10px] ${filter === f.id ? 'bg-white text-rose-500' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300'}`}>
                                    {f.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-white/60 dark:bg-rose-950/40 p-2 rounded-full border border-rose-200/50 dark:border-rose-800/20 ml-auto shadow-sm group hover:border-rose-400/50 hover:bg-white/80 dark:hover:bg-rose-950/60 transition-all cursor-pointer relative overflow-hidden">
                        <Calendar size={16} className="text-rose-500 ml-2 group-hover:scale-110 transition-transform relative z-0" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setFilter('date');
                            }}
                            className="bg-transparent text-sm font-bold text-rose-700 dark:text-rose-300 outline-none pr-2 cursor-pointer [color-scheme:light] dark:[color-scheme:dark] relative z-10"
                        />
                        {filter === 'date' && (
                            <button
                                onClick={() => {
                                    setFilter('all');
                                    setSelectedDate('');
                                }}
                                className="p-1 px-3 bg-rose-500 text-white rounded-full text-[10px] font-bold mr-1 hover:bg-rose-600 transition-colors"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Stats & Chart */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <StatsCard
                                title="Communication Totale"
                                value={mockStats.totalMessages}
                                icon={MessageSquare}
                                color="rose"
                                trend={{ value: 12.5, isPositive: true }}
                                delay={0.1}
                            />
                            <StatsCard
                                title="Moyenne Engagement"
                                value={`${engagement} msg`}
                                icon={Zap}
                                color="pink"
                                trend={{ value: 5.2, isPositive: true }}
                                delay={0.2}
                            />
                        </div>

                        <ActivityChart />

                    </div>

                    {/* Right Column: Messages List */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Desktop List */}
                        <div className="hidden md:block bg-white/40 dark:bg-rose-950/20 backdrop-blur-xl rounded-[2.5rem] border border-white/50 dark:border-rose-800/10 overflow-hidden shadow-2xl transition-all">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-rose-100/50 dark:bg-rose-900/30 border-b border-rose-200/30 dark:border-rose-800/30">
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">ID</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Message</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Expéditeur</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Destinataire</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-5 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-rose-100 dark:divide-rose-800/20">
                                    {filteredMessages.length > 0 ? filteredMessages.map((m) => (
                                        <MessageCard
                                            key={m.id}
                                            message={m}
                                            viewMode="table-row"
                                        />
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="py-20 text-center text-rose-400 font-bold italic opacity-40">
                                                Aucun message correspondant à votre recherche.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {filteredMessages.map((m) => (
                                <MessageCard
                                    key={m.id}
                                    message={m}
                                    viewMode="card"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <footer className="pt-10 pb-6 text-center">
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
                        © {new Date().getFullYear()} Mini NGL Advanced Management • Secure Environment
                    </p>
                </footer>
            </div>
        </div>
    );
}
