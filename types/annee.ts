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
