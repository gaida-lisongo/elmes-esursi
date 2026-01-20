export interface Request {
    amount: number;
    currency: string;
    phone: string;
    reference: string;
    recetteId: string;
}

export interface Check {
    reference: string;
    amount: string;
    amountCustomer: string;
    currency: string;
    createdAt: string;
    status: string;
    channel: string;
}