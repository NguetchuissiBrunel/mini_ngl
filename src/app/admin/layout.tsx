import type { Metadata } from 'next';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Admin Console - Mini NGL',
  description: 'Panel de gestion administrative',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      {children}
    </div>
  );
}