import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paty Beltrán | Mentora de Crecimiento & Liderazgo",
  description:
    "Acompañamiento estratégico, mentoría ejecutiva y desarrollo de liderazgo para transformar tu carrera y acelerar tus resultados empresariales.",
  keywords: [
    "Paty Beltrán",
    "Mentora",
    "Mentora Group Beltrán",
    "Liderazgo",
    "Mentoría de Negocios",
    "Coaching Ejecutivo",
    "Crecimiento Profesional",
  ],
  authors: [{ name: "Paty Beltrán" }],
  openGraph: {
    title: "Paty Beltrán | Mentora de Crecimiento & Liderazgo",
    description:
      "Acompañamiento estratégico para líderes y profesionales que buscan su siguiente nivel de impacto.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
