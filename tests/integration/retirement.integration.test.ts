import { calculateRetirement } from '@/utils/calculations/retirement';
import { RetirementFormData } from '@/types/retirement';

describe('Integração: Simulação de Aposentadoria', () => {
    it('deve atingir a meta de aposentadoria com investimento agressivo', () => {
        const userFormData: RetirementFormData = {
            monthlyIncome: 12000,
            currentInvestment: 100000,
            retirementGoal: 1500000,
            investPercent: 35, // 35% da renda investida
            currentAge: 30,
            retirementAge: 60,
            annualReturn: 10,
            monthlyExpense: 6000,
        };

        const result = calculateRetirement(userFormData);

        expect(result).toHaveProperty('futureValue');
        expect(result).toHaveProperty('reachedGoal', true);
        expect(result.futureValue).toBeGreaterThanOrEqual(1500000);
        expect(result.sustainabilityYears).toBeGreaterThan(0);
        expect(result.years).toBe(30);
    });

    it('não deve atingir a meta de aposentadoria com investimento baixo', () => {
        const userFormData: RetirementFormData = {
            monthlyIncome: 3500,
            currentInvestment: 5000,
            retirementGoal: 800000,
            investPercent: 5, // 5% da renda investida
            currentAge: 35,
            retirementAge: 65,
            annualReturn: 6,
            monthlyExpense: 3000,
        };

        const result = calculateRetirement(userFormData);

        expect(result).toHaveProperty('futureValue');
        expect(result.reachedGoal).toBe(false);
        expect(result.futureValue).toBeLessThan(800000);
        expect(result.sustainabilityYears).toBeGreaterThan(0);
        expect(result.years).toBe(30);
    });

    it('deve calcular corretamente a sustentabilidade dos recursos', () => {
        const userFormData: RetirementFormData = {
            monthlyIncome: 7000,
            currentInvestment: 20000,
            retirementGoal: 500000,
            investPercent: 15,
            currentAge: 40,
            retirementAge: 60,
            annualReturn: 8,
            monthlyExpense: 3000,
        };

        const result = calculateRetirement(userFormData);

        expect(result.sustainabilityYears).toBe(
            Math.floor(result.futureValue / (3000 * 12))
        );
        expect(result.years).toBe(20);
        expect(result.futureValue).toBeGreaterThan(0);
    });
});
