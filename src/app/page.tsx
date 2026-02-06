import Image from 'next/image';
import FloatingHearts from '@/components/FloatingHearts';
import ThemeToggle from '@/components/ThemeToggle';
import { MessageCircle, Send, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover rounded-full transition-all duration-300 "
              priority
            />
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute -top-6 -left-8 text-rose-400 rotate-12 animate-pulse">
            <Heart size={24} fill="currentColor" />
          </div>
          <div className="absolute -bottom-6 -right-8 text-rose-400 -rotate-12 animate-pulse delay-75">
            <Heart size={20} fill="currentColor" />
          </div>

          <h1 className="text-7xl md:text-9xl font-allura font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(225,29,72,0.3)] transition-all">
            Tell-Mi
          </h1>
        </div>

        <p className="text-2xl md:text-3xl font-allura text-rose-600 font-medium mb-4 italic dark:text-rose-300">
          "L&apos;amour s&apos;exprime en quelques mots"
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-sm">
          {/* View Messages Button */}
          <Link href="/messages" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/40 dark:bg-rose-950/30 backdrop-blur-sm border-2 border-rose-400 dark:border-rose-600 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-100/50 dark:hover:bg-rose-900/40 transition-all hover:scale-105 active:scale-95 shadow-sm group cursor-pointer w-full">
            <MessageCircle size={20} className="group-hover:animate-bounce" />
            <span>Voir les messages</span>
          </Link>

          {/* Send Message Button */}
          <Link href="/send" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-500 dark:bg-rose-600 text-white font-semibold hover:bg-rose-600 dark:hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/30 dark:shadow-rose-900/50 cursor-pointer w-full border-2 border-transparent">
            <Send size={20} />
            <span>Envoyer un message</span>
          </Link>
        </div>
      </div>
    </div>
  );
}