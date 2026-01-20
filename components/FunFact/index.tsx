"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";

const Counter = ({ value }: { value: number }) => {
  const springConfig = { stiffness: 40, damping: 20, restDelta: 0.001 };
  const spring = useSpring(0, springConfig);
  const displayValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
};

const FunFact = ({ stats }: { stats: { totalEtab: number; totalAgent: number; totalEtudiant: number; } | null }) => {

  return (
    <>
      {/* <!-- ===== Funfact Start ===== --> */}
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
        <div className="relative z-1 mx-auto max-w-c-1390 rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] py-15 dark:bg-blacksection dark:bg-linear-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-20 overflow-visible">

          {/* Logo positioning: Centered on mobile, left on larger screens */}
          <div className="absolute -top-15 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 -z-1">
            <div className="relative w-30 h-30 md:w-40 md:h-40">
              <Image
                fill
                src="/images/logo_news.png"
                alt="ESURSI Logo"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <Image
            width={132}
            height={132}
            src="/images/shape/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1 opacity-20"
          />

          <Image
            fill
            src="/images/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 hidden dark:block"
          />

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
              L'Enseignement Supérieur en Chiffres
            </h2>
            <p className="mx-auto lg:w-11/12 text-waterloo dark:text-manatee">
              ESURSI-APP agrège les données essentielles pour offrir une vision panoramique de l'enseignement supérieur en RDC.
              Une transparence totale pour un système éducatif de confiance.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-10 lg:gap-32">
            {/* Etablissements */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-4xl font-extrabold text-primary dark:text-white xl:text-itemtitle">
                <Counter value={stats?.totalEtab || 0} />
              </h3>
              <p className="text-sm font-medium uppercase tracking-widest text-waterloo">Établissements</p>
            </motion.div>

            {/* Agents */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-4xl font-extrabold text-primary dark:text-white xl:text-itemtitle">
                <Counter value={stats?.totalAgent || 0} />
              </h3>
              <p className="text-sm font-medium uppercase tracking-widest text-waterloo">Personnels</p>
            </motion.div>

            {/* Etudiants */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-4xl font-extrabold text-primary dark:text-white xl:text-itemtitle">
                <Counter value={stats?.totalEtudiant || 0} />
              </h3>
              <p className="text-sm font-medium uppercase tracking-widest text-waterloo">Étudiants Enregistrés</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== --> */}
    </>
  );
};

export default FunFact;
