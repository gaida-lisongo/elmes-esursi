"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface IArticle {
    _id: string;
    photo: string;
    titre: string;
    sousTitre: string;
    description: string;
    contenu: string;
    annexes: any[]; // Using any[] to match the provided structure [Array]
    createdAt: string | Date;
    updatedAt: string | Date;
}

const BannerCarousel = ({ articles }: { articles: IArticle[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (articles.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [articles.length]);

    if (!articles || articles.length === 0) return null;

    const currentArticle = articles[currentIndex];

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentArticle._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 h-full w-full"
                >
                    {/* Background Image */}
                    <Image
                        src={currentArticle.photo}
                        alt={currentArticle.titre}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="max-w-4xl"
                        >
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                                {currentArticle.titre}
                            </h1>

                            <p className="mb-8 text-lg font-medium text-gray-200 md:text-xl lg:text-2xl drop-shadow-md max-w-2xl">
                                {truncateText(currentArticle.sousTitre, 150)}
                            </p>

                            <Link
                                href={`/article/${currentArticle._id}`}
                                className="inline-block rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-all hover:bg-opacity-90 hover:scale-105 active:scale-95"
                            >
                                En savoir plus
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators/Dots (Optional but good for UX) */}
            <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-2">
                {articles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
