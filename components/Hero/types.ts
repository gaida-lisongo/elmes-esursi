export interface IProvince {
    designation: string;
    code: string;
    description?: string;
    _id: string;
}

export interface IEtablissement {
    sigle: string;
    designation: string;
    description?: string[];
    website?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
    photo?: string[];
    nRef?: { document: string, date: string, reference: string }[];
    coge?: {
        fonction: string;
        agent: any;
    }[];
    rapports?: {
        titre: string;
        document: string;
        date: string;
        annee: any;
    }[];
    _id: string;
    province: IProvince;
}
