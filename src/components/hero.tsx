import { ArrowRight, CheckCircle2, Star, Sparkles, TrendingUp, Users } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-200/40 via-indigo-100/30 to-amber-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/60 text-sky-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Mentoría Estratégica & Liderazgo de Alto Impacto</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Desbloquea tu potencial,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700">
              lidera con claridad
            </span>{" "}
            y escala tus resultados
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            Acompañamiento personalizado 1 a 1 y programas de aceleración diseñados
            para profesionales, directivos y líderes que buscan consolidar su visión,
            superar techos de cristal y liderar con propósito.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Aplicar a Mentoría</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#programas"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
            >
              <span>Ver Programas</span>
            </a>
          </div>

          {/* Trust Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                +10 Años
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                De experiencia estratégica
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                +350
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Líderes & Emprendedores guiados
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                98% de satisfacción comprobada
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
