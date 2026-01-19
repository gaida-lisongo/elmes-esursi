import Image from "next/image";
import { IEtablissementWithMentions } from "./EtablissementDetails";

interface EtabHeaderProps {
    etablissement: IEtablissementWithMentions;
    currentMentionId: string;
    onMentionSelect: (id: string) => void;
}

const EtabHeader = ({ etablissement, currentMentionId, onMentionSelect }: EtabHeaderProps) => {
    const backgroundImage = etablissement.photo && etablissement.photo[0]
        ? etablissement.photo[0]
        : "/images/background.jpeg";

    // Use photo[1] if available, otherwise fallback to logo_news.png
    const logoImage = etablissement.photo && etablissement.photo.length > 1 && etablissement.photo[1]
        ? etablissement.photo[1]
        : "/images/logo_news.png";

    return (
        <div className="relative mb-8 bg-white pb-0 dark:bg-blacksection shadow-solid-4">
            {/* Cover Image */}
            <div className="relative h-[200px] w-full overflow-hidden md:h-[350px]">
                <Image
                    src={backgroundImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Profile/Info Section */}
            <div className="container mx-auto px-4">
                <div className="relative -mt-16 flex flex-col items-center pb-4 md:-mt-20 md:flex-row md:items-end md:gap-6">
                    {/* Logo */}
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg dark:border-blacksection md:h-40 md:w-40">
                        <Image
                            src={logoImage}
                            alt={etablissement.sigle || "Logo"}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Text Info */}
                    <div className="mt-4 flex flex-1 flex-col items-center text-center md:items-start md:text-left md:mb-4">
                        <h1 className="text-2xl font-bold text-black dark:text-white md:text-3xl">
                            {etablissement.designation}
                        </h1>
                        <p className="mt-1 text-base font-medium text-black/70 dark:text-white/70">
                            {etablissement.sigle}
                            {etablissement.province?.designation && (
                                <>
                                    <span className="mx-2">•</span>
                                    {etablissement.province.designation}
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="mt-6 border-t border-stroke py-0 dark:border-strokedark scrollbar-hide overflow-x-auto">
                    <div className="flex gap-6 min-w-max px-2">
                        {etablissement.mentions?.map((mention) => (
                            <button
                                key={mention._id}
                                onClick={() => onMentionSelect(mention._id)}
                                className={`relative py-4 text-base font-medium transition-colors hover:text-primary ${currentMentionId === mention._id
                                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-sm after:bg-primary"
                                        : "text-body-color dark:text-body-color-dark"
                                    }`}
                            >
                                {mention.designation}
                            </button>
                        ))}
                        {(!etablissement.mentions || etablissement.mentions.length === 0) && (
                            <span className="py-4 text-sm text-gray-500">Aucune mention disponible</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EtabHeader;
