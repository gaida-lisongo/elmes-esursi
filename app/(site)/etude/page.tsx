import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import FunFact from "@/components/FunFact";
import { fetchDomaines } from "@/app/actions/mention";
import { fetchStatsEsursi } from "@/app/actions/stats";

export const metadata: Metadata = {
    title: "Orientation & Vérification Ministérielle | ESURSI-APP",
    description: "Découvrez comment ESURSI-APP accompagne les étudiants dans leur orientation académique et permet la vérification officielle auprès du ministère de l'ESU en RDC.",
};

const EtudePage = async () => {
    try {
        const res = await fetchDomaines();
        const stats = await fetchStatsEsursi();
        const { domaines } = res;
        return (
            <main>
                <Hero />
                <FunFact stats={stats} />
                <Feature domaines={domaines} />
            </main>
        );
    } catch (error) {
        console.error("Error fetching domaines:", error);
        return (
            <main>
                <Hero />
                <FunFact stats={
                    {
                        totalEtab: 0,
                        totalAgent: 0,
                        totalEtudiant: 0,
                    }
                } />
                <Feature domaines={[]} />
            </main>
        );
    }
};

export default EtudePage;
