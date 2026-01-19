"use client";

import { useState, useRef, useEffect } from "react";
import { uploadPhoto } from "@/app/actions/photo";
import Image from "next/image";

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (actu: {
        titre: string;
        sousTitre: string;
        description: string;
        photo: string;
        isActif: boolean
    }) => void;
    initialData?: any;
}

const NewsModal = ({ isOpen, onClose, onSubmit, initialData }: NewsModalProps) => {
    const [titre, setTitre] = useState("");
    const [sousTitre, setSousTitre] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [isActif, setIsActif] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTitre(initialData?.titre || "");
            setSousTitre(initialData?.sousTitre || "");
            setDescription(initialData?.description || "");
            setPhoto(initialData?.photo || "");
            setIsActif(initialData?.isActif ?? true);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadPhoto(formData);
        if (res.success && res.url) {
            setPhoto(res.url);
        }
        setUploading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            titre,
            sousTitre,
            description,
            photo,
            isActif
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        {initialData ? "Modifier l'actualité" : "Ajouter une actualité"}
                    </h3>
                    <button onClick={onClose} className="text-black dark:text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Titre</label>
                        <input
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Sous-titre</label>
                        <input
                            type="text"
                            value={sousTitre}
                            onChange={(e) => setSousTitre(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Photo</label>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-lg bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20"
                            >
                                {uploading ? "Chargement..." : "Choisir une image"}
                            </button>
                            {photo && <span className="text-green-500 text-sm">Image sélectionnée</span>}
                        </div>
                        {photo && (
                            <div className="mt-2 relative h-32 w-full overflow-hidden rounded-lg">
                                <Image src={photo} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="mb-6 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActif}
                            onChange={(e) => setIsActif(e.target.checked)}
                            id="isActif"
                        />
                        <label htmlFor="isActif" className="text-sm font-medium">Actif</label>
                    </div>

                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark">Annuler</button>
                        <button type="submit" className="w-full rounded-lg bg-primary p-3 text-white">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsModal;
