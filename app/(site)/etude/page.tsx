import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import FunFact from "@/components/FunFact";

export const metadata: Metadata = {
    title: "Orientation & Vérification Ministérielle | ESURSI-APP",
    description: "Découvrez comment ESURSI-APP accompagne les étudiants dans leur orientation académique et permet la vérification officielle auprès du ministère de l'ESU en RDC.",
};

const EtudePage = () => {
    return (
        <main>
            <Hero />
            <Feature />
            <FunFact />
        </main>
    );
};

export default EtudePage;
