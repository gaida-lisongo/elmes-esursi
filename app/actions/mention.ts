"use server";

import { IEtablissement } from "@/components/Hero/types";

export interface Domaine {
    _id: string;
    designation: string;
    code: string;
    description?: string;
    mentions?: string[];
    cycle?: {
        _id: string;
        designation: string;
        code: string;
    };
    maquetteUrl?: string;
}

export interface DomainesResponse {
    success: boolean;
    domaines: Domaine[];
}

export interface Mention {
    _id: string;
    designation: string;
    etablissement: IEtablissement;
    domaine: Domaine;
}

export async function fetchDomaines(): Promise<{ success: boolean; domaines: Domaine[]; error?: string }> {
    try {
        const response = await fetch("https://esursi-app.vercel.app/api/domaine", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data: DomainesResponse = await response.json();

        if (data.success) {
            return { success: true, domaines: data.domaines };
        }

        return { success: false, domaines: [], error: "Échec de la récupération des domaines" };
    } catch (error) {
        console.error("Error fetching domaines:", error);
        return { success: false, domaines: [], error: "Erreur réseau" };
    }
}

export async function fetchMentions(critere: { key: string; value: string }): Promise<{ success: boolean; mentions: Mention[]; error?: string }> {
    try {
        const response = await fetch(`https://esursi-app.vercel.app/api/mentions?${critere.key}=${critere.value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data: { success: boolean; mentions: Mention[]; error?: string } = await response.json();

        if (data.success) {
            return data;
        }

        return { success: false, mentions: [], error: "Échec de la récupération des mentions" };
    } catch (error) {
        console.error("Error fetching mentions:", error);
        return { success: false, mentions: [], error: "Erreur réseau" };
    }
}

export async function createMention({
    etablissement,
    domaine,
    designation,
    token,
}: {
    etablissement: string;
    domaine: string;
    designation: string;
    token: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const response = await fetch("https://esursi-app.vercel.app/api/mentions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ etablissement, domaine, designation }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        }

        return { success: false, error: data.message || "Échec de la création" };
    } catch (error) {
        console.error("Error creating mention:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function updateMention({
    mentionId,
    designation,
    domaine,
    token,
}: {
    mentionId: string;
    designation: string;
    domaine?: string;
    token: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const payload: any = { designation };
        if (domaine) payload.domaine = domaine;

        const response = await fetch(`https://esursi-app.vercel.app/api/mentions/${mentionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: mentionId, designation, domaine }),
        });

        const data = await response.json();
        console.log("Error updating mention:", data);

        if (response.ok) {
            return { success: true, data };
        }

        return { success: false, error: data.message || "Échec de la mise à jour" };
    } catch (error) {
        console.error("Error updating mention:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function deleteMention({
    mentionId,
    token,
}: {
    mentionId: string;
    token: string;
}): Promise<{ success: boolean; error?: string }> {
    console.log("Deleting mention:", mentionId);
    try {
        const response = await fetch(`https://esursi-app.vercel.app/api/mentions`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: mentionId }),
        });

        console.log("Error deleting mention:", response);
        if (response.ok) {
            return { success: true };
        }


        const data = await response.json();
        return { success: false, error: data.message || "Échec de la suppression" };
    } catch (error) {
        console.error("Error deleting mention:", error);
        return { success: false, error: "Erreur réseau" };
    }
}
