import { Metadata } from "next";
import Banner from "@/components/Hero/Banner";
import Search from "@/components/Hero/Search";
import Annee from "@/components/Testimonial/Annee";

export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Home for Solid Pro"
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
