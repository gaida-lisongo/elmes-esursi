"use client";

import { useState, useEffect } from "react";
import { Agent } from "@/types/user";
import { fetchAgents } from "@/app/actions/agent";
import Image from "next/image";

interface TeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { agent: string; fonction: string }) => void;
}

const TeamModal = ({ isOpen, onClose, onSubmit }: TeamModalProps) => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAgentId, setSelectedAgentId] = useState("");
    const [selectedFonction, setSelectedFonction] = useState("CF");
    const [error, setError] = useState("");

    const fonctions = [
        { code: "CF", label: "Chef de section" },
        { code: "CE", label: "Chargé de l'Enseignement" },
        { code: "CR", label: "Chargé de la recherche" },
        { code: "SA", label: "Secrétaire Académique" },
        { code: "SD", label: "Secrétaire Administratif" },
    ];

    useEffect(() => {
        if (isOpen) {
            loadAgents();
        }
    }, [isOpen]);

    const loadAgents = async () => {
        setLoading(true);
        const res = await fetchAgents();
        if (res.success) {
            setAgents(res.agents);
        } else {
            setError(res.error || "Erreur lors du chargement des agents");
        }
        setLoading(false);
    };

    const filteredAgents = agents.filter(agent => {
        const fullTerm = `${agent.nom} ${agent.postNom} ${agent.prenom} ${agent.matricule}`.toLowerCase();
        return fullTerm.includes(searchQuery.toLowerCase());
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAgentId) {
            setError("Veuillez sélectionner un agent");
            return;
        }
        onSubmit({ agent: selectedAgentId, fonction: selectedFonction });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark max-h-[90vh] flex flex-col">
                <div className="mb-6 flex items-center justify-between shrink-0">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        Ajouter un membre à l'équipe
                    </h3>
                    <button onClick={onClose} className="text-black dark:text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    {/* Recherche */}
                    <div className="mb-4 shrink-0">
                        <label className="mb-2 block text-sm font-medium">Rechercher un agent</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nom, matricule..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Liste Agents */}
                    <div className="mb-4 flex-1 overflow-y-auto border border-stroke dark:border-strokedark rounded-lg">
                        {loading ? (
                            <div className="p-4 text-center">Chargement...</div>
                        ) : filteredAgents.length > 0 ? (
                            <div className="divide-y divide-stroke dark:divide-strokedark">
                                {filteredAgents.map((agent) => (
                                    <div
                                        key={agent._id}
                                        onClick={() => setSelectedAgentId(agent._id)}
                                        className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${selectedAgentId === agent._id
                                                ? "bg-primary/10 border-l-4 border-primary"
                                                : "hover:bg-gray-50 dark:hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                            {agent.photo ? (
                                                <Image src={agent.photo} alt={agent.nom} fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                                                    {agent.prenom[0]}{agent.nom[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-semibold text-black dark:text-white truncate">
                                                {agent.nom} {agent.postNom} {agent.prenom}
                                            </p>
                                            <p className="text-xs text-body-color dark:text-body-color-dark">
                                                Matricule: {agent.matricule}
                                            </p>
                                        </div>
                                        {selectedAgentId === agent._id && (
                                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">Aucun agent trouvé</div>
                        )}
                    </div>

                    {/* Fonction Selection */}
                    <div className="mb-6 shrink-0">
                        <label className="mb-2 block text-sm font-medium">Fonction au sein de la faculté</label>
                        <select
                            value={selectedFonction}
                            onChange={(e) => setSelectedFonction(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input appearance-none"
                        >
                            {fonctions.map((f) => (
                                <option key={f.code} value={f.code} className="dark:bg-blacksection">
                                    {f.label} ({f.code})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 shrink-0">
                        <button type="button" onClick={onClose} className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark">Annuler</button>
                        <button type="submit" className="w-full rounded-lg bg-primary p-3 text-white transition-opacity hover:bg-opacity-90">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamModal;
