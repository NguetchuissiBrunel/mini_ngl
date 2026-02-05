'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { Share2, ArrowLeft } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';
import Link from 'next/link';

import { Message } from '@/types/message';

interface MessageCardProps {
  message: Message;
  onLike: (id: string) => void;
  isLiked: boolean;
}

interface MessagesPageProps {
  messages: Message[];
  onLike: (id: string) => void;
  likedMessages: string[];
}

// Composant pour un message individuel
const MessageCard = ({ message, onLike, isLiked }: MessageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Extraire les valeurs directement
  const pseudo = message.pseudo;
  const nom = message.destinataire;
  const genre = message.genre;
  const contenu = message.content;
  const likesCount = message.likes;

  // Déterminer les images selon le genre
  const getImages = () => {
    if (genre === 'femme') {
      return {
        expediteur: '/love-boy.png', // homme → femme
        destinataire: '/cute-girl.png'
      };
    } else {
      return {
        expediteur: '/love-girl.png', // femme → homme
        destinataire: '/cute-boy.png'
      };
    }
  };

  const images = getImages();

  const handleShare = async () => {
    if (!cardRef.current || isSharing) return;

    // Vérifier si nous sommes dans un contexte sécurisé (requis pour navigator.share)
    if (!window.isSecureContext && typeof navigator.share !== 'undefined') {
      alert("Le partage natif nécessite une connexion HTTPS sécurisée.");
      // On continue quand même vers le fallback (téléchargement)
    }

    setIsSharing(true);
    try {
      // Attendre que les polices soient chargées pour un rendu parfait
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Import dynamique de html-to-image
      const { toBlob } = await import('html-to-image');

      const options = {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff',
        filter: (node: HTMLElement) => node.id !== 'share-button',
        style: {
          backdropFilter: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        }
      };

      // Capturer le composant directement en Blob (plus performant que PNG -> fetch)
      const blob = await toBlob(cardRef.current, options);
      if (!blob) throw new Error("Capture échouée");

      const file = new File([blob], `message-secret.png`, { type: 'image/png' });

      // Partage direct
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Message Secret',
            text: `Regarde ce message secret ! 💌`,
          });
        } catch (shareError: any) {
          // Ne pas afficher d'erreur si l'utilisateur a simplement annulé
          if (shareError.name !== 'AbortError') {
            throw shareError;
          }
        }
      } else {
        // Fallback téléchargement
        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `message-secret.png`;
        link.href = dataUrl;
        link.click();
        URL.revokeObjectURL(dataUrl);
        alert('L\'image a été téléchargée. Vous pouvez maintenant l\'envoyer sur WhatsApp.');
      }

    } catch (error: any) {
      console.error('Erreur lors du partage:', error);
      alert(`Une erreur est survenue lors du partage : ${error.message || 'Erreur technique'}`);
    } finally {
      setIsSharing(false);
    }
  };

  const handleLike = () => {
    if (message.id && !isLiked) {
      onLike(message.id);
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-rose-950/30 backdrop-blur-sm rounded-3xl shadow-lg p-4 sm:p-6 relative border border-rose-200/50 dark:border-rose-600/30 transition-colors"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Images et noms */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        {/* Image expéditeur */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <img
            src={images.expediteur}
            alt="Expéditeur"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-pink-300 dark:border-rose-500 flex-shrink-0"
          />
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-pink-600 dark:text-rose-400 text-center break-words w-full leading-tight">
            {pseudo}
          </p>
        </div>

        {/* Cœur spécial embellissant avec animation et décorations */}
        <div className="relative flex-shrink-0">
          {/* Cœur principal avec gradient et ombre */}
          <div className="relative">
            {/* Effet de halo derrière le cœur */}
            <div className="absolute inset-0 animate-pulse-slow">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-pink-300/50 dark:text-rose-400/30 blur-sm"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Cœur principal avec gradient */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="url(#heart-gradient)"
              className="relative z-10 drop-shadow-lg filter animate-float"
            >
              {/* Définition du gradient */}
              <defs>
                <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                  <stop offset="50%" stopColor="#f472b6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f9a8d4" stopOpacity="1" />
                </linearGradient>
                <filter id="heart-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                filter="url(#heart-glow)"
              />
            </svg>

            {/* Petits cœurs volants autour */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#f472b6"
              className="absolute -top-2 -right-1 animate-bounce-slow"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#ec4899"
              className="absolute -bottom-1 -left-1 animate-bounce-slow-delayed"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          {/* Flèche stylisée avec animation */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse"
          >
            <path
              d="M5 12h14m-6-6l6 6-6 6"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Points décoratifs */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping-slow" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-400 rounded-full animate-ping-slow-delayed" />
        </div>

        {/* Image destinataire */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <img
            src={images.destinataire}
            alt="Destinataire"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-pink-400 dark:border-rose-600 flex-shrink-0"
          />
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-pink-700 dark:text-rose-300 text-center break-words w-full leading-tight">
            {nom}
          </p>
        </div>
      </div>

      {/* Bulle de message */}
      <div className="relative bg-pink-50 dark:bg-rose-900/60 rounded-2xl p-4 sm:p-6 shadow-inner">
        <p className="text-gray-800 dark:text-rose-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {contenu}
        </p>
      </div>

      {/* Boutons en bas - Like et Partager */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mt-3 sm:mt-4">
        {/* Bouton Like à gauche */}
        <button
          onClick={handleLike}
          disabled={isLiked}
          className={`flex items-center gap-1.5 sm:gap-2 bg-transparent hover:bg-pink-50 dark:hover:bg-rose-900/30 text-pink-600 dark:text-rose-400 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base ${isLiked ? 'opacity-70 cursor-not-allowed' : ''}`}
          title={isLiked ? "Déjà liké" : "J'aime"}
        >
          {isLiked || likesCount > 0 ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-500 dark:text-rose-500 sm:w-5 sm:h-5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-pink-600 dark:text-rose-400 sm:w-5 sm:h-5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
          <span className="font-medium">{isLiked ? 'Déjà liké' : (likesCount > 0 ? likesCount : 'Like')}</span>
        </button>

        {/* Bouton Partager à droite */}
        <button
          id="share-button"
          onClick={handleShare}
          disabled={isSharing}
          className={`flex items-center gap-1.5 sm:gap-2 bg-pink-500 hover:bg-pink-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white px-3 sm:px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isSharing ? 'opacity-70 cursor-wait' : 'hover:scale-105 active:scale-95'} text-sm sm:text-base`}
          title={isSharing ? "Génération de l'image..." : "Partager sur WhatsApp"}
        >
          {isSharing ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Share2 size={16} className="sm:w-5 sm:h-5" />
          )}
          <span className="font-medium">{isSharing ? 'Génération...' : 'Partager'}</span>
        </button>
      </div>
    </div>

  );
};

// Composant principal de la page
export default function MessagesPage({ messages, onLike, likedMessages }: MessagesPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  // Calculer les messages à afficher
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  const goToPage = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Afficher avec des points de suspension
      if (currentPage <= 3) {
        // Au début
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // À la fin
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Au milieu
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Composant de coeur de page
  const PageHeart = ({
    pageNumber,
    isActive,
    isEllipsis = false,
    isPrev = false,
    isNext = false
  }: {
    pageNumber: number | string;
    isActive?: boolean;
    isEllipsis?: boolean;
    isPrev?: boolean;
    isNext?: boolean;
  }) => {
    if (isEllipsis) {
      return (
        <span className="text-pink-600 dark:text-rose-400 font-bold text-lg mx-2">
          ...
        </span>
      );
    }

    const handleClick = () => {
      if (isPrev) goToPrevPage();
      else if (isNext) goToNextPage();
      else if (typeof pageNumber === 'number') goToPage(pageNumber);
    };

    const isDisabled =
      (isPrev && currentPage === 1) ||
      (isNext && currentPage === totalPages) ||
      (typeof pageNumber === 'number' && pageNumber === currentPage);

    let ariaLabel = '';
    if (isPrev) ariaLabel = 'Page précédente';
    else if (isNext) ariaLabel = 'Page suivante';
    else ariaLabel = `Page ${pageNumber}`;

    return (
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={ariaLabel}
        className={`relative group transition-all duration-200 ${isDisabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:scale-110 active:scale-95 cursor-pointer'
          }`}
      >
        {/* Coeur de fond */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          className={`${isActive
            ? 'text-pink-600 dark:text-rose-500'
            : isDisabled
              ? 'text-pink-300 dark:text-rose-800'
              : 'text-pink-400 dark:text-rose-600 group-hover:text-pink-500 dark:group-hover:text-rose-500'
            } sm:w-[50px] sm:h-[50px]`}
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            fill="currentColor"
          />
        </svg>

        {/* Contenu du coeur */}
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${isActive ? 'text-white' : 'text-pink-700 dark:text-rose-300'
          } ${isPrev || isNext ? 'text-lg' : 'text-base'}`}>
          {isPrev ? '←' : isNext ? '→' : pageNumber}
        </span>

        {/* Indicateur de page active */}
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 dark:bg-rose-400 rounded-full" />
        )}
      </button>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-300">
      {/* Background patterns: Static hearts texture */}
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


      {/* Contenu principal */}
      <div className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Titre de la page */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-dancing font-bold text-rose-600 dark:text-rose-500 text-center mb-4 sm:mb-8 drop-shadow-sm px-2">
            Messages d'amour 💕
          </h1>

          {/* Grille de messages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 max-w-md mx-auto sm:max-w-none">
            {currentMessages.map((message) => (
              <MessageCard
                key={message.id || Math.random().toString()}
                message={message}
                onLike={onLike}
                isLiked={!!(message.id && likedMessages.includes(message.id))}
              />
            ))}
          </div>

          {/* Message si aucun message */}
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12 px-4">
              <p className="text-lg sm:text-xl text-rose-600 dark:text-rose-400 font-medium">
                Aucun message pour le moment 💔
              </p>
              <p className="text-sm sm:text-base text-rose-500 dark:text-rose-500 mt-2">
                Soyez le premier à envoyer un message !
              </p>
            </div>
          )}

          {/* Pagination - Nouveau style */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center gap-6 mt-8 sm:mt-12 pb-6 sm:pb-8 px-4">


              {/* Coeurs de pagination */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                {/* Bouton Précédent */}
                <PageHeart pageNumber={1} isPrev />

                {/* Numéros de page */}
                {getPageNumbers().map((pageNum, index) => (
                  <PageHeart
                    key={index}
                    pageNumber={pageNum}
                    isActive={pageNum === currentPage}
                    isEllipsis={pageNum === '...'}
                  />
                ))}

                {/* Bouton Suivant */}
                <PageHeart pageNumber={totalPages} isNext />
              </div>


            </div>
          )}

        </div>
      </div>

      {/* Styles pour les animations du cœur spécial */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow-delayed {
          animation: bounce-slow 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.5s ease-out infinite;
        }
        
        .animate-ping-slow-delayed {
          animation: ping-slow 1.5s ease-out infinite;
          animation-delay: 0.75s;
        }
      `}</style>
    </div>
  );
}
