import { motion } from "framer-motion";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";

interface AboutFaculteProps {
    faculte: Faculte;
}

const SingleFiliere = ({ filiere }: { filiere: { title: string; description: string } }) => {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
        >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                {filiere.title}
            </h3>
            <p className="line-clamp-4">{filiere.description}</p>
        </motion.div>
    );
};

const AboutFaculte = ({ faculte }: AboutFaculteProps) => {
    return (
        <section className="py-20 lg:py-25 xl:py-30">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                {/* 1. About / Description Section */}
                <div className="mb-20">
                    <SectionHeader
                        headerInfo={{
                            title: "À PROPOS",
                            subtitle: faculte.designation.slice(0, 30) + (faculte.designation.length > 30 ? "..." : ""),
                            description: faculte.description && faculte.description.length > 0 ? faculte.description.join(' ') : "Aucune description disponible."
                        }}
                    />
                </div>

                {/* 2. Filières Grid */}
                {faculte.filieres && faculte.filieres.length > 0 ? (
                    <div className="mb-20">
                        <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white">Nos Filières</h3>
                        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                            {faculte.filieres.map((filiere, key) => (
                                <SingleFiliere key={key} filiere={filiere} />
                            ))}
                        </div>
                    </div>
                ) : (
                    // Optional: Show something if no filieres, but user didn't explicitly ask for persistent header here.
                    // Keeping it consistent with "About" flow.
                    <div className="mb-20 text-center italic text-body-color dark:text-body-color-dark">
                        {/* Aucune filière listée. */}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutFaculte;
