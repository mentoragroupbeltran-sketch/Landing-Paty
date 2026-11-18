import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import Tracking from "@/components/Tracking";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://landing.mentora.pe";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mentora | Tu inglés no tiene por qué seguir esperando",
  description:
    "Aprende inglés online, a tu ritmo y desde donde estés. Avanza por niveles alineados al MCER.",
  icons: {
    icon: [
      { url: "/mentora-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/mentora-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/mentora-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/mentora-48x48.png",
    apple: [
      { url: "/mentora-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Tu inglés no tiene por qué seguir esperando | Mentora",
    description:
      "Aprende inglés online, a tu ritmo y desde donde estés. Avanza por niveles alineados al MCER.",
    type: "website",
    locale: "es_PE",
  },
  robots: { index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true", follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101B2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <body className="antialiased">
        {children}
        <Tracking />
      </body>
    </html>
  );
}
