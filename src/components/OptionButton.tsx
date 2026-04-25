import { Check } from "lucide-react";

type Props = {
  letter: "A" | "B" | "C" | "D";
  text: string;
  selected: boolean;
  onClick: () => void;
};

const OptionButton = ({ letter, text, selected, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`option-btn ${selected ? "selected" : ""}`}
      aria-pressed={selected}
    >
      <span className="overlay" />
      <span className="letter-badge option-content">{letter}</span>
      <span className="option-text font-medium text-[15px] text-foreground leading-snug flex-1">
        {text}
      </span>
      <Check className="check-icon" strokeWidth={3} />
    </button>
  );
};

export default OptionButton;
