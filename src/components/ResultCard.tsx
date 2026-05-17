import { useState } from "react";
import type { CicloConPuntuacion } from "@/data/ciclos";

type ResultWithMeta = CicloConPuntuacion & { percentage?: number };
type Props = { result: ResultWithMeta; rank: number };

type Phase = "idle" | "fold-out" | "fold-in";

const RANK_CONFIG = [
  { label: "Mejor coincidencia", emoji: "⭐" },
  { label: "Buena opción", emoji: "🎯" },
  { label: "Compatible", emoji: "✅" },
] as const;

const RankBadge = ({ rank, subtle = false }: { rank: number; subtle?: boolean }) => {
  const { label, emoji } = RANK_CONFIG[rank];
  if (subtle) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "hsl(var(--primary))",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {emoji} {label}
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        border: "none",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
      }}
    >
      {emoji} {label}
    </span>
  );
};

const ResultCard = ({ result, rank }: Props) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showFront, setShowFront] = useState(false);

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

  const rotStyle = (): React.CSSProperties => {
    if (phase === "fold-out")
      return { transform: "rotateY(90deg)", transition: "transform 320ms ease-in" };
    if (phase === "fold-in")
      return { transform: "rotateY(-90deg)", transition: "none" };
    return {
      transform: "rotateY(0deg)",
      transition: showFront ? "transform 320ms ease-out" : "none",
    };
  };

  return (
    <div
      onClick={handleFlip}
      style={{ position: "relative", cursor: showFront ? "default" : "pointer", perspective: "800px" }}
    >
      {/* Cara delantera */}
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
            <RankBadge rank={rank} subtle />
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight mb-1">
            {result.nombre}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
            {result.area}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.descripcion}
          </p>
        </div>
      </div>

      {/* Cara trasera */}
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
              overflow: "hidden",
            }}
          >
            <RankBadge rank={rank} />
            <h3
              style={{
                fontSize: "1.9rem",
                fontWeight: 900,
                color: "white",
                textAlign: "center",
                lineHeight: 1.15,
                textShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            >
              {result.nombreGenerico}
            </h3>
            <span
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              {result.nombre}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                marginTop: 8,
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
