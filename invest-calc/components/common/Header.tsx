import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow-soft">
            <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-primary">
                        <Image
                            src="/icons/calculator.svg"
                            alt="Ícone de Calculadora"
                            width={45}
                            height={45}
                            priority
                        />
                    </span>
                    <h1 className="text-3xl font-bold text-primary">
                        InvestCalc
                    </h1>
                </Link>
            </div>
        </header>
    );
}
