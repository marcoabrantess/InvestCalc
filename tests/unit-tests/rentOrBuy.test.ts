import { calculateRentOrBuy } from '@/utils/calculations/rentOrBuy';
import { RentOrBuyFormData } from '@/types/rentOrBuy';

describe('calculateRentOrBuy', () => {
    it('deve recomendar financiar quando o imóvel valoriza mais que o investimento', () => {
        const formData: RentOrBuyFormData = {
            propertyValue: 500000,
            rentValue: 2000,
            appreciation: 10, // valorização alta do imóvel
            igpm: 4,
            downPayment: 100000,
            financingCosts: 5000,
            term: 240, // 20 anos
            interestRate: 8,
            investmentReturn: 6,
        };
        const result = calculateRentOrBuy(formData);

        expect(result.finalPropertyValue).toBeGreaterThan(result.invested);
        expect(result.recommendation).toBe('Financiar');
    });

    it('deve recomendar alugar quando o investimento rende mais que o imóvel', () => {
        const formData: RentOrBuyFormData = {
            propertyValue: 400000,
            rentValue: 1800,
            appreciation: 4,
            igpm: 4,
            downPayment: 80000,
            financingCosts: 3000,
            term: 180, // 15 anos
            interestRate: 9,
            investmentReturn: 18, // retorno alto no investimento
        };
        const result = calculateRentOrBuy(formData);

        expect(result.invested).toBeGreaterThan(result.finalPropertyValue);
        expect(result.recommendation).toBe('Alugar');
    });

    it('deve lidar com aluguel igual à prestação', () => {
        const formData: RentOrBuyFormData = {
            propertyValue: 300000,
            rentValue: 2500,
            appreciation: 5,
            igpm: 3,
            downPayment: 60000,
            financingCosts: 2000,
            term: 120, // 10 anos
            interestRate: 7,
            investmentReturn: 7,
        };
        const result = calculateRentOrBuy(formData);

        // Quando aluguel ≈ prestação e retornos são iguais, a recomendação pode variar conforme valorização
        expect(['Alugar', 'Financiar']).toContain(result.recommendation);
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.finalPropertyValue).toBeGreaterThan(0);
        expect(result.invested).toBeGreaterThan(0);
    });
});
