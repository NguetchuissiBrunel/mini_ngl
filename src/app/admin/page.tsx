'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    Zap,
    ToggleLeft,
    ToggleRight,
    Loader2,
    TrendingUp,
    Filter,
    ArrowUpDown,
    LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Local Components
import StatsCard from './components/StatsCard';
import MessageCard from './components/MessageCard';
import ActivityChart from './components/ActivityChart';

// Icons for dynamic display
import FloatingHearts from '@/components/FloatingHearts';
import { Message } from '@/types/message';
import LoadingScreen from '@/components/LoadingScreen';

type SortOption = 'date' | 'likes';

export default function AdminPage() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [displayMessages, setDisplayMessages] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'today' | 'date'>('all');
    const [sortBy, setSortBy] = useState<SortOption>('date');
    const [selectedDate, setSelectedDate] = useState('');
    const { showAlert, showConfirm } = useModal();
    const router = useRouter();

    useEffect(() => {
        // Authentification Check
        const auth = localStorage.getItem('isAdminAuthenticated');
        if (auth !== 'true') {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    useEffect(() => {
        if (isAuthenticated !== true) return;

        // 1. Écouter les messages en temps réel
        const q = query(collection(db, 'messages'), orderBy('created_at', 'desc'));
        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Message[];
            setMessages(msgs);
            setIsLoading(false);
        }, (error) => {
            console.warn("Erreur Firestore:", error);
            setMessages([]);
            setIsLoading(false);
        });

        // 2. Écouter la visibilité en temps réel
        const unsubscribeVisibility = onSnapshot(doc(db, 'config', 'visibility'), (doc) => {
            if (doc.exists()) {
                setDisplayMessages(doc.data().displayMessages ?? doc.data().isOpen ?? true);
            } else {
                setDisplayMessages(true);
            }
        });

        return () => {
            unsubscribeMessages();
            unsubscribeVisibility();
        };
    }, [isAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        router.push('/login');
    };

    const togglePublicVisibility = async () => {
        if (displayMessages === null) return;
        try {
            const visibilityRef = doc(db, 'config', 'visibility');
            await updateDoc(visibilityRef, {
                displayMessages: !displayMessages,
                isOpen: true // Force le site à rester toujours ouvert
            });
        } catch (error) {
            console.error("Erreur lors du changement de visibilité:", error);
        }
    };

    const handleDelete = async (id: string) => {
        showConfirm(
            'Voulez-vous vraiment supprimer ce message ?',
            async () => {
                try {
                    await deleteDoc(doc(db, 'messages', id));
                    showAlert('Message supprimé avec succès.', 'Supprimé', 'success');
                } catch (error) {
                    console.error("Erreur lors de la suppression:", error);
                    showAlert("Erreur lors de la suppression du message.", "Erreur", "error");
                }
            },
            'Confirmation de suppression'
        );
    };

    // Filtered and Sorted dataset
    const filteredMessages = useMemo(() => {
        let result = [...messages];

        // Type Filter
        if (filter === 'today') {
            const today = new Date().toLocaleDateString('fr-FR');
            result = result.filter(m => {
                const date = m.created_at?.toDate ? m.created_at.toDate().toLocaleDateString('fr-FR') : '';
                return date === today;
            });
        }

        if (filter === 'date' && selectedDate) {
            const targetDate = new Date(selectedDate).toLocaleDateString('fr-FR');
            result = result.filter(m => {
                const date = m.created_at?.toDate ? m.created_at.toDate().toLocaleDateString('fr-FR') : '';
                return date === targetDate;
            });
        }

        // Search Filter
        if (searchTerm) {
            const queryStr = searchTerm.toLowerCase();
            result = result.filter(m =>
                m.pseudo?.toLowerCase().includes(queryStr) ||
                m.destinataire?.toLowerCase().includes(queryStr) ||
                m.content?.toLowerCase().includes(queryStr)
            );
        }

        // Sorting
        if (sortBy === 'likes') {
            result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else {
            // Default is date desc, already handled by Firestore query but good to have safety
            result.sort((a, b) => {
                const dateA = a.created_at?.toDate?.()?.getTime() || 0;
                const dateB = b.created_at?.toDate?.()?.getTime() || 0;
                return dateB - dateA;
            });
        }

        return result;
    }, [messages, searchTerm, filter, selectedDate, sortBy]);

    const stats = useMemo(() => {
        const now = new Date();
        const today = now.toLocaleDateString('fr-FR');

        // Calculate daily averages for the chart (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - (6 - i));
            return d.toLocaleDateString('fr-FR');
        });

        const chartData = last7Days.map(dateStr => {
            return messages.filter(m => m.created_at?.toDate?.().toLocaleDateString('fr-FR') === dateStr).length;
        });

        const dayLabels = last7Days.map(d => {
            const date = new Date(d.split('/').reverse().join('-'));
            return date.toLocaleDateString('fr-FR', { weekday: 'short' });
        });

        return {
            totalMessages: messages.length,
            todayMessages: messages.filter(m => m.created_at?.toDate?.().toLocaleDateString('fr-FR') === today).length,
            chart: {
                labels: dayLabels,
                datasets: [{ label: 'Messages', data: chartData }]
            },
            totalLikes: messages.reduce((acc, m) => acc + (m.likes || 0), 0)
        };
    }, [messages]);

    const averageLikes = stats.totalMessages > 0 ? (stats.totalLikes / stats.totalMessages).toFixed(1) : '0';

    if (isAuthenticated === null) {
        return null;
    }

    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-500 overflow-x-hidden p-4 md:p-8">
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
                                Console Admin
                            </h1>
                            <p className="text-xs md:text-sm text-rose-600/60 dark:text-rose-400/60 font-bold uppercase tracking-widest">
                                Gestion TellMi
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="flex items-center gap-3 bg-white/60 dark:bg-rose-950/40 p-2 px-4 rounded-2xl border border-rose-200/50 dark:border-rose-800/20 shadow-sm">
                            <span className="text-xs font-bold text-rose-900 dark:text-rose-100 uppercase tracking-tighter">
                                Affichage des messages: {displayMessages ? 'Activé' : 'Désactivé'}
                            </span>
                            <button
                                onClick={togglePublicVisibility}
                                className={`transition-colors duration-300 ${displayMessages ? 'text-green-500' : 'text-rose-400'}`}
                                title={displayMessages ? "Masquer les messages sur la page publique" : "Afficher les messages sur la page publique"}
                            >
                                {displayMessages ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-all font-bold text-sm shadow-lg shadow-rose-500/20"
                            title="Se déconnecter"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </button>

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
                    </div>
                </motion.header>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Action Bar (Filter) */}
                    <div className="flex flex-wrap items-center gap-3">
                        {[
                            { id: 'all', label: 'Global', icon: LayoutDashboard, count: messages.length },
                            { id: 'today', label: 'Aujourd\'hui', icon: Calendar, count: stats.todayMessages },
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

                        <div className="h-8 w-[1px] bg-rose-200 dark:bg-rose-800 hidden sm:block mx-1" />

                        <button
                            onClick={() => setSortBy(sortBy === 'date' ? 'likes' : 'date')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${sortBy === 'likes'
                                ? 'bg-amber-500 text-white border-transparent'
                                : 'bg-white/40 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200/50'
                                }`}
                        >
                            <ArrowUpDown size={16} />
                            <span>{sortBy === 'likes' ? 'Top Likes' : 'Plus récents'}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3 bg-white/60 dark:bg-rose-950/40 p-2 rounded-full border border-rose-200/50 dark:border-rose-800/20 shadow-sm group hover:border-rose-400/50 transition-all cursor-pointer relative">
                        <Calendar size={16} className="text-rose-500 ml-2" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setFilter('date');
                            }}
                            className="bg-transparent text-sm font-bold text-rose-700 dark:text-rose-300 outline-none pr-2 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                        />
                        {filter === 'date' && (
                            <button
                                onClick={() => {
                                    setFilter('all');
                                    setSelectedDate('');
                                }}
                                className="p-1 px-3 bg-rose-500 text-white rounded-full text-[10px] font-bold mr-1 hover:bg-rose-600 transition-colors"
                            >
                                X
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4 space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <StatsCard
                                title="Messages Réels"
                                value={stats.totalMessages}
                                icon={MessageSquare}
                                color="rose"
                                delay={0.1}
                            />
                            <StatsCard
                                title="Moyenne Likes"
                                value={`${averageLikes} / msg`}
                                icon={Zap}
                                color="pink"
                                delay={0.2}
                            />
                        </div>

                        <ActivityChart data={stats.chart} />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <div className="hidden md:block bg-white/40 dark:bg-rose-950/20 backdrop-blur-xl rounded-[2.5rem] border border-white/50 dark:border-rose-800/10 overflow-hidden shadow-2xl transition-all">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-rose-100/50 dark:bg-rose-900/30 border-b border-rose-200/30 dark:border-rose-800/30">
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Message</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Pseudo</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Destinataire</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">Likes</th>
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
                                            onDelete={handleDelete}
                                        />
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="py-20 text-center text-rose-400 font-bold italic opacity-40">
                                                Aucun message trouvé.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:hidden space-y-4">
                            {filteredMessages.map((m) => (
                                <MessageCard
                                    key={m.id}
                                    message={m}
                                    viewMode="card"
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="pt-10 pb-6 text-center">
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
                        © {new Date().getFullYear()} Console Admin TellMi • Données Live
                    </p>
                </footer>
            </div>
        </div>
    );
}

