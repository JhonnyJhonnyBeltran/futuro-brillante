import { ScoredFamily } from "@/lib/scoring";

type Props = { result: ScoredFamily; rank: number };

const ResultCard = ({ result, rank }: Props) => {
  return (
    <div className="question-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="pill-dark">{result.label}</span>
        {rank === 0 && (
          <span className="text-[11px] font-bold text-gradient-primary">⭐ Mejor coincidencia</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-foreground leading-tight mb-1">
        {result.label}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {result.description}
      </p>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-muted-foreground">Coincidencia</span>
        <span className="text-sm font-bold text-gradient-accent">{result.percentage}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${result.percentage}%` }} />
      </div>
    </div>
  );
};

export default ResultCard;
