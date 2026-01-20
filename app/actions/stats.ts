"use server";

export async function fetchStatsEsursi(): Promise<{
    totalEtab: number;
    totalAgent: number;
    totalEtudiant: number;
} | null> {
    try {
        const req = await fetch("https://esursi-app.vercel.app/api/stats");
        const res = await req.json();

        if (res?.success) return res.data;
        return null;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
    }
}