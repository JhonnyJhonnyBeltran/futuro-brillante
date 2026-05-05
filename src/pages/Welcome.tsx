import { useNavigate } from "react-router-dom";
import { GraduationCap, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/supabase";

const Welcome = () => {
  const navigate = useNavigate();

  const start = () => {
    trackEvent("quiz_start");
    navigate("/cuestionario");
  };

  return (
    <div className="mobile-shell dot-pattern">
      {/* Background blobs */}
      <div className="blob" style={{ width: 300, height: 300, top: -80, left: -80, background: "rgba(255,107,53,0.05)", animation: "blob-float 8s ease-in-out infinite" }} />
      <div className="blob" style={{ width: 280, height: 280, bottom: -60, right: -60, background: "rgba(59,130,246,0.05)", animation: "blob-float 10s ease-in-out infinite reverse" }} />

      <div className="relative z-10 flex h-full flex-col items-center px-4 sm:px-5 md:px-6 pt-3 sm:pt-5 md:pt-7 pb-3 sm:pb-5">
        {/* Logo block */}
        <div className="flex shrink-0 flex-col items-center text-center anim-fade-up">
          <div
            className="flex items-center justify-center mb-3"
            style={{
              width: "clamp(52px, 16vw, 64px)",
              height: "clamp(52px, 16vw, 64px)",
              borderRadius: "1rem",
              background: "var(--gradient-primary)",
              backgroundSize: "200% 200%",
              animation: "gradient-flow 4s ease infinite",
              boxShadow: "var(--shadow-orange)",
            }}
          >
            <GraduationCap className="text-white" size={30} strokeWidth={2.4} />
          </div>
          <h2 className="font-extrabold text-primary text-lg leading-tight">CPIFP El Arenal</h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-[260px]">
            Centro Público Integrado de Formación Profesional
          </p>
        </div>

        {/* Hero */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center py-3 sm:py-5 anim-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative mb-4 sm:mb-6">
            <div
              className="flex items-center justify-center"
              style={{
                width: "clamp(106px, 33vw, 140px)",
                height: "clamp(106px, 33vw, 140px)",
                borderRadius: "9999px",
                background: "var(--gradient-accent)",
                backgroundSize: "200% 200%",
                animation: "gradient-flow 4s ease infinite",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Sparkles className="text-white" size={52} strokeWidth={2} />
            </div>
            <div
              className="absolute -bottom-2 -right-2 flex items-center justify-center text-white font-bold"
              style={{
                width: "clamp(34px, 10vw, 44px)",
                height: "clamp(34px, 10vw, 44px)",
                borderRadius: "9999px",
                background: "var(--gradient-primary)",
                backgroundSize: "200% 200%",
                animation: "gradient-flow 4s ease infinite",
                boxShadow: "var(--shadow-orange)",
              }}
            >
              ✓
            </div>
          </div>

          <h1 className="text-[clamp(1.85rem,8vw,2.25rem)] leading-[1.05] font-black tracking-tight">
            <span className="text-gradient-accent">Elige tu Futuro</span>
          </h1>
          <p className="text-[15px] text-muted-foreground mt-2 sm:mt-3 max-w-[300px] leading-relaxed">
            Descubre el ciclo formativo ideal para ti
          </p>
        </div>

        {/* CTA */}
        <div className="w-full shrink-0 anim-fade-up" style={{ animationDelay: "240ms" }}>
          <button onClick={start} className="btn-primary w-full text-base">
            Comenzar →
          </button>
          <p className="text-center text-xs text-muted-foreground mt-2 sm:mt-3">
            Cuestionario anónimo totalmente gratuito 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
