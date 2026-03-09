// src/components/Unit.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const units = [
  {
    name: "Candibinangun",
    location: "Pakem, Sleman",
    image: "/assets/images/rumah-bangunjiwo.jpg", // Ganti dengan path foto Candibinangun
    href: "/kluster-candibinangun",
    tag: "Mountain View",
  },
  {
    name: "Bangunjiwo",
    location: "Kasihan, Bantul",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "/kluster-bangunjiwo",
    tag: "Green Living",
  },
  {
    name: "Tirtomartani",
    location: "Kalasan, Sleman",
    image: "/assets/images/rumah-bangunjiwo.jpg", // Ganti dengan path foto Tirtomartani
    href: "/kluster-tirtomartani",
    tag: "Historical Area",
  },
  {
    name: "Trirenggo",
    location: "Bantul Kota",
    image: "/assets/images/rumah-bangunjiwo.jpg", // Ganti dengan path foto Trirenggo
    href: "/kluster-trirenggo",
    tag: "City Privacy",
  },
];

export const Unit = () => {
  return (
    <section id="units" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-[10px] font-archivo uppercase tracking-[0.5em] text-neutral-400 block mb-4">
              Koleksi Kluster
            </span>
            <h2 className="text-4xl md:text-5xl font-archivo uppercase leading-none tracking-tighter text-neutral-900">
              Unit Terkurasi <br />
              <span className="text-neutral-300">Titik Huni.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-500 font-light max-w-xs text-sm md:text-base leading-relaxed"
          >
            Setiap unit dirancang dengan presisi arsitektural untuk menghadirkan
            ruang yang bernafas.
          </motion.p>
        </div>

        {/* Grid Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {units.map((unit, index) => (
            <motion.div
              key={unit.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={unit.href} className="group block relative">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={unit.image}
                    alt={`Titik Huni ${unit.name}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Floating Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-900">
                      {unit.tag}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                      <ArrowUpRight size={24} className="text-black" />
                    </div>
                  </div>
                </div>

                {/* Info Detail */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl md:text-2xl font-archivo uppercase tracking-tight text-neutral-900 mb-1">
                      {unit.name}
                    </h3>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <MapPin size={12} />
                      <span className="text-[10px] uppercase tracking-widest">
                        {unit.location}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-archivo uppercase tracking-[0.2em] text-neutral-300 group-hover:text-neutral-900 transition-colors">
                      Lihat Detail
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
