import { annee } from "@/types/annee";
import AnneeClient from "./AnneeClient";

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
        console.log("Data Années : ", activeAnnee);
        if (!activeAnnee) {
            return null;
        }

        return <AnneeClient annee={activeAnnee} />;

    } catch (error) {
        console.error("Failed to fetch academic year:", error);
        return null;
    }
};

export default Annee;