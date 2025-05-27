'use client';

import { useState } from 'react';
import { emergencyReserveSchema } from '@/utils/validation/emergencyReserveSchema';
import { calculateEmergencyReserve } from '@/utils/calculations/emergencyReserve';
import { EmergencyReserveFormData } from '@/types/emergencyReserve';

const initialValues: EmergencyReserveFormData = {
    jobType: 'CLT',
    fixedCost: 1000,
    monthlySalary: 5000,
    savingPercent: 10,
};

export default function EmergencyReserveForm() {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<null | ReturnType<
        typeof calculateEmergencyReserve
    >>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'jobType'
                    ? value
                    : value === ''
                    ? ''
                    : Number(value.replace(',', '.')),
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});
        const parsed = emergencyReserveSchema.safeParse(form);
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
        setResult(calculateEmergencyReserve(form));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-card p-8 flex flex-col gap-4 max-w-xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-primary mb-4">
                Calculadora de Reserva de Emergência
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                    <label className="font-medium">Tipo de Emprego</label>
                </div>
                <div>
                    <label className="font-medium">Custo Fixo (R$)</label>
                </div>
                <div>
                    <select
                        name="jobType"
                        value={form.jobType}
                        onChange={handleChange}
                        className="input w-full"
                        required
                    >
                        <option value="CLT">CLT</option>
                        <option value="Autônomo">Autônomo</option>
                        <option value="Empresário">Empresário</option>
                        <option value="Servidor Público">
                            Servidor Público
                        </option>
                        <option value="Outro">Outro</option>
                    </select>
                    {errors.jobType && (
                        <span className="text-red-600 text-sm">
                            {errors.jobType}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="fixedCost"
                        value={form.fixedCost}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        required
                    />
                    {errors.fixedCost && (
                        <span className="text-red-600 text-sm">
                            {errors.fixedCost}
                        </span>
                    )}
                </div>

                <div>
                    <label className="font-medium">Salário Mensal (R$)</label>
                </div>
                <div>
                    <label className="font-medium">
                        Quanto você guarda por mês? (%)
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        name="monthlySalary"
                        value={form.monthlySalary}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        required
                    />
                    {errors.monthlySalary && (
                        <span className="text-red-600 text-sm">
                            {errors.monthlySalary}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        name="savingPercent"
                        value={form.savingPercent}
                        onChange={handleChange}
                        className="input w-full"
                        min={0}
                        max={100}
                        required
                    />
                    {errors.savingPercent && (
                        <span className="text-red-600 text-sm">
                            {errors.savingPercent}
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
                <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner text-center">
                    <h2 className="text-2xl font-bold mb-2 text-primary">
                        Resultado
                    </h2>
                    <p>
                        Sua reserva de emergência recomendada é de{' '}
                        <b>
                            R${' '}
                            {result.reserveValue.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>{' '}
                        ({result.recommendedMonths} meses de custo fixo).
                    </p>
                    <p>
                        Guardando{' '}
                        <b>
                            R${' '}
                            {result.monthlySaving.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </b>{' '}
                        por mês, você levará{' '}
                        <b>{result.monthsToSave ?? '--'}</b> meses para atingir
                        sua reserva.
                    </p>
                </div>
            )}
        </form>
    );
}
