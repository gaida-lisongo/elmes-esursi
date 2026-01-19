"use client";

import { useState, useEffect } from "react";

interface FiliereModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (filiere: { title: string; description: string; token: string }) => void;
    initialData?: { title: string; description: string; token: string };
}

const FiliereModal = ({ isOpen, onClose, onSubmit, initialData }: FiliereModalProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setTitle(initialData?.title || "");
            setDescription(initialData?.description || "");
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        // Generate token if it doesn't exist (new filiere)
        const token = initialData?.token || crypto.randomUUID();

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            token
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        {initialData ? "Modifier la filière" : "Ajouter une filière"}
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

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Titre de la filière
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                            required
                        ></textarea>
                    </div>

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
                            className="w-full cursor-pointer rounded-lg bg-primary p-3 text-white transition hover:bg-opacity-90"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FiliereModal;
