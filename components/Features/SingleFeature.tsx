"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Domaine } from "@/app/actions/mention";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Domaine }) => {
  const { designation, description, code, mentions, cycle, _id, maquetteUrl } = feature;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onClick={() => setIsOpen(true)}
        className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5 cursor-pointer group"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary group-hover:scale-110 transition-transform">
          <span className="text-white font-bold text-sm block px-2 text-center uppercase">{code}</span>
        </div>
        <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle line-clamp-1 border-b border-stroke dark:border-strokedark pb-4">
          {designation}
        </h3>
        <p className="line-clamp-3 text-sm text-waterloo dark:text-manatee">{description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {cycle?.designation || 'Cycle unique'}
          </span>
          <span className="text-xs text-waterloo">
            {mentions?.length || 0} Mentions
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-blacksection rounded-3xl overflow-hidden shadow-solid-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-48 w-full">
                <Image
                  src="/images/background.jpeg"
                  alt={designation}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-8 flex flex-col gap-2">
                  <span className="bg-primary px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest w-fit">
                    {code}
                  </span>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {designation}
                  </h2>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-alabaster dark:bg-black rounded-lg border border-stroke dark:border-strokedark">
                    <span className="text-xs text-waterloo uppercase">Cycle</span>
                    <span className="text-sm font-bold text-black dark:text-white lowercase">{cycle?.designation || 'LMD'}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-alabaster dark:bg-black rounded-lg border border-stroke dark:border-strokedark">
                    <span className="text-xs text-waterloo uppercase">Nombre de Mentions</span>
                    <span className="text-sm font-bold text-black dark:text-white lowercase">{mentions?.length || 0}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-black dark:text-white">Présentation du Domaine</h4>
                  <p className="text-waterloo dark:text-manatee leading-relaxed">
                    {description || "Aucune description disponible pour ce domaine d'étude."}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  {maquetteUrl && (
                    <Link
                      href={maquetteUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryho transition-all"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      Consulter la Maquette
                    </Link>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-6 py-3 bg- alabaster dark:bg-black text-black dark:text-white border border-stroke dark:border-strokedark rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-hoverdark transition-all"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SingleFeature;
