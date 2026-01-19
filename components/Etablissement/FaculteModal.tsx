"use client";

import { useState, useRef } from "react";
import { uploadPhoto } from "@/app/actions/photo";

interface FaculteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { designation: string; code: string; description: string[]; couverture?: string }) => void;
}

const FaculteModal = ({ isOpen, onClose, onSubmit }: FaculteModalProps) => {
    const [designation, setDesignation] = useState("");
    const [code, setCode] = useState("");
    const [descriptions, setDescriptions] = useState<string[]>([""]);
    const [couverture, setCouverture] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleAddDescription = () => {
        setDescriptions([...descriptions, ""]);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
    };

    const handleRemoveDescription = (index: number) => {
        if (descriptions.length > 1) {
            const newDescriptions = descriptions.filter((_, i) => i !== index);
            setDescriptions(newDescriptions);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadPhoto(formData);

        if (res.success && res.url) {
            setCouverture(res.url);
        } else {
            setError("Erreur lors de l'upload de l'image");
        }
        setUploading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!designation.trim()) {
            setError("Veuillez entrer une désignation");
            return;
        }
        if (!code.trim()) {
            setError("Veuillez entrer un code");
            return;
        }

        const validDescriptions = descriptions.filter(d => d.trim() !== "");

        onSubmit({
            designation: designation.trim(),
            code: code.trim().toUpperCase(),
            description: validDescriptions,
            couverture: couverture || undefined,
        });

        // Reset form
        setDesignation("");
        setCode("");
        setDescriptions([""]);
        setCouverture("");
        setError("");
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm overflow-y-auto py-8">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark my-auto">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        Ajouter une faculté/filière
                    </h3>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        <svg className="h-5 w-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Designation */}
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Désignation *
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Informatique et Génie Logiciel"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                            required
                        />
                    </div>

                    {/* Code */}
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Code *
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: IGL"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white uppercase"
                            required
                            maxLength={10}
                        />
                    </div>

                    {/* Descriptions */}
                    <div className="mb-4">
                        <div className="mb-2.5 flex items-center justify-between">
                            <label className="font-medium text-black dark:text-white">
                                Descriptions
                            </label>
                            <button
                                type="button"
                                onClick={handleAddDescription}
                                className="text-sm text-primary hover:underline"
                            >
                                + Ajouter
                            </button>
                        </div>
                        <div className="space-y-2">
                            {descriptions.map((desc, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={`Description ${idx + 1}`}
                                        value={desc}
                                        onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                                        className="flex-1 rounded-lg border border-stroke bg-transparent py-2 px-3 text-sm text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                                    />
                                    {descriptions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDescription(idx)}
                                            className="text-red-500 hover:text-red-600 px-2"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Couverture */}
                    <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Image de couverture
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="rounded-lg border border-stroke px-4 py-2 text-sm text-body-color hover:bg-gray-50 dark:border-strokedark dark:text-body-color-dark dark:hover:bg-white/5"
                            >
                                {uploading ? "Chargement..." : "Choisir une image"}
                            </button>
                            {couverture && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-green-600 dark:text-green-400">✓ Image uploadée</span>
                                    <button
                                        type="button"
                                        onClick={() => setCouverture("")}
                                        className="text-red-500 hover:text-red-600 text-xs"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                        {couverture && (
                            <div className="mt-2">
                                <img src={couverture} alt="Preview" className="h-20 w-auto rounded-lg object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full cursor-pointer rounded-lg border border-stroke p-3 text-body-color transition hover:bg-gray-100 dark:border-strokedark dark:text-body-color-dark dark:hover:bg-white/10"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full cursor-pointer rounded-lg bg-primary p-3 text-white transition hover:bg-opacity-90 disabled:opacity-50"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FaculteModal;
