import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Faculte } from "@/types/cycle";
import AboutFaculte from "./AboutFaculte";
import TeamFaculte from "./TeamFaculte";
import NewsFaculte from "./NewsFaculte";
import { updateFaculte } from "@/app/actions/faculte";
import { uploadPhoto } from "@/app/actions/photo";

interface FaculteDetailProps {
    faculte: Faculte;
    mentionId: string;
    onBack: () => void;
    isEditing?: boolean;
}

const FaculteDetail = ({ faculte, mentionId, onBack, isEditing }: FaculteDetailProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpdateFaculte = async (payload: Partial<Faculte>) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setLoading(true);
        const res = await updateFaculte({
            mentionId,
            faculteId: faculte._id,
            payload,
            token,
        });

        if (res.success) {
            router.refresh();
        } else {
            alert(res.error || "Erreur lors de la mise à jour");
        }
        setLoading(false);
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadPhoto(formData);
        if (res.success && res.url) {
            await handleUpdateFaculte({ couverture: res.url });
        } else {
            alert("Erreur lors de l'upload de l'image");
        }
        setLoading(false);
    };

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

            {/* Header / Cover Section (Premium Design) */}
            <div className="relative mb-10 h-[300px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[400px] lg:h-[450px]">
                {/* Background Image Layer */}
                {faculte.couverture ? (
                    <Image
                        src={faculte.couverture}
                        alt={faculte.designation}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-meta-4 dark:to-blacksection">
                        <svg className="h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-15">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                Filières et Recherche
                            </div>
                            <h2 className="text-3xl font-extrabold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                                {faculte.designation}
                            </h2>
                        </div>

                        {isEditing && (
                            <div className="flex flex-col gap-3">
                                <input type="file" ref={fileInputRef} onChange={handleCoverUpload} className="hidden" accept="image/*" />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Changer la couverture
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <AboutFaculte
                faculte={faculte}
                isEditing={isEditing}
                onUpdate={handleUpdateFaculte}
            />

            <TeamFaculte
                faculte={faculte}
                isEditing={isEditing}
                onUpdate={handleUpdateFaculte}
            />

            <NewsFaculte
                faculte={faculte}
                isEditing={isEditing}
                onUpdate={handleUpdateFaculte}
            />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-primary"></div>
                </div>
            )}
        </div>
    );
};

export default FaculteDetail;
