'use client';

import { useState } from 'react';
import { rentOrBuySchema } from '@/utils/validation/rentOrBuySchema';
import { calculateRentOrBuy } from '@/utils/calculations/rentOrBuy';
import { RentOrBuyFormData } from '@/types/rentOrBuy';

const initialValues: RentOrBuyFormData = {
    propertyValue: 500000,
    rentValue: 2000,
    appreciation: 4,
    igpm: 8.63,
    downPayment: 100000,
    financingCosts: 15000,
    term: 360,
    interestRate: 7,
    investmentReturn: 11,
};

export default function RentOrBuyForm() {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateRentOrBuy
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
        const parsed = rentOrBuySchema.safeParse(form);
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
        setResult(calculateRentOrBuy(form));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Alugar ou Financiar um Imóvel?
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                    <label className="font-medium">Valor do imóvel (R$)</label>
                </div>
                <div>
                    <label className="font-medium">Valor do aluguel (R$)</label>
                </div>
                <div>
                    <input
                        type="number"
                        name="propertyValue"
                        value={form.propertyValue}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.propertyValue && (
                        <span className="text-red-600 text-sm">
                            {errors.propertyValue}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="rentValue"
                        value={form.rentValue}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.rentValue && (
                        <span className="text-red-600 text-sm">
                            {errors.rentValue}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium">Valorização anual (%)</label>
                </div>
                <div>
                    <label className="font-medium">IGPM anual (%)</label>
                </div>
                <div>
                    <input
                        type="number"
                        name="appreciation"
                        value={form.appreciation}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        step="0.01"
                        required
                    />
                    {errors.appreciation && (
                        <span className="text-red-600 text-sm">
                            {errors.appreciation}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="igpm"
                        value={form.igpm}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        step="0.01"
                        required
                    />
                    {errors.igpm && (
                        <span className="text-red-600 text-sm">
                            {errors.igpm}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium">Entrada (R$)</label>
                </div>
                <div>
                    <label className="font-medium">
                        Custos do financiamento (R$)
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="downPayment"
                        value={form.downPayment}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.downPayment && (
                        <span className="text-red-600 text-sm">
                            {errors.downPayment}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="financingCosts"
                        value={form.financingCosts}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        required
                    />
                    {errors.financingCosts && (
                        <span className="text-red-600 text-sm">
                            {errors.financingCosts}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium">Prazo (meses)</label>
                </div>
                <div>
                    <label className="font-medium">Taxa anual (%)</label>
                </div>
                <div>
                    <input
                        type="number"
                        name="term"
                        value={form.term}
                        onChange={handleChange}
                        className="input"
                        min={1}
                        required
                    />
                    {errors.term && (
                        <span className="text-red-600 text-sm">
                            {errors.term}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="interestRate"
                        value={form.interestRate}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        step="0.01"
                        required
                    />
                    {errors.interestRate && (
                        <span className="text-red-600 text-sm">
                            {errors.interestRate}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium">
                        Rentabilidade anual (%)
                    </label>
                </div>
                <div></div>
                <div>
                    <input
                        type="number"
                        name="investmentReturn"
                        value={form.investmentReturn}
                        onChange={handleChange}
                        className="input"
                        min={0}
                        max={100}
                        step="0.01"
                        required
                    />
                    {errors.investmentReturn && (
                        <span className="text-red-600 text-sm">
                            {errors.investmentReturn}
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
                        Prestação mensal:{' '}
                        <b>
                            R${' '}
                            {result.monthlyPayment.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Valor do imóvel ao final:{' '}
                        <b>
                            R${' '}
                            {result.finalPropertyValue.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Valor investido ao final:{' '}
                        <b>
                            R${' '}
                            {result.invested.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p className="mt-4 text-lg font-semibold">
                        <span
                            className={
                                result.recommendation === 'Alugar'
                                    ? 'text-green-600'
                                    : 'text-blue-600'
                            }
                        >
                            {result.recommendation === 'Alugar'
                                ? 'Alugar é mais vantajoso.'
                                : 'Financiar é mais vantajoso.'}
                        </span>
                    </p>
                </div>
            )}
        </form>
    );
}
