"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    programa: "Mentoría 1:1 VIP",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative shadow-2xl overflow-hidden">
          {/* Background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs sm:text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Agenda tu Diagnóstico Gratuito</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                ¿Listo para dar el siguiente paso en tu liderazgo?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Postula hoy para evaluar si este programa se ajusta a tus objetivos y desafíos actuales.
                Revisaré personalmente tu solicitud en menos de 24 horas hábiles.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Sesión de diagnóstico de 20 minutos 100% personalizada.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Sin compromiso de contratación ni venta forzada.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Espacio confidencial y enfocado en tu caso particular.</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">¡Solicitud Recibida!</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    Gracias por tu interés. En breve nos pondremos en contacto contigo para coordinar el horario de tu sesión.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Ej. Laura Gómez"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="laura@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="+54 9 11 ..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Programa de Interés
                    </label>
                    <select
                      value={form.programa}
                      onChange={(e) => setForm({ ...form, programa: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-sky-400 transition-colors text-sm"
                    >
                      <option value="Mentoría 1:1 VIP">Mentoría 1:1 VIP</option>
                      <option value="Liderazgo & Equipos (Empresas)">Liderazgo & Equipos (Empresas)</option>
                      <option value="Sesión Estratégica Flash">Sesión Estratégica Flash</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      ¿Cuál es tu mayor desafío actualmente?
                    </label>
                    <textarea
                      rows={3}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Cuéntanos brevemente sobre tu momento profesional o de negocio..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Enviar Solicitud de Diagnóstico</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
