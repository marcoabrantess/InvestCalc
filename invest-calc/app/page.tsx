import Image from 'next/image';

export default function Home() {
    return (
        <main>
            {/* Imagem de topo ocupando toda a largura */}
            <div className="w-full">
                <Image
                    src="/images/top-illustration.png" // ajuste o nome conforme o arquivo
                    alt="Ilustração de investimentos"
                    width={4000}
                    height={320}
                    className="w-full max-h-[320px] object-cover"
                    priority
                />
            </div>

            {/* Título e subtítulo centralizados, com espaçamento generoso */}
            <div className="w-full flex flex-col items-center mt-10 mb-12 px-4">
                <h2 className="text-4xl font-bold text-dark text-center mb-4">
                    Calculadora de Investimentos
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl">
                    Simule seus investimentos e descubra o melhor rendimento
                    para o seu dinheiro.
                </p>
            </div>

            {/* Espaço para boxes/cards de funcionalidades */}
            <div className="w-full flex flex-wrap gap-8 justify-center px-4">
                {/* Exemplo de box/card funcionalidade */}
                <div className="bg-white rounded-xl shadow-card p-8 flex-1 min-w-[320px] max-w-md">
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                        Simulador de Rendimento
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Calcule quanto seu dinheiro pode render em diferentes
                        investimentos.
                    </p>
                    {/* <InvestmentForm /> */}
                    <button className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        Simular Investimento
                    </button>
                </div>
                {/* Adicione mais boxes/cards aqui conforme o roadmap */}
            </div>
        </main>
    );
}
