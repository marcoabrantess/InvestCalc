import { RetirementFormData } from '@/types/retirement';

export function calculateRetirement({
    monthlyIncome,
    currentInvestment,
    retirementGoal,
    investPercent,
    currentAge,
    retirementAge,
    annualReturn,
    monthlyExpense,
}: RetirementFormData) {
    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
    const monthlyInvestment = (monthlyIncome * investPercent) / 100;

    let futureValue = currentInvestment;
    for (let i = 0; i < months; i++) {
        futureValue = futureValue * (1 + monthlyReturn) + monthlyInvestment;
    }

    const reachedGoal = futureValue >= retirementGoal;
    const sustainabilityYears = futureValue / (monthlyExpense * 12);

    return {
        futureValue,
        reachedGoal,
        sustainabilityYears: Math.floor(sustainabilityYears),
        years,
    };
}
