import { useState } from "react";
import type { CicloConPuntuacion } from "@/data/ciclos";

type Props = { result: CicloConPuntuacion; rank: number };

type Phase = "idle" | "fold-out" | "fold-in";

const MAX_SCORE = 12;

const ResultCard = ({ result, rank }: Props) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showFront, setShowFront] = useState(false);

  const percentage = Math.max(
    0,
    Math.min(100, Math.round((result.puntuacion / MAX_SCORE) * 100))
  );

  const handleFlip = () => {
    if (phase !== "idle" || showFront) return;

    setPhase("fold-out");

    setTimeout(() => {
      setShowFront(true);
      setPhase("fold-in");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
        });
      });
    }, 320);
  };

  // Estilos de rotación según la fase
  const rotStyle = (): React.CSSProperties => {
    if (phase === "fold-out")
      return { transform: "rotateY(90deg)", transition: "transform 320ms ease-in" };
    if (phase === "fold-in")
      return { transform: "rotateY(-90deg)", transition: "none" };
    // idle
    return {
      transform: "rotateY(0deg)",
      transition: showFront ? "transform 320ms ease-out" : "none",
    };
  };

  return (
    // El contenedor siempre tiene la altura de la cara delantera
    <div
      onClick={handleFlip}
      style={{ position: "relative", cursor: showFront ? "default" : "pointer", perspective: "800px" }}
    >
      {/* Cara delantera — siempre renderizada para fijar la altura del contenedor */}
      <div
        style={{
          visibility: showFront ? "visible" : "hidden",
          willChange: "transform",
          userSelect: "none",
          ...rotStyle(),
        }}
      >
        <div className="question-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="pill-dark">{result.nivel}</span>
            {rank === 0 && (
              <span className="text-[11px] font-bold text-gradient-primary">
                ⭐ Mejor coincidencia
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight mb-1">
            {result.nombre}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
            {result.area}
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {result.descripcion}
          </p>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-muted-foreground">
              Afinidad con tu perfil
            </span>
            <span className="text-sm font-bold text-gradient-accent">
              {percentage}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>

      {/* Cara trasera — encima, absolute, misma altura que la delantera */}
      {!showFront && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
            userSelect: "none",
            ...rotStyle(),
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "1.25rem",
              background: "var(--gradient-accent)",
              backgroundSize: "200% 200%",
              animation: "gradient-flow 4s ease infinite",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.75rem 1.5rem",
              gap: 10,
            }}
          >
            {rank === 0 && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ⭐ Mejor coincidencia
              </span>
            )}
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                color: "white",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {result.nombre}
            </h3>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              Pulsa para ver más
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
