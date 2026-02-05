'use client';

import { Eye, Trash2, Heart, Flag, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Message } from '../data/mockData';

interface MessageCardProps {
    message: Message;
    viewMode?: 'card' | 'table-row' | 'mobile';
    onView?: (id: number) => void;
    onDelete?: (id: number) => void;
    onApprove?: (id: number) => void;
    onReport?: (id: number) => void;
}

export default function MessageCard({
    message,
    viewMode = 'card',
    onView,
    onDelete,
    onApprove,
    onReport
}: MessageCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleView = () => {
        if (onView) onView(message.id);
        else setIsExpanded(!isExpanded);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(message.id);
    };

    const handleApprove = () => {
        if (onApprove) onApprove(message.id);
    };

    const handleReport = () => {
        if (onReport) onReport(message.id);
    };

    // Version mobile/tablette (card)
    if (viewMode === 'card' || viewMode === 'mobile') {
        return (
            <div className={`bg-white/50 dark:bg-rose-900/30 rounded-xl p-4 border ${message.reported ? 'border-red-200/50 dark:border-red-800/50' : 'border-rose-200/50 dark:border-rose-800/50'} hover:shadow-sm transition-all`}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-rose-600/70 dark:text-rose-400/70">
                                ID: #{message.id}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${message.sender === "Anonyme" ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}`}>
                                {message.sender}
                            </span>
                            {message.reported && (
                                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs font-medium">
                                    Signalé
                                </span>
                            )}
                        </div>

                        <div className="mb-3">
                            <p className={`text-sm ${isExpanded ? '' : 'line-clamp-2'} text-rose-800 dark:text-rose-300`}>
                                "{message.content}"
                            </p>
                            {!isExpanded && message.content.length > 60 && (
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 mt-1"
                                >
                                    Voir plus
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                        <button
                            onClick={handleView}
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
                            title="Voir les détails"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            title="Supprimer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-rose-100/50 dark:border-rose-800/30">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-rose-600/80 dark:text-rose-400/80">
                            Pour: <span className="font-medium text-rose-700 dark:text-rose-300">{message.receiver}</span>
                        </p>
                        <p className="text-xs text-rose-500/60 dark:text-rose-500/60 mt-1">
                            {message.timestamp}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
                            <span className="text-xs text-rose-600 dark:text-rose-400">
                                {message.likes || 0}
                            </span>
                        </div>

                        {message.reported ? (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleApprove}
                                    className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                    title="Approuver"
                                >
                                    <Check className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    title="Supprimer"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleReport}
                                className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
                                title="Signaler"
                            >
                                <Flag className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Version desktop (table row) - simplifiée pour le tableau
    return (
        <tr className="hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors">
            <td className="py-4 px-6 text-rose-600 dark:text-rose-400">#{message.id}</td>
            <td className="py-4 px-6 max-w-xs">
                <div className="truncate" title={message.content}>
                    {message.content}
                </div>
            </td>
            <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm ${message.sender === "Anonyme" ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}`}>
                    {message.sender}
                </span>
            </td>
            <td className="py-4 px-6 text-rose-700 dark:text-rose-300">{message.receiver}</td>
            <td className="py-4 px-6 text-rose-600 dark:text-rose-400 text-sm">{message.timestamp}</td>
            <td className="py-4 px-6">
                {message.reported ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-sm">
                        Signalé
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 text-sm">
                        OK
                    </span>
                )}
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleView}
                        className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
                        title="Voir les détails"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        title="Supprimer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}