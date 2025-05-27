'use client';

import { useState } from 'react';
import { simpleInterestSchema } from '@/utils/validation/simpleInterestSchema';
import { calculateSimpleInterest } from '@/utils/calculations/simpleInterest';
import { SimpleInterestFormData } from '@/types/simpleInterest';

const placeholderValues: SimpleInterestFormData = {
    principal: 1000,
    rate: 6.25,
    period: 12,
};

export default function SimpleInterestForm() {
    const [form, setForm] = useState<
        Partial<Record<keyof SimpleInterestFormData, string | number>>
    >({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateSimpleInterest
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
                keyof SimpleInterestFormData
            >
        ).reduce((acc, key) => {
            if (form[key] !== undefined && form[key] !== '') {
                acc[key] = Number(form[key]);
            }
            return acc;
        }, {} as SimpleInterestFormData);

        const parsed = simpleInterestSchema.safeParse(formData);
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
        setResult(calculateSimpleInterest(formData));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Simulador de Juros Simples
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                    <label className="font-medium">Valor inicial (R$)</label>
                </div>
                <div>
                    <label className="font-medium">
                        Taxa de juros anual (%)
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
                    <label className="font-medium">Período (ano(s))</label>
                </div>
                <div></div>
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
                <div></div>
            </div>
            <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-4"
            >
                Calcular
            </button>

            {result && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner text-center">
                    <h2 className="text-2xl font-bold mb-2 text-primary">
                        Resultado
                    </h2>
                    <p>
                        Juros simples:{' '}
                        <b>
                            R${' '}
                            {result.interest.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Valor total ao final:{' '}
                        <b>
                            R${' '}
                            {result.total.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                </div>
            )}
        </form>
    );
}
