export interface Agent {
    _id: string;
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

export interface Etudiant {
    nom: string;
    postNom: string;
    prenom: string;
    dateNaissance: Date;
    lieuNaissance: string;
    nationalite: string;
    sexe: 'Masculin' | 'Feminin';
    adresse: string;
    telephone: string;
    email: string;
    grade: 'Diplomé' | 'Gradué' | 'Licencié' | 'Magistral' | 'Doctorat';
    photo?: string;
    matricule: string;
    action: boolean;
}

export interface Dossier {
    _id?: string;
    etudiant: string;
    status: 'PENDING' | 'OK' | 'NO';
    scolarite: [{
        annee: string;
        document: string;
        date: string;
        status: 'PENDING' | 'OK' | 'NO';
    }]
}
