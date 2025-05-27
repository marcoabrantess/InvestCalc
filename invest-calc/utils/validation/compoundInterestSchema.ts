import { z } from 'zod';

export const compoundInterestSchema = z.object({
    principal: z.coerce.number().min(0, 'Informe o valor inicial'),
    monthlyContribution: z.coerce.number().min(0, 'Informe o valor mensal'),
    rate: z.coerce.number().min(0, 'Informe a taxa de juros'),
    period: z.coerce.number().int().positive('Informe o período'),
});
