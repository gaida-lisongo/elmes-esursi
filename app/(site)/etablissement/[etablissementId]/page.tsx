import Link from "next/link";
import { Metadata } from "next";
import EtablissementDetails, { IEtablissementWithMentions } from "@/components/Etablissement/EtablissementDetails";

export const metadata: Metadata = {
    title: "Détails de l'établissement",
    description: "Informations détaillées sur l'établissement",
};

const getEtablissement = async (id: string): Promise<IEtablissementWithMentions | null> => {
    try {
        const res = await fetch(`https://esursi-app.vercel.app/api/etablissements/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const rep = await res.json();

        if (rep.success) return rep.data;
        return null;
    } catch (error) {
        console.error("Failed to fetch etablissement:", error);
        return null;
    }
};

const EtablissementPage = async (props: { params: Promise<{ etablissementId: string }> }) => {
    const { etablissementId } = await props.params;
    const etab = await getEtablissement(etablissementId);

    if (!etab) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-black dark:text-white">Établissement introuvable</h2>
                <p className="text-body-color dark:text-body-color-dark">
                    L'établissement demandé n'a pas pu être chargé.
                </p>
                <Link
                    href="/"
                    className="rounded-full bg-primary px-8 py-3 text-white transition hover:bg-opacity-90"
                >
                    Retour à l'accueil
                </Link>
            </div>
        );
    }

    return <EtablissementDetails etablissement={etab} />;
};

export default EtablissementPage;