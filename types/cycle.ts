export interface Cycle {
    _id: string;
    designation: string;
    code: string;
    credits: number;
    actif: boolean;
    maquetteUrl: string;
}

export interface Programme {
    _id: string;
    designation: string;
    code: string;
    description: string;
    cycle: Cycle;
    credits: number;
    actif: boolean;
    __v: number;
}


export interface Domaine {
    _id: string;
    designation: string;
    code: string;
    description?: string;
    mentions: string[];
    maquetteUrl?: string;
    cycle: Cycle;
}
/**
 * 
                    {
                        "_id": "696d935fd87085daa6356503",
                        "designation": "Informatique Mécanique et Construction",
                        "description": [
                            "La Filière Informatique permet de gérer la mention IA, Réseau",
                            "La Filière Mécanique permet de gérer la mention génie mécanique",
                            "La Filière Construction permet de gérer la mention BTP"
                        ],
                        "programmes": [],
                        "mention": "696d909464f1eee503650d51",
                        "couverture": "https://minesursi.gouv.cd/images/WhatsApp%20Image%202025-12-15%20at%2023.24.51.jpeg",
                        "equipe": [],
                        "actualites": [],
                        "createdAt": "2026-01-19T02:13:51.263Z",
                        "updatedAt": "2026-01-19T02:13:51.263Z",
                        "__v": 0
                    }
 */
export interface Faculte {
    _id: string;
    designation: string;
    description: string[];
    programmes: any[];
    mention: string;
    couverture: string;
    equipe: any[];
    actualites: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}