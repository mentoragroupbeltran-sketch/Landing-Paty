"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

type AnimationMode = "idle" | "search" | "wink" | "wave" | "celebrate";

function RiveCanvasPlayer() {
  const { RiveComponent, rive } = useRive({
    src: "/mascot.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
      <RiveComponent className="w-full h-full" />
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-400">
        ● Rive Native Runtime WebGL
      </div>
    </div>
  );
}

export default function PersonajePage() {
  const [viewType, setViewType] = useState<"interactive" | "rive">("interactive");
  const [mode, setMode] = useState<AnimationMode>("idle");
  const [speed, setSpeed] = useState<number>(1);
  const [showRmlCode, setShowRmlCode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking when mouse moves over stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    if (mode !== "idle") {
      const timer = setTimeout(() => {
        setMode("idle");
      }, 2400 / speed);
      return () => clearTimeout(timer);
    }
  }, [mode, speed]);

  const rmlSnippet = `<Rive version="1" kind="fragment">
  <ImageAsset file="mascot.png" name="lion_mascot" id="0:60"/>
  <Artboard defaultStateMachineId="0:7" width="500" height="500" name="Artboard" id="0:2">
    <!-- Ambient circular glow -->
    <Shape x="250" y="270" name="Glow" id="0:15">
      <Ellipse width="380" height="380" originX="0.5" originY="0.5"/>
      <Fill><SolidColor colorValue="3338BDF8"/></Fill>
    </Shape>

    <!-- Character Node with Idle Breathing & Tilt -->
    <Node x="250" y="250" name="CharacterRoot" id="0:100">
      <Image assetId="0:60" originX="0.5" originY="0.5" name="LionMascot"/>
    </Node>

    <StateMachine name="State Machine 1" id="0:7">
      <StateMachineLayer name="MotionLayer">
        <EntryState><StateTransition stateToId="0:12"/></EntryState>
        <AnimationState animationId="0:6" id="0:12"/>
      </StateMachineLayer>
    </StateMachine>

    <LinearAnimation loopValue="loop" fps="60" duration="180" name="Idle" id="0:6">
      <!-- Floating, breathing scale & playful head tilt -->
      <KeyedObject objectId="0:100">
        <KeyedProperty property="y">
          <KeyFrameDouble value="250" frame="0" interpolationType="cubic"/>
          <KeyFrameDouble value="238" frame="90" interpolationType="cubic"/>
          <KeyFrameDouble value="250" frame="180"/>
        </KeyedProperty>
        <KeyedProperty property="scaleX">
          <KeyFrameDouble value="1" frame="0"/>
          <KeyFrameDouble value="1.03" frame="90"/>
          <KeyFrameDouble value="1" frame="180"/>
        </KeyedProperty>
        <KeyedProperty property="rotation">
          <KeyFrameDouble value="0" frame="0"/>
          <KeyFrameDouble value="0.04" frame="45"/>
          <KeyFrameDouble value="-0.03" frame="135"/>
          <KeyFrameDouble value="0" frame="180"/>
        </KeyedProperty>
      </KeyedObject>
    </LinearAnimation>
  </Artboard>
</Rive>`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* TOP TAB NAVIGATION */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🦁</span>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight text-white">
                Mascota León Mentora
              </h1>
              <p className="text-[11px] text-amber-400 font-medium">
                Sincronizado con Rive.app Cloud & Rive CLI
              </p>
            </div>
          </div>

          {/* TAB SWITCHER */}
          <nav className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              🎯 Landing VSL
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold shadow-sm">
              🦁 Personaje Rive
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 flex-1">
        {/* BANNER HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <span>🚀 Sincronizado en Rive Cloud</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            León Mentor con Movimiento Fluido
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            El archivo está subido a tu cuenta de Rive y listo para abrir en el Editor web, o interactuar en tiempo real aquí abajo.
          </p>

          {/* OPEN IN RIVE EDITOR BUTTON */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://editor.rive.app/file/rive-mascot/2733949"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Abrir en Rive Editor</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6H5V5z" />
              </svg>
            </a>

            {/* TOGGLE VIEW MODE */}
            <button
              onClick={() => setViewType(viewType === "interactive" ? "rive" : "interactive")}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition-colors"
            >
              {viewType === "interactive" ? "Ver Runtime .RIV" : "Ver Modo 3D Parallax"}
            </button>
          </div>
        </div>

        {/* STAGE & CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: CHARACTER STAGE (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {viewType === "rive" ? (
              <RiveCanvasPlayer />
            ) : (
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[460px] aspect-square rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 shadow-2xl p-6 flex items-center justify-center overflow-hidden group cursor-pointer select-none"
                style={{ perspective: "1000px" }}
              >
                {/* Radial backdrop light */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                  style={{
                    background:
                      mode === "search"
                        ? "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)"
                        : mode === "wink"
                        ? "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)"
                        : mode === "celebrate"
                        ? "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
                    transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
                  }}
                />

                {/* Sparkles */}
                <div
                  className={`absolute top-8 right-12 text-2xl transition-all duration-500 pointer-events-none ${
                    mode === "wink" || mode === "celebrate"
                      ? "scale-150 rotate-45 animate-bounce"
                      : "animate-pulse"
                  }`}
                  style={{
                    transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
                  }}
                >
                  ✨
                </div>

                {/* Mascot with 3D Parallax Tilt */}
                <div
                  className="relative transition-transform duration-200 ease-out will-change-transform flex items-center justify-center"
                  style={{
                    transform: `
                      rotateY(${mousePos.x * 22}deg)
                      rotateX(${-mousePos.y * 22}deg)
                      translateZ(${isHovered ? 30 : 0}px)
                      translateY(${mode === "wave" ? "-18px" : mode === "celebrate" ? "-26px" : "0px"})
                      scale(${mode === "search" ? 1.08 : mode === "celebrate" ? 1.05 : 1})
                    `,
                  }}
                >
                  <div
                    className={`relative flex items-center justify-center ${
                      mode === "idle" ? "animate-[bounce_3.5s_infinite_ease-in-out]" : ""
                    }`}
                    style={{ animationDuration: `${3.5 / speed}s` }}
                  >
                    <Image
                      src="/mascot.png"
                      alt="León Mascota Mentora"
                      width={418}
                      height={418}
                      priority
                      className={`w-72 sm:w-84 h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                        mode === "wink"
                          ? "rotate-2 scale-105"
                          : mode === "search"
                          ? "-rotate-2"
                          : mode === "wave"
                          ? "rotate-3"
                          : ""
                      }`}
                    />

                    {/* Lens glint */}
                    <div
                      className="absolute w-24 h-24 rounded-full pointer-events-none mix-blend-overlay transition-all duration-200"
                      style={{
                        left: "22%",
                        top: "22%",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(56,189,248,0.4) 40%, transparent 70%)",
                        transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px) scale(${
                          mode === "search" ? 1.3 : 1
                        })`,
                        opacity: isHovered || mode === "search" ? 0.9 : 0.4,
                      }}
                    />
                  </div>
                </div>

                {/* Status pill */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2 shadow-lg backdrop-blur-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      mode === "idle"
                        ? "bg-emerald-400 animate-ping"
                        : mode === "search"
                        ? "bg-sky-400 animate-pulse"
                        : "bg-amber-400 animate-bounce"
                    }`}
                  />
                  <span>
                    Estado:{" "}
                    <strong className="text-white capitalize">
                      {mode === "idle"
                        ? "Respiración & Flotación"
                        : mode === "search"
                        ? "Examinando con Lupa"
                        : mode === "wink"
                        ? "Guiño & Saludo"
                        : mode === "wave"
                        ? "Saludando"
                        : "¡Celebración!"}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {/* ACTION TRIGGERS */}
            {viewType === "interactive" && (
              <div className="w-full max-w-[460px] mt-4 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setMode("search")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === "search"
                      ? "bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>🔍</span>
                  <span>Modo Lupa</span>
                </button>

                <button
                  onClick={() => setMode("wink")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === "wink"
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>😉</span>
                  <span>Guiño</span>
                </button>

                <button
                  onClick={() => setMode("wave")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === "wave"
                      ? "bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/25"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>👋</span>
                  <span>Saludar</span>
                </button>

                <button
                  onClick={() => setMode("celebrate")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === "celebrate"
                      ? "bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/25"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>🎉</span>
                  <span>Celebrar</span>
                </button>

                <button
                  onClick={() => setMode("idle")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === "idle"
                      ? "bg-emerald-500 text-slate-950 border-emerald-400"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <span>🔄</span>
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: RIVE CLOUD & FILE DETAILS (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* FILE SYNCED CARD */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Archivo en Rive.app</h3>
                    <p className="text-[11px] text-emerald-400 font-mono">
                      ID Remoto: #2733949
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                  Synced Online
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Proyecto Rive:</span>
                  <span className="font-semibold text-white">Personal Files (#2059551)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Nombre de Archivo:</span>
                  <span className="font-semibold text-white">rive-mascot</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Revisión:</span>
                  <span className="font-mono text-amber-400">#50052028 (rive-cli push)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Objetos Subidos:</span>
                  <span className="font-semibold text-white">61 objetos, 1 imagen asset</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href="https://editor.rive.app/file/rive-mascot/2733949"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Abrir archivo en el navegador</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* RML CODE EXPLORER */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>📄</span>
                  <span>Escena RML Local</span>
                </h3>
                <button
                  onClick={() => setShowRmlCode(!showRmlCode)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer font-medium"
                >
                  {showRmlCode ? "Ocultar" : "Ver RML"}
                </button>
              </div>

              {showRmlCode ? (
                <pre className="p-3 bg-slate-950 rounded-xl border border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56 scrollbar-thin">
                  {rmlSnippet}
                </pre>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="block text-slate-400 text-[10px]">Artboard</span>
                    <strong className="text-white">500 x 500 px</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="block text-slate-400 text-[10px]">Duración</span>
                    <strong className="text-white">60 fps · 180f</strong>
                  </div>
                </div>
              )}
            </div>

            {/* SPEED CONTROLS */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Velocidad de Movimiento:
              </span>
              <div className="flex gap-1.5">
                {[0.5, 1, 1.5, 2].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSpeed(val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      speed === val
                        ? "bg-amber-500 text-slate-950"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
