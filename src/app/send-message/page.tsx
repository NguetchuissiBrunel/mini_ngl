'use client';

import FloatingHearts from '@/components/FloatingHearts';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeft, Heart, Send, ChevronLeft, ChevronRight, MessageCircle, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SendMessagePage() {
  const [step, setStep] = useState(1);
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

  const handleNextStep = () => {
    if (formData.pseudo && formData.recipient) {
      setStep(2);
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
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
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-rose-950/30 backdrop-blur-sm border-2 border-rose-400 dark:border-rose-600 text-rose-600 dark:text-rose-400 font-medium hover:bg-rose-100/50 dark:hover:bg-rose-900/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
      >
        <ArrowLeft size={18} />
      </Link>
      
      <div className="container mx-auto px-4 py-12 max-w-2xl z-10 relative">

        <div className="text-center mb-10 animate-float-hover">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-500/10 dark:bg-rose-500/20 mb-4">
            <Heart className="w-8 h-8 text-rose-600 dark:text-rose-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-rose-600 dark:text-rose-600 drop-shadow-sm mb-2">
            {step === 1 ? 'Qui envoie à qui ?' : 'Votre Message d\'Amour'}
          </h1>
          <p className="text-lg text-rose-800/80 dark:text-rose-500/90 font-medium flex items-center justify-center gap-2">
            {step === 1 ? 'Remplissez les informations de base' : 'Exprimez vos sentiments'}
            <Sparkles className="w-5 h-5 text-rose-500" />
          </p>
        </div>
        
        <div className="bg-white/60 dark:bg-rose-950/40 backdrop-blur-sm rounded-2xl border-2 border-rose-200 dark:border-rose-800 p-6 md:p-8 shadow-xl shadow-rose-500/10 dark:shadow-rose-900/20">
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                {/* Pseudo */}
                <div className="space-y-2">
                  <label className="block text-rose-700 dark:text-rose-300 font-medium">
                    Votre Pseudo *
                  </label>
                  <input
                    type="text"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="Ex: AmourSecret23"
                  />
                </div>
                
                {/* Destinataire */}
                <div className="space-y-2">
                  <label className="block text-rose-700 dark:text-rose-300 font-medium">
                    Nom du Destinataire *
                  </label>
                  <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="Ex: Marie, Pierre, etc."
                  />
                </div>
                
                {/* Gender Toggle - Version améliorée */}
                <div className="space-y-2">
                  <label className="block text-rose-700 dark:text-rose-300 font-medium">
                    Genre du Destinataire
                  </label>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-xs">
                      {/* Toggle background */}
                      <div className="relative bg-rose-200/70 dark:bg-rose-900/60 rounded-full h-14 p-1">
                        {/* Sliding indicator */}
                        <div 
                          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                            formData.gender === 'Femme' 
                              ? 'left-1' 
                              : 'left-1/2 translate-x-[-4px]'
                          }`}
                        />
                        
                        {/* Labels */}
                        <div className="relative flex h-full items-center">
                          <button
                            type="button"
                            onClick={toggleGender}
                            className={`flex-1 h-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 ${
                              formData.gender === 'Femme' 
                                ? 'text-white drop-shadow-sm' 
                                : 'text-rose-800/90 dark:text-rose-300/90'
                            }`}
                          >
                            Femme
                          </button>
                          
                          <div className="w-1 h-6 bg-rose-300/50 dark:bg-rose-700/50" />
                          
                          <button
                            type="button"
                            onClick={toggleGender}
                            className={`flex-1 h-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 ${
                              formData.gender === 'Homme' 
                                ? 'text-white drop-shadow-sm' 
                                : 'text-rose-800/90 dark:text-rose-300/90'
                            }`}
                          >
                            Homme
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white font-bold text-lg hover:from-rose-600 hover:to-pink-600 dark:hover:from-rose-700 dark:hover:to-pink-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer group mt-4"
                >
                  <span>Continuer</span>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Back to Step 1 Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors mb-2"
                >
                  <ChevronLeft size={18} />
                  <span>Retour aux informations</span>
                </button>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-rose-700 dark:text-rose-300 font-medium flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                    Votre Message d'Amour *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none transition-all"
                    placeholder="Écrivez votre message ici... Soyez sincère et attentionné"
                    maxLength={500}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white font-bold hover:from-rose-600 hover:to-pink-600 dark:hover:from-rose-700 dark:hover:to-pink-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer group mt-4"
                >
                  <Send size={22} className="group-hover:animate-bounce flex-shrink-0" />
                  <span>Envoyer</span>
                </button>
              </div>
            )}
          </form>
          
          <div className="mt-8 pt-6 border-t border-rose-300/50 dark:border-rose-700/50">
            <div className="text-center text-sm text-rose-600/80 dark:text-rose-400/80 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-rose-700 dark:text-rose-300 flex-shrink-0" />
                <span className="font-medium text-rose-700 dark:text-rose-300">Message anonyme</span>
              </div>
              <span className="hidden sm:inline text-rose-600/70 dark:text-rose-400/70">•</span>
              <span className="text-center">L'amour vient du cœur !</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}