import {
    FixedIncomeComparatorFormData,
    YieldType,
} from '@/types/fixedIncomeComparator';

const CDI = 14.65;
const IPCA = 4.5;

function getEffectiveRate(yieldType: YieldType, yieldValue: number) {
    if (yieldType === 'pre') return yieldValue;
    if (yieldType === 'cdi') return (yieldValue / 100) * CDI;
    if (yieldType === 'ipca') return yieldValue + IPCA;
    return 0;
}

export function calculateFixedIncomeComparator({
    yieldTypeA,
    yieldTypeB,
    yieldA,
    yieldB,
    periodA,
    periodB,
}: FixedIncomeComparatorFormData) {
    // Considerando investimento inicial de R$ 1.000,00 para ambos
    const initial = 1000;

    const rateA = getEffectiveRate(yieldTypeA, yieldA) / 100;
    const rateB = getEffectiveRate(yieldTypeB, yieldB) / 100;

    const finalA = initial * Math.pow(1 + rateA / 12, periodA);
    const finalB = initial * Math.pow(1 + rateB / 12, periodB);

    return {
        finalA,
        finalB,
        diff: finalA - finalB,
    };
}
