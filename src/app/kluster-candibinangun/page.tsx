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
  LandPlot,
  Share2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const DATA = {
  name: "Titik Huni Bangunjiwo",
  location: "Kasihan, Bantul, Yogyakarta",
  description:
    "Menghadirkan harmoni antara material jujur dan alam Bantul yang asri. Hunian modern tropis di Yogyakarta ini dirancang untuk ketenangan hidup maksimal dengan sirkulasi udara optimal dan pencahayaan alami.",
  gallery: [
    {
      src: "/assets/images/rumah-bangunjiwo.jpg",
      label: "Fasad Utama Titik Huni Bangunjiwo",
    },
    {
      src: "/assets/images/ruang-tamu-titikhuni.jpg",
      label: "Interior Ruang Tamu Modern",
    },
    {
      src: "/assets/images/kamar-titikhuni.jpg",
      label: "Kamar Tidur Utama Minimalis",
    },
    { src: "/assets/images/rumah-bangunjiwo.jpg", label: "Area Taman Hijau" },
    {
      src: "/assets/images/ruang-tamu-titikhuni.jpg",
      label: "Dapur & Area Makan",
    },
    { src: "/assets/images/kamar-titikhuni.jpg", label: "Kamar Mandi Bersih" },
  ],
  specs: { land: "105m²", building: "65m²", beds: 2, baths: 1 },
  price: "550 Jutaan",
  priceRaw: 550000000,
  waLink:
    "https://wa.me/6289509888404?text=Halo Titik Huni, saya tertarik dengan Bangunjiwo",
};

export default function BangunjiwoPage() {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () =>
    setCurrentImg((p) => (p === DATA.gallery.length - 1 ? 0 : p + 1));
  const prevImg = () =>
    setCurrentImg((p) => (p === 0 ? DATA.gallery.length - 1 : p - 1));

  const handleShare = async () => {
    const shareData = {
      title: DATA.name,
      text: DATA.description,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link berhasil disalin!");
      }
    } catch (err) {
      console.error("Gagal berbagi:", err);
    }
  };

  const image = DATA.gallery[currentImg];

  return (
    <main className="bg-white lg:h-screen lg:overflow-hidden font-archivo">
      <Toaster position="bottom-center" />

      {/* SEO: JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "RealEstateListing",
            name: DATA.name,
            description: DATA.description,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bantul",
              addressRegion: "Yogyakarta",
              addressCountry: "ID",
            },
            priceCurrency: "IDR",
            price: DATA.priceRaw,
          }),
        }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-4 left-4 right-4 lg:top-6 lg:left-6 lg:right-6 z-50 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-neutral-100 shadow hover:bg-black hover:text-white transition group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Back
          </span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 lg:p-3 bg-white/90 backdrop-blur-xl rounded-full border border-neutral-100 shadow hover:bg-neutral-100 transition active:scale-90"
        >
          <Share2 size={18} />
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Gallery Section - Fixed Height on Desktop */}
        <section className="w-full lg:w-3/5 relative h-[45vh] sm:h-[50vh] lg:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={image.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={image.src}
                alt={`${DATA.name} - ${image.label}`}
                fill
                priority
                sizes="(max-width:768px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10 text-white z-10">
            <p className="uppercase tracking-[0.3em] text-[10px] lg:text-xs font-medium">
              {image.label}
            </p>
            <p className="text-[9px] opacity-60 mt-1">
              0{currentImg + 1} / 0{DATA.gallery.length}
            </p>
          </div>

          <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 flex gap-2 z-10">
            <button
              onClick={prevImg}
              className="p-3 lg:p-4 bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-black transition rounded-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImg}
              className="p-3 lg:p-4 bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-black transition rounded-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Content Section - Scrollable independently on desktop */}
        <section className="w-full lg:w-2/5 h-full px-6 py-8 md:px-12 lg:px-12 xl:px-16 lg:py-12 overflow-y-auto flex flex-col">
          {/* Main Content Wrapper to push CTA to bottom if needed */}
          <div className="flex-grow">
            <header className="mb-6 lg:mb-8">
              <div className="flex items-center gap-2 text-neutral-500 mb-2">
                <MapPin size={14} className="text-neutral-900" />
                <address className="not-italic text-[10px] uppercase tracking-[0.25em] font-bold">
                  {DATA.location}
                </address>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 text-neutral-900 leading-none">
                Titik Huni <br />{" "}
                <span className="text-neutral-300">Candibinangun.</span>
              </h1>

              <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
                {DATA.description}
              </p>
            </header>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-y-6 lg:gap-y-4 gap-x-4 py-6 border-y border-neutral-100 mb-6">
              <Spec
                icon={<LandPlot size={18} />}
                label="Land"
                value={DATA.specs.land}
              />
              <Spec
                icon={<Maximize size={18} />}
                label="Building"
                value={DATA.specs.building}
              />
              <Spec
                icon={<Bed size={18} />}
                label="Bedroom"
                value={`${DATA.specs.beds}`}
              />
              <Spec
                icon={<Bath size={18} />}
                label="Bathroom"
                value={`${DATA.specs.baths}`}
              />
            </div>
          </div>

          {/* Sticky/Bottom CTA Area */}
          <div className="mt-auto pt-4 space-y-4">
            <div className="p-5 lg:p-6 bg-neutral-50 rounded-xl flex justify-between items-center border border-neutral-100">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Starting Price
                </p>
                <p className="text-xl lg:text-2xl xl:text-3xl font-bold">
                  {DATA.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Status
                </p>
                <span className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded-full uppercase font-bold">
                  Available
                </span>
              </div>
            </div>

            <Link
              href={DATA.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-neutral-900 text-white px-6 py-4 lg:py-5 rounded-xl hover:bg-black transition-all shadow-xl active:scale-[0.98]"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">
                  Konsultasi Unit
                </span>
                <span className="font-bold text-sm lg:text-base">
                  Ambil Penawaran Sekarang
                </span>
              </div>
              <MessageSquare
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <div className="text-neutral-900">{icon}</div>
        <span className="font-medium text-sm">{value}</span>
      </div>
    </div>
  );
}
