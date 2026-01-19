"use client";

import { IEtablissement } from "@/components/Hero/types";
import { Faculte, Domaine, Programme } from "@/types/cycle";
import EtablissementLayout from "./EtablissementLayout";

interface Mention {
    _id: string;
    designation: string;
    facultes: Faculte[];
    domaine: Domaine;
    programmes: Programme[];
}

export interface IEtablissementWithMentions extends IEtablissement {
    mentions: Mention[];
}

interface EtablissementDetailsProps {
    etablissement: IEtablissementWithMentions;
}

const EtablissementDetails = ({ etablissement }: EtablissementDetailsProps) => {
    return <EtablissementLayout etablissement={etablissement} />;
};

export default EtablissementDetails;
