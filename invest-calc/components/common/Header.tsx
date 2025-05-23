// components/common/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow-soft">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-primary">
                        <Image
                            src="/images/calculator.svg"
                            alt="Ícone de Calculadora"
                            width={28}
                            height={28}
                            priority
                        />
                    </span>
                    <h1 className="text-2xl font-bold text-primary">
                        InvestCalc
                    </h1>
                </Link>

                <nav>
                    <ul className="flex space-x-8">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-800 hover:text-primary font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/compound-calculator"
                                className="text-gray-800 hover:text-primary font-medium"
                            >
                                Compound Calculator
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/investment-comparison"
                                className="text-gray-800 hover:text-primary font-medium"
                            >
                                Investment Comparison
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/risk-profile"
                                className="text-gray-800 hover:text-primary font-medium"
                            >
                                Risk Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
