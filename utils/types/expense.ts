export interface AllExpensesType {
    created_at?: CreatedAt;
    id?: string;
    description?: string;
    amount?: number;
    title?: string;
    category?: string;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}
export interface AllIncomeType {
    created_at?: CreatedAt;
    id?: string;
    amount?: number;
    category?: string;
}


