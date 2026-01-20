"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { organisation } from "./data";
import OrganesModal from "./OrganesModal";

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="overflow-hidden px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
        <div className="mx-auto max-w-c-1390 rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-linear-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-15">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <div className="mb-4 inline-block rounded-full bg-white px-4.5 py-1.5 dark:bg-black">
                <span className="text-sectiontitle font-medium text-black dark:text-white uppercase tracking-widest">
                  Missions - {organisation.sigle}
                </span>
              </div>
              <h2 className="mb-6 w-11/12 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
                {organisation.mission}
              </h2>
              <p className="text-waterloo dark:text-manatee italic">
                "La vision d'un enseignement supérieur tourné vers l'excellence et l'innovation."
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                <div className="relative hidden xl:block">
                  <Image
                    width={299}
                    height={299}
                    src="/images/entete_esu.png"
                    alt="Shape"
                    className="animate-pulse"
                  />

                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-blackho dark:bg-white dark:text-black dark:hover:bg-alabaster shadow-solid-7"
                >
                  Découvrir les Organes
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}

      <OrganesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CTA;
