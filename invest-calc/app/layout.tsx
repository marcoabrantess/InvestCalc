import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { ReactNode } from 'react';

export const metadata = {
    title: 'Calculadora de Investimentos | InvestoCalc',
    description:
        'Simule e compare investimentos de forma fácil e rápida. Descubra as melhores opções para o seu futuro financeiro.',
    openGraph: {
        title: 'Calculadora de Investimentos | InvestoCalc',
        description:
            'Simule e compare investimentos de forma fácil e rápida. Descubra as melhores opções para o seu futuro financeiro.',
        type: 'website',
        images: ['/images/logo-og.png'], // Substitua pelo caminho da sua imagem de logo para o Open Graph
    },
    icons: {
        icon: '/images/invest-calc-icon.svg', // Favicon
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className="bg-[#f6fafd] text-gray-900 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 w-full px-0">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
