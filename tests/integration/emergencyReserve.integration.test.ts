import { calculateEmergencyReserve } from '@/utils/calculations/emergencyReserve';
import { EmergencyReserveFormData } from '@/types/emergencyReserve';

describe('Integração: Simulação de Reserva de Emergência', () => {
    it('deve calcular corretamente para CLT', () => {
        const userFormData: EmergencyReserveFormData = {
            jobType: 'CLT',
            fixedCost: 2500,
            monthlySalary: 6000,
            savingPercent: 15,
        };

        const result = calculateEmergencyReserve(userFormData);

        expect(result).toHaveProperty('recommendedMonths', 6);
        expect(result.reserveValue).toBe(15000); // 2500 * 6
        expect(result.monthlySaving).toBe(900); // 6000 * 15%
        expect(result.monthsToSave).toBe(Math.ceil(15000 / 900));
    });

    it('deve calcular corretamente para Autônomo', () => {
        const userFormData: EmergencyReserveFormData = {
            jobType: 'Autônomo',
            fixedCost: 4000,
            monthlySalary: 8000,
            savingPercent: 10,
        };

        const result = calculateEmergencyReserve(userFormData);

        expect(result).toHaveProperty('recommendedMonths', 12);
        expect(result.reserveValue).toBe(48000); // 4000 * 12
        expect(result.monthlySaving).toBe(800); // 8000 * 10%
        expect(result.monthsToSave).toBe(Math.ceil(48000 / 800));
    });

    it('deve retornar monthsToSave como null se savingPercent for 0', () => {
        const userFormData: EmergencyReserveFormData = {
            jobType: 'Servidor Público',
            fixedCost: 1800,
            monthlySalary: 5000,
            savingPercent: 0,
        };

        const result = calculateEmergencyReserve(userFormData);

        expect(result).toHaveProperty('recommendedMonths', 3);
        expect(result.reserveValue).toBe(5400); // 1800 * 3
        expect(result.monthlySaving).toBe(0);
        expect(result.monthsToSave).toBeNull();
    });
});
