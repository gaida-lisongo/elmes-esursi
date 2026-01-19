import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";
import NewsModal from "./NewsModal";

interface ActuModalProps {
    actu: any;
    onClose: () => void;
}

const ActuModal = ({ actu, onClose }: ActuModalProps) => {
    if (!actu) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection max-h-[90vh] overflow-y-auto animate-fade-in-up border border-stroke dark:border-strokedark">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                    <svg className="h-5 w-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
                    {actu.photo ? (
                        <Image src={actu.photo} alt={actu.titre} fill className="object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-meta-4">
                            <span className="text-gray-500">Aucune image</span>
                        </div>
                    )}
                </div>

                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">{actu.titre}</h3>
                <p className="mb-4 text-sm font-medium text-primary">{actu.sousTitre}</p>
                <div className="prose prose-sm dark:prose-invert max-w-none text-body-color dark:text-body-color-dark">
                    <p className="whitespace-pre-line">{actu.description}</p>
                </div>
            </div>
        </div>
    );
};

interface NewsFaculteProps {
    faculte: Faculte;
    isEditing?: boolean;
    onUpdate?: (payload: Partial<Faculte>) => void;
}

const NewsFaculte = ({ faculte, isEditing, onUpdate }: NewsFaculteProps) => {
    const [selectedActu, setSelectedActu] = useState<any | null>(null);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [editingActu, setEditingActu] = useState<any | null>(null);

    const handleAddNews = () => {
        setEditingActu(null);
        setIsNewsModalOpen(true);
    };

    const handleNewsSubmit = (actu: any) => {
        let newActus = [...(faculte.actualites || [])];
        if (actu._id) {
            const index = newActus.findIndex(a => a._id === actu._id);
            if (index > -1) newActus[index] = actu;
        } else {
            // On ne génère PAS d'ID ici, on laisse Mongoose le faire
            newActus.push({ ...actu });
        }
        onUpdate?.({ actualites: newActus });
    };

    const handleDeleteNews = (id: string) => {
        if (!confirm("Supprimer cette actualité ?")) return;
        const newActus = (faculte.actualites || []).filter(a => a._id !== id);
        onUpdate?.({ actualites: newActus });
    };

    return (
        <section className="mb-20">
            <div className="mb-10 flex items-center justify-between">
                <div className="flex-1"></div>
                <div className="flex-1">
                    <SectionHeader
                        headerInfo={{
                            title: "ACTUALITÉS",
                            subtitle: "Dernières nouvelles",
                            description: "Restez informé des dernières activités et annonces de notre faculté."
                        }}
                    />
                </div>
                <div className="flex-1 flex justify-end">
                    {isEditing && (
                        <button
                            onClick={handleAddNews}
                            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            + Ajouter une actualité
                        </button>
                    )}
                </div>
            </div>

            {faculte.actualites && faculte.actualites.length > 0 ? (
                <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                    {faculte.actualites.map((actu) => (
                        <motion.div
                            key={actu._id}
                            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="animate_top group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-solid-8 transition-all hover:shadow-solid-9 dark:bg-blacksection"
                            onClick={() => setSelectedActu(actu)}
                        >
                            {isEditing && (
                                <div className="absolute right-4 top-4 z-10 flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingActu(actu);
                                            setIsNewsModalOpen(true);
                                        }}
                                        className="rounded-full bg-primary/20 p-2 text-primary backdrop-blur-sm hover:bg-primary/40"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteNews(actu._id);
                                        }}
                                        className="rounded-full bg-red-500/20 p-2 text-red-500 backdrop-blur-sm hover:bg-red-500/40"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <div className="relative h-48 w-full overflow-hidden">
                                {actu.photo ? (
                                    <Image src={actu.photo} alt={actu.titre} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-meta-4 text-gray-400">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h4 className="mb-2 text-lg font-bold text-black dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                                    {actu.titre}
                                </h4>
                                <span className="mb-3 block text-sm font-medium text-primary">{actu.sousTitre}</span>
                                <p className="line-clamp-3 text-sm">{actu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center italic text-body-color dark:text-body-color-dark">
                    Aucune actualité disponible pour le moment.
                </div>
            )}

            {/* News Detail Modal */}
            {selectedActu && !isNewsModalOpen && (
                <ActuModal actu={selectedActu} onClose={() => setSelectedActu(null)} />
            )}

            <NewsModal
                isOpen={isNewsModalOpen}
                onClose={() => setIsNewsModalOpen(false)}
                onSubmit={handleNewsSubmit}
                initialData={editingActu}
            />
        </section>
    );
};

export default NewsFaculte;

