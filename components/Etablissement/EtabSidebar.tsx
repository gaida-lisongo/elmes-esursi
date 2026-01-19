import { IEtablissementWithMentions } from "./EtablissementDetails";
import Image from "next/image";
import { Agent } from "@/types/user";
import Moderator from "@/app/lib/Moderator";
import { useRouter } from "next/navigation";

interface EtabSidebarProps {
    etablissement: IEtablissementWithMentions;
    onLoginClick: (membre: { agent: Agent, fonction: string }) => void;
    isEditing?: boolean;
}

const EtabSidebar = ({ etablissement, onLoginClick, isEditing }: EtabSidebarProps) => {
    const router = useRouter();

    const updateDescription = async (newDescription: string[]) => {
        const moderator = Moderator.getInstance();
        const success = await moderator.updateEtab({ description: newDescription });
        if (success) router.refresh();
        else alert("Erreur lors de la mise à jour");
    };

    const handleAddDescription = async () => {
        const text = window.prompt("Ajouter un paragraphe :");
        if (text) {
            const newDesc = [...(etablissement.description || []), text];
            await updateDescription(newDesc);
        }
    };

    const handleEditDescription = async (index: number, currentText: string) => {
        const text = window.prompt("Modifier le paragraphe :", currentText);
        if (text !== null && text !== currentText) {
            const newDesc = [...(etablissement.description || [])];
            newDesc[index] = text;
            await updateDescription(newDesc);
        }
    };

    const handleRemoveDescription = async (index: number) => {
        if (confirm("Supprimer ce paragraphe ?")) {
            const newDesc = [...(etablissement.description || [])];
            newDesc.splice(index, 1);
            await updateDescription(newDesc);
        }
    };

    const updateNref = async (newNref: string[]) => {
        const moderator = Moderator.getInstance();
        const success = await moderator.updateEtab({ nref: newNref });
        if (success) router.refresh();
        else alert("Erreur lors de la mise à jour");
    };

    const handleAddNref = async () => {
        const text = window.prompt("Ajouter une référence (Arrêté) :");
        if (text) {
            const newNref = [...(etablissement.nref || []), text];
            await updateNref(newNref);
        }
    };

    const handleEditNref = async (index: number, currentText: string) => {
        const text = window.prompt("Modifier la référence :", currentText);
        if (text !== null && text !== currentText) {
            const newNref = [...(etablissement.nref || [])];
            newNref[index] = text;
            await updateNref(newNref);
        }
    };

    const handleRemoveNref = async (index: number) => {
        if (confirm("Supprimer cette référence ?")) {
            const newNref = [...(etablissement.nref || [])];
            newNref.splice(index, 1);
            await updateNref(newNref);
        }
    };

    const handleEditContact = async (field: 'adresse' | 'telephone' | 'website', currentVal: string) => {
        const val = window.prompt(`Modifier ${field} :`, currentVal);
        if (val !== null && val !== currentVal) {
            const moderator = Moderator.getInstance();
            const success = await moderator.updateEtab({ [field]: val });
            if (success) router.refresh();
            else alert("Erreur lors de la mise à jour");
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* About / Description Card */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">À propos</h3>
                    {isEditing && (
                        <button onClick={handleAddDescription} className="text-primary hover:underline text-sm font-medium">
                            + Ajouter
                        </button>
                    )}
                </div>

                <div className="mb-6 space-y-3">
                    {etablissement.description && etablissement.description.length > 0 ? (
                        etablissement.description.map((desc, idx) => (
                            <div key={idx} className="relative">
                                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark pr-8">
                                    {desc}
                                </p>
                                {isEditing && (
                                    <div className="absolute right-0 top-0 flex flex-col gap-1 bg-white/80 p-1 dark:bg-blacksection/80">
                                        <button onClick={() => handleEditDescription(idx, desc)} className="text-blue-500 hover:text-blue-600">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleRemoveDescription(idx)} className="text-red-500 hover:text-red-600">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm italic text-body-color">Aucune description.</p>
                    )}
                </div>

                {/* References (NREF) Section */}
                <div className="mb-6 border-t border-stroke pt-6 dark:border-strokedark">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-black dark:text-white">Arrêtés (Références)</h4>
                        {isEditing && (
                            <button onClick={handleAddNref} className="text-primary hover:underline text-sm font-medium">
                                + Ajouter
                            </button>
                        )}
                    </div>
                    <div className="space-y-2">
                        {etablissement.nref && etablissement.nref.length > 0 ? (
                            etablissement.nref.map((ref, idx) => (
                                <div key={idx} className="relative flex items-center justify-between gap-2">
                                    <p className="text-sm text-body-color dark:text-body-color-dark">
                                        • {ref}
                                    </p>
                                    {isEditing && (
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleEditNref(idx, ref)} className="text-blue-500 hover:text-blue-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleRemoveNref(idx)} className="text-red-500 hover:text-red-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm italic text-body-color">Aucun arrêté renseigné.</p>
                        )}
                    </div>
                </div>

                {/* Contact List */}
                <div className="space-y-3 border-t border-stroke pt-6 dark:border-strokedark">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-black dark:text-white">Contact</h4>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-body-color dark:text-body-color-dark flex-1">
                            {etablissement.adresse || "Ajouter une adresse"}
                        </span>
                        {isEditing && (
                            <button onClick={() => handleEditContact('adresse', etablissement.adresse || "")} className="text-primary hover:text-primary/80">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm text-body-color dark:text-body-color-dark flex-1">
                            {etablissement.telephone || "Ajouter un téléphone"}
                        </span>
                        {isEditing && (
                            <button onClick={() => handleEditContact('telephone', etablissement.telephone || "")} className="text-primary hover:text-primary/80">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <a href={etablissement.website?.startsWith('http') ? etablissement.website : `https://${etablissement.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate flex-1">
                            {etablissement.website || "Ajouter un site web"}
                        </a>
                        {isEditing && (
                            <button onClick={() => handleEditContact('website', etablissement.website || "")} className="text-primary hover:text-primary/80">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Management (COGE) Card - Now with Login button triggering modal */}
            {etablissement.coge && etablissement.coge.length > 0 && (
                <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                    <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Comité de Gestion</h3>
                    <div className="flex flex-col gap-6">
                        {etablissement.coge.map((membre, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                        {membre.agent?.photo ? (
                                            <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                                                {membre.agent?.nom?.[0] || "?"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="truncate text-sm font-bold text-black dark:text-white">
                                            {membre.agent?.prenom} {membre.agent?.nom}
                                        </h4>
                                        <p className="truncate text-xs text-body-color dark:text-body-color-dark">{membre.fonction}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onLoginClick(membre)}
                                    className="w-full rounded-md bg-gray-100 py-2 text-xs font-semibold text-black hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                                >
                                    Se connecter
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EtabSidebar;
