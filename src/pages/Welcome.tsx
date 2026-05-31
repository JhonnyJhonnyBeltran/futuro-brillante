import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Sparkles, Compass, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/supabase";

const STEPS = [
  { icon: ClipboardList, label: "Responde", desc: "15 preguntas rápidas", bg: "rgba(59,130,246,0.08)", color: "#3b82f6" },
  { icon: Sparkles, label: "Analizamos", desc: "Tu perfil único", bg: "rgba(255,107,53,0.08)", color: "#ff6b35" },
  { icon: Compass, label: "Descubre", desc: "Tu ciclo ideal", bg: "rgba(16,185,129,0.08)", color: "#10b981" },
];


const Welcome = () => {
  const navigate = useNavigate();

  const start = () => {
    trackEvent("quiz_start");
    navigate("/cuestionario");
  };

  return (
    <div className="mobile-shell dot-pattern">
      <div
        className="blob"
        style={{
          width: 340,
          height: 340,
          top: -100,
          left: -100,
          background: "rgba(255,107,53,0.06)",
          animation: "blob-float 8s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          bottom: -80,
          right: -80,
          background: "rgba(59,130,246,0.06)",
          animation: "blob-float 10s ease-in-out infinite reverse",
        }}
      />

      <main className="shell-scroll relative z-10 flex flex-col items-center px-5 sm:px-6 pt-6 sm:pt-8 pb-5">

        {/* Logo del centro */}
        <div className="flex shrink-0 flex-col items-center text-center anim-fade-up gap-2">
          <div
            style={{
              borderRadius: "1.25rem",
              boxShadow: "0 4px 24px rgba(255,107,53,0.18), 0 1px 4px rgba(0,0,0,0.08)",
              background: "#fff",
              padding: "6px",
              display: "inline-flex",
            }}
          >
            <img
              src="/logo.png"
              alt="CPIFP El Arenal"
              style={{ width: "clamp(64px,18vw,80px)", height: "clamp(64px,18vw,80px)", borderRadius: "0.875rem", display: "block" }}
            />
          </div>
          <div>
            <p className="font-extrabold text-primary text-[15px] leading-tight tracking-tight">
              CPIFP El Arenal
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Centro Público Integrado de Formación Profesional
            </p>
          </div>
        </div>

        {/* Hero */}
        <div
          className="flex min-h-0 flex-1 flex-col items-center justify-center text-center py-4 sm:py-6 anim-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <h1 className="text-[clamp(2rem,9vw,3rem)] leading-[1.05] font-black tracking-tight mb-2">
            Encuentra tu
            <br />
            <span className="text-gradient-accent">Ciclo Ideal</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground max-w-xs sm:max-w-sm leading-relaxed mt-1 mb-6 sm:mb-7">
            Responde unas preguntas y descubre qué formación profesional encaja mejor contigo.
          </p>

          {/* Áreas preview */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xs sm:max-w-sm mb-5 sm:mb-6">
            {STEPS.map(({ icon: Icon, label, desc, bg, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 sm:py-4 px-2 rounded-2xl"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} strokeWidth={2} />
                <span className="text-[11px] sm:text-xs font-semibold text-foreground leading-tight text-center">
                  {label}
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight text-center">
                  {desc}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* CTA */}
        <div
          className="w-full shrink-0 anim-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <button
            onClick={start}
            className="btn-primary w-full text-base flex items-center justify-center gap-2"
          >
            Comenzar el test
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>

          <div className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
            <p>
              El cuestionario es orientativo y guarda solo los datos necesarios para generar tu informe.
            </p>
            <Link to="/privacidad" className="font-semibold text-primary hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
