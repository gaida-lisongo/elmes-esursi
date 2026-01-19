"use client";

import { useState, useEffect } from "react";

interface FaculteAboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { designation: string; description: string[] }) => void;
    initialData: { designation: string; description: string[] };
}

const FaculteAboutModal = ({ isOpen, onClose, onSubmit, initialData }: FaculteAboutModalProps) => {
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setDesignation(initialData.designation || "");
            setDescription(initialData.description?.join("\n") || "");
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const descArray = description.split("\n").filter(line => line.trim() !== "");
        onSubmit({
            designation: designation.trim(),
            description: descArray
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        Modifier les informations de la faculté
                    </h3>
                    <button onClick={onClose} className="text-black dark:text-white hover:text-primary transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Désignation de la Faculté
                        </label>
                        <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="Ex: Faculté des Sciences"
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Description (Soutient les retours à la ligne)
                        </label>
                        <textarea
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Entrez la description de la faculté..."
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input resize-none"
                            required
                        ></textarea>
                        <p className="mt-2 text-xs text-gray-500 italic">
                            Chaque paragraphe ou retour à la ligne sera conservé à l'affichage.
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-lg border border-stroke p-3 text-black transition-colors hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-white/5"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-primary p-3 font-bold text-white transition-opacity hover:bg-opacity-90 shadow-lg"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FaculteAboutModal;
