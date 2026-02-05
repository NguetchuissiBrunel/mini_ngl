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
import MessagesPage from '@/components/MessagesPage';
import type { Message } from '@/types/message';

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
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="animate-pulse text-rose-600 font-medium">Chargement...</div>
      </div>
    );
  }

  if (isOpen === false) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-rose-600 mb-4">Indisponible</h1>
          <p className="text-gray-600">Les messages ne sont pas encore disponibles</p>
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
