import { useState } from "react";
import EtabHeader from "./EtabHeader";
import EtabSidebar from "./EtabSidebar";
import MentionDetails from "./MentionDetails";
import { IEtablissementWithMentions } from "./EtablissementDetails";
import AuthModal from "./AuthModal";
import { Agent } from "@/types/user";

interface EtablissementLayoutProps {
    etablissement: IEtablissementWithMentions;
}

const EtablissementLayout = ({ etablissement }: EtablissementLayoutProps) => {
    const [currentMentionId, setCurrentMentionId] = useState<string>(etablissement.mentions?.[0]?._id);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<{ agent: Agent, fonction: string } | null>(null);

    const handleLoginClick = (membre: { agent: Agent, fonction: string }) => {
        setSelectedAgent(membre);
        setIsAuthModalOpen(true);
    };

    return (
        <>
            <EtabHeader
                etablissement={etablissement}
                currentMentionId={currentMentionId}
                onMentionSelect={setCurrentMentionId}
            />

            <section className="pb-16 md:pb-20 lg:pb-24">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        {/* Sidebar: Description & Info */}
                        <div className="w-full px-4 lg:w-1/3 xl:w-1/4">
                            <EtabSidebar
                                etablissement={etablissement}
                                onLoginClick={handleLoginClick}
                            />
                        </div>

                        {/* Main Content: Faculties Grid */}
                        <div className="w-full px-4 lg:w-2/3 xl:w-3/4">
                            <MentionDetails
                                etablissement={etablissement}
                                currentMentionId={currentMentionId}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                agent={selectedAgent?.agent}
            />
        </>
    );
};

export default EtablissementLayout;
