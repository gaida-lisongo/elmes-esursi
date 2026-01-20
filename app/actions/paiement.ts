"use server";

export const createPaiement = async ({ amount, currency, phone }: { amount: string, currency: string, phone: string }) => {
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

export const checkPaiement = async ({ orderNumber }: { orderNumber: string }) => {
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