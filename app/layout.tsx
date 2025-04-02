import type {Metadata} from 'next';
import '@/assets/globals.css';

import {Arimo, Syne} from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import {CartProvider} from '@/context/CartProvider';

const arimo = Arimo({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-arimo',
});

const syne = Syne({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'NC',
  description: 'E-commerce Next.js 2025',
  icons: {
    icon: '/images/NC.svg',
    apple: '/images/NC.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='sv'>
      <body className={`${arimo.variable} ${syne.variable} ${arimo.className}`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
