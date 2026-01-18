import { annee } from "@/types/annee";
import AnneeClient from "./AnneeClient";
import FraisClient from "./Frais";

const Annee = async () => {
    try {
        const req = await fetch("https://esursi-app.vercel.app/api/annees");

        if (!req.ok) {
            return null;
        }

        const res = await req.json();

        if (!res.annees) {
            return null;
        }

        const { annees } = res;
        const activeAnnee = annees[0];

        if (!activeAnnee) {
            return null;
        }

        const reqFrais = await fetch("https://esursi-app.vercel.app/api/frais?annee=" + activeAnnee._id);

        if (!reqFrais.ok) {
            return null;
        }

        const resFrais = await reqFrais.json();

        if (resFrais?.success) {
            const { frais } = resFrais;

            return (
                <div>
                    <AnneeClient annee={activeAnnee} />
                    <FraisClient data={frais} />
                </div>
            );
        }

        return (
            <div>
                <AnneeClient annee={activeAnnee} />
            </div>
        );

    } catch (error) {
        console.error("Failed to fetch academic year:", error);
        return null;
    }
};

export default Annee;