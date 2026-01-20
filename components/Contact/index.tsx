"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { toast } from "react-hot-toast";
import { sendContactEmail } from "@/app/actions/email";
import { uploadPhoto } from "@/app/actions/photo";

const Contact = () => {
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [state, setState] = React.useState<{ success?: boolean; message?: string }>({});
  const [attachments, setAttachments] = React.useState<{ name: string; url: string }[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);

  /**
   * Source: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
   * Reason: To fix rehydration error
   */
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const toastId = toast.loading("Téléchargement de l'annexe...");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadPhoto(formData);
        if (result.success && result.url) {
          setAttachments(prev => [...prev, { name: file.name, url: result.url! }]);
          toast.success(`${file.name} ajouté aux annexes`, { id: toastId });
        } else {
          toast.error(`Erreur lors de l'envoi de ${file.name}`, { id: toastId });
        }
      }
    } catch (error) {
      toast.error("Erreur de connexion lors de l'upload", { id: toastId });
    } finally {
      setUploading(false);
      // Reset input to allow choosing same file again if needed
      if (e.target) e.target.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    toast.success("Annexe supprimée");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setState({});

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData, attachments);

    setLoading(false);
    setState(result);

    if (result.success) {
      toast.success(result.message);
      formRef.current?.reset();
      setAttachments([]);
    } else {
      toast.error(result.message);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Envoyer un message
              </h2>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nom complet"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Votre email"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Objet"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    required
                    placeholder="Message"
                    rows={4}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  ></textarea>
                </div>

                {/* Annexes Section */}
                <div className="mb-12.5">
                  <label className="mb-4 block text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                    Annexes / Justificatifs (Photos)
                  </label>

                  <div className="flex flex-wrap gap-4">
                    {/* Upload Box */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-stroke bg-alabaster transition-colors hover:border-primary dark:border-strokedark dark:bg-black">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                      />
                      <div className="text-center font-bold">
                        <span className="text-xl">+</span>
                        <p className="text-[10px]">Ajouter</p>
                      </div>
                    </div>

                    {/* Preview List */}
                    {attachments.map((att, index) => (
                      <div key={index} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark">
                        <Image
                          src={att.url}
                          alt={att.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="absolute right-1 top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-meta-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          &times;
                        </button>
                      </div>
                    ))}

                    {uploading && (
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-stroke bg-alabaster animate-pulse dark:border-strokedark dark:bg-black">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    {state.message && (
                      <div className={`text-sm font-medium ${state.success ? "text-metamgreen" : "text-meta-1"}`}>
                        {state.message}
                      </div>
                    )}
                  </div>

                  <button
                    disabled={loading || uploading}
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark disabled:opacity-50"
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
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
                  </button>
                </div>
              </form>
            </motion.div>

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
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Contactez-nous
              </h2>

              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Adresse
                </h3>
                <p>6-8, Boulevard Tshatshi
                  B.P.5429 Kinshasa/Gombe
                  République Démocratique du Congo</p>
              </div>
              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email
                </h3>
                <p>
                  <a href="mailto:contact@minesursi.gouv.cd">contact@minesursi.gouv.cd</a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Téléphone
                </h4>
                <p>
                  <a href="#">+243 81 555 55 55</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
