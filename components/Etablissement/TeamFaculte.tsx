"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

    const handleAddMember = (data: { agent: string; fonction: string }) => {
        const newEquipe = [...(faculte.equipe || [])];
        newEquipe.push(data as any);
        onUpdate?.({ equipe: newEquipe });
    };

    const handleDeleteMember = (index: number) => {
        if (!confirm("Retirer ce membre de l'équipe ?")) return;
        const newEquipe = (faculte.equipe || []).filter((_, i) => i !== index);
        onUpdate?.({ equipe: newEquipe });
    };

    return (
        <section className="mb-25">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                <div className="mb-12 flex flex-wrap items-center justify-between gap-5">
                    <div className="flex-1">
                        <SectionHeader
                            headerInfo={{
                                title: "NOTRE ÉQUIPE",
                                subtitle: "Le Corps Académique",
                                description: "Rencontrez les experts et responsables qui dirigent notre faculté vers l'excellence."
                            }}
                        />
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7.5 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho shadow-solid-5"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Ajouter un membre
                        </button>
                    )}
                </div>

                {faculte.equipe && faculte.equipe.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {faculte.equipe.map((membre, idx) => (
                            <motion.div
                                key={idx}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                initial="hidden"
                                whileInView="visible"
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
                            >
                                {/* Photo Container */}
                                <div className="relative h-72 w-full overflow-hidden">
                                    {membre.agent?.photo ? (
                                        <Image
                                            src={membre.agent.photo}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={`${membre.agent.prenom} ${membre.agent.nom}`}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                                            <svg className="h-20 w-20 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="mt-2 text-xs font-bold uppercase tracking-widest opacity-40">No Photo</span>
                                        </div>
                                    )}

                                    {/* Role Badge Overlay */}
                                    <div className="absolute bottom-4 left-4 z-10">
                                        <span className="inline-block rounded-lg bg-white/20 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                                            {membre.fonction ? (roleMap[membre.fonction] || membre.fonction) : "Membre"}
                                        </span>
                                    </div>

                                    {/* Delete Button (Editing Mode) */}
                                    {isEditing && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMember(idx);
                                            }}
                                            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
                                            title="Retirer le membre"
                                        >
                                            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="p-6">
                                    <h4 className="mb-1.5 text-lg font-bold text-black transition-colors group-hover:text-primary dark:text-white">
                                        {membre.agent?.prenom} {membre.agent?.nom}
                                    </h4>
                                    <p className="text-sm font-medium text-body-color dark:text-body-color-dark">
                                        {membre.agent?.email || "Email non renseigné"}
                                    </p>

                                    {/* Socials / Links Placeholder */}
                                    <div className="mt-5 flex items-center gap-4 border-t border-stroke pt-5 dark:border-strokedark">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-xs font-medium text-body-color uppercase">Actif</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stroke py-10 text-center dark:border-strokedark">
                        <div className="mb-4 text-body-color opacity-30">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="italic text-body-color dark:text-body-color-dark">
                            La liste des membres de l'équipe est actuellement vide.
                        </p>
                    </div>
                )}
            </div>

            <TeamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddMember}
            />
        </section>
    );
};

export default TeamFaculte;
