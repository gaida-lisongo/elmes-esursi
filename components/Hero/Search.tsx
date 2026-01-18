import { fetchEtabs } from "./actions";
import SearchClient from "./SearchClient";
import { IProvince, IEtablissement } from "./types";

const Search = async () => {
    const fetchProvinces = async () => {
        try {
            const req = await fetch("https://esursi-app.vercel.app/api/etablissements",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const res = await req.json();

            if (res?.success) {
                return res?.provinces;
            }

            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const provinces = await fetchProvinces() as IProvince[];

    return (
        <SearchClient provinces={provinces} fetchEtabs={fetchEtabs} />
    );
};

export default Search;
