'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'info' | 'success' | 'error' | 'confirm';

interface ModalOptions {
    title?: string;
    message: string;
    type?: ModalType;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}

interface ModalContextType {
    showAlert: (message: string, title?: string, type?: ModalType) => void;
    showConfirm: (message: string, onConfirm: () => void, title?: string, options?: Partial<ModalOptions>) => void;
    hideModal: () => void;
    modalOptions: ModalOptions | null;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

    const showAlert = (message: string, title?: string, type: ModalType = 'info') => {
        setModalOptions({
            message,
            title: title || (type === 'error' ? 'Erreur' : type === 'success' ? 'Succès' : 'Information'),
            type,
        });
        setIsOpen(true);
    };

    const showConfirm = (
        message: string,
        onConfirm: () => void,
        title: string = 'Confirmation',
        options: Partial<ModalOptions> = {}
    ) => {
        setModalOptions({
            message,
            title,
            type: 'confirm',
            onConfirm: () => {
                onConfirm();
                setIsOpen(false);
            },
            onCancel: () => {
                if (options.onCancel) options.onCancel();
                setIsOpen(false);
            },
            confirmLabel: options.confirmLabel || 'Confirmer',
            cancelLabel: options.cancelLabel || 'Annuler',
        });
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ showAlert, showConfirm, hideModal, modalOptions, isOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
