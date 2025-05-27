import { EmergencyReserveFormData } from '@/types/emergencyReserve';

export function calculateEmergencyReserve({
    jobType,
    fixedCost,
    monthlySalary,
    savingPercent,
}: EmergencyReserveFormData) {
    // Meses recomendados de reserva conforme tipo de emprego
    const monthsMap: Record<string, number> = {
        CLT: 6,
        'Servidor Público': 3,
        Autônomo: 12,
        Empresário: 12,
        Outro: 6,
    };
    const recommendedMonths = monthsMap[jobType] || 6;
    const reserveValue = fixedCost * recommendedMonths;
    const monthlySaving = (monthlySalary * savingPercent) / 100;
    const monthsToSave =
        monthlySaving > 0 ? Math.ceil(reserveValue / monthlySaving) : null;

    return {
        recommendedMonths,
        reserveValue,
        monthlySaving,
        monthsToSave,
    };
}
