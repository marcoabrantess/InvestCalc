import { Feature } from '@/types/feature';

export const investmentFeatures: Feature[] = [
    {
        title: 'Simulador de Aposentadoria',
        description:
            'Planeje sua aposentadoria e veja quanto precisa investir para alcançar seu objetivo.',
        href: '/retirement-simulator',
        icon: '/icons/old-couple.png',
        button: 'Simular Aposentadoria',
    },
    {
        title: 'Aluguel x Financiamento',
        description:
            'Compare cenários e descubra qual opção faz mais sentido para você.',
        href: '/rent-vs-finance',
        icon: '/icons/bank-building.png',
        button: 'Comparar Opções',
    },
    {
        title: 'Reserva de Emergência',
        description: 'Calcule o valor ideal para sua reserva de emergência.',
        href: '/emergency-reserve',
        icon: '/icons/piggy-bank.png',
        button: 'Calcular Reserva',
    },
    {
        title: 'Juros Simples',
        description: 'Veja como funciona o rendimento com juros simples.',
        href: '/simple-interest',
        icon: '/icons/interest.png',
        button: 'Calcular Juros Simples',
    },
    {
        title: 'Juros Compostos',
        description:
            'Entenda o efeito dos juros compostos nos seus investimentos.',
        href: '/compound-interest',
        icon: '/icons/investment.png',
        button: 'Calcular Juros Compostos',
    },
    {
        title: 'Calculadora de Renda Fixa',
        description: 'Simule investimentos em renda fixa e compare resultados.',
        href: '/fixed-income-comparator',
        icon: '/icons/graph.png',
        button: 'Simular Renda Fixa',
    },
];
