"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IProvince, IEtablissement } from "./types";

interface SearchClientProps {
    provinces: IProvince[];
    fetchEtabs: (data: { critere: string; value: string }) => Promise<IEtablissement[]>;
}

const SearchClient = ({ provinces, fetchEtabs }: SearchClientProps) => {
    const [selectedCritere, setSelectedCritere] = useState<string>("term");
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(null);

    // UI States
    const [loading, setLoading] = useState(false);
    const [isProvinceModalOpen, setIsProvinceModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
    const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
    const [results, setResults] = useState<IEtablissement[]>([]);

    const criteres = [
        {
            designation: "Nom ou Sigle",
            value: "term",
            placeholder: "Ex: UNIKIN, Institut...",
            type: "text",
        },
        {
            designation: "Province",
            value: "province",
            placeholder: "Sélectionnez une province",
            type: "modal", // Custom type for modal trigger
        },
        {
            designation: "Référence",
            value: "nref",
            placeholder: "Numéro de référence",
            type: "text",
        },
    ];

    const activeCritereDef = criteres.find(c => c.value === selectedCritere) || criteres[0];

    // Filter provinces based on search term in modal
    const filteredProvinces = provinces.filter(p =>
        p.designation.toLowerCase().includes(provinceSearchTerm.toLowerCase())
    );

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const valueToSend = selectedCritere === "province" ? selectedProvince?._id : searchValue;

        if (!valueToSend && selectedCritere !== "all") return;

        setLoading(true);
        try {
            const data = await fetchEtabs({ critere: selectedCritere, value: valueToSend || "" });
            setResults(data || []);
            setIsResultsModalOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleProvinceSelect = (province: IProvince) => {
        setSelectedProvince(province);
        setSearchValue(province.designation); // For display purposes if needed, though we use buttons
        setIsProvinceModalOpen(false);
    };

    return (
        <>
            <div className="relative mx-auto w-full max-w-c-1390 -mt-24 z-30 px-4 md:px-8 2xl:px-0 font-satoshi">
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl bg-white px-7.5 py-8 shadow-solid-5 dark:bg-blacksection dark:border dark:border-strokedark md:px-12.5"
                >
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                            Trouver un établiisement
                        </h3>
                        <p className="text-base text-body-color dark:text-body-color-dark">
                            Recherchez parmi nos centres et instituts de recherche pour découvrir leurs offres et opportunités.
                        </p>
                    </div>

                    {/* Search Bar Section */}
                    <div className="flex flex-col gap-8">
                        {/* Horizontal Criteria Selector */}
                        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-stroke pb-4 dark:border-strokedark">
                            {criteres.map((c) => (
                                <button
                                    key={c.value}
                                    onClick={() => {
                                        setSelectedCritere(c.value);
                                        setSearchValue("");
                                        setSelectedProvince(null);
                                        if (c.value === "province") {
                                            setIsProvinceModalOpen(true);
                                        }
                                    }}
                                    className={`relative text-lg font-medium transition-colors hover:text-primary ${selectedCritere === c.value
                                        ? "text-primary after:absolute after:-bottom-[17px] after:left-0 after:h-0.5 after:w-full after:bg-primary"
                                        : "text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {c.designation}
                                </button>
                            ))}
                        </div>

                        {/* Input Area & Submit */}
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6 items-end">
                            <div className="w-full flex-grow relative">
                                {selectedCritere === "province" ? (
                                    <div
                                        onClick={() => setIsProvinceModalOpen(true)}
                                        className="w-full cursor-pointer border-b border-stroke bg-transparent py-4 text-xl focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                                    >
                                        <span className={selectedProvince ? "text-black dark:text-white" : "text-gray-400"}>
                                            {selectedProvince ? selectedProvince.designation : "Cliquez pour sélectionner une province..."}
                                        </span>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full border-b border-stroke bg-transparent py-4 text-xl focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                                        placeholder={activeCritereDef.placeholder}
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2.5 rounded-full bg-black px-8 py-4 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark min-w-[160px] justify-center"
                            >
                                {loading ? "..." : "Rechercher"}
                                {!loading && (
                                    <svg
                                        className="fill-white"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                                            fill=""
                                        />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Province Selection Modal */}
            <AnimatePresence>
                {isProvinceModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-stroke dark:border-strokedark"
                        >
                            <div className="p-4 border-b border-stroke dark:border-strokedark flex justify-between items-center bg-white dark:bg-black">
                                <h3 className="text-lg font-semibold text-black dark:text-white">Sélectionner une province</h3>
                                <button onClick={() => setIsProvinceModalOpen(false)} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-4 bg-white dark:bg-black">
                                <input
                                    type="text"
                                    placeholder="Rechercher une province..."
                                    value={provinceSearchTerm}
                                    onChange={(e) => setProvinceSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-stroke rounded-lg mb-4 bg-gray-50 dark:bg-meta-4 dark:border-strokedark text-black dark:text-white focus:ring-primary focus:border-primary placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                                <div className="max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar">
                                    {filteredProvinces.map((province) => (
                                        <button
                                            key={province._id}
                                            onClick={() => handleProvinceSelect(province)}
                                            className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-meta-4 rounded-lg transition-colors flex items-center justify-between group"
                                        >
                                            <span className="text-black dark:text-white font-medium">{province.designation}</span>
                                            <span className="opacity-0 group-hover:opacity-100 text-primary">●</span>
                                        </button>
                                    ))}
                                    {filteredProvinces.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">Aucune province trouvée.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Results Modal */}
            <AnimatePresence>
                {isResultsModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white dark:bg-black w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] border border-stroke dark:border-strokedark"
                        >
                            <div className="p-6 border-b border-stroke dark:border-strokedark flex justify-between items-center bg-gray-50 dark:bg-black rounded-t-2xl">
                                <div>
                                    <h3 className="text-xl font-bold text-black dark:text-white">Résultats de recherche</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{results.length} établissement(s) trouvé(s)</p>
                                </div>
                                <button onClick={() => setIsResultsModalOpen(false)} className="p-2 bg-gray-200 dark:bg-meta-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-black dark:text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto bg-gray-50/50 dark:bg-black scrollbar-hide">
                                <div className="grid grid-cols-1 gap-4">
                                    {results.map((etab) => (
                                        <div key={etab._id} className="bg-white dark:bg-transparent border border-stroke dark:border-strokedark rounded-xl p-4 flex flex-col md:flex-row gap-6 hover:shadow-lg dark:hover:bg-meta-4/20 transition-all duration-300">
                                            {/* Image Placeholder or Actual Image */}
                                            <div className="w-full md:w-32 h-32 flex-shrink-0 bg-gray-200 dark:bg-meta-4 rounded-lg overflow-hidden relative">
                                                {etab.photo && etab.photo.length > 0 ? (
                                                    <Image src={etab.photo[0]} alt={etab.designation} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-grow flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full mb-2">
                                                            {etab.sigle}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-strokedark px-2 py-1 rounded">
                                                            {etab.province?.designation || "RDC"}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">{etab.designation}</h4>

                                                    {/* Contact Details instead of Description */}
                                                    <div className="space-y-1.5 mt-2">
                                                        {etab.adresse && (
                                                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                                <span>{etab.adresse}</span>
                                                            </div>
                                                        )}
                                                        {etab.telephone && (
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                                <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                                <span>{etab.telephone}</span>
                                                            </div>
                                                        )}
                                                        {etab.email && (
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                                <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                                <a href={`mailto:${etab.email}`} className="hover:underline">{etab.email}</a>
                                                            </div>
                                                        )}
                                                        {etab.website && (
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                                <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                                                <a href={etab.website.startsWith('http') ? etab.website : `https://${etab.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[200px]">{etab.website}</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-end">
                                                    <Link
                                                        href={`/etablissement/${etab._id}`}
                                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primaryho transition-colors group"
                                                    >
                                                        Voir détails
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {results.length === 0 && (
                                        <div className="text-center py-10">
                                            <div className="bg-gray-100 dark:bg-meta-4 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            </div>
                                            <h4 className="text-lg font-medium text-black dark:text-white">Aucun résultat trouvé</h4>
                                            <p className="text-gray-500 dark:text-gray-400 mt-2">Essayez de modifier vos critères de recherche.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SearchClient;
