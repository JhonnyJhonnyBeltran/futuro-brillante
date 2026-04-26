type Props = { current: number; total: number };

const ProgressBar = ({ current, total }: Props) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-4 sm:px-5 md:px-6 pt-2 sm:pt-3 pb-3 sm:pb-4">
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
