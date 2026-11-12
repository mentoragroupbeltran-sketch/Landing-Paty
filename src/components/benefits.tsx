import { Compass, Target, Brain, Rocket, ShieldCheck, Zap } from "lucide-react";

export function Benefits() {
  const pillars = [
    {
      icon: Compass,
      title: "Claridad & Dirección",
      description:
        "Diseñamos un mapa de ruta preciso para tus objetivos profesionales, eliminando la dispersión y enfocando tu energía en lo verdaderamente prioritario.",
    },
    {
      icon: Target,
      title: "Estrategia Accionable",
      description:
        "Dejamos atrás la teoría. Cada sesión entrega planes tácticos medibles con indicadores claros para comprobar tu avance semana a semana.",
    },
    {
      icon: Brain,
      title: "Mindset de Alto Desempeño",
      description:
        "Supera el síndrome del impostor, los techos autoimpuestos y la fricción en la toma de decisiones complejas en entornos cambiantes.",
    },
    {
      icon: Rocket,
      title: "Aceleración de Resultados",
      description:
        "Aprende de aciertos y errores probados en el mundo real para ahorrar años de prueba y error en tu crecimiento profesional.",
    },
    {
      icon: ShieldCheck,
      title: "Rendición de Cuentas (Accountability)",
      description:
        "Seguimiento cercano y comprometido para asegurar la implementación de los compromisos adquiridos y superar los obstáculos.",
    },
    {
      icon: Zap,
      title: "Liderazgo & Comunicación",
      description:
        "Fortalece tu influencia, la gestión de equipos de alto rendimiento y la capacidad de comunicar tu propuesta de valor con autoridad.",
    },
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sky-400 font-semibold text-sm tracking-wider uppercase">
            Metodología Comprobada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
            Transforma tu liderazgo desde la raíz
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Un marco integral que combina estrategia ejecutiva, psicología del desempeño y ejecución práctica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-sky-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
