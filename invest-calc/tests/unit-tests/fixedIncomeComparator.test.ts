import { calculateFixedIncomeComparator } from '@/utils/calculations/fixedIncomeComparator';
import { FixedIncomeComparatorFormData } from '@/types/fixedIncomeComparator';

describe('calculateFixedIncomeComparator', () => {
    it('deve comparar dois investimentos pré-fixados', () => {
        const formData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'CDB',
            investmentTypeB: 'LCI',
            yieldTypeA: 'pre',
            yieldTypeB: 'pre',
            yieldA: 12, // 12% ao ano
            yieldB: 10, // 10% ao ano
            periodA: 24, // 24 meses
            periodB: 24,
        };
        const { finalA, finalB, diff } =
            calculateFixedIncomeComparator(formData);

        expect(finalA).toBeGreaterThan(finalB);
        expect(diff).toBeCloseTo(finalA - finalB, 2);
    });

    it('deve comparar um investimento atrelado ao CDI com um pré-fixado', () => {
        const formData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'CDB',
            investmentTypeB: 'Tesouro Prefixado',
            yieldTypeA: 'cdi',
            yieldTypeB: 'pre',
            yieldA: 110, // 110% do CDI
            yieldB: 13, // 13% ao ano
            periodA: 36, // 36 meses
            periodB: 36,
        };
        const { finalA, finalB, diff } =
            calculateFixedIncomeComparator(formData);

        expect(finalA).toBeGreaterThan(0);
        expect(finalB).toBeGreaterThan(0);
        expect(typeof diff).toBe('number');
    });

    it('deve comparar um investimento atrelado ao IPCA com um CDI', () => {
        const formData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'Tesouro IPCA',
            investmentTypeB: 'CDB',
            yieldTypeA: 'ipca',
            yieldTypeB: 'cdi',
            yieldA: 6, // IPCA + 6%
            yieldB: 100, // 100% do CDI
            periodA: 12, // 12 meses
            periodB: 12,
        };
        const { finalA, finalB, diff } =
            calculateFixedIncomeComparator(formData);

        expect(finalA).toBeGreaterThan(0);
        expect(finalB).toBeGreaterThan(0);
        expect(typeof diff).toBe('number');
    });

    it('deve retornar taxa zero para yieldType inválido', () => {
        // @ts-expect-error
        const formData: FixedIncomeComparatorFormData = {
            investmentTypeA: 'CDB',
            investmentTypeB: 'LCI',
            yieldTypeA: 'invalido', // tipo inválido, ignorando o erro de tipo
            yieldTypeB: 'pre',
            yieldA: 10,
            yieldB: 10,
            periodA: 12,
            periodB: 12,
        };
        const result = calculateFixedIncomeComparator(formData);
        expect(result.finalA).toBeCloseTo(1000, 2); // sem rendimento
    });
});
