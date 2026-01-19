import { useState } from "react";
import { Agent } from "@/types/user";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent?: Agent;
}

const AuthModal = ({ isOpen, onClose, agent }: AuthModalProps) => {
    const [secureKey, setSecureKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulate API call for now or implement actual authentication
        setTimeout(() => {
            // Check logic here against agent's keys or backend
            console.log("Authenticating with key:", secureKey, "for agent:", agent?.nom);
            setLoading(false);
            // On success:
            // onClose();
            // On error:
            // setError("Clé de sécurité invalide");
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up border border-stroke dark:border-strokedark">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        Connexion Administrateur
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

                {agent && (
                    <div className="mb-6 flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-meta-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                            {agent.nom?.[0]}
                        </div>
                        <div>
                            <p className="font-semibold text-black dark:text-white">{agent.prenom} {agent.nom}</p>
                            <p className="text-xs text-body-color">Veuillez confirmer votre identité</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Clé de sécurité (Secure Key)
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Entrez votre clé..."
                                value={secureKey}
                                onChange={(e) => setSecureKey(e.target.value)}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mb-4 text-sm text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-70"
                    >
                        {loading ? "Vérification..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
