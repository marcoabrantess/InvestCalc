type JobType = 'CLT' | 'Autônomo' | 'Empresário' | 'Servidor Público' | 'Outro';

export interface EmergencyReserveFormData {
    jobType: JobType;
    fixedCost: number;
    monthlySalary: number;
    savingPercent: number;
}
