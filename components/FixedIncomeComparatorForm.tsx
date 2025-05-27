'use client';

import { useState } from 'react';
import { fixedIncomeComparatorSchema } from '@/utils/validation/fixedIncomeComparatorSchema';
import { calculateFixedIncomeComparator } from '@/utils/calculations/fixedIncomeComparator';
import {
    FixedIncomeComparatorFormData,
    YieldType,
} from '@/types/fixedIncomeComparator';

const initialValues: FixedIncomeComparatorFormData = {
    investmentTypeA: '',
    investmentTypeB: '',
    yieldTypeA: 'pre',
    yieldTypeB: 'pre',
    yieldA: 100,
    yieldB: 100,
    periodA: 12,
    periodB: 12,
};

const yieldTypeOptions = [
    { value: 'pre', label: 'Pré-fixado' },
    { value: 'cdi', label: '% do CDI' },
    { value: 'ipca', label: 'Taxa fixada + IPCA' },
];

const investmentTypes = [
    { value: '', label: 'Selecione o tipo' },
    { value: 'cdb', label: 'CDB' },
    { value: 'lc', label: 'LC' },
    { value: 'lci', label: 'LCI' },
    { value: 'lca', label: 'LCA' },
    { value: 'tesouro', label: 'Tesouro Direto' },
    { value: 'outro', label: 'Outro' },
];

export default function FixedIncomeComparatorForm() {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateFixedIncomeComparator
    >>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name.startsWith('yieldType')
                ? (value as YieldType)
                : value === ''
                ? ''
                : Number.isNaN(Number(value))
                ? value
                : Number(value.replace(',', '.')),
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});
        const parsed = fixedIncomeComparatorSchema.safeParse(form);
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
        setResult(calculateFixedIncomeComparator(form));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Comparador de Renda Fixa
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Qual é o tipo de investimento?
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Você quer comparar com:
                    </label>
                </div>
                <div>
                    <select
                        name="investmentTypeA"
                        value={form.investmentTypeA}
                        onChange={handleChange}
                        className="input w-full"
                        required
                    >
                        {investmentTypes.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.investmentTypeA && (
                        <span className="text-red-600 text-sm">
                            {errors.investmentTypeA}
                        </span>
                    )}
                </div>
                <div>
                    <select
                        name="investmentTypeB"
                        value={form.investmentTypeB}
                        onChange={handleChange}
                        className="input w-full"
                        required
                    >
                        {investmentTypes.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.investmentTypeB && (
                        <span className="text-red-600 text-sm">
                            {errors.investmentTypeB}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        A rentabilidade está em
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        A rentabilidade está em
                    </label>
                </div>
                <div>
                    <select
                        name="yieldTypeA"
                        value={form.yieldTypeA}
                        onChange={handleChange}
                        className="input w-full"
                        required
                    >
                        {yieldTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.yieldTypeA && (
                        <span className="text-red-600 text-sm">
                            {errors.yieldTypeA}
                        </span>
                    )}
                </div>
                <div>
                    <select
                        name="yieldTypeB"
                        value={form.yieldTypeB}
                        onChange={handleChange}
                        className="input w-full"
                        required
                    >
                        {yieldTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.yieldTypeB && (
                        <span className="text-red-600 text-sm">
                            {errors.yieldTypeB}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Rentabilidade
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Rentabilidade
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="yieldA"
                        value={form.yieldA}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        required
                    />
                    {errors.yieldA && (
                        <span className="text-red-600 text-sm">
                            {errors.yieldA}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="yieldB"
                        value={form.yieldB}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        required
                    />
                    {errors.yieldB && (
                        <span className="text-red-600 text-sm">
                            {errors.yieldB}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Tempo de investimento (meses)
                    </label>
                </div>
                <div>
                    <label className="font-medium block max-w-xs break-words whitespace-normal">
                        Tempo de investimento (meses)
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="periodA"
                        value={form.periodA}
                        onChange={handleChange}
                        className="input w-full"
                        min={1}
                        required
                    />
                    {errors.periodA && (
                        <span className="text-red-600 text-sm">
                            {errors.periodA}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="periodB"
                        value={form.periodB}
                        onChange={handleChange}
                        className="input w-full"
                        min={1}
                        required
                    />
                    {errors.periodB && (
                        <span className="text-red-600 text-sm">
                            {errors.periodB}
                        </span>
                    )}
                </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
                Valores base utilizados: CDI 14,65% | IPCA 4,5%
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
                        Investimento A:{' '}
                        <b>
                            R${' '}
                            {result.finalA.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p>
                        Investimento B:{' '}
                        <b>
                            R${' '}
                            {result.finalB.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>
                    </p>
                    <p className="mt-4 text-lg font-semibold">
                        {result.diff > 0
                            ? `O investimento A rende R$ ${result.diff.toLocaleString(
                                  'pt-BR',
                                  { minimumFractionDigits: 2 }
                              )} a mais.`
                            : result.diff < 0
                            ? `O investimento B rende R$ ${Math.abs(
                                  result.diff
                              ).toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                              })} a mais.`
                            : 'Ambos rendem o mesmo valor.'}
                    </p>
                </div>
            )}
        </form>
    );
}
