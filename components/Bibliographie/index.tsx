"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { bibliographieData } from "./bibliographieData";

const Bibliographie = () => {
    const { title, image, facts } = bibliographieData;

    return (
        <section className="py-20 lg:py-25 xl:py-30 overflow-hidden">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-15 xl:gap-20">

                    {/* Left Section: Photo & Title */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 1, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative z-1 mb-8 max-w-[500px] mx-auto lg:mx-0">
                            {/* Decorative Background for Image */}
                            <div className="absolute -left-4 -top-4 -z-1 h-full w-full rounded-2xl bg-primary/10 transition-all duration-300"></div>
                            <div className="absolute -right-4 -bottom-4 -z-1 h-full w-full rounded-2xl border-2 border-primary/20 transition-all duration-300 group-hover:-right-6 group-hover:-bottom-6"></div>

                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-solid-8">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl leading-tight">
                                        {title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Section: Carousel for Career Path */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 1, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="mb-10 lg:mb-15">
                            <div className="mb-4 inline-block rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
                                <span className="text-sectiontitle font-medium text-black dark:text-white uppercase tracking-widest">
                                    Portrait & Parcours
                                </span>
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3 leading-tight">
                                Une Expertise Scientifique au Service de l'État
                            </h2>
                            <p className="text-base text-waterloo dark:text-manatee">
                                Découvrez le parcours exceptionnel de S.E. Prof. Dr. Marie-Thérèse Sombo Ayanne Safi Mukuna, une figure de proue de la neuroscience congolaise aujourd'hui à la tête de l'ESURSI.
                            </p>
                        </div>

                        <div className="relative rounded-3xl bg-white p-8 shadow-solid-8 dark:bg-blacksection dark:border dark:border-strokedark md:p-12">
                            {/* Decorative shape */}
                            <div className="absolute -right-5 -top-5 -z-1 hidden xl:block">
                                <Image
                                    src="/images/shape/shape-06.png"
                                    alt="Shape"
                                    width={132}
                                    height={129}
                                />
                            </div>

                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                effect={"fade"}
                                fadeEffect={{ crossFade: true }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[Autoplay, Pagination, EffectFade]}
                                className="bibliographie-swiper"
                            >
                                {facts.map((fact) => (
                                    <SwiperSlide key={fact._id}>
                                        <div className="pb-10">
                                            <div className="mb-6 flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M22 10v6M2 10v6M12 4a8 8 0 0 1 8 8v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4a8 8 0 0 1 8-8z" />
                                                        <path d="M12 11v4M8 15h8" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-black dark:text-white leading-none">
                                                        {fact.titre}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-primary font-medium italic">
                                                        {fact.subTitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <ul className="space-y-4">
                                                {fact.description.map((desc, i) => (
                                                    <li key={i} className="flex gap-4">
                                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/40"></span>
                                                        <p className="text-base text-waterloo dark:text-manatee leading-relaxed">
                                                            {desc}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Swiper Custom Styles */}
            <style jsx global>{`
                .bibliographie-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                }
                .bibliographie-swiper .swiper-pagination-bullet-active {
                    background: #3c50e0;
                    width: 20px;
                    border-radius: 4px;
                }
                .dark .bibliographie-swiper .swiper-pagination-bullet {
                    background: #475569;
                }
                .dark .bibliographie-swiper .swiper-pagination-bullet-active {
                    background: #3c50e0;
                }
            `}</style>
        </section>
    );
};

export default Bibliographie;
