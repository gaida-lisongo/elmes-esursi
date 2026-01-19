import { useState } from "react";
import { motion } from "framer-motion";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";
import FiliereModal from "./FiliereModal";

interface AboutFaculteProps {
    faculte: Faculte;
    isEditing?: boolean;
    onUpdate?: (payload: Partial<Faculte>) => void;
}

const SingleFiliere = ({
    filiere,
    isEditing,
    onEdit,
    onDelete
}: {
    filiere: { title: string; description: string; token: string };
    isEditing?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 overflow-hidden rounded-xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-blacksection">
            <div
                className={`flex cursor-pointer items-center justify-between p-4 transition-colors ${isOpen ? "bg-primary/5" : "hover:bg-gray-50 dark:hover:bg-white/5"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-black dark:text-white">{filiere.title}</h4>
                        {isEditing && (
                            <span className="block text-[9px] font-mono text-gray-400">ID: {filiere.token}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isEditing && (
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                            <button onClick={onEdit} className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button onClick={onDelete} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="border-t border-stroke p-5 dark:border-strokedark">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        {filiere.description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const AboutFaculte = ({ faculte, isEditing, onUpdate }: AboutFaculteProps) => {
    const [isFiliereModalOpen, setIsFiliereModalOpen] = useState(false);
    const [editingFiliere, setEditingFiliere] = useState<{ title: string; description: string; token: string } | undefined>(undefined);

    const handleEditDesignation = () => {
        const newValue = window.prompt("Modifier la désignation", faculte.designation);
        if (newValue !== null && newValue !== faculte.designation) {
            onUpdate?.({ designation: newValue });
        }
    };

    const handleEditDescription = () => {
        const newValue = window.prompt("Modifier la description", faculte.description?.join("\n"));
        if (newValue !== null) {
            const newArray = newValue.split("\n").filter(line => line.trim() !== "");
            onUpdate?.({ description: newArray });
        }
    };

    const handleAddFiliere = () => {
        setEditingFiliere(undefined);
        setIsFiliereModalOpen(true);
    };

    const handleFiliereSubmit = (filiere: { title: string; description: string; token: string }) => {
        let newFilieres = [...(faculte.filieres || [])];
        const index = newFilieres.findIndex(f => f.token === filiere.token);

        if (index > -1) {
            newFilieres[index] = filiere;
        } else {
            newFilieres.push(filiere);
        }

        onUpdate?.({ filieres: newFilieres });
    };

    const handleDeleteFiliere = (token: string) => {
        if (!confirm("Supprimer cette filière ?")) return;
        const newFilieres = (faculte.filieres || []).filter(f => f.token !== token);
        onUpdate?.({ filieres: newFilieres });
    };

    return (
        <section className="py-20 lg:py-25">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start xl:gap-20">

                    {/* Left Column: Faculty Description */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-25">
                            <div className="mb-6 inline-block rounded-full bg-primary/10 px-4.5 py-1.5 dark:bg-blacksection">
                                <span className="text-sectiontitle font-medium text-primary">
                                    NOTRE OFFRE DE FORMATION
                                </span>
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-4xl">
                                {faculte.designation}
                            </h2>
                            <p className="mb-8 whitespace-pre-line text-lg leading-relaxed text-body-color dark:text-body-color-dark">
                                {faculte.description && faculte.description.length > 0
                                    ? faculte.description.join('\n')
                                    : "Aucune description disponible."}
                            </p>

                            {isEditing && (
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleEditDesignation}
                                        className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all"
                                    >
                                        ✏️ Modifier Titre
                                    </button>
                                    <button
                                        onClick={handleEditDescription}
                                        className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all"
                                    >
                                        📝 Description
                                    </button>
                                    <button
                                        onClick={handleAddFiliere}
                                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
                                    >
                                        ✨ Nouvelle Filière
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Filières in Accordion */}
                    <div className="lg:w-1/2">
                        <div className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5 md:p-10">
                            <h3 className="mb-8 text-xl font-bold text-black dark:text-white">
                                Options et Spécialités
                            </h3>

                            {faculte.filieres && faculte.filieres.length > 0 ? (
                                <div className="flex flex-col">
                                    {faculte.filieres.map((filiere, key) => (
                                        <SingleFiliere
                                            key={filiere.token || key}
                                            filiere={filiere}
                                            isEditing={isEditing}
                                            onEdit={() => {
                                                setEditingFiliere(filiere);
                                                setIsFiliereModalOpen(true);
                                            }}
                                            onDelete={() => handleDeleteFiliere(filiere.token)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="mb-4 text-gray-400 opacity-20">
                                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="italic text-body-color dark:text-body-color-dark">
                                        Aucune filière répertoriée.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FiliereModal
                isOpen={isFiliereModalOpen}
                onClose={() => setIsFiliereModalOpen(false)}
                onSubmit={handleFiliereSubmit}
                initialData={editingFiliere}
            />
        </section>
    );
};

export default AboutFaculte;

