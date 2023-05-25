export interface Expense {
    _id: string;
    date: Date;
    amount: number;
    description: string;
    origin: number;
    originKey: string;
}

export interface ResumeExpeses {
    daily: Expense[];
    extraordinary: Expense[];
    fixed: Expense[];
}