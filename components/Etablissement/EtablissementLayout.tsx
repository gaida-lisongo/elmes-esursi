"use client";
import { useState, useEffect } from "react";
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
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedEtabId = localStorage.getItem("etabId");
        const token = localStorage.getItem("token");
        if (storedEtabId === etablissement._id && token) {
            setIsEditing(true);
        }
    }, [etablissement._id]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("etabId");
        localStorage.removeItem("role");
        localStorage.removeItem("agentId");
        setIsEditing(false);
    };

    const handleLoginClick = (membre: { agent: Agent, fonction: string }) => {
        setSelectedAgent(membre);
        setIsAuthModalOpen(true);
    };

    const handleLoginSuccess = () => {
        setIsAuthModalOpen(false);
        setIsEditing(true);
    };

    return (
        <>
            <EtabHeader
                etablissement={etablissement}
                currentMentionId={currentMentionId}
                onMentionSelect={setCurrentMentionId}
                isEditing={isEditing}
            />

            {isEditing && (
                <div className="sticky top-20 z-30 mb-4 mx-4 rounded-lg bg-primary px-6 py-3 text-white shadow-lg flex items-center justify-between animate-fade-in-up md:mx-auto md:max-w-c-1390">
                    <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </span>
                        <div>
                            <p className="font-bold text-sm md:text-base">Mode Édition Activé</p>
                            <p className="text-xs text-white/80 hidden md:block">Vous pouvez modifier les informations de cet établissement.</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                        Se déconnecter
                    </button>
                </div>
            )}

            <section className="pb-16 md:pb-20 lg:pb-24">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        {/* Sidebar: Description & Info */}
                        <div className="w-full px-4 lg:w-1/3 xl:w-1/4">
                            <EtabSidebar
                                etablissement={etablissement}
                                onLoginClick={handleLoginClick}
                                isEditing={isEditing}
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
                role={selectedAgent?.fonction}
                etabId={etablissement._id}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
};

export default EtablissementLayout;
