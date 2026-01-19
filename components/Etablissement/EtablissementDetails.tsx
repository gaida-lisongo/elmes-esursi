"use client";

import { useState } from "react";
import { IEtablissement } from "@/components/Hero/types";
import { Faculte, Domaine, Programme } from "@/types/cycle";
import EtabSidebar from "./EtabSidebar";
import EtabGeneralInfo from "./EtabGeneralInfo";
import MentionDetails from "./MentionDetails";

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
    // console.log("Data from props: ", etablissement);
    const [currentMentionId, setCurrentMentionId] = useState<string>(etablissement.mentions?.[0]?._id);

    return (
        <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    {/* Sidebar */}
                    <div className="w-full px-4 lg:w-1/4">
                        <EtabSidebar
                            etablissement={etablissement}
                            currentMentionId={currentMentionId}
                            onMentionSelect={setCurrentMentionId}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="w-full px-4 lg:w-3/4">
                        {/* 1. General Info (Description, Contacts) - Added back as per feedback "informations de létablisement" */}
                        <EtabGeneralInfo etablissement={etablissement} />

                        {/* 2. Mention Details (Header/Search + Grid) */}
                        <MentionDetails
                            etablissement={etablissement}
                            currentMentionId={currentMentionId}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EtablissementDetails;
