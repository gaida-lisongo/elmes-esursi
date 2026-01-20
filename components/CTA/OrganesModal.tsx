"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { organisation, Structure } from "./data";

interface OrganesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrganesModal = ({ isOpen, onClose }: OrganesModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-white dark:bg-blacksection rounded-3xl overflow-hidden shadow-solid-8 max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-white dark:bg-blacksection border-b border-stroke dark:border-strokedark p-6 md:p-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-black dark:text-white uppercase tracking-tight">
                                    Organes du Ministère
                                </h2>
                                <p className="text-sm text-waterloo mt-1">Structure organisationnelle de l'ESURSI</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-alabaster dark:bg-black text-black dark:text-white hover:bg-stroke transition-colors border border-stroke dark:border-strokedark"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {organisation.organes.map((organe) => (
                                    <div key={organe._id} className="group relative flex flex-col rounded-2xl border border-stroke dark:border-strokedark bg-alabaster dark:bg-black p-5 transition-all hover:shadow-solid-3 dark:hover:bg-hoverdark">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-stroke dark:border-strokedark bg-white">
                                                <Image
                                                    src={organe.photo}
                                                    alt={organe.designation}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-black dark:text-white leading-tight">
                                                    {organe.designation}
                                                </h4>
                                                <div className="mt-1 h-1 w-8 bg-primary rounded-full transition-all group-hover:w-16"></div>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mt-2">
                                            {organe.description.map((desc, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-waterloo dark:text-manatee leading-relaxed">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40"></span>
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-stroke dark:border-strokedark text-center">
                            <p className="text-xs text-waterloo italic">
                                Source : Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante (ESURSI)
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrganesModal;
