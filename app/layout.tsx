import type { Metadata } from "next";
import { Annapurna_SIL } from "next/font/google";
import "./globals.css";

const bebas = Annapurna_SIL({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strafalaria Simulator",
  description: "Diseña tu dije personalizado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={bebas.className}>
        {children}
      </body>
    </html>
  );
}