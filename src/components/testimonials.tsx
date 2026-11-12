import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Carolina Morales",
      role: "Directora de Operaciones & Socia",
      content:
        "Trabajar con Paty marcó un antes y un después en mi carrera. Tenía dudas sobre cómo asumir el liderazgo de un equipo de 30 personas; sus herramientas prácticas y su visión clara me dieron la solidez que necesitaba.",
      rating: 5,
    },
    {
      name: "Alejandro Restrepo",
      role: "Fundador & CEO Tech",
      content:
        "La claridad estratégica que obtuve en las mentorías con Paty nos permitió reestructurar nuestra oferta comercial y duplicar ventas en menos de 6 meses. Su acompañamiento es oro puro.",
      rating: 5,
    },
    {
      name: "Valeria Guzmán",
      role: "Gerente de Talento Humano",
      content:
        "Paty tiene una sensibilidad única para detectar puntos ciegos sin rodeos, pero siempre desde la empatía y la solución. Es la mejor inversión que he hecho en mi desarrollo profesional.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonios" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase">
            Casos de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            Lo que dicen líderes que ya dieron el salto
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Resultados reales de personas y empresas transformadas a través de la mentoría.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-200 transition-all hover:shadow-lg"
            >
              <div>
                <Quote className="w-8 h-8 text-sky-500/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                <p className="text-xs text-slate-500 font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
