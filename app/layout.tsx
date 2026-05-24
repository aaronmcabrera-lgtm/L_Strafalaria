// app/layout.tsx

import './globals.css';
import { Antonio, Inter } from 'next/font/google';
import Script from 'next/script';

const antonio = Antonio({
  subsets: ['latin'],
  variable: '--font-antonio',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Strafalaria | Dije Personalizado',
  description:
    'Convierte tu número de jersey en una joya única.',
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
      <head>

        {/* META PIXEL */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {
              if(f.fbq)return;

              n=f.fbq=function(){
                n.callMethod
                  ? n.callMethod.apply(n,arguments)
                  : n.queue.push(arguments)
              };

              if(!f._fbq)f._fbq=n;

              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];

              t=b.createElement(e);
              t.async=!0;
              t.src=v;

              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);

            }(
              window,
              document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js'
            );

            fbq('init', '504498228318924');
            fbq('track', 'PageView');
          `}
        </Script>

      </head>

      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}