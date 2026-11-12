import { Award, CheckCircle, HeartHandshake, Lightbulb } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual column / Profile card representation */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-gradient-to-tr from-sky-600 via-indigo-600 to-slate-900 p-1 shadow-2xl">
              <div className="bg-slate-950 rounded-[22px] p-8 sm:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-extrabold mb-6 shadow-md">
                  PB
                </div>

                <h3 className="text-2xl font-bold mb-1">Paty Beltrán</h3>
                <p className="text-sky-400 font-medium text-sm mb-6">
                  Fundadora & Directora de Mentoría
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  &ldquo;Mi misión es acompañar a personas con talento y visión a desbloquear la convicción,
                  estrategia y estructura necesarias para liderar con propósito y alcanzar metas que antes parecían inalcanzables.&rdquo;
                </p>

                <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="block text-xl font-bold text-white">+10 Años</span>
                    <span className="text-xs text-slate-400">Trayectoria Directiva</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-white">100%</span>
                    <span className="text-xs text-slate-400">Compromiso Personalizado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Enfoque Humano & Estratégico</p>
                <p className="text-[11px] text-slate-500">Resultados tangibles y sostenibles</p>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div>
            <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase">
              Conoce a tu Mentora
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
              Una aliada estratégica para tu crecimiento profesional y personal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              A lo largo de mi carrera he liderado equipos, gestionado procesos de transformación
              y asesorado a decenas de ejecutivos y líderes en momentos clave de transición y expansión.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              No creo en recetas mágicas ni fórmulas genéricas. La verdadera transformación ocurre cuando
              alineamos tu visión auténtica con sistemas claros de ejecución, comunicación asertiva y hábitos de alto nivel.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm sm:text-base font-medium">
                  Diagnóstico honesto, sin filtros y centrado en tus fortalezas clave.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm sm:text-base font-medium">
                  Estructuración de metas a corto, mediano y largo plazo.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm sm:text-base font-medium">
                  Espacio seguro, confidencial y de alta confidencialidad ejecutiva.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
