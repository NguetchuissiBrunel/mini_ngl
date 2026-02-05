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
  const [displayMessages, setDisplayMessages] = useState<boolean | null>(null);
  const [likedMessages, setLikedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Charger les messages likés depuis le localStorage
    const savedLikes = localStorage.getItem('likedMessages');
    if (savedLikes) {
      setLikedMessages(JSON.parse(savedLikes));
    }

    // 2. Vérifier la visibilité (displayMessages et isOpen pour compatibilité)
    const unsubscribeVisibility = onSnapshot(doc(db, 'config', 'visibility'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // On considère displayMessages par défaut, sinon isOpen
        setDisplayMessages(data.displayMessages ?? data.isOpen ?? true);
      } else {
        setDisplayMessages(true);
      }
      setIsLoading(false);
    });

    return () => unsubscribeVisibility();
  }, []);

  useEffect(() => {
    // 3. Écouter les messages en temps réel si l'affichage est activé
    if (displayMessages === true) {
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
    } else {
      setMessages([]);
    }
  }, [displayMessages]);

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

  // On retourne toujours MessagesPage, mais avec une liste vide si displayMessages est false
  return (
    <MessagesPage
      messages={messages}
      onLike={handleLike}
      likedMessages={likedMessages}
      isVisible={displayMessages ?? true}
    />
  );
}
