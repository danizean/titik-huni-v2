"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/6289509888404?text=Halo%20Titik%20Huni,%20saya%20ingin%20konsultasi%20mengenai%20hunian.&utm_source=landingpage&utm_medium=navbar&utm_campaign=konsultasi";

const CLUSTERS = [
  { name: "Candibinangun", href: "/kluster-candibinangun" },
  { name: "Bangunjiwo", href: "/kluster-bangunjiwo" },
  { name: "Tirtomartani", href: "/kluster-tirtomartani" },
  { name: "Trirenggo", href: "/kluster-trirenggo" },
];

const NAV_LINKS = [
  { name: "Arsitek & Kontraktor", href: "#services" },
  { name: "Tentang Kami", href: "#TentangKami" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clusterOpen, setClusterOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-hide navbar logic
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 100) {
        setShowNavbar(false);
        setClusterOpen(false);
      } else {
        setShowNavbar(true);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setClusterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Container Utama dengan Glassmorphism Sync */}
      <div
        className={`backdrop-blur-xl transition-colors duration-500 border-b border-neutral-200/50 ${
          menuOpen ? "bg-white" : "bg-white/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              src="/assets/icons/dark-titik-huni.png"
              alt="Titik Huni"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#beranda"
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              Beranda
            </Link>

            {/* Cluster Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setClusterOpen(!clusterOpen)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-100/50 transition-all"
              >
                Kluster
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${clusterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {clusterOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white shadow-2xl border border-neutral-100 rounded-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  {CLUSTERS.map((cluster) => (
                    <Link
                      key={cluster.name}
                      href={cluster.href}
                      onClick={() => setClusterOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-black transition-all"
                    >
                      <MapPin size={14} className="text-neutral-400" />
                      {cluster.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={WHATSAPP_URL}
              target="_blank"
              className="bg-neutral-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-neutral-200"
            >
              Konsultasi
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-neutral-800 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Transparent Sync */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out border-t border-neutral-100 overflow-hidden ${
            menuOpen ? "max-h-screen opacity-100 py-8" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-8 flex flex-col gap-6">
            <Link
              href="#hero"
              onClick={() => setMenuOpen(false)}
              className="text-xl font-semibold"
            >
              Beranda
            </Link>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
                Kluster Titik Huni
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CLUSTERS.map((cluster) => (
                  <Link
                    key={cluster.name}
                    href={cluster.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-neutral-600 p-3 bg-neutral-50 rounded-xl"
                  >
                    <MapPin size={14} />
                    {cluster.name}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-neutral-700"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={WHATSAPP_URL}
              target="_blank"
              className="bg-neutral-900 text-white text-center py-4 rounded-2xl font-bold tracking-wide mt-4 shadow-xl active:scale-95 transition-transform"
            >
              Konsultasi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
