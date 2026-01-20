"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { historyData, Story } from "./historyData";
import SectionHeader from "../Common/SectionHeader";

const SingleHistory = ({ story, index }: { story: Story; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative mb-12 flex flex-col items-center justify-between md:mb-20 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Connector Line for Desktop */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-stroke dark:bg-strokedark md:block"></div>

            {/* Circle Icon */}
            <div className="absolute left-1/2 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-solid-5 md:top-10">
                <span className="text-xs font-bold">{index + 1}</span>
            </div>

            {/* Image Section */}
            <div className="w-full px-4 md:w-5/12">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-stroke bg-white p-2 dark:border-strokedark dark:bg-blacksection">
                    <Image
                        src={story.image}
                        alt={story.event}
                        fill
                        className="rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className={`mt-8 w-full px-4 md:mt-0 md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}>
                <div className="inline-block rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection mb-4">
                    <span className="text-sectiontitle font-medium text-black dark:text-white">
                        {story.periode}
                    </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white xl:text-itemtitle2">
                    {story.event}
                </h3>

                <div className="space-y-6">
                    {story.faits.map((fait) => (
                        <div key={fait._id} className="relative">
                            <h4 className="text-lg font-semibold text-primary mb-1">{fait.title}</h4>
                            <p className="text-sm font-medium text-waterloo mb-2 italic">{fait.time}</p>
                            <ul className={`list-none space-y-2 ${isEven ? "" : "md:flex md:flex-col md:items-end"}`}>
                                {fait.description.map((desc, i) => (
                                    <li key={i} className="text-base text-waterloo dark:text-manatee relative pl-5">
                                        <span className={`absolute top-2.5 h-1.5 w-1.5 rounded-full bg-primary ${isEven ? "left-0" : "md:right-[-1.25rem] left-0"}`}></span>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const History = () => {
    return (
        <section id="history" className="py-20 lg:py-25 xl:py-30">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                <SectionHeader
                    headerInfo={{
                        title: "NOTRE HISTOIRE",
                        subtitle: "De Lovanium à l'ESURSI : Un Héritage d'Excellence",
                        description: "Parcourez les grandes étapes qui ont façonné l'enseignement supérieur en République Démocratique du Congo, depuis la fondation de la première université jusqu'à la révolution numérique actuelle.",
                    }}
                />

                <div className="relative mt-15 md:mt-20">
                    {historyData.map((story, key) => (
                        <SingleHistory key={story._id} story={story} index={key} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default History;
