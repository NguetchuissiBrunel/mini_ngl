'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/context/ModalContext';
import {
    Info,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    X
} from 'lucide-react';

export default function CustomModal() {
    const { isOpen, hideModal, modalOptions } = useModal();

    if (!modalOptions) return null;

    const {
        title,
        message,
        type = 'info',
        onConfirm,
        onCancel,
        confirmLabel = 'Confirmer',
        cancelLabel = 'Annuler',
    } = modalOptions;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="w-12 h-12 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-12 h-12 text-rose-500" />;
            case 'confirm':
                return <HelpCircle className="w-12 h-12 text-pink-500" />;
            case 'info':
            default:
                return <Info className="w-12 h-12 text-blue-500" />;
        }
    };

    const getGradient = () => {
        switch (type) {
            case 'success':
                return 'from-green-500/10 to-emerald-500/10';
            case 'error':
                return 'from-rose-500/10 to-pink-500/10';
            case 'confirm':
                return 'from-pink-500/10 to-rose-500/10';
            case 'info':
            default:
                return 'from-blue-500/10 to-indigo-500/10';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel || hideModal}
                        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`relative w-full max-w-sm overflow-hidden bg-white/80 dark:bg-rose-950/40 backdrop-blur-2xl border border-white/50 dark:border-rose-900/30 rounded-[2.5rem] shadow-2xl transition-all`}
                    >
                        {/* Background Gradient Detail */}
                        <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${getGradient()} opacity-50`} />

                        {/* Content */}
                        <div className="relative p-8 flex flex-col items-center text-center">
                            {/* Close Button (always visible) */}
                            <button
                                onClick={onCancel || hideModal}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {/* Icon Section */}
                            <div className="mb-6 p-4 rounded-3xl bg-white dark:bg-rose-900/40 shadow-xl shadow-rose-400/5 ring-1 ring-black/5 dark:ring-white/5 animate-float">
                                {getIcon()}
                            </div>

                            {/* Text Section */}
                            <div className="space-y-2 mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-rose-100 italic font-allura">
                                    {title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-rose-300 leading-relaxed font-medium">
                                    {message}
                                </p>
                            </div>

                            {/* Actions Section */}
                            <div className="flex gap-3 w-full">
                                {type === 'confirm' ? (
                                    <>
                                        <button
                                            onClick={onCancel || hideModal}
                                            className="flex-1 px-6 py-3 rounded-2xl bg-gray-100 dark:bg-rose-900/40 text-gray-600 dark:text-rose-300 font-bold text-sm transition-all hover:bg-gray-200 dark:hover:bg-rose-900/60 active:scale-95"
                                        >
                                            {cancelLabel}
                                        </button>
                                        <button
                                            onClick={onConfirm || hideModal}
                                            className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/20"
                                        >
                                            {confirmLabel}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={hideModal}
                                        className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/20"
                                    >
                                        OK
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
