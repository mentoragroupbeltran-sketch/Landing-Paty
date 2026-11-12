"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Reproductor VSL.
 * Configura el video con variables de entorno en Vercel (no hace falta tocar código):
 *   NEXT_PUBLIC_VIDEO_URL    → enlace de YouTube (watch, youtu.be o shorts) o URL de un .mp4
 *   NEXT_PUBLIC_VIDEO_POSTER → (opcional) imagen de portada para el MP4, ej. /video-portada.jpg
 * Si NEXT_PUBLIC_VIDEO_URL está vacío, se muestra la portada provisional.
 */

const VIDEO_URL = (process.env.NEXT_PUBLIC_VIDEO_URL || "").trim();
const VIDEO_POSTER = (process.env.NEXT_PUBLIC_VIDEO_POSTER || "").trim();

export function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-oxford-800 shadow-2xl shadow-indigo/20 ring-1 ring-white/10">
      <div className="relative aspect-video w-full">{children}</div>
    </div>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PlaceholderCover() {
  return (
    <Frame>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pb-4 pt-12 text-center sm:gap-4 sm:p-6"
        style={{
          background:
            "radial-gradient(80% 90% at 50% 0%, rgb(98 101 255 / 0.45), transparent 70%), linear-gradient(160deg, #16243b 0%, #101b2e 100%)",
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-tiffany px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-oxford sm:left-4 sm:top-4 sm:text-xs">
          Portada provisional
        </span>
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white/70 ring-1 ring-white/20 sm:h-20 sm:w-20"
        >
          <PlayIcon className="ml-1 h-5 w-5 sm:h-9 sm:w-9" />
        </span>
        <div>
          <p className="font-display text-lg font-bold tracking-[0.2em] text-white sm:text-2xl">MENTORA</p>
          <p className="mt-1 text-sm text-columbia/80 sm:text-base">
            Video en preparación. Muy pronto podrás verlo aquí.
          </p>
        </div>
      </div>
    </Frame>
  );
}

function YouTubeFacade({ id }: { id: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <Frame>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title="Video de presentación de Mentora"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </Frame>
    );
  }

  // Fachada ligera: no carga el reproductor de YouTube (~1 MB) hasta que la persona toca "play".
  return (
    <Frame>
      <button
        type="button"
        onClick={() => {
          setActive(true);
          trackEvent("VideoPlay");
        }}
        className="group absolute inset-0 h-full w-full cursor-pointer"
        aria-label="Reproducir el video de Mentora"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VIDEO_POSTER || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <span className="absolute inset-0 bg-oxford/30 transition group-hover:bg-oxford/10" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-indigo text-white shadow-xl shadow-indigo/40 transition group-hover:scale-105 sm:h-20 sm:w-20">
          <PlayIcon className="ml-1 h-7 w-7 sm:h-9 sm:w-9" />
        </span>
      </button>
    </Frame>
  );
}

function Mp4Player({ src }: { src: string }) {
  return (
    <Frame>
      <video
        className="absolute inset-0 h-full w-full bg-black object-contain"
        controls
        playsInline
        preload="metadata"
        poster={VIDEO_POSTER || undefined}
        controlsList="nodownload"
        onPlay={() => trackEvent("VideoPlay")}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>
    </Frame>
  );
}

export default function VideoPlayer() {
  if (!VIDEO_URL) return <PlaceholderCover />;
  const ytId = getYouTubeId(VIDEO_URL);
  if (ytId) return <YouTubeFacade id={ytId} />;
  return <Mp4Player src={VIDEO_URL} />;
}
