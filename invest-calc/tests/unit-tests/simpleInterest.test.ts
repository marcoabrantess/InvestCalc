import { calculateSimpleInterest } from '@/utils/calculations/simpleInterest';
import { SimpleInterestFormData } from '@/types/simpleInterest';

describe('calculateSimpleInterest', () => {
    it('deve calcular corretamente o juro simples padrão', () => {
        const formData: SimpleInterestFormData = {
            principal: 1000,
            rate: 5, // 5% ao ano
            period: 3, // 3 anos
        };
        const result = calculateSimpleInterest(formData);

        // Juros: 1000 * 0.05 * 3 = 150
        expect(result.interest).toBe(150);
        expect(result.total).toBe(1150);
    });

    it('deve retornar zero de juros se a taxa for zero', () => {
        const formData: SimpleInterestFormData = {
            principal: 2000,
            rate: 0,
            period: 5,
        };
        const result = calculateSimpleInterest(formData);

        expect(result.interest).toBe(0);
        expect(result.total).toBe(2000);
    });

    it('deve retornar o principal se o período for zero', () => {
        const formData: SimpleInterestFormData = {
            principal: 5000,
            rate: 8,
            period: 0,
        };
        const result = calculateSimpleInterest(formData);

        expect(result.interest).toBe(0);
        expect(result.total).toBe(5000);
    });
});
