import { RentOrBuyFormData } from '@/types/rentOrBuy';

// Cálculo simplificado: compara o valor final do imóvel financiado vs. investir a entrada + diferença de aluguel
export function calculateRentOrBuy({
    propertyValue,
    rentValue,
    appreciation,
    igpm,
    downPayment,
    financingCosts,
    term,
    interestRate,
    investmentReturn,
}: RentOrBuyFormData) {
    // Valor financiado
    const financedAmount = propertyValue - downPayment + financingCosts;
    const monthlyInterest = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    const monthlyInvestmentReturn =
        Math.pow(1 + investmentReturn / 100, 1 / 12) - 1;

    // Prestação fixa (Tabela Price)
    const monthlyPayment =
        (financedAmount *
            (monthlyInterest * Math.pow(1 + monthlyInterest, term))) /
        (Math.pow(1 + monthlyInterest, term) - 1);

    // Valor do imóvel ao final do prazo
    const finalPropertyValue =
        propertyValue * Math.pow(1 + appreciation / 100, term / 12);

    // Simulação de investir a entrada + diferença entre prestação e aluguel
    let invested = downPayment;
    let rent = rentValue;
    for (let i = 0; i < term; i++) {
        const diff = monthlyPayment - rent;
        invested =
            invested * (1 + monthlyInvestmentReturn) +
            (diff > 0 ? 0 : Math.abs(diff));
        rent = rent * (1 + igpm / 100 / 12);
    }

    return {
        monthlyPayment,
        finalPropertyValue,
        invested,
        recommendation: invested > finalPropertyValue ? 'Alugar' : 'Financiar',
    };
}
