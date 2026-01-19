'use server'

import { cookies } from "next/headers";

interface LoginParams {
    agentId: string;
    secureKey: string;
    role: string;
    etabId: string;
}

export async function authenticateModerator({ agentId, secureKey, role, etabId }: LoginParams) {
    try {
        const req = await fetch(`https://esursi-app.vercel.app/api/etablissements/${etabId}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agentId,
                secureKey,
                role,
            }),
        });

        const res = await req.json();

        if (res.success) {
            const { token, etablissement } = res;

            // In a Server Action, we can set cookies, but we cannot access localStorage directly.
            // The user asked to persist in localStorage via Moderator login method, but if we move logic here, 
            // we should return the data so the client can handle localStorage, OR we set httpOnly cookies here.
            // Given the user instruction "ramener l'auth en server action que Moderator va consommer... pour persister en localhost",
            // the Moderator class (client-side) will call this Server Action, get the data, and THEN persist to localStorage.

            return {
                success: true,
                data: {
                    token,
                    etabId: etablissement._id,
                    role,
                    agentId
                }
            };
        }

        return { success: false, error: "Authentication failed" };
    } catch (error) {
        console.error("Failed to authenticate:", error);
        return { success: false, error: "Network or server error" };
    }
}
