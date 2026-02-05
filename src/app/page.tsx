import Image from 'next/image';
import FloatingHearts from '@/components/FloatingHearts';
import ThemeToggle from '@/components/ThemeToggle';
import { MessageCircle, Send } from 'lucide-react';

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 dark:bg-[#2A1513] dark:from-[#2A1513] dark:to-[#1a0b0a] flex items-center justify-center transition-colors duration-300">
      {/* Background patterns: Static hearts texture */}
      <div className="absolute inset-0 hearts-bg opacity-100 pointer-events-none" />

      {/* Floating hearts animation */}
      <FloatingHearts />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      <div className="z-10 flex flex-col items-center justify-center p-8 text-center animate-float-hover">
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
          {/* Rounded image with border, no background overlay */}
          <div className="relative w-full h-full rounded-full border-4 border-rose-400/60 dark:border-rose-600/60 shadow-[0_0_40px_rgba(244,114,182,0.6)] dark:shadow-[0_0_40px_rgba(225,29,72,0.3)] overflow-hidden flex items-center justify-center">
            <Image
              src="/cupidon_logo.png"
              alt="Cupidon Logo"
              fill
              className="object-cover rounded-full transition-all duration-300 "
              priority
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-dancing font-bold text-rose-600 dark:text-rose-600 drop-shadow-sm mb-4 transition-colors">
          Mini NGL
        </h1>
        <p className="text-lg md:text-2xl text-rose-800/80 dark:text-rose-500/90 font-medium tracking-wide transition-colors">
          Spread Love & Messages
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-sm">
          {/* View Messages Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/40 dark:bg-rose-950/30 backdrop-blur-sm border-2 border-rose-400 dark:border-rose-600 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-100/50 dark:hover:bg-rose-900/40 transition-all hover:scale-105 active:scale-95 shadow-sm group cursor-pointer w-full">
            <MessageCircle size={20} className="group-hover:animate-bounce" />
            <span>Voir les messages</span>
          </button>

          {/* Send Message Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-500 dark:bg-rose-600 text-white font-semibold hover:bg-rose-600 dark:hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer w-full border-2 border-transparent">
            <Send size={20} />
            <span>Envoyer un message</span>
          </button>
        </div>
      </div>
    </div>
  );
}