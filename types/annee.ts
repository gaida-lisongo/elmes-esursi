export interface activity {
    _id: string;
    designation: string;
    description: string[];
}

export interface calendar {
    _id: string;
    titre: string;
    activites: activity[];
}

export interface annee {
    _id: string;
    debut: string;
    fin: string;
    description: string;
    calendrier: calendar[];
    actif: boolean;
}

export interface Quota {
    _id: string;
    designation: string;
    description?: string[];
    montant: number;
}

export interface Frais {
    _id: string;
    designation: string;
    categorie: string;
    description?: string[];
    montant: number;
    annee: annee;
    repartition?: Quota[];
    actif: boolean;
}

