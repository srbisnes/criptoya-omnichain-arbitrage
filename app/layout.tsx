import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CryptoYa Omnichain Arbitrage Expert',
  description: 'AI-powered LATAM arbitrage scanner feeding on CryptoYa API. Omnichain solutions L0-L3.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
