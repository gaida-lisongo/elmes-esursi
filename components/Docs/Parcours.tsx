"use client";
import { checkPaiement, createPaiement, createParcours, savePaiement } from "@/app/actions/paiement";
import { Parcours as IParcours } from "@/types/paiement";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const ParcoursSubscriber = ({ annee, etudiant, programme, etablissement, onReset }: { annee: any, etudiant: any, programme: any, etablissement: any, onReset: () => void }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [check, setCheck] = useState<boolean>(false);
    const [parcours, setParcours] = useState<IParcours | null>(null);

    const handlePrint = () => {
        window.print();
    };

    // ... (rest of the handle functions stay same, but I need to make sure I don't break them)
    const handleCreateParcoursAction = async () => {
        setLoading(true);
        try {
            const req = await createParcours(formParcour);
            if (req.success) {
                setParcours(req.data);
                setCurrentStep(2);
                toast.success("Parcours créé avec succès !");
            } else {
                toast.error("Erreur lors de la création du parcours");
            }
        } catch (error) {
            console.error("Error occured when creating parcours : ", error);
            toast.error("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    const handlePaiementTrigger = async () => {
        if (!formPaiement.phone || formPaiement.phone.length < 10) {
            toast.error("Veuillez entrer un numéro de téléphone valide");
            return;
        }

        setLoading(true);
        try {
            const req = await createPaiement({
                amount: formPaiement.amount.toString(),
                currency: formPaiement.currency,
                phone: formPaiement.phone
            });
            if (req.success) {
                setOrderNumber(req.orderNumber);
                setCurrentStep(3);
                toast.success("Demande de paiement envoyée !");
            } else {
                toast.error("Erreur lors de l'initiation du paiement");
            }
        } catch (error) {
            console.error("Error occured when creating paiement : ", error);
            toast.error("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckPaiement = async () => {
        if (!orderNumber) {
            toast.error("Référence de commande manquante");
            return;
        }

        setLoading(true);
        try {
            const req = await checkPaiement({ orderNumber });
            console.log("Check paiement result:", req);

            if (req.success) {
                setCheck(true);
                await handleUpdateParcoursAction();
                setCurrentStep(4);
                toast.success("Paiement validé avec succès !");

            } else if (req.success && !req.check) {
                toast.error("Paiement en attente. Veuillez valider la transaction sur votre téléphone.");
            } else {
                toast.error("Transaction introuvable ou échec. Réessayez dans quelques secondes.");
            }
        } catch (error) {
            console.error("Error occured when checking paiement : ", error);
            toast.error("Erreur technique lors de la vérification.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateParcoursAction = async () => {
        if (!parcours?._id || !etudiant?._id) return;
        try {
            const req = await savePaiement({
                etudiant: etudiant._id,
                parcours: parcours._id,
                status: "OK"
            });
            if (req.success) {
                setParcours(req.data);
                setCurrentStep(4);
                toast.success("Votre parcours est désormais actif !");
            }
        } catch (error) {
            console.error("Error occured when updating parcours : ", error);
            toast.error("Erreur lors de la confirmation finale");
        }
    };

    const steps = [
        { id: 1, title: "Résumé", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
        { id: 2, title: "Paiement", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
        { id: 3, title: "Vérification", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: 4, title: "Félicitations", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> }
    ];

    const [formPaiement, setFormPaiement] = useState({ amount: 25000, currency: "CDF", phone: "" });
    const [formParcour, setFormParcours] = useState({ programme: programme?._id, annee: annee?._id, etablissement: etablissement?._id, etudiant: etudiant?._id });

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <style jsx global>{`
                @media print {
                    nav, footer, button, .no-print, .blog-details-docs > :not(.print-content) {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                    }
                    .print-content {
                        display: block !important;
                        padding: 20px !important;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                    .receipt-card {
                        border: 2px solid #000 !important;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                }
                .print-content {
                    display: none;
                }
            `}</style>

            {/* Print Layout */}
            <div className="print-content text-black">
                {/* Page 1 */}
                <div className="page-break space-y-10 p-8 border-2 border-black rounded-lg">
                    <div className="flex justify-between items-start border-b-2 border-black pb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black uppercase tracking-tighter">PREUVE D'INSCRIPTION</h1>
                            <p className="text-sm font-bold">SYSTÈME NATIONAL D'ORIENTATION (ESURSI)</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">N° REF: {orderNumber || "EN-ATTENTE"}</p>
                            <p className="text-xs">Généré le: {new Date().toLocaleString('fr-FR')}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold border-b border-black">INFORMATIONS ÉTUDIANT</h2>
                            <div className="space-y-1">
                                <p><span className="font-bold">NOM :</span> {etudiant?.nom}</p>
                                <p><span className="font-bold">POSTNOM :</span> {etudiant?.postNom}</p>
                                <p><span className="font-bold">PRÉNOM :</span> {etudiant?.prenom}</p>
                                <p><span className="font-bold">SEXE :</span> {etudiant?.sexe}</p>
                                <p><span className="font-bold">EMAIL :</span> {etudiant?.email}</p>
                                <p><span className="font-bold">TÉL :</span> {etudiant?.telephone}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold border-b border-black">INSCRIPTION DÉTAILS</h2>
                            <div className="space-y-1">
                                <p><span className="font-bold">ÉTABLISSEMENT :</span> {etablissement?.designation}</p>
                                <p><span className="font-bold">MENTION :</span> {programme?.designation}</p>
                                <p><span className="font-bold">ANNÉE :</span> {annee?.debut}-{annee?.fin}</p>
                                <p><span className="font-bold">PROVINCE :</span> {etablissement?.province?.designation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t-2 border-black">
                        <h2 className="text-lg font-bold mb-4">RECU DE PAIEMENT MOBILE</h2>
                        <div className="bg-gray-100 p-6 rounded-lg border border-black grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm">Montant Payé</p>
                                <p className="text-2xl font-black">{formPaiement.amount.toLocaleString()} {formPaiement.currency}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm">Statut</p>
                                <p className="text-xl font-bold text-green-700">PAIEMENT CONFIRMÉ</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 flex justify-between italic text-xs">
                        <p>Signature de l'Étudiant</p>
                        <p>Cachet de l'Administration ESURSI</p>
                    </div>
                </div>

                {/* Page 2 */}
                <div className="p-8 border-2 border-black rounded-lg mt-10">
                    <h2 className="text-2xl font-black mb-6 text-center underline">CONDITIONS ET ÉTAPES SUIVANTES</h2>
                    <div className="space-y-6 text-sm leading-relaxed">
                        <section>
                            <h3 className="font-bold mb-2">1. VALIDATION DU DOSSIER PHYISIQUE</h3>
                            <p>L'étudiant est tenu de se présenter au service de scolarité de l'établissement mentionné muni de ce reçu et des originaux de ses documents (Diplôme d'État, bulletins, etc.) pour validation finale du dossier.</p>
                        </section>
                        <section>
                            <h3 className="font-bold mb-2">2. CARTE D'ÉTUDIANT</h3>
                            <p>Après validation physique, une carte d'étudiant numérique et physique sera délivrée pour permettre l'accès aux cours et aux services académiques.</p>
                        </section>
                        <section>
                            <h3 className="font-bold mb-2">3. RÈGLEMENT INTÉRIEUR</h3>
                            <p>En s'inscrivant, l'étudiant s'engage à respecter les lois et règlements de la République ainsi que le règlement intérieur de l'établissement choisi.</p>
                        </section>

                        <div className="mt-20 p-4 border border-dashed border-black text-center">
                            <p className="font-bold">CODE DE VÉRIFICATION UNIQUE</p>
                            <p className="text-lg font-mono tracking-widest">{orderNumber?.substring(0, 10).toUpperCase()}</p>
                            <p className="text-[10px] mt-2 text-gray-400 italic">Authenticité vérifiable sur https://esursi.cd/verify</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stepper Header (Normal view) */}
            <div className="mb-12 no-print">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -translate-y-1/2 z-0"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step.id
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"
                                    }`}
                            >
                                {currentStep > step.id ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.icon
                                )}
                            </div>
                            <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${currentStep >= step.id ? "text-primary" : "text-gray-400 dark:text-gray-500"
                                }`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 md:p-10 shadow-xl dark:shadow-2xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-50 no-print"
                >
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Résumé de votre dossier</h2>
                                <p className="text-gray-500 dark:text-gray-400">Veuillez vérifier vos informations avant de confirmer votre inscription.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <SectionInfo
                                        label="Étudiant"
                                        value={`${etudiant?.prenom} ${etudiant?.nom} ${etudiant?.postNom || ""}`}
                                        subValue={etudiant?.email}
                                        icon={<UserIcon />}
                                    />
                                    <SectionInfo
                                        label="Établissement"
                                        value={etablissement?.nom || etablissement?.designation || "Non spécifié"}
                                        subValue={etablissement?.province?.designation}
                                        icon={<SchoolIcon />}
                                    />
                                </div>
                                <div className="space-y-6">
                                    <SectionInfo
                                        label="Programme d'études"
                                        value={programme?.designation}
                                        subValue={programme?.code}
                                        icon={<BookIcon />}
                                    />
                                    <SectionInfo
                                        label="Année Académique"
                                        value={`${annee?.debut} - ${annee?.fin}`}
                                        subValue="Traitement du dossier en cours"
                                        icon={<CalendarIcon />}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                                <div className="flex justify-between items-center text-black dark:text-white ">
                                    <span className=" font-medium text-lg">Frais de traitement du dossier</span>
                                    <span className="text-2xl font-bold text-primary">{formPaiement.amount.toLocaleString()} {formPaiement.currency}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCreateParcoursAction}
                                disabled={loading}
                                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                            >
                                {loading && <Spinner />}
                                Confirmer et passer au paiement
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Paiement Mobile</h2>
                                <p className="text-gray-500 dark:text-gray-400">Insérez votre numéro de téléphone pour recevoir la demande de paiement.</p>
                            </div>

                            <div className="max-w-md mx-auto space-y-4">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Numéro de téléphone (ex: 0812345678)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-gray-400 font-medium">+243</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Numéro de téléphone"
                                        className="w-full pl-16 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg font-medium tracking-widest text-gray-900 dark:text-white"
                                        value={formPaiement.phone}
                                        onChange={(e) => setFormPaiement({ ...formPaiement, phone: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    onClick={handlePaiementTrigger}
                                    disabled={loading || !formPaiement.phone}
                                    className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                                >
                                    {loading && <Spinner />}
                                    Payer {formPaiement.amount.toLocaleString()} {formPaiement.currency}
                                </button>

                                <button
                                    onClick={() => setCurrentStep(1)}
                                    disabled={loading}
                                    className="w-full py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium transition-colors text-sm"
                                >
                                    Retour au résumé
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8 text-center py-4">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-primary">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Vérification du paiement</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                    Une demande a été envoyée au <span className="font-bold text-gray-900 dark:text-white">{formPaiement.phone}</span>.
                                    Veuillez saisir votre code PIN secret sur votre mobile pour valider.
                                </p>
                            </div>

                            <button
                                onClick={handleCheckPaiement}
                                disabled={loading}
                                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                            >
                                {loading && <Spinner />}
                                Vérifier le statut du paiement
                            </button>

                            <button
                                onClick={() => setCurrentStep(2)}
                                disabled={loading}
                                className="w-full py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium transition-colors text-sm"
                            >
                                Utiliser un autre numéro
                            </button>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-8 text-center pt-4">
                            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
                                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Inscription Réussie !</h2>
                                <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                                    Félicitations <span className="font-bold text-gray-900 dark:text-white">{etudiant?.prenom}</span>, votre inscription au programme
                                    <span className="font-bold text-gray-900 dark:text-white"> {programme?.designation}</span> a été confirmée avec succès.
                                </p>
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center">
                                <button
                                    onClick={onReset}
                                    className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                                >
                                    Faire une nouvelle recherche
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                >
                                    Télécharger mon reçu (2 pages)
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// Helper Components
const SectionInfo = ({ label, value, subValue, icon }: { label: string, value: string, subValue?: string, icon: React.ReactNode }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center text-primary border border-gray-200 dark:border-gray-800">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter mb-0.5">{label}</p>
            <p className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{value}</p>
            {subValue && <p className="text-sm text-gray-500 dark:text-gray-400">{subValue}</p>}
        </div>
    </div>
);

const UserIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SchoolIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const BookIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const Spinner = () => (
    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
);

export default ParcoursSubscriber;
