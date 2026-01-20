"use client";

import { Domaine, Programme } from "@/types/cycle";
import SidebarLink from "./SidebarLink";
import { useEffect, useState } from "react";
import { fetchMentions, Mention } from "@/app/actions/mention";
import { uploadPhoto } from "@/app/actions/photo";
import { createEtudiant, createDossier } from "@/app/actions/etudiant";
import { Etudiant } from "@/types/user";
import toast from "react-hot-toast";

const Programmes = ({ data, domaines }: { data: Programme[], domaines: Domaine[] }) => {
    const [currentTab, setCurrentTab] = useState<string>(data[0]?._id);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDomaine, setSelectedDomaine] = useState<Domaine | null>(null);
    const [step, setStep] = useState<'search' | 'etabs' | 'info' | 'docs' | 'summary'>('search');

    // Modal state
    const [showMentionsModal, setShowMentionsModal] = useState(false);
    const [mentionsDomaine, setMentionsDomaine] = useState<Domaine | null>(null);
    const [mentions, setMentions] = useState<Mention[]>([]);

    const [selectedMention, setSelectedMention] = useState<Mention | null>(null);
    const [subStep, setSubStep] = useState(1);
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

    const currentProgramme = data.find((item) => item._id === currentTab);

    const filteredDomaines = domaines.filter((domaine) =>
        domaine.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchMentionsByCurrentDomaine = async () => {
        try {
            const resp = await fetchMentions({ key: "domaine", value: selectedDomaine?._id || "" });
            if (resp.success) {
                console.log("Mentions fetching : ", resp.mentions)
                setMentions(resp.mentions);
            }

        } catch (error) {
            console.error("Erro when fetching mentions :", error)
        }
    };

    useEffect(() => {
        if (selectedDomaine) {
            fetchMentionsByCurrentDomaine();
        }
    }, [selectedDomaine]);

    const handleDomaineSelect = (domaine: Domaine) => {
        setSelectedDomaine(domaine);
        setStep('etabs');
    };

    const handleViewMentions = (e: React.MouseEvent, domaine: Domaine) => {
        e.stopPropagation();
        setMentionsDomaine(domaine);
        setShowMentionsModal(true);
    };

    const MentionsModal = () => {
        if (!showMentionsModal || !mentionsDomaine) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-blacksection animate-fade-in-up">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black dark:text-white">
                            Mentions - {mentionsDomaine.designation}
                        </h3>
                        <button
                            onClick={() => setShowMentionsModal(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                        >
                            <svg className="h-5 w-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                        <ul className="flex flex-col gap-3">
                            {mentionsDomaine.mentions.map((mention, idx) => (
                                <li key={idx} className="flex items-center gap-3 rounded-lg border border-stroke p-3 dark:border-strokedark">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                        {idx + 1}
                                    </span>
                                    <span className="text-sm font-medium text-black dark:text-white">{mention}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setShowMentionsModal(false)}
                            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-opacity-90 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderSearch = () => (
        <div className="animate-fade-in-up">
            <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl">
                    Trouvez votre voie
                </h2>
                <p className="mx-auto max-w-[600px] text-base text-body-color dark:text-body-color-dark">
                    Recherchez parmi nos domaines d'excellence et découvrez les opportunités qui s'offrent à vous.
                </p>
            </div>

            <div className="mb-12 relative max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Rechercher un domaine..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-stroke bg-white px-8 py-4 pl-12 text-lg text-black shadow-solid-3 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection dark:text-white dark:focus:border-primary"
                />
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-body-color dark:text-body-color-dark"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.16666 3.33332C5.945 3.33332 3.33333 5.945 3.33333 9.16665C3.33333 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16665C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66667 9.16665C1.66667 5.02452 5.02453 1.66665 9.16666 1.66665C13.3088 1.66665 16.6667 5.02452 16.6667 9.16666 16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02453 16.6667 1.66667 13.3088 1.66667 9.16665Z"
                        fill="currentColor"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="flex flex-col gap-6">
                {filteredDomaines.map((domaine) => (
                    <div
                        key={domaine._id}
                        onClick={() => handleDomaineSelect(domaine)}
                        className="group relative cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden rounded-2xl border border-stroke bg-white p-6 shadow-solid-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-6 dark:border-strokedark dark:bg-blacksection dark:hover:border-primary/50"
                    >
                        <div className="mb-4 md:mb-0 md:mr-8 flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <h3 className="text-xl font-bold text-black group-hover:text-primary dark:text-white dark:group-hover:text-primary transition-colors">
                                    {domaine.designation}
                                </h3>
                                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                                    {domaine.code}
                                </span>
                            </div>

                            <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark line-clamp-2 mb-3">
                                {domaine.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-black ring-1 ring-inset ring-gray-500/10 dark:bg-white/5 dark:text-white">
                                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    {domaine.mentions.length} Mentions disponibles
                                </span>
                                <button
                                    onClick={(e) => handleViewMentions(e, domaine)}
                                    className="text-xs font-medium text-primary hover:underline hover:text-primary-dark z-20"
                                >
                                    Voir détails
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center self-end md:self-center">
                            <span className="flex items-center text-sm font-medium text-primary group-hover:underline white-space-nowrap bg-primary/5 py-2 px-4 rounded-full transition-colors group-hover:bg-primary/10">
                                S'inscrire
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDomaines.length === 0 && (
                <div className="text-center py-20">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5">
                        <svg className="h-8 w-8 text-body-color dark:text-body-color-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Aucun domaine trouvé</h3>
                    <p className="text-body-color dark:text-body-color-dark">Essayez de modifier vos termes de recherche</p>
                </div>
            )}

            <MentionsModal />
        </div>
    );

    const renderEtabs = () => (
        <div className="animate-fade-in-up">
            <button
                onClick={() => setStep('search')}
                className="mb-8 flex items-center text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary group"
            >
                <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux domaines
            </button>

            <div className="mb-10">
                <h2 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                    Choisissez votre établissement
                </h2>
                <p className="mt-2 text-body-color dark:text-body-color-dark">
                    Voici les institutions proposant le domaine <strong>{selectedDomaine?.designation}</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {mentions.map((mention) => (
                    <div
                        key={mention._id}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${selectedMention?._id === mention._id
                            ? "border-primary bg-primary/5 shadow-solid-7"
                            : "border-stroke bg-white hover:border-primary/50 hover:shadow-solid-6 dark:border-strokedark dark:bg-blacksection"
                            }`}
                        onClick={() => setSelectedMention(mention)}
                    >
                        {/* Banner Image / Style */}
                        <div className="relative h-32 w-full overflow-hidden bg-gray-100 dark:bg-meta-4">
                            {mention.etablissement.photo && mention.etablissement.photo[0] ? (
                                <img
                                    src={mention.etablissement.photo[0]}
                                    alt={mention.etablissement.designation}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-primary/20">
                                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* Sigle Badge */}
                            <div className="absolute bottom-4 left-4">
                                <span className="rounded bg-primary px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                                    {mention.etablissement.sigle}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="mb-2 text-lg font-bold text-black dark:text-white transition-colors group-hover:text-primary">
                                {mention.etablissement.designation}
                            </h3>

                            <div className="mb-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm text-body-color dark:text-body-color-dark">
                                    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="truncate">{mention.etablissement.province.designation}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>Mention: {mention.designation}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 border-t border-stroke pt-4 dark:border-strokedark">
                                <a
                                    href={`/etablissement/${mention.etablissement._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm font-semibold text-primary hover:underline"
                                >
                                    Fiche technique
                                </a>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMention(mention);
                                        setStep('info');
                                    }}
                                    className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-solid-3 transition-all hover:bg-opacity-90 active:scale-95"
                                >
                                    S'inscrire ici
                                </button>
                            </div>
                        </div>

                        {/* Selected Indicator */}
                        {selectedMention?._id === mention._id && (
                            <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {mentions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 dark:bg-white/5">
                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Désolé !</h3>
                    <p className="mt-2 text-body-color">Aucun établissement ne propose encore ce domaine.</p>
                </div>
            )}
        </div>
    );

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'student' | 'dossier') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

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
        setIsLoading(false);
    };

    const handleCreateStudent = async () => {
        setIsLoading(true);
        const res = await createEtudiant(studentData);
        if (res.success) {
            setStudentId(res.data._id);
            setStep('docs');
            toast.success("Identité enregistrée !");
        } else {
            toast.error(res.error || "Erreur lors de l'enregistrement");
        }
        setIsLoading(false);
    };

    const handleCreateDossier = async () => {
        if (!studentId) return;
        setIsLoading(true);
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
            setStep('summary');
            toast.success("Dossier soumis avec succès !");
        } else {
            toast.error(res.error || "Erreur lors de la soumission");
        }
        setIsLoading(false);
    };

    const renderStudentInfo = () => (
        <div className="animate-fade-in-up">
            <button
                onClick={() => {
                    if (subStep > 1) setSubStep(subStep - 1);
                    else setStep('etabs');
                }}
                className="mb-8 flex items-center text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary group"
            >
                <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {subStep > 1 ? "Étape précédente" : "Changer d'établissement"}
            </button>

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

            <div className="space-y-6">
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
                            onClick={handleCreateStudent}
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
        </div>
    );

    const renderStudentDocuments = () => (
        <div className="animate-fade-in-up">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                    Constituion du Dossier
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
                        onClick={handleCreateDossier}
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
        <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 lg:w-1/4">
                        <div className="sticky top-[74px] rounded-lg border border-stroke bg-white p-4 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                            <SidebarLink
                                data={data.map((item) => ({
                                    title: item.designation,
                                    id: item._id,
                                    onClick: () => setCurrentTab(item._id),
                                    isCurrent: currentTab === item._id,
                                }))}
                                currentProgramme={currentProgramme}
                            />
                            {data.length === 0 && (
                                <p className="text-center text-sm text-body-color dark:text-body-color-dark">
                                    Aucun résultat trouvé.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-full px-4 lg:w-3/4">
                        <div className="blog-details blog-details-docs rounded-lg border border-stroke bg-white px-8 py-11 shadow-three dark:border-strokedark dark:bg-blacksection sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                            {step === 'search' && renderSearch()}
                            {step === 'etabs' && renderEtabs()}
                            {step === 'info' && renderStudentInfo()}
                            {step === 'docs' && renderStudentDocuments()}
                            {step === 'summary' && <div>Résumé à venir</div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programmes;