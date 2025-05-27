import { SimpleInterestFormData } from '@/types/simpleInterest';

export function calculateSimpleInterest({
    principal,
    rate,
    period,
}: SimpleInterestFormData) {
    const interest = principal * (rate / 100) * period;
    const total = principal + interest;
    return {
        interest,
        total,
    };
}
