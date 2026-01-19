import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";

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
                    <p>{actu.description}</p>
                </div>
            </div>
        </div>
    );
};

const NewsFaculte = ({ faculte }: { faculte: Faculte }) => {
    const [selectedActu, setSelectedActu] = useState<any | null>(null);

    return (
        <section className="mb-20">
            <div className="mb-10">
                <SectionHeader
                    headerInfo={{
                        title: "ACTUALITÉS",
                        subtitle: "Dernières nouvelles",
                        description: "Restez informé des dernières activités et annonces de notre faculté."
                    }}
                />
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
                            className="animate_top group cursor-pointer overflow-hidden rounded-lg bg-white shadow-solid-8 transition-all hover:shadow-solid-9 dark:bg-blacksection"
                            onClick={() => setSelectedActu(actu)}
                        >
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
            {selectedActu && (
                <ActuModal actu={selectedActu} onClose={() => setSelectedActu(null)} />
            )}
        </section>
    );
};

export default NewsFaculte;
