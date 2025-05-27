import { calculateEmergencyReserve } from '@/utils/calculations/emergencyReserve';
import { EmergencyReserveFormData } from '@/types/emergencyReserve';

describe('calculateEmergencyReserve', () => {
    it('deve calcular corretamente para CLT', () => {
        const formData: EmergencyReserveFormData = {
            jobType: 'CLT',
            fixedCost: 2000,
            monthlySalary: 5000,
            savingPercent: 20,
        };
        const result = calculateEmergencyReserve(formData);

        expect(result.recommendedMonths).toBe(6);
        expect(result.reserveValue).toBe(12000); // 2000 * 6
        expect(result.monthlySaving).toBe(1000); // 5000 * 20%
        expect(result.monthsToSave).toBe(12); // 12000 / 1000
    });

    it('deve calcular corretamente para Autônomo', () => {
        const formData: EmergencyReserveFormData = {
            jobType: 'Autônomo',
            fixedCost: 3000,
            monthlySalary: 6000,
            savingPercent: 10,
        };
        const result = calculateEmergencyReserve(formData);

        expect(result.recommendedMonths).toBe(12);
        expect(result.reserveValue).toBe(36000); // 3000 * 12
        expect(result.monthlySaving).toBe(600); // 6000 * 10%
        expect(result.monthsToSave).toBe(60); // 36000 / 600
    });

    it('deve retornar monthsToSave como null se savingPercent for 0', () => {
        const formData: EmergencyReserveFormData = {
            jobType: 'Servidor Público',
            fixedCost: 1500,
            monthlySalary: 4000,
            savingPercent: 0,
        };
        const result = calculateEmergencyReserve(formData);

        expect(result.recommendedMonths).toBe(3);
        expect(result.reserveValue).toBe(4500); // 1500 * 3
        expect(result.monthlySaving).toBe(0);
        expect(result.monthsToSave).toBeNull();
    });

    it('deve usar 6 meses como padrão para jobType desconhecido', () => {
        // @ts-ignore
        const formData: EmergencyReserveFormData = {
            jobType: 'Freelancer', // não está no monthsMap
            fixedCost: 1000,
            monthlySalary: 3000,
            savingPercent: 10,
        };
        const result = calculateEmergencyReserve(formData);
        expect(result.recommendedMonths).toBe(6);
    });
});
