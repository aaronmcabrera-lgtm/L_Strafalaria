// app/layout.tsx
import './globals.css';
import { Antonio, Inter } from 'next/font/google';

const antonio = Antonio({ 
  subsets: ['latin'], 
  variable: '--font-antonio' 
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

export const metadata = {
  title: 'Strafalaria | Dije Personalizado',
  description: 'Convierte tu número de jersey en una joya única.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      className={`${antonio.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}