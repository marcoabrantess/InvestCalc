import { z } from 'zod';

export const simpleInterestSchema = z.object({
    principal: z.coerce.number().positive('Informe o valor inicial'),
    rate: z.coerce.number().min(0, 'Informe a taxa de juros'),
    period: z.coerce.number().int().positive('Informe o período'),
});
