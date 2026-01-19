"use client";

import { useState } from "react";
import Image from "next/image";
import { IEtablissement } from "@/components/Hero/types";
import SidebarLink from "@/components/Docs/SidebarLink";
import { Faculte, Domaine } from "@/types/cycle";
import { motion } from "framer-motion";

interface Mention {
    _id: string;
    designation: string;
    facultes: Faculte[];
    domaine: Domaine;
}

export interface IEtablissementWithMentions extends IEtablissement {
    mentions: Mention[];
}

interface EtablissementDetailsProps {
    etablissement: IEtablissementWithMentions;
}

const EtablissementDetails = ({ etablissement }: EtablissementDetailsProps) => {
    console.log("Data from props: ", etablissement);
    const [currentMentionId, setCurrentMentionId] = useState<string>(etablissement.mentions?.[0]?._id);
    const [searchQuery, setSearchQuery] = useState("");

    const currentMention = etablissement.mentions?.find(m => m._id === currentMentionId);

    // Sort facultes by designation or any other criteria if needed
    // Filter by search query
    const filteredFacultes = currentMention?.facultes.filter(f =>
        f.designation.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    {/* Sidebar */}
                    <div className="w-full px-4 lg:w-1/4">
                        <div className="sticky top-[74px] flex flex-col gap-8">
                            {/* Establishment Info Card */}
                            <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection text-center">
                                <div className="mb-4 flex items-center justify-center">
                                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-strokedark">
                                        {etablissement.photo && etablissement.photo[0] ? (
                                            <Image src={etablissement.photo[0]} alt={etablissement.sigle} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-white">
                                                {etablissement.sigle?.slice(0, 2) || "??"}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="mb-1 text-lg font-bold text-black dark:text-white">
                                    {etablissement.designation}
                                </h3>
                                <p className="text-sm font-medium text-primary">{etablissement.sigle || ""}</p>

                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    <span className="inline-block rounded bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                        {etablissement.province?.designation}
                                    </span>
                                </div>
                            </div>

                            {/* Mentions List */}
                            <div className="rounded-lg border border-stroke bg-white p-4 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                                <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">Mentions</h4>
                                {etablissement.mentions && etablissement.mentions.length > 0 ? (
                                    <SidebarLink
                                        data={etablissement.mentions.map(m => ({
                                            title: m.designation,
                                            id: m._id,
                                            isCurrent: m._id === currentMentionId,
                                            onClick: () => setCurrentMentionId(m._id)
                                        }))}
                                    />
                                ) : (
                                    <p className="text-sm text-body-color">Aucune mention disponible.</p>
                                )}
                            </div>

                            {/* COGE Card */}
                            {etablissement.coge && etablissement.coge.length > 0 && (
                                <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                                    <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">Comité de Gestion</h4>
                                    <div className="flex flex-col gap-4">
                                        {etablissement.coge.slice(0, 4).map((membre, idx) => (
                                            <div key={idx} className="flex flex-col gap-3 border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                                        {membre.agent?.photo ? (
                                                            <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                                                                {membre.agent?.nom?.[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-black dark:text-white line-clamp-1">{membre.agent?.prenom} {membre.agent?.nom}</p>
                                                        <p className="text-xs text-body-color">{membre.fonction}</p>
                                                    </div>
                                                </div>
                                                <button className="w-full rounded-md bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                                    Se connecter
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full px-4 lg:w-3/4">
                        {/* Current Mention Header & Search */}
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                            <div className="w-full sm:w-1/2">
                                <h2 className="text-2xl font-bold text-black dark:text-white">
                                    {currentMention?.designation || "Mentions"}
                                </h2>
                                <p className="text-sm text-body-color dark:text-body-color-dark">
                                    {currentMention ? "Facultés de la mention" : "Sélectionnez une mention"}
                                </p>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Rechercher une faculté..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-full border border-stroke bg-gray-50 py-2.5 pl-12 pr-4 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    />
                                    <svg
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-body-color dark:text-body-color-dark"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.16666 3.33332C5.945 3.33332 3.33333 5.945 3.33333 9.16665C3.33333 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16665C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66667 9.16665C1.66667 5.02452 5.02453 1.66665 9.16666 1.66665C13.3088 1.66665 16.6667 5.02452 16.6667 9.16665C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02453 16.6667 1.66667 13.3088 1.66667 9.16665Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Facultes Grid */}
                        {currentMentionId ? (
                            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2">
                                {filteredFacultes.map((faculte) => (
                                    <motion.div
                                        key={faculte._id}
                                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                                        initial="hidden"
                                        whileInView="visible"
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="animate_top group rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
                                    >
                                        <div className="relative mb-4 block aspect-[3/2] overflow-hidden rounded-lg">
                                            {faculte.couverture ? (
                                                <Image src={faculte.couverture} alt={faculte.designation} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-meta-4">
                                                    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-2">
                                            <h3 className="mb-3 text-lg font-bold text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                                                {faculte.designation}
                                            </h3>
                                            <p className="line-clamp-3 text-sm text-body-color dark:text-body-color-dark">
                                                {faculte.description?.[0]}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {filteredFacultes.length === 0 && (
                                    <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-blacksection rounded-lg border border-stroke dark:border-strokedark">
                                        <h4 className="text-black dark:text-white font-medium mb-2">Aucune faculté trouvée</h4>
                                        <p className="text-body-color text-sm">Essayez une autre recherche.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 rounded-lg bg-white dark:bg-blacksection border border-stroke dark:border-strokedark">
                                <p className="text-lg font-medium text-black dark:text-white mb-2">Veuillez sélectionner une mention</p>
                                <p className="text-body-color dark:text-body-color-dark">dans le menu de gauche pour voir les détails</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default EtablissementDetails;
