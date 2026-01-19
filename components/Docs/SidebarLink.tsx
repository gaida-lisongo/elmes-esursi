"use client";
import Link from "next/link";

type SideBarLinkProps = {
  data: {
    title: string;
    id: string;
    onClick: () => void;
    isCurrent: boolean;
  }[]
}

const SidebarLink = ({ data }: SideBarLinkProps) => {
  return (
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
  );
};

export default SidebarLink;
