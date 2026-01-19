import { Agent } from "./user";

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

export interface Faculte {
    _id: string;
    designation: string;
    description: string[];
    programmes?: Programme[];
    mention: string;
    couverture: string;
    equipe?: {
        agent: Agent;
        fonction: string;
    }[];
    actualites?: {
        _id: string;
        titre: string;
        sousTitre: string;
        description: string;
        photo: string;
        isActif: boolean;
    }[];
    filieres?: {
        title: string;
        description: string;
        token: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}