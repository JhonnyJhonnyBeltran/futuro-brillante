type Props = { current: number; total: number };

const ProgressBar = ({ current, total }: Props) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-5 pb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">
          Pregunta {current} de {total}
        </span>
        <span className="text-xs font-bold text-gradient-accent">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
