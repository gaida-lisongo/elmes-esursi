import { IEtablissementWithMentions } from "./EtablissementDetails";

interface EtabGeneralInfoProps {
    etablissement: IEtablissementWithMentions;
}

const EtabGeneralInfo = ({ etablissement }: EtabGeneralInfoProps) => {
    // Collect all unique descriptions if array, or just use descriptions
    // The type says string[], so we map them.
    const descriptions = etablissement.description || [];

    return (
        <div className="mb-8 rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                À propos de l'établissement
            </h2>

            {descriptions.length > 0 ? (
                <div className="space-y-4 text-body-color dark:text-body-color-dark">
                    {descriptions.map((desc, idx) => (
                        <p key={idx} className="text-base leading-relaxed">
                            {desc}
                        </p>
                    ))}
                </div>
            ) : (
                <p className="text-body-color dark:text-body-color-dark italic">
                    Aucune description disponible.
                </p>
            )}

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 border-t border-stroke pt-6 dark:border-strokedark">
                {/* Contact Info */}
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">Coordonnées</h3>
                    <ul className="space-y-3">
                        {etablissement.adresse && (
                            <li className="flex items-start gap-3">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <span className="text-sm text-body-color dark:text-body-color-dark">{etablissement.adresse}</span>
                            </li>
                        )}
                        {etablissement.telephone && (
                            <li className="flex items-start gap-3">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                <span className="text-sm text-body-color dark:text-body-color-dark">{etablissement.telephone}</span>
                            </li>
                        )}
                        {etablissement.email && (
                            <li className="flex items-start gap-3">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <a href={`mailto:${etablissement.email}`} className="text-sm text-body-color hover:text-primary dark:text-body-color-dark">{etablissement.email}</a>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Website & Socials or Other */}
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">En ligne</h3>
                    <ul className="space-y-3">
                        {etablissement.website && (
                            <li className="flex items-start gap-3">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                </span>
                                <a
                                    href={etablissement.website.startsWith('http') ? etablissement.website : `https://${etablissement.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-body-color hover:text-primary dark:text-body-color-dark break-all"
                                >
                                    {etablissement.website}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EtabGeneralInfo;
