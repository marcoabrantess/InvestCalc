export type YieldType = 'pre' | 'cdi' | 'ipca';

export interface FixedIncomeComparatorFormData {
    investmentTypeA: string;
    investmentTypeB: string;
    yieldTypeA: YieldType;
    yieldTypeB: YieldType;
    yieldA: number;
    yieldB: number;
    periodA: number;
    periodB: number;
}
