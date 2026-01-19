"use server";

import { Agent } from "@/types/user";

export async function fetchAgents(): Promise<{ success: boolean; agents: Agent[]; error?: string }> {
    try {
        const response = await fetch("https://esursi-app.vercel.app/api/agents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, agents: data.agents };
        }

        return { success: false, agents: [], error: data.message || "Échec de la récupération des agents" };
    } catch (error) {
        console.error("Error fetching agents:", error);
        return { success: false, agents: [], error: "Erreur réseau" };
    }
}
