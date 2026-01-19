"use client";

import { useState, useEffect } from "react";
import { fetchDomaines, Domaine } from "@/app/actions/mention";

interface MentionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { domaineId: string; designation: string }) => void;
    onDelete?: () => void;
    initialData?: { designation?: string; domaineId?: string };
    isEditing?: boolean;
}

const MentionModal = ({ isOpen, onClose, onSubmit, onDelete, initialData, isEditing }: MentionModalProps) => {
    const [domaines, setDomaines] = useState<Domaine[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDomaine, setSelectedDomaine] = useState("");
    const [designation, setDesignation] = useState("");
    const [error, setError] = useState("");

    // Reset form and fetch domains when modal opens
    useEffect(() => {
        if (isOpen) {
            // Reset form with initial data
            setDesignation(initialData?.designation || "");
            setSelectedDomaine(initialData?.domaineId || "");
            setError("");

            // Fetch domains
            setLoading(true);
            fetchDomaines().then((res) => {
                if (res.success) {
                    setDomaines(res.domaines);
                    // Set default domain if none selected
                    if (!initialData?.domaineId && res.domaines.length > 0) {
                        setSelectedDomaine(res.domaines[0]._id);
                    }
                } else {
                    setError(res.error || "Erreur lors du chargement des domaines");
                }
                setLoading(false);
            });
        }
    }, [isOpen, initialData?.designation, initialData?.domaineId]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDomaine) {
            setError("Veuillez sélectionner un domaine");
            return;
        }
        if (!designation.trim()) {
            setError("Veuillez entrer une désignation");
            return;
        }
        onSubmit({ domaineId: selectedDomaine, designation: designation.trim() });
    };

    const selectedDomaineData = domaines.find((d) => d._id === selectedDomaine);

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        {isEditing ? "Modifier la mention" : "Ajouter une mention"}
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

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Domaine
                            </label>
                            <select
                                value={selectedDomaine}
                                onChange={(e) => setSelectedDomaine(e.target.value)}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                {domaines.map((domaine) => (
                                    <option
                                        key={domaine._id}
                                        value={domaine._id}
                                        className="text-black dark:text-white dark:bg-blacksection"
                                    >
                                        {domaine.designation} ({domaine.code}) - {domaine.cycle?.designation || "N/A"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedDomaineData && selectedDomaineData.mentions && selectedDomaineData.mentions.length > 0 && (
                            <div className="mb-4">
                                <label className="mb-2 block text-xs text-body-color dark:text-body-color-dark">
                                    Mentions suggérées pour ce domaine :
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedDomaineData.mentions.map((m, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setDesignation(m)}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Désignation de la mention
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Informatique"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            {isEditing && onDelete && (
                                <button
                                    type="button"
                                    onClick={onDelete}
                                    className="w-full cursor-pointer rounded-lg border border-red-500 p-4 text-red-500 transition hover:bg-red-500 hover:text-white"
                                >
                                    Supprimer
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full cursor-pointer rounded-lg border border-stroke p-4 text-body-color transition hover:bg-gray-100 dark:border-strokedark dark:text-body-color-dark dark:hover:bg-white/10"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90"
                            >
                                {isEditing ? "Modifier" : "Créer"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MentionModal;
