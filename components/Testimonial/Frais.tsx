"use client";
import { Frais } from "@/types/annee";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import FeaturesTabItem from "../FeaturesTab/FeaturesTabItem";
import QuotaFAQItem from "./QuotaFAQItem";


const renderTabs = (number: number, frais: Frais, currentTab: string, setCurrentTab: (tab: string) => void) => {
    return (
        <div
            onClick={() => setCurrentTab(frais._id)}
            className={`relative flex w-full cursor-pointer items-center gap-4 border-b border-stroke px-6 py-2 last:border-0 dark:border-strokedark md:w-auto md:border-0 xl:px-13.5 xl:py-5 ${currentTab === frais._id
                ? "active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-primary"
                : ""
                }`}
        >
            <div className="flex h-12.5 w-12.5 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                <p className="text-metatitle3 font-medium text-black dark:text-white">
                    {number}
                </p>
            </div>
            <div className="md:w-3/5 lg:w-auto">
                <button className="text-sm font-medium text-black dark:text-white xl:text-regular">
                    {frais.designation}
                </button>
            </div>
        </div>
    );
};

const FraisClient = ({ data }: { data: Frais[] }) => {
    const [currentTab, setCurrentTab] = useState(data[0]._id);
    const [activeFaq, setActiveFaq] = useState<string>("");

    const handleFaqToggle = (id: string) => {
        activeFaq === id ? setActiveFaq("") : setActiveFaq(id);
    };

    return (
        <div>
            <section className="relative pb-20 pt-10 lg:pb-22.5">
                <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <div className="absolute -top-16 -z-1 mx-auto h-[350px] w-[90%]">
                        <Image
                            fill
                            className="dark:hidden"
                            src="/images/shape/shape-dotted-light.svg"
                            alt="Dotted Shape"
                        />
                        <Image
                            fill
                            className="hidden dark:block"
                            src="/images/shape/shape-dotted-dark.svg"
                            alt="Dotted Shape"
                        />
                    </div>
                    {/* <!-- Tab Menues Start --> */}
                    <motion.div
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: -20,
                            },

                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="animate_top mb-15 flex flex-wrap justify-center rounded-[10px] border border-stroke bg-white shadow-solid-5 dark:border-strokedark dark:bg-blacksection dark:shadow-solid-6 md:flex-nowrap md:items-center lg:gap-7.5 xl:mb-21.5 xl:gap-12.5"
                    >
                        {
                            data.map((frais, index) => renderTabs(index + 1, frais, currentTab, setCurrentTab))
                        }
                    </motion.div>
                    {/* <!-- Tab Content End --> */}
                    {/* <!-- Tab Content Start --> */}
                    <motion.div
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: -20,
                            },

                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="animate_top mx-auto max-w-c-1154"
                    >
                        {data.map((frais, key) => (
                            <div
                                className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${frais._id === currentTab ? "block" : "hidden"}`}
                                key={key}
                            >
                                {/* Background Image & Overlay */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/images/bg-1.jpeg"
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-white/95 dark:bg-black/90"></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 lg:gap-19">
                                    <div className="md:w-1/2">
                                        <span className="font-medium uppercase text-black dark:text-white">
                                            {frais?.designation}
                                        </span>
                                        <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">

                                            <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                                                {frais?.montant}
                                            </span>{" "}$
                                        </h2>

                                        {/* Description of the Fee itself if available */}
                                        {frais.description && frais.description.length > 0 && (
                                            <ul className="list-disc pl-5 mt-4 space-y-2 mb-8">
                                                {frais.description.map((desc, idx) => (
                                                    <li key={idx} className="text-body dark:text-gray-300">
                                                        {desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Right Side - Accordion for Repartition */}
                                    <div className="md:w-1/2 w-full">
                                        <div className="rounded-lg bg-white/50 backdrop-blur-sm shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection/80">
                                            {frais.repartition && frais.repartition.length > 0 ? (
                                                frais.repartition.map((quota, qKey) => (
                                                    <QuotaFAQItem
                                                        key={qKey}
                                                        faqData={{
                                                            activeFaq,
                                                            id: quota._id,
                                                            handleFaqToggle,
                                                            quota
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <div className="p-6 text-center text-gray-500">
                                                    Aucune répartition disponible.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FraisClient;
