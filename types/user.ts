export interface Agent {
    nom: string;
    postNom: string;
    prenom: string;
    dateNaissance: Date;
    nationalite: string;
    sexe: string;
    adresse: string;
    telephone: string;
    email: string;
    grade: any;
    province: string
    actif: boolean;
    photo?: string;
    matricule: string;
    autorisation: {
        role: string;
        secureKey: string;
        status: 'OK' | 'PENDING' | 'NO'
    }[];
    action: boolean;
}