import Image from "next/image";
import { Faculte } from "@/types/cycle";
import SectionHeader from "@/components/Common/SectionHeader";

const TeamFaculte = ({ faculte }: { faculte: Faculte }) => {
    return (
        <section className="mb-20">
            <div className="mb-10">
                <SectionHeader
                    headerInfo={{
                        title: "ÉQUIPE",
                        subtitle: "Notre Équipe",
                        description: "Rencontrez les membres de notre équipe dévouée."
                    }}
                />
            </div>

            {faculte.equipe && faculte.equipe.length > 0 ? (
                <div className="rounded-lg border border-stroke bg-white p-8 shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {faculte.equipe.map((membre, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 text-center">
                                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200 ring-2 ring-primary ring-offset-2 dark:ring-offset-blacksection">
                                    {membre.agent?.photo ? (
                                        <Image src={membre.agent.photo} fill className="object-cover" alt="User" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                                            {membre.agent?.nom?.[0] || "?"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-black dark:text-white">
                                        {membre.agent?.prenom} {membre.agent?.nom}
                                    </h4>
                                    <span className="text-sm text-primary font-medium">{membre.fonction}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center italic text-body-color dark:text-body-color-dark">
                    Aucun membre d'équipe listé pour le moment.
                </div>
            )}
        </section>
    );
};

export default TeamFaculte;
