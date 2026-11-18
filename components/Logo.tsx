import { site } from "@/lib/site";

/**
 * Logo de Mentora.
 * Mientras `site.logoSrc` sea null se muestra un logotipo de texto PROVISIONAL.
 * Reemplázalo por el logo oficial: copia el archivo a /public y configura site.logoSrc.
 */
export default function Logo() {
  if (site.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={site.logoSrc}
        alt="Mentora"
        width={site.logoWidth}
        height={site.logoHeight}
        className="h-8 w-auto sm:h-10 object-contain"
        fetchPriority="high"
      />
    );
  }

  return (
    <div
      className="font-display flex items-center gap-2 text-white"
      aria-label="Mentora"
      role="img"
      data-provisional-logo
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-indigo text-lg font-extrabold shadow-lg shadow-indigo/30"
      >
        m
      </span>
      <span aria-hidden className="text-2xl font-bold tracking-[0.18em]">
        MENTORA
      </span>
    </div>
  );
}
