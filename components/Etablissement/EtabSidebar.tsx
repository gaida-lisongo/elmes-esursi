import { IEtablissementWithMentions } from "./EtablissementDetails";
import Image from "next/image";
import { Agent } from "@/types/user";

interface EtabSidebarProps {
    etablissement: IEtablissementWithMentions;
    onLoginClick: (membre: { agent: Agent, fonction: string }) => void;
}

const EtabSidebar = ({ etablissement, onLoginClick }: EtabSidebarProps) => {
    return (
        <div className="flex flex-col gap-8">
            {/* About / Description Card */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">À propos</h3>
                <div className="mb-6 space-y-3">
                    {etablissement.description && etablissement.description.length > 0 ? (
                        etablissement.description.map((desc, idx) => (
                            <p key={idx} className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                                {desc}
                            </p>
                        ))
                    ) : (
                        <p className="text-sm italic text-body-color">Aucune description.</p>
                    )}
                </div>

                {/* Contact List */}
                <div className="space-y-3 border-t border-stroke pt-6 dark:border-strokedark">
                    <h4 className="text-sm font-semibold text-black dark:text-white">Contact</h4>
                    {etablissement.adresse && (
                        <div className="flex items-start gap-3">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm text-body-color dark:text-body-color-dark">{etablissement.adresse}</span>
                        </div>
                    )}
                    {etablissement.telephone && (
                        <div className="flex items-center gap-3">
                            <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm text-body-color dark:text-body-color-dark">{etablissement.telephone}</span>
                        </div>
                    )}
                    {etablissement.website && (
                        <div className="flex items-center gap-3">
                            <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <a href={etablissement.website.startsWith('http') ? etablissement.website : `https://${etablissement.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate w-full">
                                {etablissement.website}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Management (COGE) Card - Now with Login button triggering modal */}
            {etablissement.coge && etablissement.coge.length > 0 && (
                <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                    <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Comité de Gestion</h3>
                    <div className="flex flex-col gap-6">
                        {etablissement.coge.map((membre, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                        {membre.agent?.photo ? (
                                            <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                                                {membre.agent?.nom?.[0] || "?"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="truncate text-sm font-bold text-black dark:text-white">
                                            {membre.agent?.prenom} {membre.agent?.nom}
                                        </h4>
                                        <p className="truncate text-xs text-body-color dark:text-body-color-dark">{membre.fonction}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onLoginClick(membre)}
                                    className="w-full rounded-md bg-gray-100 py-2 text-xs font-semibold text-black hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                                >
                                    Se connecter
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EtabSidebar;
