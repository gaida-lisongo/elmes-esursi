import { useState } from "react";
import Image from "next/image";

interface NrefModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { type: string, reference: string, date: string }) => void;
    initialData?: { type?: string, reference?: string, date?: string };
}

const NrefModal = ({ isOpen, onClose, onSubmit, initialData }: NrefModalProps) => {
    const [type, setType] = useState(initialData?.type || "Arrêté Ministériel");
    const [reference, setReference] = useState(initialData?.reference || "");
    const [date, setDate] = useState(initialData?.date || "");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ type, reference, date });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        {initialData ? "Modifier la référence" : "Ajouter une référence"}
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
                            Type de document
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="Arrêté Ministériel">Arrêté Ministériel</option>
                            <option value="Décret">Décret</option>
                            <option value="Ordonnance">Ordonnance</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Référence
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: 001/MINESU/CABMIN/2024"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Date de signature
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full cursor-pointer rounded-lg border border-primary p-4 text-primary transition hover:bg-opacity-90"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NrefModal;
