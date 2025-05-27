import { z } from 'zod';

export const fixedIncomeComparatorSchema = z.object({
    investmentTypeA: z.string().min(1, 'Selecione o tipo de investimento'),
    investmentTypeB: z.string().min(1, 'Selecione o tipo de comparação'),
    yieldTypeA: z.enum(['pre', 'cdi', 'ipca']),
    yieldTypeB: z.enum(['pre', 'cdi', 'ipca']),
    yieldA: z.coerce.number().min(0, 'Informe a rentabilidade'),
    yieldB: z.coerce.number().min(0, 'Informe a rentabilidade'),
    periodA: z.coerce
        .number()
        .int()
        .positive('Informe o tempo de investimento'),
    periodB: z.coerce
        .number()
        .int()
        .positive('Informe o tempo de investimento'),
});
