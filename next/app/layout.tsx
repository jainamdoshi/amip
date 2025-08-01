import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './footer';
import Header from './header';
import Providers from '@/providers/providers';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Amip Trading Co. L.L.C.',
    description: 'Import and export Automotive Spare Parts',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Header />
                <Providers>{children}</Providers>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
