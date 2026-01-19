"use server";

export async function createFaculte({
    mentionId,
    designation,
    code,
    description,
    couverture,
    token,
}: {
    mentionId: string;
    designation: string;
    code: string;
    description: string[];
    couverture?: string;
    token: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const payload: any = { designation, code, description };
        if (couverture) payload.couverture = couverture;

        const response = await fetch(`https://esursi-app.vercel.app/api/mentions/${mentionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        }

        return { success: false, error: data.message || "Échec de la création de la faculté" };
    } catch (error) {
        console.error("Error creating faculte:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function updateFaculte({
    mentionId,
    faculteId,
    payload,
    token,
}: {
    mentionId: string;
    faculteId: string;
    payload: {
        designation?: string;
        code?: string;
        description?: string[];
        couverture?: string;
        filieres?: any[];
        actualites?: any[];
        equipe?: any[];
    };
    token: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
    console.log("Payload structure : ", payload);
    console.log("mentionId : ", mentionId);
    console.log("faculteId : ", faculteId);
    try {
        const response = await fetch(`https://esursi-app.vercel.app/api/mentions/${mentionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ faculteId, payload }),
        });

        const data = await response.json();
        console.log("Response from server : ", data);

        if (response.ok) {
            return { success: true, data };
        }

        return { success: false, error: data.message || "Échec de la mise à jour" };
    } catch (error) {
        console.error("Error updating faculte:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function deleteFaculte({
    mentionId,
    faculteId,
    token,
}: {
    mentionId: string;
    faculteId: string;
    token: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`https://esursi-app.vercel.app/api/mentions/${mentionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: faculteId }),
        });

        if (response.ok) {
            return { success: true };
        }

        const data = await response.json();
        return { success: false, error: data.message || "Échec de la suppression" };
    } catch (error) {
        console.error("Error deleting faculte:", error);
        return { success: false, error: "Erreur réseau" };
    }
}
