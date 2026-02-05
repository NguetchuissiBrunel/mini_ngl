'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import LoadingScreen from '@/components/LoadingScreen';
import MessagesPage from '@/components/MessagesPage';
import type { Message } from '@/types/message';
import FloatingHearts from '@/components/FloatingHearts';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';


export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [likedMessages, setLikedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Charger les messages likés depuis le localStorage
    const savedLikes = localStorage.getItem('likedMessages');
    if (savedLikes) {
      setLikedMessages(JSON.parse(savedLikes));
    }

    // 2. Vérifier la visibilité
    const checkVisibility = async () => {
      try {
        const visibilityDoc = await getDoc(doc(db, 'config', 'visibility'));
        if (visibilityDoc.exists()) {
          setIsOpen(visibilityDoc.data().isOpen);
        } else {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la visibilité:", error);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkVisibility();
  }, []);

  useEffect(() => {
    // 3. Écouter les messages en temps réel si ouvert
    if (isOpen === true) {
      const q = query(collection(db, 'messages'), orderBy('created_at', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        setMessages(msgs);
      }, (error) => {
        console.error("Erreur lors de l'écoute des messages:", error);
      });

      return () => unsubscribe();
    }
  }, [isOpen]);

  const handleLike = async (messageId: string) => {
    if (likedMessages.includes(messageId)) return;

    try {
      // Mettre à jour Firestore
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        likes: increment(1)
      });

      // Mettre à jour le localStorage et l'état local
      const newLikedMessages = [...likedMessages, messageId];
      setLikedMessages(newLikedMessages);
      localStorage.setItem('likedMessages', JSON.stringify(newLikedMessages));
    } catch (error) {
      console.error("Erreur lors du like:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isOpen === false) {

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-300 flex items-center justify-center">
        {/* Background patterns */}
        <div className="absolute inset-0 hearts-bg opacity-100 pointer-events-none" />

        {/* Floating hearts animation */}
        <FloatingHearts />

        {/* Bouton de retour */}
        <Link
          href="/"
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-rose-950/60 backdrop-blur-md border border-white/50 dark:border-rose-950/30 shadow-lg transition-all hover:scale-110 active:scale-95 text-rose-600 dark:text-rose-500 pointer-events-auto cursor-pointer"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="relative z-10 px-4 text-center">
          <div className="bg-white/40 dark:bg-rose-950/40 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-rose-800/30 max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-500">
            <div className="relative inline-block mb-6">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                className="text-rose-500 animate-pulse"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="text-rose-500 w-10 h-10 fill-rose-500 animate-bounce" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-dancing font-bold text-rose-600 dark:text-rose-500 mb-6 drop-shadow-sm">
              Bientôt...
            </h1>

            <p className="text-xl sm:text-2xl text-rose-700 dark:text-rose-300 font-medium leading-relaxed italic">
              "Patience, l'amour arrive. Venez bientôt découvrir vos messages secrets..."
            </p>

            <div className="mt-8 flex justify-center gap-2">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MessagesPage
      messages={messages}
      onLike={handleLike}
      likedMessages={likedMessages}
    />
  );
}
