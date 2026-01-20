"use server";

import { Etudiant, Dossier } from "@/types/user";

const BASE_URL = "https://esursi-app.vercel.app/api";

export async function createEtudiant(payload: Partial<Etudiant>) {
    try {
        const response = await fetch(`${BASE_URL}/etudiants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data.data, message: data.message };
        }

        return { success: false, error: data.message || "Échec de la création de l'étudiant" };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function createDossier(studentId: string, payload: any) {
    try {
        const response = await fetch(`${BASE_URL}/etudiants/${studentId}/dossier`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data.data, message: data.message };
        }

        return { success: false, error: data.message || "Échec de la création du dossier" };
    } catch (error) {
        console.error("Error creating dossier:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function fetchEtudiantByMatricule(matricule: string) {
    try {
        const response = await fetch(`${BASE_URL}/etudiants?matricule=${encodeURIComponent(matricule)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data.data, message: data.message };
        }

        return { success: false, error: data.message || "Étudiant non trouvé" };
    } catch (error) {
        console.error("Error fetching student:", error);
        return { success: false, error: "Erreur réseau" };
    }
}
