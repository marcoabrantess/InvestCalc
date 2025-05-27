import { calculateRentOrBuy } from '@/utils/calculations/rentOrBuy';
import { RentOrBuyFormData } from '@/types/rentOrBuy';

// Simula o preenchimento do formulário e a integração com a função de cálculo
describe('Integração: Simulação de Aluguel x Financiamento', () => {
    it('deve processar os dados do formulário e recomendar corretamente', () => {
        // Simulando dados vindos de um formulário preenchido pelo usuário
        const userFormData: RentOrBuyFormData = {
            propertyValue: 350000,
            rentValue: 1500,
            appreciation: 3,
            igpm: 4,
            downPayment: 70000,
            financingCosts: 2000,
            term: 180, // 15 anos
            interestRate: 8,
            investmentReturn: 12,
        };

        // Integração: chamada da função de cálculo com os dados do formulário
        const result = calculateRentOrBuy(userFormData);

        // Validação do resultado integrado
        expect(result).toHaveProperty('monthlyPayment');
        expect(result).toHaveProperty('finalPropertyValue');
        expect(result).toHaveProperty('invested');
        expect(result).toHaveProperty('recommendation');
        expect(['Alugar', 'Financiar']).toContain(result.recommendation);

        // Exemplo de validação de integração: se o investimento for muito alto, deve recomendar alugar
        if (result.invested > result.finalPropertyValue) {
            expect(result.recommendation).toBe('Alugar');
        } else {
            expect(result.recommendation).toBe('Financiar');
        }
    });
});
