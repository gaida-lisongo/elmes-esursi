import { useState, useRef } from "react";
import Image from "next/image";
import { IEtablissementWithMentions } from "./EtablissementDetails";
import { uploadPhoto } from "@/app/actions/photo";
import Moderator from "@/app/lib/Moderator";
import { useRouter } from "next/navigation";
import MentionModal from "./MentionModal";
import { createMention, deleteMention } from "@/app/actions/mention";

interface EtabHeaderProps {
    etablissement: IEtablissementWithMentions;
    currentMentionId: string;
    onMentionSelect: (id: string) => void;
    isEditing?: boolean;
}

const EtabHeader = ({ etablissement, currentMentionId, onMentionSelect, isEditing }: EtabHeaderProps) => {
    const router = useRouter();
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    // Mention modal state
    const [isMentionModalOpen, setIsMentionModalOpen] = useState(false);

    const backgroundImage = etablissement.photo && etablissement.photo[0]
        ? etablissement.photo[0]
        : "/images/background.jpeg";

    const logoImage = etablissement.photo && etablissement.photo.length > 1 && etablissement.photo[1]
        ? etablissement.photo[1]
        : "/images/logo_news.png";

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await uploadPhoto(formData);

        if (uploadRes.success && uploadRes.url) {
            const newPhotoArray = [...(etablissement.photo || [])];
            if (type === 'banner') newPhotoArray[0] = uploadRes.url;
            if (type === 'logo') {
                if (!newPhotoArray[0]) newPhotoArray[0] = backgroundImage;
                newPhotoArray[1] = uploadRes.url;
            }

            const moderator = Moderator.getInstance();
            const updateRes = await moderator.updateEtab({ photo: newPhotoArray });

            if (updateRes) {
                router.refresh();
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } else {
            alert("Erreur lors de l'upload de l'image");
        }
        setUploading(false);
    };

    const handleTextEdit = async (field: 'designation' | 'sigle', currentValue: string) => {
        const newValue = window.prompt(`Modifier ${field}`, currentValue);
        if (newValue !== null && newValue !== currentValue) {
            const moderator = Moderator.getInstance();
            const updateRes = await moderator.updateEtab({ [field]: newValue });
            if (updateRes) {
                router.refresh();
            } else {
                alert("Erreur lors de la mise à jour");
            }
        }
    };

    // Mention handlers
    const handleAddMention = () => {
        setIsMentionModalOpen(true);
    };

    const handleMentionSubmit = async (data: { domaineId: string; designation: string }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Non authentifié");
            return;
        }

        setUploading(true);

        const res = await createMention({
            etablissement: etablissement._id,
            domaine: data.domaineId,
            designation: data.designation,
            token,
        });

        if (res.success) {
            router.refresh();
        } else {
            alert(res.error || "Erreur lors de la création");
        }

        setUploading(false);
        setIsMentionModalOpen(false);
    };

    const handleDeleteMentionDirect = async (mentionId: string) => {
        if (!confirm("Supprimer cette mention ?")) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Non authentifié");
            return;
        }

        setUploading(true);

        const res = await deleteMention({
            mentionId,
            token,
        });

        if (res.success) {
            router.refresh();
        } else {
            alert(res.error || "Erreur lors de la suppression");
        }

        setUploading(false);
    };

    return (
        <div className="relative mb-8 bg-white pb-0 dark:bg-blacksection shadow-solid-4">
            {/* Hidden Inputs */}
            <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
            <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />

            {/* Cover Image */}
            <div className="relative h-[200px] w-full overflow-hidden md:h-[350px] group">
                <Image
                    src={backgroundImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {isEditing && (
                    <button
                        onClick={() => bannerInputRef.current?.click()}
                        className="absolute top-4 right-4 z-20 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/40"
                        title="Modifier la bannière"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Profile/Info Section */}
            <div className="container mx-auto px-4">
                <div className="relative -mt-16 flex flex-col items-center pb-4 md:-mt-20 md:flex-row md:items-end md:gap-6">
                    {/* Logo */}
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg dark:border-blacksection md:h-40 md:w-40 group">
                        <Image
                            src={logoImage}
                            alt={etablissement.sigle || "Logo"}
                            fill
                            className="object-cover"
                        />
                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    onClick={() => logoInputRef.current?.click()}
                                    className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Text Info */}
                    <div className="mt-4 flex flex-1 flex-col items-center text-center md:items-start md:text-left md:mb-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                                {etablissement.designation}
                            </h1>
                            {isEditing && (
                                <button onClick={() => handleTextEdit('designation', etablissement.designation)} className="text-primary hover:text-primary/80">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-base font-medium text-black/70 dark:text-white/70">
                            <span>{etablissement.sigle}</span>
                            {isEditing && (
                                <button onClick={() => handleTextEdit('sigle', etablissement.sigle)} className="text-primary hover:text-primary/80">
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            )}
                            {etablissement.province?.designation && (
                                <>
                                    <span className="mx-2">•</span>
                                    {etablissement.province.designation}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="mt-6 border-t border-stroke py-0 dark:border-strokedark scrollbar-hide overflow-x-auto">
                    <div className="flex gap-6 min-w-max px-2 items-center">
                        {etablissement.mentions?.map((mention) => (
                            <div key={mention._id} className="relative flex items-center gap-1">
                                <button
                                    onClick={() => onMentionSelect(mention._id)}
                                    className={`relative py-4 text-base font-medium transition-colors hover:text-primary ${currentMentionId === mention._id
                                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-sm after:bg-primary"
                                        : "text-body-color dark:text-body-color-dark"
                                        }`}
                                >
                                    {mention.designation}
                                </button>
                                {isEditing && (
                                    <button
                                        onClick={() => handleDeleteMentionDirect(mention._id)}
                                        className="ml-1 text-red-400 hover:text-red-500"
                                        title="Supprimer cette mention"
                                    >
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        {(!etablissement.mentions || etablissement.mentions.length === 0) && !isEditing && (
                            <span className="py-4 text-sm text-gray-500">Aucune mention disponible</span>
                        )}

                        {/* Add Mention Button */}
                        {isEditing && (
                            <button
                                onClick={handleAddMention}
                                className="flex items-center gap-1 py-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                title="Ajouter une mention"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Ajouter
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {uploading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-primary"></div>
                </div>
            )}

            {/* Mention Modal */}
            <MentionModal
                isOpen={isMentionModalOpen}
                onClose={() => setIsMentionModalOpen(false)}
                onSubmit={handleMentionSubmit}
            />
        </div>
    );
};

export default EtabHeader;
