import Programmes from "@/components/Docs/Programmes";
import SidebarLink from "@/components/Docs/SidebarLink";
import { Domaine, Programme } from "@/types/cycle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Docs Page - Solid SaaS Boilerplate",

    // other metadata
    description: "This is Docs page for Solid Pro"
};

export default async function CyclePage(props: { params: Promise<{ cycleI: string }> }) {
    const params = await props.params;
    const { cycleI } = params;

    console.log("Cycle ID:", cycleI);
    // const fetchDomaines = async () => {
    //     const cycleId = data.find((item) => item._id === currentTab)?.cycle._id;

    //     const res = await fetch(`https://esursi-app.vercel.app/api/domaine?cycle=${cycleId}`);
    //     const domainesData = await res.json();
    //     console.log("Domaines founds", domainesData);
    //     setDomaines(domainesData);
    // };


    const req = await fetch(`https://esursi-app.vercel.app/api/cycles?id=${cycleI}`);
    const res = await req.json();
    let data: Programme[] = [];

    if (res?.success) {
        data = res.programmes;
    } else {
        return (<div>
            <p>Aucun programme trouvé</p>
        </div>)
    }

    const reqDomaines = await fetch(`https://esursi-app.vercel.app/api/domaine?cycle=${cycleI}`);
    const resDomaines = await reqDomaines.json();
    let domaines: Domaine[] = [];

    if (resDomaines?.success) {
        domaines = resDomaines.domaines;
        console.log("Domaines founds", domaines);
    } else {
        return (<div>
            <p>Aucun domaine trouvé</p>
        </div>)
    }

    return (
        <>
            <Programmes data={data} domaines={domaines} />
        </>
    );
}
