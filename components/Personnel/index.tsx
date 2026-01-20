"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../Common/SectionHeader";
import Image from "next/image";

interface PersonnelData {
    grade: string;
    count: number;
}

const Personnel = ({ stats }: { stats: PersonnelData[] }) => {
    return (
        <section className="py-20 lg:py-25 xl:py-30 overflow-hidden relative">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                <SectionHeader
                    headerInfo={{
                        title: "CORPS PROFESSORAL",
                        subtitle: "Notre Excellence Académique",
                        description: "Découvrez la répartition de notre élite intellectuelle. Une équipe dédiée à la formation de la future génération de leaders et d'innovateurs.",
                    }}
                />
            </div>

            <div className="relative mt-15 min-h-[600px] w-full max-w-c-1154 mx-auto px-4 md:px-8 xl:mt-20 xl:px-0">
                {/* Background shapes */}
                <div className="absolute inset-0 -z-1 opacity-20">
                    <Image
                        fill
                        src="/images/shape/shape-dotted-light.svg"
                        alt="Dotted"
                        className="dark:hidden object-cover"
                    />
                    <Image
                        fill
                        src="/images/shape/shape-dotted-dark.svg"
                        alt="Dotted"
                        className="hidden dark:block object-cover"
                    />
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-10">
                    {stats?.map((item, index) => {
                        // More dynamic floating for a larger space
                        const duration = 10 + (index % 7) * 2;
                        const xRange = 20 + (index % 5) * 10;
                        const yRange = 30 + (index % 4) * 15;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                animate={{
                                    y: [0, -yRange, yRange / 2, -yRange / 1.5, yRange, 0],
                                    x: [0, xRange, -xRange / 1.5, xRange / 2, -xRange, 0],
                                }}
                                transition={{
                                    duration: duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative group shrink-0"
                            >
                                {/* Compact Halo */}
                                <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

                                <div className="relative flex items-center gap-3 rounded-xl bg-white/90 p-3 shadow-solid-10 dark:bg-btndark/90 border border-stroke dark:border-strokedark transition-all duration-300 hover:border-primary/40 hover:shadow-solid-4 min-w-[140px] backdrop-blur-md">
                                    {/* Small Icon Container */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>

                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-black text-black dark:text-white leading-none">
                                            {item.count}
                                        </h4>
                                        <p className="text-[9px] text-waterloo uppercase tracking-wider font-bold mt-1 leading-tight line-clamp-1">
                                            {item.grade}
                                        </p>
                                    </div>

                                    {/* Accent dot */}
                                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary/30 scale-0 group-hover:scale-100 transition-transform" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Personnel;
