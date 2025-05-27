'use client';

import { useState, useMemo } from 'react';
import { fixedIncomeComparatorSchema } from '@/utils/validation/fixedIncomeComparatorSchema';
import { calculateFixedIncomeComparator } from '@/utils/calculations/fixedIncomeComparator';
import {
    FixedIncomeComparatorFormData,
    YieldType,
} from '@/types/fixedIncomeComparator';

const placeholderValues: FixedIncomeComparatorFormData = {
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

// Valores base centralizados
const BASE_CDI = 14.65;
const BASE_IPCA = 4.5;

// Componente reutilizável para campos de input
function InputField({
    name,
    value,
    onChange,
    label,
    error,
    type = 'number',
    min,
    placeholder,
    required = true,
}: {
    name: keyof FixedIncomeComparatorFormData;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    error?: string;
    type?: string;
    min?: number;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="font-medium block max-w-xs break-words whitespace-normal">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                className="input w-full"
                min={min}
                placeholder={placeholder}
                required={required}
            />
            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
}

// Componente reutilizável para campos de select
function SelectField({
    name,
    value,
    onChange,
    label,
    error,
    options,
    required = true,
}: {
    name: keyof FixedIncomeComparatorFormData;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    error?: string;
    options: { value: string; label: string }[];
    required?: boolean;
}) {
    return (
        <div>
            <label className="font-medium block max-w-xs break-words whitespace-normal">
                {label}
            </label>
            <select
                name={name}
                value={value ?? ''}
                onChange={onChange}
                className="input w-full"
                required={required}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
}

export default function FixedIncomeComparatorForm() {
    const [form, setForm] = useState<
        Partial<Record<keyof FixedIncomeComparatorFormData, string | number>>
    >({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateFixedIncomeComparator
    >>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const formData = (
            Object.keys(placeholderValues) as Array<
                keyof FixedIncomeComparatorFormData
            >
        ).reduce((acc, key) => {
            if (form[key] !== undefined && form[key] !== '') {
                if (key === 'yieldTypeA' || key === 'yieldTypeB') {
                    acc[key] = form[key] as YieldType;
                } else if (
                    key === 'investmentTypeA' ||
                    key === 'investmentTypeB'
                ) {
                    acc[key] = form[key] as string;
                } else {
                    acc[key] = Number(form[key]);
                }
            }

            return acc;
        }, {} as FixedIncomeComparatorFormData);

        const parsed = fixedIncomeComparatorSchema.safeParse(formData);
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

        setResult(calculateFixedIncomeComparator(formData));
    };

    const resultDisplay = useMemo(() => {
        if (!result) return null;

        return (
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
        );
    }, [result]);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Comparador de Renda Fixa
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <SelectField
                    name="investmentTypeA"
                    value={form.investmentTypeA as string}
                    onChange={handleChange}
                    label="Qual é o tipo de investimento?"
                    options={investmentTypes}
                    error={errors.investmentTypeA}
                />
                <SelectField
                    name="investmentTypeB"
                    value={form.investmentTypeB as string}
                    onChange={handleChange}
                    label="Você quer comparar com:"
                    options={investmentTypes}
                    error={errors.investmentTypeB}
                />

                <SelectField
                    name="yieldTypeA"
                    value={
                        (form.yieldTypeA as string) ||
                        placeholderValues.yieldTypeA
                    }
                    onChange={handleChange}
                    label="A rentabilidade está em"
                    options={yieldTypeOptions}
                    error={errors.yieldTypeA}
                />
                <SelectField
                    name="yieldTypeB"
                    value={
                        (form.yieldTypeB as string) ||
                        placeholderValues.yieldTypeB
                    }
                    onChange={handleChange}
                    label="A rentabilidade está em"
                    options={yieldTypeOptions}
                    error={errors.yieldTypeB}
                />

                <InputField
                    name="yieldA"
                    value={form.yieldA}
                    onChange={handleChange}
                    label="Rentabilidade"
                    error={errors.yieldA}
                    placeholder={placeholderValues.yieldA.toString()}
                />
                <InputField
                    name="yieldB"
                    value={form.yieldB}
                    onChange={handleChange}
                    label="Rentabilidade"
                    error={errors.yieldB}
                    placeholder={placeholderValues.yieldB.toString()}
                />

                <InputField
                    name="periodA"
                    value={form.periodA}
                    onChange={handleChange}
                    label="Tempo de investimento (meses)"
                    error={errors.periodA}
                    placeholder={placeholderValues.periodA.toString()}
                    min={1}
                />
                <InputField
                    name="periodB"
                    value={form.periodB}
                    onChange={handleChange}
                    label="Tempo de investimento (meses)"
                    error={errors.periodB}
                    placeholder={placeholderValues.periodB.toString()}
                    min={1}
                />
            </div>
            <div className="text-xs text-gray-500 mt-2">
                Valores base utilizados: CDI {BASE_CDI}% | IPCA {BASE_IPCA}%
            </div>
            <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-4"
            >
                Calcular
            </button>

            {resultDisplay}
        </form>
    );
}
