'use client';

import { useState } from 'react';
import { retirementSchema } from '@/utils/validation/retirementSchema';
import { calculateRetirement } from '@/utils/calculations/retirement';
import { RetirementFormData } from '@/types/retirement';

const initialValues: RetirementFormData = {
    monthlyIncome: 5000,
    currentInvestment: 50000,
    retirementGoal: 1000000,
    investPercent: 20,
    currentAge: 30,
    retirementAge: 65,
    annualReturn: 10,
    monthlyExpense: 10000,
};

export default function RetirementForm() {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateRetirement
    >>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value === '' ? '' : Number(value.replace(',', '.')),
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});
        const parsed = retirementSchema.safeParse(form);
        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            parsed.error.errors.forEach((err) => {
                if (err.path[0])
                    fieldErrors[err.path[0] as string] = err.message;
            });
            setErrors(fieldErrors);
            setResult(null);
            return;
        }
        setResult(calculateRetirement(form));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Simulador de Aposentadoria
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {/* Linha 1 */}
                <div>
                    <label className="font-medium">
                        Quanto você ganha por mês?
                    </label>
                </div>
                <div>
                    <label className="font-medium">
                        Quanto você já tem investido?
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="monthlyIncome"
                        value={form.monthlyIncome}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.monthlyIncome && (
                        <span className="text-red-600 text-sm">
                            {errors.monthlyIncome}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="currentInvestment"
                        value={form.currentInvestment}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.currentInvestment && (
                        <span className="text-red-600 text-sm">
                            {errors.currentInvestment}
                        </span>
                    )}
                </div>
                {/* Linha 2 */}
                <div>
                    <label className="font-medium">
                        Com quanto de patrimônio você quer se aposentar?
                    </label>
                </div>
                <div>
                    <label className="font-medium">
                        Quantos % da sua renda que você investe?
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="retirementGoal"
                        value={form.retirementGoal}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.retirementGoal && (
                        <span className="text-red-600 text-sm">
                            {errors.retirementGoal}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="investPercent"
                        value={form.investPercent}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        required
                    />
                    {errors.investPercent && (
                        <span className="text-red-600 text-sm">
                            {errors.investPercent}
                        </span>
                    )}
                </div>
                {/* Linha 3 */}
                <div>
                    <label className="font-medium">Qual sua idade atual?</label>
                </div>
                <div>
                    <label className="font-medium">
                        Com quantos anos você deseja se aposentar?
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="currentAge"
                        value={form.currentAge}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={120}
                        required
                    />
                    {errors.currentAge && (
                        <span className="text-red-600 text-sm">
                            {errors.currentAge}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="retirementAge"
                        value={form.retirementAge}
                        onChange={handleChange}
                        className="input"
                        min={form.currentAge + 1}
                        max={120}
                        required
                    />
                    {errors.retirementAge && (
                        <span className="text-red-600 text-sm">
                            {errors.retirementAge}
                        </span>
                    )}
                </div>
                {/* Linha 4 */}
                <div>
                    <label className="font-medium">
                        Sua rentabilidade total anual projetada (%)
                    </label>
                </div>
                <div>
                    <label className="font-medium">
                        Quanto você pretende gastar por mês aposentado?
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="annualReturn"
                        value={form.annualReturn}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        step="0.1"
                        required
                    />
                    {errors.annualReturn && (
                        <span className="text-red-600 text-sm">
                            {errors.annualReturn}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="monthlyExpense"
                        value={form.monthlyExpense}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.monthlyExpense && (
                        <span className="text-red-600 text-sm">
                            {errors.monthlyExpense}
                        </span>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-4"
            >
                Simular
            </button>

            {result && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner text-center">
                    <h2 className="text-2xl font-bold mb-2 text-primary">
                        Resultado
                    </h2>
                    <p>
                        Em <b>{result.years}</b> anos, você terá acumulado
                        aproximadamente{' '}
                        <b>
                            R${' '}
                            {result.futureValue.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                        .
                    </p>
                    {result.reachedGoal ? (
                        <p className="text-green-600 font-semibold mt-2">
                            Parabéns! Você atingirá seu objetivo de
                            aposentadoria.
                        </p>
                    ) : (
                        <p className="text-red-600 font-semibold mt-2">
                            Com os parâmetros atuais, você não atingirá o
                            objetivo de R${' '}
                            {form.retirementGoal.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                            . Considere aumentar o percentual investido, o tempo
                            de acumulação ou a rentabilidade.
                        </p>
                    )}
                    <p className="mt-4 text-gray-600 text-sm">
                        Seu patrimônio sustentaria{' '}
                        <b>{result.sustainabilityYears} anos</b> de
                        aposentadoria com o gasto mensal informado.
                    </p>
                </div>
            )}
        </form>
    );
}
