import { z } from 'zod';

export const retirementSchema = z
    .object({
        monthlyIncome: z.coerce.number().positive('Informe sua renda mensal'),
        currentInvestment: z.coerce
            .number()
            .min(0, 'O valor investido não pode ser negativo'),
        retirementGoal: z.coerce
            .number()
            .positive('Informe o objetivo de patrimônio'),
        investPercent: z.coerce
            .number()
            .min(0)
            .max(100, 'Percentual deve ser entre 0 e 100'),
        currentAge: z.coerce.number().int().min(0).max(120),
        retirementAge: z.coerce.number().int().min(1).max(120),
        annualReturn: z.coerce.number().min(0).max(100),
        monthlyExpense: z.coerce.number().min(0),
    })
    .refine((data) => data.retirementAge > data.currentAge, {
        message: 'A idade de aposentadoria deve ser maior que a atual',
        path: ['retirementAge'],
    });
