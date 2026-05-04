import { Antonio, Inter } from 'next/font/google';
import './globals.css';

const antonio = Antonio({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-antonio',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${antonio.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}