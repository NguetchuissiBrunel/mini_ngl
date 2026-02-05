'use client';

import FloatingHearts from '@/components/FloatingHearts';
import { ArrowLeft, Heart, Send, MessageCircle, Mail, Sparkles, User, Users, Venus, Mars } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SendMessagePage() {
  const [formData, setFormData] = useState({
    pseudo: '',
    recipient: '',
    gender: 'Femme',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleGender = () => {
    setFormData(prev => ({
      ...prev,
      gender: prev.gender === 'Femme' ? 'Homme' : 'Femme'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici tu ajouteras la logique d'envoi vers Firebase
    alert('Message envoyé avec succès!');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] transition-colors duration-300">
      {/* Background patterns */}
      <div className="absolute inset-0 hearts-bg opacity-100 pointer-events-none" />

      {/* Floating hearts animation */}
      <FloatingHearts />

      {/* Back button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-rose-950/60 backdrop-blur-md border border-white/50 dark:border-rose-950/30 shadow-lg transition-all hover:scale-110 active:scale-95 text-rose-600 dark:text-rose-500 pointer-events-auto cursor-pointer"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft size={24} />
      </Link>

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl z-10 relative">
        <div className="text-center mb-6 animate-float-hover">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-500/10 dark:bg-rose-500/20 mb-3">
            <Heart className="w-7 h-7 text-rose-600 dark:text-rose-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-dancing font-bold text-rose-600 dark:text-rose-600 drop-shadow-sm mb-2">
            Envoyer un Message d'Amour
          </h1>
          <p className="text-md text-rose-800/80 dark:text-rose-500/90 font-medium flex items-center justify-center gap-2">
            Exprimez vos sentiments
            <Sparkles className="w-4 h-4 text-rose-500" />
          </p>
        </div>

        <div className="bg-white/60 dark:bg-rose-950/40 backdrop-blur-sm rounded-2xl border-2 border-rose-200 dark:border-rose-800 p-5 md:p-6 shadow-xl shadow-rose-500/10 dark:shadow-rose-900/20">
          <form onSubmit={handleSubmit}>
            {/* Top row: Pseudo, Recipient, Gender Toggle */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Pseudo */}
              <div className="space-y-2">
                <label className="block text-rose-700 dark:text-rose-300 font-medium text-sm flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Votre Pseudo *
                </label>
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-sm"
                  placeholder="Ex: AmourSecret23"
                />
              </div>

              {/* Destinataire */}
              <div className="space-y-2">
                <label className="block text-rose-700 dark:text-rose-300 font-medium text-sm flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Destinataire *
                </label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-sm"
                  placeholder="Ex: Marie, Pierre..."
                />
              </div>

              {/* Gender Toggle - Centré */}
              <div className="space-y-2 col-span-2 md:col-span-1 flex flex-col justify-center items-center">
                <label className="block text-rose-700 dark:text-rose-300 font-medium text-sm mb-2 text-center">
                  Genre
                </label>
                <div className="flex justify-center w-full">
                  <div className="relative w-full max-w-[180px]">
                    {/* Toggle background */}
                    <div className="relative bg-rose-200/70 dark:bg-rose-900/60 rounded-full h-12 p-1">
                      {/* Sliding indicator */}
                      <div
                        className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${formData.gender === 'Femme'
                          ? 'left-1'
                          : 'left-1/2 translate-x-[-4px]'
                          }`}
                      />

                      {/* Labels with icons */}
                      <div className="relative flex h-full items-center">
                        <button
                          type="button"
                          onClick={toggleGender}
                          className={`flex-1 h-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 ${formData.gender === 'Femme'
                            ? 'text-white drop-shadow-sm'
                            : 'text-rose-800/90 dark:text-rose-300/90'
                            }`}
                        >
                          <Venus className="w-5 h-5" />
                        </button>

                        <div className="w-1 h-6 bg-rose-300/50 dark:bg-rose-700/50" />

                        <button
                          type="button"
                          onClick={toggleGender}
                          className={`flex-1 h-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 ${formData.gender === 'Homme'
                            ? 'text-white drop-shadow-sm'
                            : 'text-rose-800/90 dark:text-rose-300/90'
                            }`}
                        >
                          <Mars className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 mb-6">
              <label className="block text-rose-700 dark:text-rose-300 font-medium text-sm flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Message d'Amour *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-3 py-2.5 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none transition-all text-sm"
                placeholder="Écrivez votre message ici... Soyez sincère et attentionné"
                maxLength={400}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white font-bold hover:from-rose-600 hover:to-pink-600 dark:hover:from-rose-700 dark:hover:to-pink-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer group"
            >
              <Send size={18} className="group-hover:animate-bounce flex-shrink-0" />
              <span>Envoyer</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}