import { CompoundInterestFormData } from '@/types/compoundInterest';

export function calculateCompoundInterest({
    principal,
    monthlyContribution,
    rate,
    period,
}: CompoundInterestFormData) {
    const months = period * 12;
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;

    let total = principal;
    let totalContributions = principal;
    for (let i = 0; i < months; i++) {
        total = total * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
    }
    const interest = total - totalContributions;

    return {
        total,
        interest,
        totalContributions,
    };
}
