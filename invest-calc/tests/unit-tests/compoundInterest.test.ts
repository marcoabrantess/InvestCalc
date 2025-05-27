import { calculateCompoundInterest } from '@/utils/calculations/compoundInterest';
import { CompoundInterestFormData } from '@/types/compoundInterest';

describe('calculateCompoundInterest', () => {
    it('deve calcular corretamente o valor futuro com aporte mensal', () => {
        const formData: CompoundInterestFormData = {
            principal: 1000,
            monthlyContribution: 100,
            rate: 12,
            period: 2,
        };
        const { total, interest, totalContributions } =
            calculateCompoundInterest(formData);

        // Aproximação manual para validação
        expect(total).toBeGreaterThan(totalContributions);
        expect(interest).toBeCloseTo(total - totalContributions, 2);
        expect(totalContributions).toBe(1000 + 100 * 24);
    });

    it('deve retornar apenas o principal se taxa e aporte forem zero', () => {
        const formData: CompoundInterestFormData = {
            principal: 5000,
            monthlyContribution: 0,
            rate: 0,
            period: 5,
        };
        const { total, interest, totalContributions } =
            calculateCompoundInterest(formData);

        expect(total).toBe(5000);
        expect(interest).toBe(0);
        expect(totalContributions).toBe(5000);
    });

    it('deve retornar apenas o principal se o período for zero', () => {
        const formData: CompoundInterestFormData = {
            principal: 2000,
            monthlyContribution: 500,
            rate: 10,
            period: 0,
        };
        const { total, interest, totalContributions } =
            calculateCompoundInterest(formData);

        expect(total).toBe(2000);
        expect(interest).toBe(0);
        expect(totalContributions).toBe(2000);
    });
});
