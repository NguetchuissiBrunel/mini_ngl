'use client';

import FloatingHearts from '@/components/FloatingHearts';
import { ArrowLeft, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simuler le chargement
    setTimeout(() => {
      setIsLoading(false);
      // Ici, tu ajouteras la logique d'authentification Firebase
      console.log('Login attempt:', { username, password });
    }, 1500);
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

      <div className="container mx-auto px-4 py-16 md:py-20 flex items-center justify-center min-h-screen z-10 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 animate-float-hover">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 dark:from-rose-600/30 dark:to-pink-600/30 border-2 border-rose-400/30 dark:border-rose-600/30 mb-6">
              <Lock className="w-10 h-10 text-rose-600 dark:text-rose-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-dancing font-bold text-rose-600 dark:text-rose-600 drop-shadow-sm mb-2">
              Accès Administrateur
            </h1>
            <p className="text-lg text-rose-800/80 dark:text-rose-500/90 font-medium">
              Connectez-vous pour gérer les messages
            </p>
          </div>

          <div className="bg-white/60 dark:bg-rose-950/40 backdrop-blur-sm rounded-2xl border-2 border-rose-200 dark:border-rose-800 p-8 shadow-xl shadow-rose-500/10 dark:shadow-rose-900/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="block text-rose-700 dark:text-rose-300 font-medium">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User className="w-5 h-5 text-rose-500/70 dark:text-rose-400/70" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="admin"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-rose-700 dark:text-rose-300 font-medium">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-rose-500/70 dark:text-rose-400/70" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 placeholder-rose-400/70 dark:placeholder-rose-400/50 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white font-bold text-lg hover:from-rose-600 hover:to-pink-600 dark:hover:from-rose-700 dark:hover:to-pink-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-transparent hover:border-white/30"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Se Connecter</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-rose-300/50 dark:border-rose-700/50">
              <p className="text-center text-sm text-rose-600/80 dark:text-rose-400/80">
                ⚠️ Cette page est réservée à l'administrateur du site.
              </p>
            </div>
          </div>

          {/* Security notice */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/20 border border-amber-300/50 dark:border-amber-700/50">
            <p className="text-sm text-amber-800 dark:text-amber-400 text-center">
              🔒 Pour des raisons de sécurité, veuillez vous déconnecter après utilisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}