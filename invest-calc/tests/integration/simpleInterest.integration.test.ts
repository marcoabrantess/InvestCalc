import { calculateSimpleInterest } from '@/utils/calculations/simpleInterest';
import { SimpleInterestFormData } from '@/types/simpleInterest';

describe('Integração: Simulação de Juros Simples', () => {
    it('deve calcular corretamente o juro simples padrão', () => {
        const userFormData: SimpleInterestFormData = {
            principal: 2000,
            rate: 7, // 7% ao ano
            period: 4, // 4 anos
        };

        const result = calculateSimpleInterest(userFormData);

        // Juros: 2000 * 0.07 * 4 = 560
        expect(result).toHaveProperty('interest', 560);
        expect(result).toHaveProperty('total', 2560);
    });

    it('deve retornar zero de juros se a taxa for zero', () => {
        const userFormData: SimpleInterestFormData = {
            principal: 3000,
            rate: 0,
            period: 5,
        };

        const result = calculateSimpleInterest(userFormData);

        expect(result.interest).toBe(0);
        expect(result.total).toBe(3000);
    });

    it('deve retornar o principal se o período for zero', () => {
        const userFormData: SimpleInterestFormData = {
            principal: 5000,
            rate: 10,
            period: 0,
        };

        const result = calculateSimpleInterest(userFormData);

        expect(result.interest).toBe(0);
        expect(result.total).toBe(5000);
    });
});
