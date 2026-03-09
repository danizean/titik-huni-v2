"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Maximize,
  Bed,
  Bath,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";

// DATA KHUSUS BANGUNJIWO (Ubah bagian ini untuk halaman lain)
const DATA = {
  name: "Titik Huni Bangunjiwo",
  location: "Kasihan, Bantul, Yogyakarta",
  description:
    "Menghadirkan harmoni antara material jujur dan alam Bantul yang asri. Hunian ini dirancang untuk ketenangan hidup yang maksimal dengan sirkulasi udara optimal.",
  gallery: [
    "/assets/images/rumah-bangunjiwo.jpg",
    "/assets/images/ruang-tamu-titikhuni.jpg",
    "/assets/images/kamar-titikhuni.jpg",
  ],
  specs: { land: "105m²", building: "65m²", beds: 2, baths: 1 },
  price: "550 Jutaan",
  waLink:
    "https://wa.me/6289509888404?text=Halo%20Titik%20Huni,%20saya%20tertarik%20dengan%20Bangunjiwo",
};

export default function BangunjiwoPage() {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () =>
    setCurrentImg((p) => (p === DATA.gallery.length - 1 ? 0 : p + 1));
  const prevImg = () =>
    setCurrentImg((p) => (p === 0 ? DATA.gallery.length - 1 : p - 1));

  return (
    <main className="bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-3 bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-neutral-100 shadow-sm transition-all hover:bg-black hover:text-white"
        >
          <ArrowLeft size={16} />
          <span className="text-[10px] font-archivo uppercase tracking-[0.3em]">
            Home
          </span>
        </Link>
      </nav>

      <section className="flex flex-col lg:flex-row min-h-screen items-center">
        {/* Left: Square Gallery Slider */}
        <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex justify-center bg-neutral-50/50">
          <div className="relative aspect-square w-full max-w-[650px] overflow-hidden bg-neutral-200 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={DATA.gallery[currentImg]}
                  alt={DATA.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={prevImg}
                className="w-12 h-12 flex items-center justify-center bg-white/95 rounded-full shadow-xl hover:bg-black hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImg}
                className="w-12 h-12 flex items-center justify-center bg-white/95 rounded-full shadow-xl hover:bg-black hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <article className="w-full lg:w-1/2 px-8 py-16 md:px-20 lg:pr-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 text-neutral-400 mb-6">
              <MapPin size={14} />
              <span className="text-[10px] font-archivo uppercase tracking-[0.4em]">
                {DATA.location}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-archivo uppercase tracking-tighter mb-10 leading-none">
              {DATA.name.split(" ").pop()}
            </h1>

            <p className="text-neutral-500 font-light leading-relaxed mb-12 text-base md:text-xl">
              {DATA.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 py-10 border-y border-neutral-100 mb-12">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Bangunan
                </p>
                <div className="flex items-center gap-2">
                  <Maximize size={16} className="text-neutral-300" />
                  <span className="text-sm font-medium">
                    {DATA.specs.building}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Fasilitas
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Bed size={16} className="text-neutral-300" />{" "}
                    {DATA.specs.beds}
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath size={16} className="text-neutral-300" />{" "}
                    {DATA.specs.baths}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Mulai Dari
                </p>
                <span className="text-sm font-bold">{DATA.price}</span>
              </div>
            </div>

            <Link
              href={DATA.waLink}
              target="_blank"
              className="flex items-center justify-center gap-4 bg-[#262626] text-white px-10 py-5 text-[10px] font-archivo uppercase tracking-[0.4em] hover:bg-black transition-all"
            >
              <span>Dapatkan Brosur</span>
              <MessageSquare size={14} />
            </Link>
          </motion.div>
        </article>
      </section>
    </main>
  );
}
