import { Programme } from "@/types/cycle";
import Link from "next/link";

type SideBarLinkProps = {
  data: {
    title: string;
    id: string;
    onClick: () => void;
    isCurrent: boolean;
  }[];
  currentProgramme?: Programme;
}

const SidebarLink = ({ data, currentProgramme }: SideBarLinkProps) => {
  return (
    <div className="flex flex-col gap-8">
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="block">
            <button
              onClick={item.onClick}
              className={`group relative flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium transition-all duration-300 ease-in-out ${item.isCurrent
                ? "bg-transparent text-primary dark:text-primary"
                : "text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-white"
                }`}
            >
              {item.title}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-in-out ${item.isCurrent ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </button>
          </li>
        ))}
      </ul>

      {currentProgramme && (
        <div className="animate-fade-in-up rounded-lg border border-stroke bg-gray-50 p-6 shadow-solid-2 dark:border-strokedark dark:bg-white/5">
          <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
            A propos du programme
          </h3>
          <h4 className="mb-2 text-base font-semibold text-primary">
            {currentProgramme.designation}
          </h4>
          <span className="mb-4 inline-block rounded bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Code: {currentProgramme.code}
          </span>
          <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
            {currentProgramme.description}
          </p>
          <div className="flex flex-col gap-2 border-t border-stroke pt-4 dark:border-strokedark">
            <div className="flex justify-between text-sm">
              <span className="text-body-color dark:text-body-color-dark">Crédits:</span>
              <span className="font-semibold text-black dark:text-white">{currentProgramme.credits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-body-color dark:text-body-color-dark">Cycle:</span>
              <span className="font-semibold text-black dark:text-white">{currentProgramme.cycle.designation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
