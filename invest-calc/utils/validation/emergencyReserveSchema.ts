import { z } from 'zod';

export const emergencyReserveSchema = z.object({
    jobType: z.enum([
        'CLT',
        'Autônomo',
        'Empresário',
        'Servidor Público',
        'Outro',
    ]),
    fixedCost: z.coerce.number().min(0, 'Informe seu custo fixo mensal'),
    monthlySalary: z.coerce.number().min(0, 'Informe seu salário mensal'),
    savingPercent: z.coerce
        .number()
        .min(0)
        .max(100, 'Percentual deve ser entre 0 e 100'),
});
