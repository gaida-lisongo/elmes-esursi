import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import FunFact from "@/components/FunFact";
import { fetchDomaines } from "@/app/actions/mention";

export const metadata: Metadata = {
    title: "Orientation & Vérification Ministérielle | ESURSI-APP",
    description: "Découvrez comment ESURSI-APP accompagne les étudiants dans leur orientation académique et permet la vérification officielle auprès du ministère de l'ESU en RDC.",
};

const EtudePage = async () => {
    try {
        const res = await fetchDomaines();
        console.log("Domaines founds", res);

        const { domaines } = res;
        return (
            <main>
                <Hero />
                <Feature domaines={domaines} />
                <FunFact />
            </main>
        );
    } catch (error) {
        console.error("Error fetching domaines:", error);
        return (
            <main>
                <Hero />
                <Feature domaines={[]} />
                <FunFact />
            </main>
        );
    }
};

export default EtudePage;
