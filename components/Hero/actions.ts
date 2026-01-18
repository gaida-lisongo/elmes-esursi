"use server";

export const fetchEtabs = async ({ critere, value }: { critere: string, value: string }) => {
    try {
        const makeUrl = (critere: string, value: string) => {
            switch (critere) {
                case "province":
                    return `https://esursi-app.vercel.app/api/etablissements?province=${value}`;
                case "term":
                    return `https://esursi-app.vercel.app/api/etablissements?term=${value}`;
                case "nref":
                    return `https://esursi-app.vercel.app/api/etablissements?nref=${value}`;
                default:
                    return `https://esursi-app.vercel.app/api/etablissements`;
            }
        };
        const url = makeUrl(critere, value);
        const req = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await req.json();

        if (res?.success) {
            return res?.etablissements;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
