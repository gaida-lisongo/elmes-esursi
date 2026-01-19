
// {
//     "_id": "6968ffed72bc52e1358d504e",
//     "designation": "Ancien système",
//     "code": "AS",
//     "credits": 180,
//     "actif": true,
//     "maquetteUrl": "",
//     "__v": 0
// }

export interface Cycle {
    _id: string;
    designation: string;
    code: string;
    credits: number;
    actif: boolean;
    maquetteUrl: string;
}


/*

        {
            "_id": "6969003e72bc52e1358d5053",
            "designation": "Préparatoire",
            "code": "PREP",
            "description": "Science de base:\n    -Mathématique\n   -Informatique\n",
            "cycle": {
                "_id": "6968ffed72bc52e1358d504e",
                "designation": "Ancien système",
                "code": "AS",
                "credits": 180,
                "actif": true,
                "maquetteUrl": "",
                "__v": 0
            },
            "credits": 90,
            "actif": true,
            "__v": 0
        }
             */
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