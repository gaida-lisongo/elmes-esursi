import { useState } from "react";
import Image from "next/image";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";
import TeamModal from "./TeamModal";

interface TeamFaculteProps {
    faculte: Faculte;
    isEditing?: boolean;
    onUpdate?: (payload: Partial<Faculte>) => void;
}

const roleMap: { [key: string]: string } = {
    "CF": "Chef de section",
    "CE": "Chargé de l'Enseignement",
    "CR": "Chargé de la recherche",
    "SA": "Secrétaire Académique",
    "SD": "Secrétaire Administratif",
};

const TeamFaculte = ({ faculte, isEditing, onUpdate }: TeamFaculteProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("Faculte data : ", faculte);
    const handleAddMember = (data: { agent: string; fonction: string }) => {
        const newEquipe = [...(faculte.equipe || [])];
        // Note: The backend expects 'agent' as an ID string in the payload, 
        // though the interface says Agent object. We'll send the ID.
        newEquipe.push(data as any);
        onUpdate?.({ equipe: newEquipe });
    };

    const handleDeleteMember = (index: number) => {
        if (!confirm("Retirer ce membre de l'équipe ?")) return;
        const newEquipe = (faculte.equipe || []).filter((_, i) => i !== index);
        onUpdate?.({ equipe: newEquipe });
    };

    return (
        <section className="mb-20">
            <div className="mb-10 flex items-center justify-between">
                <div className="flex-1"></div>
                <div className="flex-1">
                    <SectionHeader
                        headerInfo={{
                            title: "ÉQUIPE",
                            subtitle: "Notre Équipe",
                            description: "Rencontrez les membres de notre équipe dévouée."
                        }}
                    />
                </div>
                <div className="flex-1 flex justify-end">
                    {isEditing && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 shadow-lg transition-transform hover:scale-105"
                        >
                            + Ajouter un membre
                        </button>
                    )}
                </div>
            </div>

            {faculte.equipe && faculte.equipe.length > 0 ? (
                <div className="rounded-lg border border-stroke bg-white p-8 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {faculte.equipe.map((membre, idx) => (
                            <div key={idx} className="group relative flex flex-col items-center gap-4 text-center">
                                {isEditing && (
                                    <button
                                        onClick={() => handleDeleteMember(idx)}
                                        className="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600 shadow-md"
                                        title="Retirer de l'équipe"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200 ring-2 ring-primary ring-offset-2 dark:ring-offset-blacksection">
                                    {membre.agent?.photo ? (
                                        <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                                            {membre.agent?.nom?.[0] || "?"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-black dark:text-white">
                                        {membre.agent?.prenom} {membre.agent?.nom}
                                    </h4>
                                    <span className="text-sm text-primary font-medium">
                                        {roleMap[membre.fonction] || membre.fonction}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center italic text-body-color dark:text-body-color-dark py-10 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-stroke dark:border-strokedark">
                    Aucun membre d'équipe listé pour le moment.
                </div>
            )}

            <TeamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddMember}
            />
        </section>
    );
};

export default TeamFaculte;
