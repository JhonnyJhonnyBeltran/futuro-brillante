import { Question } from "@/lib/quiz-data";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  index: number;
  total: number;
  selected?: "A" | "B" | "C" | "D";
  onSelect: (id: "A" | "B" | "C" | "D") => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  isLast: boolean;
  animationClass?: string;
};

const QuestionCard = ({
  question, index, total, selected, onSelect,
  onPrev, onNext, canPrev, isLast, animationClass,
}: Props) => {
  return (
    <div className={`question-card ${animationClass ?? ""}`}>
      <div className="px-4 sm:px-6 pt-6 sm:pt-7 pb-2">
        <span className="pill-dark mb-4">Pregunta {index + 1}</span>
        <h2 className="text-[1.05rem] sm:text-[1.125rem] font-bold text-foreground leading-snug mt-4 mb-6">
          {question.text}
        </h2>
        <div className="flex flex-col gap-3">
          {question.options.map((o) => (
            <OptionButton
              key={o.id}
              letter={o.id}
              text={o.text}
              selected={selected === o.id}
              onClick={() => onSelect(o.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 mt-3 border-t border-border">
        <button
          type="button"
          className="btn-secondary tap-fast w-full sm:w-auto"
          onClick={onPrev}
          disabled={!canPrev}
          style={{ opacity: canPrev ? 1 : 0.4 }}
        >
          ← Anterior
        </button>
        <button
          type="button"
          className="btn-primary tap-fast w-full sm:w-auto"
          onClick={onNext}
          disabled={!selected}
        >
          {isLast ? "Ver resultados" : "Siguiente →"}
        </button>
      </div>
      <div className="text-center text-[11px] text-muted-foreground pb-4">
        {index + 1} / {total}
      </div>
    </div>
  );
};

export default QuestionCard;
