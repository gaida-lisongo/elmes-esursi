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
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="animate_top relative z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
        >
            {isEditing && (
                <div className="absolute right-4 top-4 flex gap-2">
                    <button
                        onClick={onEdit}
                        className="rounded-full bg-primary/10 p-2 text-primary hover:bg-primary/20"
                        title="Modifier la filière"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={onDelete}
                        className="rounded-full bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20"
                        title="Supprimer la filière"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            )}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>

            <div className="mt-7.5 flex flex-col gap-1">
                {isEditing && (
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                        ID: {filiere.token}
                    </span>
                )}
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                    {filiere.title}
                </h3>
            </div>
            <p className="line-clamp-4 text-body-color dark:text-body-color-dark whitespace-pre-line">{filiere.description}</p>
        </motion.div>
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
        <section className="py-20 lg:py-25 xl:py-30">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                {/* 1. About / Description Section */}
                <div className="mb-20 relative">
                    {isEditing && (
                        <div className="absolute top-0 right-0 flex gap-2 z-10">
                            <button
                                onClick={handleEditDesignation}
                                className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20"
                                title="Modifier le titre"
                            >
                                Modifier Titre
                            </button>
                            <button
                                onClick={handleEditDescription}
                                className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20"
                                title="Modifier la description"
                            >
                                Modifier Description
                            </button>
                        </div>
                    )}
                    <SectionHeader
                        headerInfo={{
                            title: "À PROPOS",
                            subtitle: faculte.designation,
                            description: faculte.description && faculte.description.length > 0 ? faculte.description.join('\n') : "Aucune description disponible."
                        }}
                    />
                </div>

                {/* 2. Filières Grid */}
                <div className="mb-20">
                    <div className="mb-10 flex items-center justify-between">
                        <div className="flex-1"></div>
                        <h3 className="text-center text-2xl font-bold text-black dark:text-white flex-1">Nos Filières</h3>
                        <div className="flex-1 flex justify-end">
                            {isEditing && (
                                <button
                                    onClick={handleAddFiliere}
                                    className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
                                >
                                    + Ajouter une filière
                                </button>
                            )}
                        </div>
                    </div>

                    {faculte.filieres && faculte.filieres.length > 0 ? (
                        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
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
                        <div className="text-center italic text-body-color dark:text-body-color-dark">
                            Aucune filière listée.
                        </div>
                    )}
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

