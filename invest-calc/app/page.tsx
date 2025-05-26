import Image from 'next/image';
import Link from 'next/link';
import { investmentFeatures } from '@/data/features';

export default function Home() {
    return (
        <main>
            {/* Imagem de topo */}
            <div className="w-full">
                <Image
                    src="/images/top-illustration.png"
                    alt="Ilustração de investimentos"
                    width={4000}
                    height={320}
                    className="w-full max-h-[320px] object-cover"
                    priority
                />
            </div>

            {/* Título e subtítulo */}
            <div className="w-full flex flex-col items-center mt-10 mb-12 px-4">
                <h2 className="text-4xl font-bold text-dark text-center mb-4">
                    Calculadora de Investimentos
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl">
                    Simule, compare e planeje seu futuro financeiro de forma
                    simples e didática.
                </p>
            </div>

            {/* Cards de funcionalidades */}
            <div className="w-full flex flex-wrap gap-8 justify-center px-4 max-w-[80%] mx-auto pb-20">
                {investmentFeatures.map((feature) => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                        className="bg-white rounded-xl shadow-card p-8 flex-1 min-w-[320px] max-w-md flex flex-col items-center hover:shadow-lg transition md:w-1/3"
                    >
                        <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={120}
                            height={120}
                            className="mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-primary text-center">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-center">
                            {feature.description}
                        </p>
                        <span className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-auto">
                            {feature.button}
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    );
}
