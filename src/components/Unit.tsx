"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Lock } from "lucide-react";

const units = [
  {
    name: "Candibinangun",
    location: "Pakem, Sleman",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "/kluster-candibinangun",
    status: "Ready Unit",
    isAvailable: true,
  },
  {
    name: "Bangunjiwo",
    location: "Kasihan, Bantul",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "/kluster-bangunjiwo",
    status: "Ready Unit",
    isAvailable: true,
  },
  {
    name: "Pesona Pinka",
    location: "Berbah, Sleman",
    image: "/assets/images/fasad-titikhuni.svg",
    href: "/kluster-pinka",
    status: "Sold Out",
    isAvailable: true,
  },
  {
    name: "Tirtomartani",
    location: "Kalasan, Sleman",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "/kluster-tirtomartani",
    status: "Ready Unit",
    isAvailable: true,
  },
  {
    name: "Trirenggo",
    location: "Bantul Kota",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "/kluster-trirenggo",
    status: "Ready Unit",
    isAvailable: true,
  },
  {
    name: "Next Project",
    location: "Coming Soon",
    image: "/assets/images/rumah-bangunjiwo.jpg",
    href: "#",
    status: "Coming Soon",
    isAvailable: false,
  },
];

export const Unit = () => {
  return (
    <section
      id="units"
      className="py-24 md:py-32 bg-white"
      aria-labelledby="unit-title"
    >
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
            <h2
              id="unit-title"
              className="text-4xl md:text-5xl font-archivo uppercase leading-none tracking-tighter text-neutral-900"
            >
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
            ruang yang bernafas di Yogyakarta.
          </motion.p>
        </div>

        {/* Grid Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {units.map((unit, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05, // Delay lebih kecil untuk percepatan loading
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`relative group ${!unit.isAvailable ? "cursor-default" : "cursor-pointer"}`}
              >
                {unit.isAvailable ? (
                  <Link
                    href={unit.href}
                    className="block"
                    title={`Lihat detail kluster ${unit.name}`}
                  >
                    <UnitCardContent unit={unit} index={index} />
                  </Link>
                ) : (
                  <UnitCardContent unit={unit} index={index} isLocked />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const UnitCardContent = ({
  unit,
  index,
  isLocked = false,
}: {
  unit: any;
  index: number;
  isLocked?: boolean;
}) => {
  const getTagStyles = (status: string) => {
    switch (status) {
      case "Sold Out":
        return "bg-neutral-900 text-white";
      case "Coming Soon":
        return "bg-neutral-400 text-white";
      default:
        return "bg-white/90 text-neutral-900";
    }
  };

  return (
    <>
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-neutral-100 ${isLocked ? "grayscale" : ""}`}
      >
        <Image
          src={unit.image}
          alt={`Proyek Properti Titik Huni di ${unit.location} - Kluster ${unit.name}`}
          fill
          priority={index < 2} // OPTIMASI LCP: Memprioritaskan gambar yang muncul pertama di layar
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // OPTIMASI LCP: Meminta ukuran gambar yang sesuai
          className={`object-cover transition-transform duration-700 ${isLocked ? "blur-[2px] opacity-60" : "group-hover:scale-105"}`}
        />

        <div className="absolute top-6 left-6 z-20">
          <span
            className={`backdrop-blur-md px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold ${getTagStyles(unit.status)}`}
          >
            {unit.status}
          </span>
        </div>

        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 flex items-center justify-center ${isLocked ? "bg-black/10 opacity-100" : "bg-black/20 opacity-0 group-hover:opacity-100"}`}
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
            {isLocked ? (
              <Lock size={20} className="text-neutral-400" />
            ) : (
              <ArrowUpRight size={24} className="text-black" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-start">
        <div className={isLocked ? "opacity-40" : ""}>
          <h3 className="text-xl font-archivo uppercase tracking-tight text-neutral-900 mb-1">
            {unit.name}
          </h3>
          <div className="flex items-center gap-2 text-neutral-400">
            <MapPin size={12} aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-widest">
              {unit.location}
            </span>
          </div>
        </div>

        {!isLocked && (
          <div className="pt-2 text-[10px] font-archivo uppercase tracking-[0.2em] text-neutral-300 group-hover:text-neutral-900 transition-colors">
            Lihat Detail
          </div>
        )}
      </div>
    </>
  );
};
