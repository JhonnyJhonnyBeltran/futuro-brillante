import type { CicloConPuntuacion } from "@/data/ciclos";

type Props = { result: CicloConPuntuacion; rank: number };

const ResultCard = ({ result, rank }: Props) => {
  // Calcular porcentaje de puntuación (normalizado 0-100)
  const maxScore = 12; // Máxima puntuación posible en scoring-v2
  const percentage = Math.max(0, Math.min(100, Math.round((result.puntuacion / maxScore) * 100)));

  return (
    <div className="question-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="pill-dark">{result.nivel}</span>
        {rank === 0 && (
          <span className="text-[11px] font-bold text-gradient-primary">⭐ Mejor coincidencia</span>
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
        <span className="text-xs font-semibold text-muted-foreground">Afinidad con tu perfil</span>
        <span className="text-sm font-bold text-gradient-accent">{percentage}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ResultCard;
