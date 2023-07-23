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
