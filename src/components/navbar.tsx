"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Programas", href: "#programas" },
    { name: "Metodología", href: "#beneficios" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "Preguntas", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              PB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
                Paty Beltrán
              </span>
              <span className="text-xs text-sky-600 font-medium tracking-wide uppercase">
                Mentora & Estratega
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-sky-600 transition-all duration-300 shadow-sm hover:shadow"
            >
              <span>Agendar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-base font-semibold text-white bg-slate-900 hover:bg-sky-600 transition-colors"
            >
              <span>Agendar Sesión de Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
