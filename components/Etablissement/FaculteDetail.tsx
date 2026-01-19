import Image from "next/image";
import { Faculte } from "@/types/cycle";
import AboutFaculte from "./AboutFaculte";
import TeamFaculte from "./TeamFaculte";
import NewsFaculte from "./NewsFaculte";

interface FaculteDetailProps {
    faculte: Faculte;
    onBack: () => void;
}

const FaculteDetail = ({ faculte, onBack }: FaculteDetailProps) => {
    return (
        <div className="animate-fade-in-up">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary"
            >
                <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Retour aux facultés
            </button>

            {/* Header / Cover */}
            <div className="relative mb-8 overflow-hidden rounded-lg bg-white shadow-solid-4 dark:bg-blacksection">
                <div className="relative h-48 w-full md:h-64 lg:h-80">
                    {faculte.couverture ? (
                        <Image
                            src={faculte.couverture}
                            alt={faculte.designation}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-meta-4">
                            <svg className="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">
                            {faculte.designation}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <AboutFaculte faculte={faculte} />
            <TeamFaculte faculte={faculte} />
            <NewsFaculte faculte={faculte} />
        </div>
    );
};

export default FaculteDetail;
