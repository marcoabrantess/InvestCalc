import { calculateFixedIncomeComparator } from '@/utils/calculations/fixedIncomeComparator';
import { FixedIncomeComparatorFormData } from '@/types/fixedIncomeComparator';

describe('Integração: Simulação de Comparador de Renda Fixa', () => {
    it('deve comparar dois investimentos pré-fixados corretamente', () => {
        const userFormData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'CDB',
            investmentTypeB: 'LCI',
            yieldTypeA: 'pre',
            yieldTypeB: 'pre',
            yieldA: 12, // 12% ao ano
            yieldB: 10, // 10% ao ano
            periodA: 24, // 24 meses
            periodB: 24,
        };

        const result = calculateFixedIncomeComparator(userFormData);

        expect(result).toHaveProperty('finalA');
        expect(result).toHaveProperty('finalB');
        expect(result).toHaveProperty('diff');
        expect(result.finalA).toBeGreaterThan(result.finalB);
        expect(result.diff).toBeCloseTo(result.finalA - result.finalB, 2);
    });

    it('deve comparar um investimento atrelado ao CDI com um pré-fixado', () => {
        const userFormData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'CDB',
            investmentTypeB: 'Tesouro Prefixado',
            yieldTypeA: 'cdi',
            yieldTypeB: 'pre',
            yieldA: 110, // 110% do CDI
            yieldB: 13, // 13% ao ano
            periodA: 36, // 36 meses
            periodB: 36,
        };

        const result = calculateFixedIncomeComparator(userFormData);

        expect(result.finalA).toBeGreaterThan(0);
        expect(result.finalB).toBeGreaterThan(0);
        expect(typeof result.diff).toBe('number');
    });

    it('deve comparar um investimento atrelado ao IPCA com um CDI', () => {
        const userFormData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'Tesouro IPCA',
            investmentTypeB: 'CDB',
            yieldTypeA: 'ipca',
            yieldTypeB: 'cdi',
            yieldA: 6, // IPCA + 6%
            yieldB: 100, // 100% do CDI
            periodA: 12, // 12 meses
            periodB: 12,
        };

        const result = calculateFixedIncomeComparator(userFormData);

        expect(result.finalA).toBeGreaterThan(0);
        expect(result.finalB).toBeGreaterThan(0);
        expect(typeof result.diff).toBe('number');
    });
});
