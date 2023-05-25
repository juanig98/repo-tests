import { Origin } from "./Origin";

export interface ResumeBalance {
    origin: Origin;
    balance: number;
    isInitial?: boolean;
    isIncome?: boolean;
    isExpenses?: boolean;
    isTotal?: boolean;
};

export interface Balance {
    initial: ResumeBalance[];
    income: ResumeBalance[];
    expenses: ResumeBalance[];
    total: ResumeBalance[];
}