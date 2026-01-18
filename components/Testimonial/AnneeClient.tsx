"use client";
import React, { useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import CalendarCard from "./CalendarCard";
import { annee, calendar } from "@/types/annee";

const AnneeClient = ({ annee }: { annee: annee }) => {
    const [selectedCalendar, setSelectedCalendar] = useState<calendar | null>(null);

    if (!annee) return null;

    return (
        <section className="py-20 lg:py-25 xl:py-30">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                {/* <!-- Section Title Start --> */}
                <div className="animate_top mx-auto text-center">
                    <SectionHeader
                        headerInfo={{
                            title: "ANNÉE ACADÉMIQUE",
                            subtitle: `${annee.debut} - ${annee.fin}`,
                            description: annee.description,
                        }}
                    />
                </div>
                {/* <!-- Section Title End --> */}
            </div>

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
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-20 xl:px-0"
            >
                {/* <!-- Slider main container --> */}
                <div className="swiper testimonial-01 mb-20 pb-22.5">
                    {/* <!-- Additional required wrapper --> */}
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={2}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        breakpoints={{
                            // when window width is >= 640px
                            0: {
                                slidesPerView: 1,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {annee.calendrier && annee.calendrier.length > 0 ? (
                            annee.calendrier.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <CalendarCard item={item} onOpen={() => setSelectedCalendar(item)} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 w-full col-span-full">
                                Aucun calendrier disponible pour le moment.
                            </div>
                        )}
                    </Swiper>
                </div>
            </motion.div>

            {/* Global Activity Modal */}
            <AnimatePresence>
                {selectedCalendar && (
                    <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl shadow-2xl border border-stroke dark:border-strokedark"
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-stroke dark:border-strokedark flex justify-between items-center bg-white dark:bg-black rounded-t-xl">
                                <div>
                                    <h3 className="text-xl font-bold text-black dark:text-white">{selectedCalendar.titre}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Détails des activités</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCalendar(null)}
                                    className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-meta-4"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto bg-gray-50 dark:bg-black custom-scrollbar rounded-b-xl">
                                {selectedCalendar.activites.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedCalendar.activites.map((activite) => (
                                            <div key={activite._id} className="p-4 bg-white dark:bg-transparent border border-stroke dark:border-strokedark rounded-lg hover:shadow-md transition-shadow">
                                                <h4 className="text-md font-bold text-black dark:text-white mb-2">
                                                    {activite.designation}
                                                </h4>
                                                {activite.description && activite.description.length > 0 && (
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {activite.description.map((desc, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                                                                {desc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400">Aucune activité prévue pour ce mois.</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AnneeClient;
