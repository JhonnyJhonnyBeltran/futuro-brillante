import { useEffect, useState } from "react";
import { X, ThumbsUp, ThumbsDown } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAnswer: (satisfecho: boolean) => void;
}

const CLOSE_ANIMATION_MS = 260;

const SatisfaccionModal = ({ open, onClose, onAnswer }: Props) => {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(true);
      requestAnimationFrame(() => setClosing(false));
      return;
    }

    if (!mounted) return;

    setClosing(true);
    const id = window.setTimeout(() => setMounted(false), CLOSE_ANIMATION_MS);
    return () => window.clearTimeout(id);
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:max-w-md bg-white sm:rounded-2xl shadow-2xl overflow-hidden transform-gpu transition-all duration-300 ease-out ${
          closing
            ? "translate-y-full opacity-0 sm:translate-y-12"
            : "translate-y-0 opacity-100"
        }`}
        style={{ maxHeight: "95dvh", overflowY: "auto" }}
      >
        {/* Cabecera con gradiente */}
        <div
          className="sticky top-0 z-10 px-5 pt-5 pb-4 text-white"
          style={{
            background: "var(--gradient-accent)",
            backgroundSize: "200% 200%",
            animation: "gradient-flow 4s ease infinite",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          <h2 className="text-[1.15rem] font-black leading-tight pr-8">
            ¿Qué te parecen los resultados?
          </h2>
          <p className="text-sm text-white/85 mt-1">
            Tu opinión nos ayuda a mejorar la orientación
          </p>
        </div>

        {/* Cuerpo */}
        <div className="px-5 pt-5 pb-6">
          <p className="text-sm text-muted-foreground leading-relaxed text-center mb-5">
            ¿Crees que estos ciclos formativos se adaptan a tus intereses y expectativas?
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onAnswer(true)}
              className="btn-primary w-full tap-fast"
            >
              <ThumbsUp size={18} />
              Sí, encajan con lo que esperaba
            </button>
            <button
              type="button"
              onClick={() => onAnswer(false)}
              className="btn-secondary w-full tap-fast"
            >
              <ThumbsDown size={18} />
              No del todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfaccionModal;
