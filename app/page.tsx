import Link from "next/link";
import Logo from "@/components/Logo";
import StepHeading from "@/components/StepHeading";
import VideoPlayer from "@/components/VideoPlayer";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* TOP TAB SWITCHER */}
      <div className="w-full bg-slate-900/60 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/80">Mentora VSL</span>
          </div>

          <nav className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-white/15 text-white font-bold shadow-xs">
              🎯 Landing VSL
            </span>
            <Link
              href="/personaje"
              className="px-3 py-1 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors flex items-center gap-1"
            >
              <span>🦁</span>
              <span>Personaje Rive</span>
            </Link>
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 pb-14 pt-7 sm:px-6 sm:pt-10">
        {/* ENCABEZADO */}
        <header className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="font-display mt-7 max-w-3xl text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:mt-9 sm:text-5xl md:text-[3.5rem]">
            {site.headline.lead}{" "}
            <span className="bg-gradient-to-r from-tiffany to-indigo-400 bg-clip-text text-transparent">
              {site.headline.highlight}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-columbia/85 sm:mt-5 sm:text-lg">
            {site.subheadline}
          </p>
        </header>

        {/* PASO 1 — VIDEO */}
        <section aria-labelledby="paso-1" className="mt-9 sm:mt-12">
          <StepHeading id="paso-1">{site.step1}</StepHeading>
          <div className="mt-5">
            <VideoPlayer />
          </div>
        </section>

        {/* PASO 2 — FORMULARIO */}
        <section aria-labelledby="paso-2" className="mt-10 sm:mt-14">
          <StepHeading id="paso-2">{site.step2}</StepHeading>
          <div className="mx-auto mt-5 max-w-xl">
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-columbia/60">
        © 2026 {site.legalEntity} ·{" "}
        <a href="/privacidad" className="underline underline-offset-2 hover:text-tiffany">
          Política de Privacidad
        </a>
      </footer>
    </>
  );
}
