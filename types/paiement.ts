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
/**
 * 
        "etudiant": "696a7af4e0e635341acadaca",
        "programme": "6969003e72bc52e1358d5053",
        "annee": "696906e772bc52e1358d5090",
        "decision": "En attente",
        "status": "NO",
        "etablissement": "6969376e0e732e9edab79d78",
 */
export interface Parcours {
    programme: string;
    annee: string;
    etablissement: string;
    etudiant: string;
    decision: string;
    status: string;
    _id: string;
    tranche?: string;
}