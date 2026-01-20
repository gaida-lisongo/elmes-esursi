import "../globals.css";
import type { Metadata } from "next";
import Proivder from "./Provider";

// Removed Google Font import due to build-time network issues
// import { Inter } from "next/font/google";
const inter = { className: "" }; // Using system fonts defined in CSS

export const metadata: Metadata = {
  title: "ESURSI-APP | Portail du Ministère de l'ESURSI",
  description: "Portail officiel de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante en RDC.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

import { Cycle } from "@/types/cycle";
import { Menu } from "@/types/menu";
import menuData from "@/components/Header/menuData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch Cycles
  let cycles: Cycle[] = [];
  try {
    const req = await fetch("https://esursi-app.vercel.app/api/cycles", { next: { revalidate: 60 } });
    if (req.ok) {
      const res = await req.json();
      if (res.success) {
        cycles = res.cycles;
      }
    }
  } catch (error) {
    console.error("Failed to fetch cycles menu:", error);
  }

  // Construct Dynamic Menu
  // cycle item has id 10 in static menuData
  const dynamicMenu: Menu[] = menuData.map(item => {
    if (item.title === "Cycles") { // Identifying by title or ID as preferred
      return {
        ...item,
        submenu: cycles.map((cycle, idx) => ({
          id: 100 + idx, // Ensure unique IDs
          title: cycle.designation,
          newTab: false,
          path: `/programmes/${cycle._id}`,
        }))
      };
    }
    return item;
  });

  // If "Cycles" item doesn't exist in static menu, maybe we should add it? 
  // User had it in previous file. I reverted menuData to NOT have it dynamic but it has the placeholder id:10 ??
  // Wait, I reverted menuData to NOT have the dynamic logic, but I removed the Cycles item or kept it?
  // Let's check what I wrote to menuData.tsx in Step 293.
  // I removed the Cycles item (id 10). 
  // I need to ADD it back dynamically or rely on it being there.

  // Re-checking Step 293 content... I removed id:10.
  // So I should INSERT it.

  // Let's insert "Cycles" after "Acceuil" (id: 1).
  const fullMenuData = [
    ...menuData.slice(0, 1), // Acceuil
    {
      id: 10,
      title: "Cycles",
      newTab: false,
      submenu: cycles.map((cycle, idx) => ({
        id: 100 + idx,
        title: cycle.designation,
        newTab: false,
        path: `/programmes/${cycle._id}`,
      }))
    },
    ...menuData.slice(1) // Rest
  ];


  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <Proivder menuData={fullMenuData} cycles={cycles}>{children}</Proivder>
      </body>
    </html>
  );
}
