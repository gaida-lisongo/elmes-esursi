import Image from "next/image";
import SidebarLink from "@/components/Docs/SidebarLink";
import { IEtablissementWithMentions } from "./EtablissementDetails";

interface EtabSidebarProps {
    etablissement: IEtablissementWithMentions;
    currentMentionId: string;
    onMentionSelect: (id: string) => void;
}

const EtabSidebar = ({ etablissement, currentMentionId, onMentionSelect }: EtabSidebarProps) => {
    return (
        <div className="sticky top-[74px] flex flex-col gap-8">
            {/* Establishment Info Card */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection text-center">
                <div className="mb-4 flex items-center justify-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-strokedark">
                        {etablissement.photo && etablissement.photo[0] ? (
                            <Image src={etablissement.photo[0]} alt={etablissement.sigle || "Logo"} fill className="object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-white">
                                {etablissement.sigle?.slice(0, 2) || "??"}
                            </div>
                        )}
                    </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-black dark:text-white">
                    {etablissement.designation}
                </h3>
                <p className="text-sm font-medium text-primary">{etablissement.sigle || ""}</p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="inline-block rounded bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {etablissement.province?.designation}
                    </span>
                </div>
            </div>

            {/* Mentions List */}
            <div className="rounded-lg border border-stroke bg-white p-4 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">Mentions</h4>
                {etablissement.mentions && etablissement.mentions.length > 0 ? (
                    <SidebarLink
                        data={etablissement.mentions.map(m => ({
                            title: m.designation,
                            id: m._id,
                            isCurrent: m._id === currentMentionId,
                            onClick: () => onMentionSelect(m._id)
                        }))}
                    />
                ) : (
                    <p className="text-sm text-body-color">Aucune mention disponible.</p>
                )}
            </div>

            {/* COGE Card */}
            {etablissement.coge && etablissement.coge.length > 0 && (
                <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                    <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">Comité de Gestion</h4>
                    <div className="flex flex-col gap-4">
                        {etablissement.coge.slice(0, 4).map((membre, idx) => (
                            <div key={idx} className="flex flex-col gap-3 border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                        {membre.agent?.photo ? (
                                            <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                                                {membre.agent?.nom?.[0] || "?"}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-black dark:text-white line-clamp-1">{membre.agent?.prenom} {membre.agent?.nom}</p>
                                        <p className="text-xs text-body-color">{membre.fonction}</p>
                                    </div>
                                </div>
                                <button className="w-full rounded-md bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                    Se connecter
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EtabSidebar;
