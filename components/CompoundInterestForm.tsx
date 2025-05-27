'use client';

import { useState } from 'react';
import { compoundInterestSchema } from '@/utils/validation/compoundInterestSchema';
import { calculateCompoundInterest } from '@/utils/calculations/compoundInterest';
import { CompoundInterestFormData } from '@/types/compoundInterest';

const placeholderValues: CompoundInterestFormData = {
    principal: 0,
    monthlyContribution: 0,
    rate: 8,
    period: 1,
};

export default function CompoundInterestForm() {
    const [form, setForm] = useState<
        Partial<Record<keyof CompoundInterestFormData, string | number>>
    >({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateCompoundInterest
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

        const formData = (
            Object.keys(placeholderValues) as Array<
                keyof CompoundInterestFormData
            >
        ).reduce((acc, key) => {
            if (form[key] !== undefined && form[key] !== '') {
                acc[key] = Number(form[key]);
            }
            return acc;
        }, {} as CompoundInterestFormData);

        const parsed = compoundInterestSchema.safeParse(formData);
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
        setResult(calculateCompoundInterest(formData));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Simulador de Juros Compostos
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Valor inicial (R$)
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Valor mensal (R$)
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="principal"
                        value={form.principal ?? ''}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        placeholder={placeholderValues.principal.toString()}
                        required
                    />
                    {errors.principal && (
                        <span className="text-red-600 text-sm">
                            {errors.principal}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="monthlyContribution"
                        value={form.monthlyContribution ?? ''}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        placeholder={placeholderValues.monthlyContribution.toString()}
                        required
                    />
                    {errors.monthlyContribution && (
                        <span className="text-red-600 text-sm">
                            {errors.monthlyContribution}
                        </span>
                    )}
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Taxa de juros anual (%)
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Período (ano(s))
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="rate"
                        value={form.rate ?? ''}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        step="0.01"
                        placeholder={placeholderValues.rate.toString()}
                        required
                    />
                    {errors.rate && (
                        <span className="text-red-600 text-sm">
                            {errors.rate}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="period"
                        value={form.period ?? ''}
                        onChange={handleChange}
                        className="input w-full"
                        min={1}
                        placeholder={placeholderValues.period.toString()}
                        required
                    />
                    {errors.period && (
                        <span className="text-red-600 text-sm">
                            {errors.period}
                        </span>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-4"
            >
                Calcular
            </button>

            {result && (
                <div
                    className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner text-center"
                    data-testid="result-card"
                >
                    <h2 className="text-2xl font-bold mb-2 text-primary">
                        Resultado
                    </h2>
                    <p>
                        Valor total ao final:{' '}
                        <b data-testid="total-value">
                            R${' '}
                            {result.total.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Total investido:{' '}
                        <b data-testid="total-contributions">
                            R${' '}
                            {result.totalContributions.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Juros acumulados:{' '}
                        <b data-testid="total-interest">
                            R${' '}
                            {result.interest.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                </div>
            )}
        </form>
    );
}
