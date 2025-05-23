export default function Footer() {
    return (
        <footer className="bg-white border-t border-muted py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <span className="text-primary font-semibold">
                            InvestCalc
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                            © {new Date().getFullYear()} Todos os direitos
                            reservados.
                        </span>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            Termos de Uso
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            Privacidade
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            Contato
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
