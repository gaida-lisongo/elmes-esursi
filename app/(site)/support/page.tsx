import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Contact - Ministère de l'ESURSI",
  description: "Contactez le Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante pour toute assistance ou information complémentaire."
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Contact />
    </div>
  );
};

export default SupportPage;
