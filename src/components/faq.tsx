"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿En qué se diferencia una mentoría de un coaching tradicional?",
      a: "El coaching se enfoca principalmente en hacer preguntas para que encuentres tus respuestas. La mentoría combina la indagación con experiencia directiva real probada: comparto tácticas concretas, herramientas ejecutivas, plantillas y hojas de ruta para acelerar tus decisiones y evitar errores costosos.",
    },
    {
      q: "¿A quién está dirigido el acompañamiento de Paty Beltrán?",
      a: "A emprendedores, fundadores de empresas, directivos, líderes de equipo y profesionales consolidados que están asumiendo nuevos retos de liderazgo o buscando estructurar y escalar su impacto.",
    },
    {
      q: "¿Las sesiones son online o presenciales?",
      a: "Las mentorías individuales se realizan 100% online vía Zoom o Google Meet con clientes en toda Latinoamérica, Estados Unidos y Europa. Para empresas e in-company se coordinan talleres presenciales según el requerimiento.",
    },
    {
      q: "¿Cómo es el proceso de postulación?",
      a: "Completas el formulario de contacto para conocer tu situación actual. Si identificamos que podemos ayudarte y hay compatibilidad estratégica, agendamos una sesión de diagnóstico de 20 minutos sin costo para diseñar tu plan.",
    },
    {
      q: "¿Qué duración tienen los programas de mentoría?",
      a: "Los programas estructurados tienen una duración habitual de 3 a 6 meses para asegurar hábitos y transformaciones sostenibles, aunque también contamos con sesiones estratégicas de diagnóstico puntual.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase">
            Resolviendo Inquietudes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Todo lo que necesitas saber antes de dar el paso.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
