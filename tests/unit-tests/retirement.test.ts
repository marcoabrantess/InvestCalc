import { calculateRetirement } from '@/utils/calculations/retirement';
import { RetirementFormData } from '@/types/retirement';

describe('calculateRetirement', () => {
    it('deve atingir a meta de aposentadoria com investimento agressivo', () => {
        const formData: RetirementFormData = {
            monthlyIncome: 10000,
            currentInvestment: 50000,
            retirementGoal: 1000000,
            investPercent: 30, // 30% da renda investida
            currentAge: 30,
            retirementAge: 60,
            annualReturn: 10,
            monthlyExpense: 5000,
        };
        const result = calculateRetirement(formData);

        expect(result.reachedGoal).toBe(true);
        expect(result.futureValue).toBeGreaterThanOrEqual(1000000);
        expect(result.sustainabilityYears).toBeGreaterThan(0);
        expect(result.years).toBe(30);
    });

    it('não deve atingir a meta de aposentadoria com investimento baixo', () => {
        const formData: RetirementFormData = {
            monthlyIncome: 4000,
            currentInvestment: 10000,
            retirementGoal: 800000,
            investPercent: 5, // 5% da renda investida
            currentAge: 35,
            retirementAge: 65,
            annualReturn: 6,
            monthlyExpense: 3500,
        };
        const result = calculateRetirement(formData);

        expect(result.reachedGoal).toBe(false);
        expect(result.futureValue).toBeLessThan(800000);
        expect(result.sustainabilityYears).toBeGreaterThan(0);
        expect(result.years).toBe(30);
    });

    it('deve calcular corretamente a sustentabilidade dos recursos', () => {
        const formData: RetirementFormData = {
            monthlyIncome: 7000,
            currentInvestment: 20000,
            retirementGoal: 500000,
            investPercent: 15,
            currentAge: 40,
            retirementAge: 60,
            annualReturn: 8,
            monthlyExpense: 3000,
        };
        const result = calculateRetirement(formData);

        expect(result.sustainabilityYears).toBe(
            Math.floor(result.futureValue / (3000 * 12))
        );
        expect(result.years).toBe(20);
        expect(result.futureValue).toBeGreaterThan(0);
    });
});
