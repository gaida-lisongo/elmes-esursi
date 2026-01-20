"use client";

import { Mention } from "@/app/actions/mention";
import { Etudiant } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadPhoto } from "@/app/actions/photo";
import { createEtudiant, createDossier } from "@/app/actions/etudiant";

interface StudentInfoProps {
    selectedMention: Mention | null;
    onBack: () => void;
    onSuccess: (student: any) => void;
}

const StudentInfo = ({ selectedMention, onBack, onSuccess }: StudentInfoProps) => {
    const [subStep, setSubStep] = useState(1); // 1-3 for Identity, 4 for Documents
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState<string | null>(null);

    const [studentData, setStudentData] = useState<Partial<Etudiant>>({
        nom: "",
        postNom: "",
        prenom: "",
        sexe: "Masculin",
        dateNaissance: new Date("2000-01-01"),
        lieuNaissance: "",
        nationalite: "CONGOLAISE",
        adresse: "",
        telephone: "",
        email: "",
        grade: "Diplomé",
        photo: ""
    });

    const [dossierData, setDossierData] = useState({
        annee: "2026-2027",
        document: "",
        date: new Date().toISOString().split('T')[0]
    });

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'student' | 'dossier') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadPhoto(formData);
            if (res.success && res.url) {
                if (target === 'student') {
                    setStudentData({ ...studentData, photo: res.url });
                    toast.success("Photo chargée !");
                } else {
                    setDossierData({ ...dossierData, document: res.url });
                    toast.success("Document chargé !");
                }
            } else {
                toast.error(res.error || "Erreur lors du chargement");
            }
        } catch (error) {
            toast.error("Erreur technique lors du chargement");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateStudentAction = async () => {
        // Validation simple
        if (!studentData.nom || !studentData.prenom || !studentData.email) {
            toast.error("Veuillez remplir les informations essentielles (Nom, Prénom, Email)");
            return;
        }

        setIsLoading(true);
        try {
            const res = await createEtudiant(studentData);
            if (res.success) {
                console.log("Student data : ", res.data);
                setStudentId(res.data._id);
                setSubStep(4); // Move to Documents step
                toast.success("Identité enregistrée ! Prochaine étape : Constitution du dossier.");
            } else {
                toast.error(res.error || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            toast.error("Erreur lors de la création de l'étudiant");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateDossierAction = async () => {
        if (!studentId) return;
        if (!dossierData.document) {
            toast.error("Veuillez charger le document requis");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                scolarite: [
                    {
                        annee: dossierData.annee,
                        document: dossierData.document,
                        date: dossierData.date
                    }
                ]
            };
            const res = await createDossier(studentId, payload);
            if (res.success) {
                toast.success("Dossier soumis avec succès !");
                onSuccess({ ...studentData, _id: studentId });
            } else {
                toast.error(res.error || "Erreur lors de la soumission");
            }
        } catch (error) {
            toast.error("Erreur lors de la soumission du dossier");
        } finally {
            setIsLoading(false);
        }
    };

    const renderIdentitySteps = () => (
        <div className="space-y-6">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                        {subStep === 1 && "Étape 1 : Votre Identité"}
                        {subStep === 2 && "Étape 2 : Vos Coordonnées"}
                        {subStep === 3 && "Étape 3 : Infos Complémentaires"}
                    </h2>
                    <span className="text-sm font-bold text-primary">
                        {subStep} / 3
                    </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stroke dark:bg-strokedark overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(subStep / 3) * 100}%` }}
                    />
                </div>
                <p className="mt-4 text-body-color dark:text-body-color-dark">
                    Inscription à <strong>{selectedMention?.etablissement.designation}</strong> en <strong>{selectedMention?.designation}</strong>.
                </p>
            </div>

            {subStep === 1 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in">
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Nom</label>
                        <input
                            type="text"
                            value={studentData.nom}
                            onChange={(e) => setStudentData({ ...studentData, nom: e.target.value.toUpperCase() })}
                            placeholder="EX: LISONGO"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Postnom</label>
                        <input
                            type="text"
                            value={studentData.postNom}
                            onChange={(e) => setStudentData({ ...studentData, postNom: e.target.value.toUpperCase() })}
                            placeholder="EX: KAMANGO"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Prénom</label>
                        <input
                            type="text"
                            value={studentData.prenom}
                            onChange={(e) => setStudentData({ ...studentData, prenom: e.target.value })}
                            placeholder="EX: Dem"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Sexe</label>
                        <select
                            value={studentData.sexe}
                            onChange={(e) => setStudentData({ ...studentData, sexe: e.target.value as any })}
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        >
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Féminin</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Date de naissance</label>
                        <input
                            type="date"
                            value={studentData.dateNaissance ? new Date(studentData.dateNaissance).toISOString().split('T')[0] : ""}
                            onChange={(e) => setStudentData({ ...studentData, dateNaissance: new Date(e.target.value) })}
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Lieu de naissance</label>
                        <input
                            type="text"
                            value={studentData.lieuNaissance}
                            onChange={(e) => setStudentData({ ...studentData, lieuNaissance: e.target.value })}
                            placeholder="Ville ou Territoire"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Nationalité</label>
                        <input
                            type="text"
                            value={studentData.nationalite}
                            onChange={(e) => setStudentData({ ...studentData, nationalite: e.target.value.toUpperCase() })}
                            placeholder="EX: CONGOLAISE"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                </div>
            )}

            {subStep === 2 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in">
                    <div className="md:col-span-2">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Adresse Physique</label>
                        <textarea
                            rows={3}
                            value={studentData.adresse}
                            onChange={(e) => setStudentData({ ...studentData, adresse: e.target.value })}
                            placeholder="N°, Avenue, Quartier, Commune, Ville"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Téléphone (+243...)</label>
                        <input
                            type="tel"
                            value={studentData.telephone}
                            onChange={(e) => setStudentData({ ...studentData, telephone: e.target.value })}
                            placeholder="+2438..."
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                        <input
                            type="email"
                            value={studentData.email}
                            onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                            placeholder="exemple@gmail.com"
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        />
                    </div>
                </div>
            )}

            {subStep === 3 && (
                <div className="grid grid-cols-1 gap-6 animate-fade-in">
                    <div>
                        <label className="mb-2.5 block font-medium text-black dark:text-white">Dernier Grade Obtenu</label>
                        <select
                            value={studentData.grade}
                            onChange={(e) => setStudentData({ ...studentData, grade: e.target.value as any })}
                            className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                        >
                            <option value="Diplomé">Diplomé d'État</option>
                            <option value="Gradué">Gradué</option>
                            <option value="Licencié">Licencié</option>
                            <option value="Magistral">Master / Magistral</option>
                            <option value="Doctorat">Doctorat</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-stroke p-8 dark:border-strokedark rounded-xl bg-gray-50 dark:bg-white/5">
                        {studentData.photo ? (
                            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary shadow-xl">
                                <img src={studentData.photo} alt="Student" className="h-full w-full object-cover" />
                                <button
                                    onClick={() => setStudentData({ ...studentData, photo: "" })}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity text-white font-bold"
                                >
                                    Changer
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 font-bold text-black dark:text-white">Photo d'Identité</h4>
                                <p className="mb-5 text-sm">Cliquez pour téléverser votre photo au format JPG/PNG</p>
                                <label className="cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-solid-3 hover:bg-opacity-90">
                                    Choisir un fichier
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'student')} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8 flex justify-end gap-4">
                {subStep < 3 ? (
                    <button
                        type="button"
                        onClick={() => setSubStep(subStep + 1)}
                        className="rounded-full bg-primary px-10 py-3.5 text-lg font-bold text-white shadow-solid-3 transition-all hover:bg-opacity-90 active:scale-95"
                    >
                        Continuer
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleCreateStudentAction}
                        className="rounded-full bg-primary px-10 py-3.5 text-lg font-bold text-white shadow-solid-3 transition-all hover:bg-opacity-90 active:scale-95 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Enregistrement...
                            </>
                        ) : (
                            "Finaliser mon Identité"
                        )}
                    </button>
                )}
            </div>
        </div>
    );

    const renderDocumentStep = () => (
        <div className="animate-fade-in-up">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                    Constitution du Dossier
                </h2>
                <p className="mt-2 text-body-color dark:text-body-color-dark">
                    Veuillez charger le document requis pour votre inscription à la mention <strong>{selectedMention?.designation}</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="rounded-2xl border border-stroke bg-gray-50 p-8 dark:border-strokedark dark:bg-white/5">
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2.5 block font-medium text-black dark:text-white">Année Académique</label>
                            <input
                                type="text"
                                value={dossierData.annee}
                                onChange={(e) => setDossierData({ ...dossierData, annee: e.target.value })}
                                className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block font-medium text-black dark:text-white">Date d'obtention (Document)</label>
                            <input
                                type="date"
                                value={dossierData.date}
                                onChange={(e) => setDossierData({ ...dossierData, date: e.target.value })}
                                className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-stroke p-10 dark:border-strokedark rounded-xl bg-white dark:bg-transparent">
                        {dossierData.document ? (
                            <div className="text-center">
                                <div className="mb-4 flex items-center justify-center gap-4">
                                    <div className="h-16 w-16 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-black dark:text-white">Document chargé</h4>
                                        <p className="text-xs text-body-color underline truncate max-w-[200px]">{dossierData.document}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDossierData({ ...dossierData, document: "" })}
                                    className="text-sm font-bold text-red-500 hover:underline"
                                >
                                    Supprimer et recommencer
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 font-bold text-black dark:text-white">Diplôme ou Attestation</h4>
                                <p className="mb-6 text-sm">Veuillez charger une copie certifiée conforme (JPG/PNG)</p>
                                <label className="cursor-pointer rounded-full bg-black px-8 py-3 text-sm font-bold text-white shadow-solid-3 hover:bg-opacity-90 dark:bg-primary">
                                    Parcourir mes documents
                                    <input type="file" className="hidden" onChange={(e) => handlePhotoUpload(e, 'dossier')} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-stroke pt-8 dark:border-strokedark">
                    <p className="text-sm text-body-color italic">
                        * Votre dossier sera analysé par l'administration avant validation finale.
                    </p>
                    <button
                        type="button"
                        disabled={isLoading || !dossierData.document}
                        onClick={handleCreateDossierAction}
                        className="rounded-full bg-primary px-10 py-3.5 text-lg font-bold text-white shadow-solid-3 transition-all hover:bg-opacity-90 active:scale-95 flex items-center gap-2 disabled:bg-opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Soumission...
                            </>
                        ) : (
                            "Soumettre mon Dossier"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in-up">
            {subStep <= 3 && (
                <button
                    onClick={() => {
                        if (subStep > 1) setSubStep(subStep - 1);
                        else onBack();
                    }}
                    className="mb-8 flex items-center text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary group"
                >
                    <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {subStep > 1 ? "Étape précédente" : "Changer d'établissement"}
                </button>
            )}

            {subStep <= 3 ? renderIdentitySteps() : renderDocumentStep()}
        </div>
    );
};

export default StudentInfo;
