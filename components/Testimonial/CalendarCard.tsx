"use client";
import React from "react";
import Image from "next/image";
import { calendar } from "@/types/annee";

const CalendarCard = ({ item, onOpen }: { item: calendar; onOpen: () => void }) => {
    return (
        <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none h-full flex flex-col">
            <div className="mb-7.5 flex justify-between items-start border-b border-stroke pb-6 dark:border-strokedark">
                <div>
                    <h3 className="mb-1.5 text-metatitle3 font-semibold text-black dark:text-white">
                        {item.titre}
                    </h3>
                    <p className="text-sm">Activités du mois</p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen();
                        }}
                        className="swiper-no-swiping mt-4 inline-flex items-center gap-2.5 text-primary hover:text-primaryho dark:text-primary dark:hover:text-primaryho transition-colors font-medium cursor-pointer relative z-20"
                    >
                        Voir les activités
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>
                <div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
                    <Image
                        width={60}
                        height={50}
                        src="/images/logo_news.png"
                        alt="Logo"
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <p className="text-xl font-medium text-black dark:text-white">
                    {item.activites.length} Activité{item.activites.length > 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
};

export default CalendarCard;
