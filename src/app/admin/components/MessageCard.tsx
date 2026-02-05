'use client';

import { Trash2, Heart, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Message } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageCardProps {
    message: Message;
    viewMode?: 'card' | 'table-row';
    onDelete?: (id: number) => void;
    delay?: number;
}

export default function MessageCard({
    message,
    viewMode = 'card',
    onDelete,
    delay = 0
}: MessageCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) onDelete(message.id);
    };

    if (viewMode === 'card') {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay }}
                onClick={toggleExpand}
                className={`bg-white/40 dark:bg-rose-950/20 backdrop-blur-md rounded-3xl p-5 border ${message.reported ? 'border-red-400/30' : 'border-rose-200/50 dark:border-rose-800/20'} hover:shadow-2xl hover:shadow-rose-400/10 transition-all group cursor-pointer`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-3">
                            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tighter bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-md">
                                #{message.id}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${message.sender === "Anonyme" ? 'bg-rose-500 text-white' : 'bg-blue-500 text-white'}`}>
                                {message.sender}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className={`text-sm md:text-base leading-relaxed ${isExpanded ? '' : 'line-clamp-2'} text-rose-900 dark:text-rose-100 font-medium whitespace-pre-wrap`}>
                                "{message.content}"
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-rose-100 dark:border-rose-800/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-200 dark:bg-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-300 ring-2 ring-white dark:ring-rose-900">
                            <User size={14} />
                        </div>
                        <div>
                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-tight">Destinataire</p>
                            <p className="text-xs font-bold text-rose-900 dark:text-rose-100">{message.receiver}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100/50 dark:bg-rose-900/40 rounded-full">
                            <Heart size={14} className="text-rose-500" fill="currentColor" />
                            <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                                {message.likes || 0}
                            </span>
                        </div>
                        <div className="text-rose-400">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <tr
                onClick={toggleExpand}
                className={`group hover:bg-rose-100/30 dark:hover:bg-rose-900/10 cursor-pointer transition-colors border-b border-rose-100/50 dark:border-rose-800/20 ${isExpanded ? 'bg-rose-50/50 dark:bg-rose-900/5' : ''}`}
            >
                <td className="py-5 px-6">
                    <span className="text-xs font-bold text-rose-400">#{message.id}</span>
                </td>
                <td className="py-5 px-6 max-w-xs">
                    <p className={`text-sm font-semibold text-rose-900 dark:text-rose-100 transition-colors ${isExpanded ? '' : 'truncate'} group-hover:text-rose-600`}>
                        {message.content}
                    </p>
                </td>
                <td className="py-5 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${message.sender === "Anonyme" ? 'bg-rose-500 text-white' : 'bg-blue-500 text-white'}`}>
                        {message.sender}
                    </span>
                </td>
                <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                        <User size={14} className="text-rose-400" />
                        <span className="text-sm font-bold text-rose-700 dark:text-rose-300">{message.receiver}</span>
                    </div>
                </td>
                <td className="py-5 px-6">
                    <span className="text-xs font-medium text-rose-500/70">{message.timestamp}</span>
                </td>
                <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown size={18} className="text-rose-400" />
                        </div>
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>
            <AnimatePresence>
                {isExpanded && (
                    <tr>
                        <td colSpan={6} className="p-0 border-b border-rose-100/50 dark:border-rose-800/20">
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden bg-white/20 dark:bg-white/5"
                            >
                                <div className="px-10 py-8 text-rose-900 dark:text-rose-100 text-base leading-relaxed font-medium whitespace-pre-wrap">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2 bg-rose-500 text-white rounded-xl">
                                            <MessageSquare size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Message Complet</p>
                                            <p className="text-lg">"{message.content}"</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-rose-200/20">
                                        <div className="flex items-center gap-2 text-xs text-rose-400">
                                            <Heart size={14} className="text-rose-500" />
                                            <span className="font-bold">{message.likes || 0} Likes</span>
                                        </div>
                                        {message.isAnonymous && (
                                            <div className="flex items-center gap-2 text-xs text-rose-400 font-bold uppercase tracking-tighter">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                Agent Anonyme
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
}
