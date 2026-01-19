import { useState, useEffect } from "react";
import Image from "next/image";
import { Faculte, Domaine } from "@/types/cycle";
import { IEtablissementWithMentions } from "./EtablissementDetails";
import FaculteCard from "./FaculteCard";
import FaculteDetail from "./FaculteDetail";

interface MentionDetailsProps {
    etablissement: IEtablissementWithMentions;
    currentMentionId: string;
}

const MentionDetails = ({ etablissement, currentMentionId }: MentionDetailsProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFaculte, setSelectedFaculte] = useState<Faculte | null>(null);

    const currentMention = etablissement.mentions?.find(m => m._id === currentMentionId);

    // Sort facultes by designation or any other criteria if needed
    // Filter by search query
    const filteredFacultes = currentMention?.facultes.filter(f =>
        f.designation.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Reset selection when mention changes
    useEffect(() => {
        setSelectedFaculte(null);
        setSearchQuery("");
    }, [currentMentionId]);

    // If a faculty is selected, show detail view
    if (selectedFaculte) {
        return (
            <FaculteDetail
                faculte={selectedFaculte}
                onBack={() => setSelectedFaculte(null)}
            />
        );
    }

    // Default view: Search + Grid
    return (
        <>
            {/* Header & Search */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                        {currentMention?.designation || "Mentions"}
                    </h2>
                    <p className="text-sm text-body-color dark:text-body-color-dark mt-1">
                        {currentMention ? "Facultés disponibles dans cette mention" : "Sélectionnez une mention pour voir les détails"}
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher une faculté..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border border-stroke bg-gray-50 py-3 pl-12 pr-4 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                        <FaculteCard
                            key={faculte._id}
                            faculte={faculte}
                            onClick={() => setSelectedFaculte(faculte)}
                        />
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
        </>
    );
};

export default MentionDetails;
