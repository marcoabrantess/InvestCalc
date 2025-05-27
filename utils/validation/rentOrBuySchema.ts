import { z } from 'zod';

export const rentOrBuySchema = z.object({
    propertyValue: z.coerce.number().positive('Informe o valor do imóvel'),
    rentValue: z.coerce.number().positive('Informe o valor do aluguel'),
    appreciation: z.coerce.number().min(0).max(100),
    igpm: z.coerce.number().min(0).max(100),
    downPayment: z.coerce.number().min(0),
    financingCosts: z.coerce.number().min(0),
    term: z.coerce.number().int().min(1),
    interestRate: z.coerce.number().min(0).max(100),
    investmentReturn: z.coerce.number().min(0).max(100),
});
