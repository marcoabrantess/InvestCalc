import { calculateCompoundInterest } from '@/utils/calculations/compoundInterest';
import { CompoundInterestFormData } from '@/types/compoundInterest';

describe('Integração: Simulação de Juros Compostos', () => {
    it('deve calcular corretamente o valor futuro com aporte mensal', () => {
        // Simulando dados vindos de um formulário preenchido pelo usuário
        const userFormData: CompoundInterestFormData = {
            principal: 5000,
            monthlyContribution: 200,
            rate: 10, // 10% ao ano
            period: 5, // 5 anos
        };

        // Integração: chamada da função de cálculo com os dados do formulário
        const result = calculateCompoundInterest(userFormData);

        // Validação do resultado integrado
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('interest');
        expect(result).toHaveProperty('totalContributions');
        expect(result.total).toBeGreaterThan(result.totalContributions);
        expect(result.interest).toBeCloseTo(
            result.total - result.totalContributions,
            2
        );
    });

    it('deve retornar apenas o principal se taxa e aporte forem zero', () => {
        const userFormData: CompoundInterestFormData = {
            principal: 3000,
            monthlyContribution: 0,
            rate: 0,
            period: 10,
        };

        const result = calculateCompoundInterest(userFormData);

        expect(result.total).toBe(3000);
        expect(result.interest).toBe(0);
        expect(result.totalContributions).toBe(3000);
    });

    it('deve retornar apenas o principal se o período for zero', () => {
        const userFormData: CompoundInterestFormData = {
            principal: 10000,
            monthlyContribution: 500,
            rate: 8,
            period: 0,
        };

        const result = calculateCompoundInterest(userFormData);

        expect(result.total).toBe(10000);
        expect(result.interest).toBe(0);
        expect(result.totalContributions).toBe(10000);
    });
});
