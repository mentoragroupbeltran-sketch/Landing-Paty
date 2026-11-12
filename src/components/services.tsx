import { Check, ArrowRight, Sparkles, UserCheck, Users2, Building } from "lucide-react";

export function Services() {
  const programs = [
    {
      name: "Mentoría 1:1 VIP",
      badge: "Más Solicitado",
      popular: true,
      description:
        "Acompañamiento individual e intensivo diseñado a la medida de tus retos ejecutivos o de emprendimiento.",
      icon: UserCheck,
      features: [
        "Sesiones quincenales 1 a 1 de 60 minutos",
        "Acceso directo vía mensajería para consultas críticas",
        "Revisión de planes estratégicos y presentaciones",
        "Plan de acción personalizado por objetivos",
        "Grabaciones y bitácora de cada encuentro",
      ],
      cta: "Postular a Mentoría 1:1",
      link: "#contacto",
    },
    {
      name: "Liderazgo & Equipos",
      badge: "Corporativo",
      popular: false,
      description:
        "Formación y mentoría in-company para mandos medios y directivos que necesitan fortalecer cohesión y resultados.",
      icon: Users2,
      features: [
        "Diagnóstico de dinámicas de equipo",
        "Talleres vivenciales de liderazgo e influencia",
        "Sistemas de feedback y comunicación no violenta",
        "Indicadores de desempeño y clima laboral",
        "Sesiones de seguimiento grupal",
      ],
      cta: "Consultar para Empresas",
      link: "#contacto",
    },
    {
      name: "Sesión Estratégica Flash",
      badge: "Puntual",
      popular: false,
      description:
        "Una sesión de alta intensidad de 90 minutos para desbloquear un dilema específico o preparar una negociación crucial.",
      icon: Sparkles,
      features: [
        "Cuestionario previo de inmersión profunda",
        "90 minutos de consultoría y mentoría enfocada",
        "Hoja de ruta y próximos 3 pasos estratégicos",
        "Grabación y notas de síntesis",
        "Seguimiento por correo a los 15 días",
      ],
      cta: "Reservar Sesión Flash",
      link: "#contacto",
    },
  ];

  return (
    <section id="programas" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase">
            Formatos & Programas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            Elige el nivel de acompañamiento ideal para ti
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Cupos limitados por trimestre para garantizar la máxima dedicación y personalización.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  prog.popular
                    ? "bg-white border-2 border-sky-600 shadow-xl shadow-sky-600/10 scale-100 lg:-translate-y-2"
                    : "bg-white border border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                {prog.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {prog.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    {!prog.popular && (
                      <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{prog.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                    {prog.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={prog.link}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-center text-sm flex items-center justify-center gap-2 transition-all ${
                    prog.popular
                      ? "bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/20"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <span>{prog.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
