import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console - TellMi',
  description: 'Panel de gestion administrative',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}