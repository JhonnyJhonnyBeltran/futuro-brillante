import { useNavigate } from "react-router-dom";
import { GraduationCap, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/supabase";

const Welcome = () => {
  const navigate = useNavigate();

  const start = () => {
    trackEvent("quiz_start");
    navigate("/quiz");
  };

  return (
    <div className="mobile-shell dot-pattern">
      {/* Background blobs */}
      <div className="blob" style={{ width: 300, height: 300, top: -80, left: -80, background: "rgba(255,107,53,0.05)", animation: "blob-float 8s ease-in-out infinite" }} />
      <div className="blob" style={{ width: 280, height: 280, bottom: -60, right: -60, background: "rgba(59,130,246,0.05)", animation: "blob-float 10s ease-in-out infinite reverse" }} />

      <div className="relative z-10 flex flex-col items-center px-6 pt-10 pb-8 min-h-[100dvh] safe-top safe-bottom">
        {/* Logo block */}
        <div className="flex flex-col items-center text-center anim-fade-up">
          <div
            className="flex items-center justify-center mb-3"
            style={{
              width: 64, height: 64, borderRadius: "1rem",
              background: "var(--gradient-primary)",
              boxShadow: "var(--shadow-orange)",
            }}
          >
            <GraduationCap className="text-white" size={34} strokeWidth={2.4} />
          </div>
          <h2 className="font-extrabold text-primary text-lg leading-tight">CPIFP El Arenal</h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-[260px]">
            Centro Público Integrado de Formación Profesional
          </p>
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-8 anim-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative mb-6">
            <div
              className="flex items-center justify-center"
              style={{
                width: 140, height: 140, borderRadius: "9999px",
                background: "var(--gradient-accent)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Sparkles className="text-white" size={64} strokeWidth={2} />
            </div>
            <div
              className="absolute -bottom-2 -right-2 flex items-center justify-center text-white font-bold"
              style={{
                width: 44, height: 44, borderRadius: "9999px",
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-orange)",
              }}
            >
              ✓
            </div>
          </div>

          <h1 className="text-[2.25rem] leading-[1.05] font-black tracking-tight">
            <span className="text-gradient-accent">Elige tu Futuro</span>
          </h1>
          <p className="text-[15px] text-muted-foreground mt-3 max-w-[300px] leading-relaxed">
            Descubre el ciclo formativo ideal para ti
          </p>
        </div>

        {/* CTA */}
        <div className="w-full anim-fade-up" style={{ animationDelay: "240ms" }}>
          <button onClick={start} className="btn-primary w-full text-base">
            Comenzar →
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            ~5 minutos · Totalmente gratuito
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
