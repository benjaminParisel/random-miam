import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import NextAuthProvider from '@/auth/NextAuthProvider';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'random-miam',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`inter.className`}>
        <NextAuthProvider>
          <div className="m-auto text-center flex flex-col ">
            <Header />
            <div className="grow">{children}</div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
