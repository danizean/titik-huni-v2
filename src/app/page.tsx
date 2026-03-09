"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Beranda } from "@/components/Beranda";
import { Unit } from "@/components/Unit";
import { TentangKami } from "@/components/TentangKami";
import { Galeri } from "@/components/Galeri";
import PaymentSchedulePage from "@/components/JasaBangun";
import { FAQs } from "@/components/FAQs";
import { LeadForm } from "@/components/Leadform";
import { Footer } from "@/components/Footer";

// --- FIX: Import Lokasi secara dinamis untuk menghindari error "window is not defined" ---
const Lokasi = dynamic(
  () => import("@/components/Lokasi").then((mod) => mod.Lokasi),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-black rounded-full animate-spin" />
          <p className="text-[10px] font-archivo uppercase tracking-[0.3em] text-neutral-400">
            Memuat Peta Interaktif...
          </p>
        </div>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Navbar tetap di luar agar bisa sticky/fixed dengan benar */}
      <Navbar />

      <div className="overflow-x-clip">
        {/* 1. Hero Section */}
        <Beranda />

        {/* 2. Brand Philosophy */}
        <TentangKami />

        {/* 3. Product Gallery / Clusters */}
        <Unit />

        {/* 4. Interactive Maps (SSR Disabled) */}
        <Lokasi />

        {/* 5. Financial & Information Section */}
        <div className="bg-white">
          <Galeri />
        </div>

        {/* 6. Support & Conversion */}
        <FAQs />
        <LeadForm />
      </div>

      <Footer />
    </main>
  );
}
