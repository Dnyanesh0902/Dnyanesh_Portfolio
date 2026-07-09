import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dnyaneshwar Kokate | Go & .NET Developer Portfolio',
  description: 'Personal portfolio of Dnyaneshwar Kokate, an experienced backend developer specializing in Go (Golang) and .NET (C#) REST APIs and clean architecture.',
  keywords: ['Go Developer', '.NET Developer', 'Software Engineer', 'Backend Developer', 'Pune Developers', 'React Portfolio', 'Next.js Portfolio'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          <Header />
          <main style={{ flex: 1, paddingTop: '80px', position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
