import { Metadata } from "next";
import Banner from "@/components/Hero/Banner";
import Search from "@/components/Hero/Search";
import Annee from "@/components/Testimonial/Annee";

export const metadata: Metadata = {
  title: "ESURSI-APP | Accueil",
  description: "Plateforme officielle de suivi, d'orientation et de vérification pour l'Enseignement Supérieur en RDC."
};

export default function Home() {
  return (
    <main>
      <Banner />
      <Search />
      <Annee />
    </main>
  );
}
