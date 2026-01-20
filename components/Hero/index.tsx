"use client";
import Image from "next/image";
import { useState } from "react";
import { fetchEtudiantByMatricule } from "@/app/actions/etudiant";
import { Dossier, Etudiant } from "@/types/user";
import toast from "react-hot-toast";
import { Programme } from "@/types/cycle";
import { annee } from "@/types/annee";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface EtudiantResponse {
  etudiant: Etudiant;
  dossier: Dossier[];
  parcours: {
    annee: annee;
    decision: string;
    etablissement: any;
    etudiant: string;
    programme: Programme;
    status: string;
  }[]
}
const Hero = () => {

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [dossier, setDossier] = useState<Dossier[]>([]);
  const [parcours, setParcours] = useState<{
    annee: any;
    decision: string;
    etablissement: any;
    etudiant: string;
    programme: Programme;
    status: string;
  }[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matricule, setMatricule] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchEtudiant(matricule);
  };
  const handleSearchEtudiant = async (matricule: string) => {
    if (!matricule) {
      toast.error("Veuillez entrer un matricule");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetchEtudiantByMatricule(matricule);
      console.log("Etudiant Result:", res);

      if (res.success) {
        const { etudiant: etudiantData, dossier: dossierData, parcours: parcoursData } = res.data as EtudiantResponse;
        setEtudiant(etudiantData);
        setDossier(dossierData);
        setParcours(parcoursData);
        setIsModalOpen(true);
        toast.success("Statut officiel confirmé !");
      } else {
        toast.error(res.error || "Matricule introuvable dans le fichier national");
        setEtudiant(null);
      }
    } catch (error) {
      console.error("Failed to fetch etudiant:", error);
      toast.error("Erreur de connexion au serveur ministériel");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                Orientation & Authenticité Officielle
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Garantissez votre Avenir {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-primary/20 dark:before:bg-primary/40 ">
                  Académique
                </span>
              </h1>
              <p className="text-waterloo dark:text-manatee">
                L'ESURSI-APP est le pont technologique entre vos ambitions et la réalité administrative.
                Notre plateforme redonne de l'assurance aux étudiants congolais en offrant une transparence totale sur leur parcours.
                Vérifiez instantanément votre statut officiel et renforcez la crédibilité de vos études en RDC.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                      type="text"
                      placeholder="Votre matricule ministériel (ex: 2024ESU...)"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary w-full md:w-auto min-w-[300px]"
                    />
                    <button
                      disabled={isLoading}
                      aria-label="verify button"
                      className="flex items-center gap-2 rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-primary dark:hover:bg-primaryho disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      )}
                      Vérifier mon ID
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-sm italic text-waterloo dark:text-manatee">
                  🔥 Accès direct au fichier central du Ministère de l'ESU.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-700/444 w-full overflow-hidden rounded-2xl border border-stroke bg-alabaster dark:border-strokedark dark:bg-black">
                  <Image
                    className="object-cover opacity-80"
                    src="/images/bckg-1.jpeg"
                    alt="Hero"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal d'affichage des résultats */}
      <AnimatePresence>
        {isModalOpen && etudiant && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-stroke bg-white p-7.5 shadow-solid-8 dark:border-strokedark dark:bg-blacksection md:p-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-alabaster text-black hover:text-primary dark:bg-black dark:text-white dark:hover:text-primary transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-stroke pb-8 dark:border-strokedark">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">
                    Fiche d'Authenticité Académique
                  </h2>
                  <p className="text-primary font-medium flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-meta animate-pulse"></span>
                    Statut : Officiellement Reconnu
                  </p>
                </div>
                <div className="rounded-full bg-meta/10 px-4 py-2 text-sm font-bold text-meta uppercase tracking-widest">
                  ID: {matricule}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Infos Perso */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-3">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Identité de l'Étudiant
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Nom Complet</span>
                      <span className="font-bold text-black dark:text-white text-right">{etudiant.nom} {etudiant.postNom} {etudiant.prenom}</span>
                    </div>
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Genre</span>
                      <span className="font-bold text-black dark:text-white">{etudiant.sexe}</span>
                    </div>
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Contact Officiel</span>
                      <span className="font-bold text-black dark:text-white text-right">{etudiant.email || 'N/A'}<br />{etudiant.telephone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Parcours Académique */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-3">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Dernière Inscription
                  </h3>
                  {parcours && parcours.length > 0 ? (
                    <div className="rounded-2xl bg-alabaster p-6 dark:bg-black">
                      <p className="mb-2 text-xs font-bold text-primary uppercase tracking-widest">{parcours[0].annee.debut}-{parcours[0].annee.fin}</p>
                      <h4 className="text-lg font-bold text-black dark:text-white mb-4 line-clamp-1">{parcours[0].etablissement?.designation}</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-medium flex justify-between"><span className="text-waterloo">Filière :</span> {parcours[0].programme?.designation}</p>
                        <p className="text-sm font-medium flex justify-between"><span className="text-waterloo">Résultat :</span> <span className="font-bold text-meta">{parcours[0].decision || 'En cours'}</span></p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-stroke p-8 text-center text-waterloo dark:border-strokedark">
                      Aucun parcours académique enregistré pour ce matricule.
                    </div>
                  )}
                </div>
              </div>

              {/* Dossier Numerique */}
              {
                dossier.map((doc: Dossier, i) => (
                  <div className="mt-12 space-y-6" key={i}>
                    <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-3">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Dossier Ref: #{doc._id}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {doc.scolarite.map((folder, idx) => (
                        <div key={idx} className="flex flex-col gap-1 rounded-xl border border-stroke p-4 dark:border-strokedark bg-white dark:bg-blacksection shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-waterloo uppercase">{folder?.annee}</span>
                            <div className={`h-2 w-2 rounded-full ${folder.status === 'OK' ? 'bg-green-500' : folder.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          </div>
                          <Link href={`${folder?.document}`} target="_blank">
                            <span className="text-sm font-bold text-black dark:text-white">Voir le document</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                ))
              }

              <div className="mt-12 text-center">
                <p className="text-xs text-waterloo">
                  Ceci est une consultation en temps réel du fichier central du Ministère de l'ESU.
                  Toute reproduction est soumise aux conditions légales d'utilisation de la plateforme ESURSI.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
