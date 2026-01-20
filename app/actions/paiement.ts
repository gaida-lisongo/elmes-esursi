"use server";

import { Parcours } from "@/types/paiement";

export const createPaiement = async ({ amount, currency, phone }: { amount: string, currency: string, phone: string }): Promise<{ success: boolean, orderNumber: string | null }> => {
    try {
        //Generate UUID 5 digits
        const reference = Math.floor(10000 + Math.random() * 90000).toString();

        const req = await fetch("https://server.elmes-solution.site/api/v1/flexpay/deposit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                currency,
                phone,
                reference: "MOBILE_" + reference,
                recetteId: "696e86624c85a5027ebd81a6"
            })
        });

        const res = await req.json();

        if (res.success) {
            const { orderNumber } = res.data;
            return { success: true, orderNumber };
        }

        return { success: false, orderNumber: null }
    } catch (error) {
        console.error("Error occured when creating paiement : ", error);
        return { success: false, orderNumber: null }
    }
}

export const checkPaiement = async ({ orderNumber }: { orderNumber: string }): Promise<{ success: boolean, check: boolean }> => {
    try {
        const req = await fetch(`https://server.elmes-solution.site/api/v1/flexpay/check/${orderNumber}`);
        const res = await req.json();
        if (res.success) {
            const { status } = res.data;
            return { success: true, check: status == "0" };
        }
        return { success: false, check: false }
    } catch (error) {
        console.error("Error occured when checking paiement : ", error)
        return { success: false, check: false }
    }
}

export const createParcours = async (payload: {
    programme: string,
    annee: string,
    etablissement: string,
    etudiant: string
}): Promise<{ success: boolean, data: Parcours | null }> => {
    try {
        const req = await fetch(`https://esursi-app.vercel.app/api/etudiants/${payload.etudiant}/parcours`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        const res = await req.json();
        if (res.success) return res;

        return { success: false, data: null }
    } catch (error) {
        console.error("Error occured when creating parcours : ", error)
        return { success: false, data: null }
    }
}

export const savePaiement = async (payload: { etudiant: string, parcours: string, status: string }): Promise<{ success: boolean, data: Parcours | null }> => {
    try {
        const req = await fetch(`https://esursi-app.vercel.app/api/etudiants/${payload.etudiant}/parcours`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...payload,
                tranche: "69691d2d72bc52e1358d5131"
            })
        });
        const res = await req.json();
        if (res.success) return res;

        return { success: false, data: null }
    } catch (error) {
        console.error("Error occured when saving paiement : ", error)
        return { success: false, data: null }
    }
}