import Image from "next/image";
import { Faculte } from "@/types/cycle";
import { motion } from "framer-motion";

interface FaculteCardProps {
    faculte: Faculte;
    onClick: () => void;
}

const FaculteCard = ({ faculte, onClick }: FaculteCardProps) => {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={onClick}
            className="animate_top group cursor-pointer rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection border border-transparent hover:border-primary/20 dark:hover:border-primary/20 transition-all"
        >
            <div className="relative mb-4 block aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 dark:bg-meta-4">
                {faculte.couverture ? (
                    <Image
                        src={faculte.couverture}
                        alt={faculte.designation}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                )}
            </div>
            <div className="px-2">
                <h3 className="mb-3 text-lg font-bold text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    {faculte.designation}
                </h3>
                <p className="line-clamp-3 text-sm text-body-color dark:text-body-color-dark">
                    {faculte.description?.[0] || "Aucune description disponible"}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:underline">
                    Voir détails
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default FaculteCard;
