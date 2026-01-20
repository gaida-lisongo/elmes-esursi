"use client";
import Image from "next/image";
import { useState } from "react";
import { fetchEtudiantByMatricule } from "@/app/actions/etudiant";
import { Dossier, Etudiant } from "@/types/user";
import toast from "react-hot-toast";

interface EtudiantResponse {
  etudiant: Etudiant;
  dossier: Dossier[];
  parcours: {
    annee: string;
    decision: string;
    etablissement: string;
    etudiant: string;
    programme: string;
    status: string;
  }[]
}
const Hero = () => {

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [dossier, setDossier] = useState<Dossier[]>([]);
  const [parcours, setParcours] = useState<{
    annee: string;
    decision: string;
    etablissement: string;
    etudiant: string;
    programme: string;
    status: string;
  }[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

      {/* Affichage des résultats s'il y en a */}
      {etudiant && (
        <section className="pb-20">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="animate_up rounded-2xl border border-stroke bg-white p-7.5 shadow-solid-8 dark:border-strokedark dark:bg-blacksection xl:p-15">
              <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-stroke pb-8 dark:border-strokedark">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">
                    Fiche d'Authenticité Académique
                  </h2>
                  <p className="text-primary font-medium">Statut : Officiellement Reconnu</p>
                </div>
                <div className="rounded-full bg-meta/10 px-4 py-2 text-sm font-bold text-meta uppercase">
                  ID: {matricule}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Infos Perso */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black dark:text-white">Identité de l'Étudiant</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Nom Complet</span>
                      <span className="font-bold text-black dark:text-white text-right">{etudiant.nom} {etudiant.postNom} {etudiant.prenom}</span>
                    </div>
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Genre</span>
                      <span className="font-bold text-black dark:text-white">{etudiant.sexe === 'M' ? 'Masculin' : 'Féminin'}</span>
                    </div>
                    <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                      <span className="text-waterloo">Contact</span>
                      <span className="font-bold text-black dark:text-white text-right">{etudiant.email || 'N/A'}<br />{etudiant.telephone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Parcours Académique */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black dark:text-white">Dernière Inscription Enregistrée</h3>
                  {parcours && parcours.length > 0 ? (
                    <div className="rounded-xl bg-alabaster p-6 dark:bg-black">
                      <p className="mb-2 text-sm font-bold text-primary uppercase tracking-wider">{parcours[0].annee}</p>
                      <h4 className="text-lg font-bold text-black dark:text-white mb-4">{parcours[0].etablissement}</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-medium"><span className="text-waterloo">Filière :</span> {parcours[0].programme}</p>
                        <p className="text-sm font-medium"><span className="text-waterloo">Résultat :</span> <span className="text-meta">{parcours[0].decision || 'En cours'}</span></p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-stroke p-6 text-center text-waterloo">
                      Aucun parcours enregistré pour ce matricule.
                    </div>
                  )}
                </div>
              </div>

              {/* Dossier Numerique */}
              <div className="mt-12 space-y-6">
                <h3 className="text-xl font-bold text-black dark:text-white">État du Dossier Numérique au Ministère</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {['Diplôme d\'Etat', 'Bulletins', 'Attestation', 'Identité'].map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-stroke p-4 dark:border-strokedark">
                      <div className="h-2 w-2 rounded-full bg-meta"></div>
                      <span className="text-sm font-medium text-black dark:text-white">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
