import { useCallback, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { PREGUNTAS_FASE1, PREGUNTAS_FASE2 } from "@/data/preguntas";
import type { FamiliaKey } from "@/data/ciclos";
import type { CicloConPuntuacion } from "@/data/ciclos";
import { calcularRecomendaciones, detectarFamilia } from "@/lib/scoring-v2";
import Header from "@/components/Header";
import ResultadosCiclos from "@/components/ResultadosCiclos";
import { submitQuiz } from "@/lib/supabase";

const PASOS_FASE1 = 6;
const PASOS_FASE2 = 4;

// Barra de progreso: línea + puntos + bola deslizante
// step: posición dentro de la fase (0-based), total: puntos de esa fase
const ProgressTrack = ({ step, total }: { step: number; total: number }) => {
  const ratio = total > 1 ? step / (total - 1) : 0;
  const ballLeft = `calc(${ratio} * (100% - 14px) + 7px)`;
  const fillWidth = `calc(${ratio} * (100% - 14px))`;

  return (
    <div className="px-5 sm:px-6 pt-3 pb-4">
      <div className="relative" style={{ height: 24 }}>
        {/* Carril base */}
        <div
          style={{
            position: "absolute",
            left: 7,
            right: 7,
            top: "50%",
            height: 2,
            transform: "translateY(-50%)",
            background: "hsl(var(--border))",
            borderRadius: 9999,
          }}
        />
        {/* Relleno animado */}
        <div
          style={{
            position: "absolute",
            left: 7,
            top: "50%",
            height: 2,
            transform: "translateY(-50%)",
            background: "var(--gradient-accent)",
            backgroundSize: "200% 200%",
            animation: "gradient-flow 4s ease infinite",
            borderRadius: 9999,
            width: fillWidth,
            transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Puntos fijos */}
        <div className="absolute inset-0 flex items-center justify-between px-[3.5px]">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "9999px",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
                background: i < step ? "hsl(var(--primary))" : "white",
                border: i < step ? "none" : "1.5px solid hsl(var(--border))",
                transition: "background 300ms ease, border-color 300ms ease",
              }}
            />
          ))}
        </div>
        {/* Bola deslizante */}
        <div
          style={{
            position: "absolute",
            left: ballLeft,
            top: "50%",
            width: 14,
            height: 14,
            borderRadius: "9999px",
            background: "var(--gradient-accent)",
            backgroundSize: "200% 200%",
            animation: "gradient-flow 4s ease infinite",
            transform: "translate(-50%, -50%)",
            transition: "left 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow:
              "0 0 0 3px rgba(255, 107, 53, 0.18), 0 2px 8px rgba(255, 107, 53, 0.35)",
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
};

interface OpcionBtnProps {
  clave: string;
  emoji: string;
  texto: string;
  selected: boolean;
  onClick: () => void;
}

const OpcionBtn = ({ clave, emoji, texto, selected, onClick }: OpcionBtnProps) => (
  <button
    type="button"
    className={`option-btn tap-fast${selected ? " selected" : ""}`}
    aria-pressed={selected}
    data-key={clave}
    onClick={onClick}
  >
    <span className="overlay" />
    <span
      className="shrink-0 relative z-10"
      style={{ fontSize: "1.35rem", lineHeight: 1 }}
      aria-hidden
    >
      {emoji}
    </span>
    <span className="option-text font-medium text-[15px] text-foreground leading-snug flex-1 text-center relative z-10">
      {texto}
    </span>
    <Check className="check-icon" strokeWidth={3} />
  </button>
);

const Cuestionario = () => {
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [familiaDetectada, setFamiliaDetectada] = useState<FamiliaKey | null>(null);
  const [resultado, setResultado] = useState<CicloConPuntuacion[] | null>(null);
  const [visible, setVisible] = useState(true);
  const bloqueado = useRef(false);

  const preguntaActual = useMemo(() => {
    if (step < 6) return PREGUNTAS_FASE1[step];
    if (familiaDetectada) return PREGUNTAS_FASE2[familiaDetectada][step - 6];
    return null;
  }, [step, familiaDetectada]);

  const respuestaActual = preguntaActual ? respuestas[preguntaActual.id] : undefined;

  const buildStatsPayload = useCallback((questionMap: Record<string, string>) => {
    const surveyQuestions = [...PREGUNTAS_FASE1, ...(familiaDetectada ? PREGUNTAS_FASE2[familiaDetectada] : [])];

    const questions = surveyQuestions.map((question) => ({
      question_id: question.id,
      question_text: question.texto,
      phase: question.fase,
      family: question.familia,
    }));

    const answers = questions
      .map((question) => {
        const selectedKey = questionMap[question.question_id];
        const sourceQuestion = surveyQuestions.find(
          (item) => item.id === question.question_id,
        );
        const selectedOption = sourceQuestion?.opciones.find((option) => option.clave === selectedKey);

        return selectedKey && selectedOption
          ? {
              question_id: question.question_id,
              answer_key: selectedKey,
              answer_text: selectedOption.texto,
            }
          : null;
      })
      .filter((value): value is { question_id: string; answer_key: string; answer_text: string } => value !== null);

    return { questions, answers };
  }, [familiaDetectada]);

  const transicionar = useCallback((fn: () => void) => {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
      bloqueado.current = false;
    }, 200);
  }, []);

  const handleSelect = useCallback(
    (clave: string) => {
      if (bloqueado.current || !preguntaActual) return;

      const nuevasRespuestas = { ...respuestas, [preguntaActual.id]: clave };
      setRespuestas(nuevasRespuestas);
      bloqueado.current = true;

      setTimeout(() => {
        if (step === 5) {
          // Fin de Fase 1: detectar familia y avanzar a Fase 2
          const familia = detectarFamilia(nuevasRespuestas);
          transicionar(() => {
            setFamiliaDetectada(familia);
            setStep(6);
          });
        } else if (step === 9) {
          void (async () => {
            const recs = calcularRecomendaciones(nuevasRespuestas);
            const mainResult = recs[0]?.nombre ?? "Unknown";
            const sessionId = sessionStorage.getItem("eligetufuturo_session_id") ?? crypto.randomUUID();
            const { questions, answers } = buildStatsPayload(nuevasRespuestas);

            sessionStorage.setItem("eligetufuturo_session_id", sessionId);
            await submitQuiz("cuestionario", questions, answers, mainResult, { session_id: sessionId });
            transicionar(() => setResultado(recs));
          })();
        } else {
          transicionar(() => setStep((s) => s + 1));
        }
      }, 150);
    },
    [step, respuestas, preguntaActual, transicionar, buildStatsPayload],
  );

  const handleAtras = useCallback(() => {
    if (bloqueado.current || step === 0) return;
    bloqueado.current = true;

    const nuevasRespuestas = { ...respuestas };
    if (preguntaActual) delete nuevasRespuestas[preguntaActual.id];

    transicionar(() => {
      setRespuestas(nuevasRespuestas);
      if (step === 6) {
        setFamiliaDetectada(null);
        setStep(5);
      } else {
        setStep((s) => s - 1);
      }
    });
  }, [step, respuestas, preguntaActual, transicionar]);

  const handleReset = useCallback(() => {
    setStep(0);
    setRespuestas({});
    setFamiliaDetectada(null);
    setResultado(null);
    setVisible(true);
    bloqueado.current = false;
  }, []);

  if (resultado && familiaDetectada) {
    return (
      <div className="mobile-shell">
        <Header />
        <ResultadosCiclos
          ciclos={resultado}
          familia={familiaDetectada}
          onReset={handleReset}
        />
      </div>
    );
  }

  if (!preguntaActual) return null;

  const esFase2 = step >= PASOS_FASE1;
  const fasoPaso = esFase2 ? step - PASOS_FASE1 : step;
  const fasoTotal = esFase2 ? PASOS_FASE2 : PASOS_FASE1;

  return (
    <div
      className="mobile-shell"
      style={{ display: "flex", flexDirection: "column", overflowY: "hidden" }}
    >
      <Header />
      <ProgressTrack step={fasoPaso} total={fasoTotal} />

      {/* Zona de pregunta: ocupa el espacio restante y scrollea internamente si hace falta */}
      <main
        className="px-4 sm:px-5 md:px-6"
        style={{ flex: 1, overflowY: "auto", paddingBottom: "1.25rem" }}
      >
        {/* Indicador de fase */}
        <div className="flex items-center justify-between mb-3">
          <span className="pill-dark">
            {esFase2 ? "Orientación específica" : "Orientación general"}
          </span>
          <span className="text-xs text-muted-foreground">
            {fasoPaso + 1} de {fasoTotal}
          </span>
        </div>

        {/* Tarjeta de pregunta */}
        <div
          className="question-card"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          <div className="px-4 sm:px-6 pt-6 pb-2">
            <h2 className="text-[1.05rem] sm:text-[1.125rem] font-bold text-foreground leading-snug mb-5">
              {preguntaActual.texto}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              No hay respuestas correctas o incorrectas. Elige la opcion que mejor conecte contigo hoy.
            </p>

            <div className="flex flex-col gap-3">
              {preguntaActual.opciones.map((opcion) => (
                <OpcionBtn
                  key={opcion.clave}
                  clave={opcion.clave}
                  emoji={opcion.emoji}
                  texto={opcion.texto}
                  selected={respuestaActual === opcion.clave}
                  onClick={() => handleSelect(opcion.clave)}
                />
              ))}
            </div>
          </div>

          {/* Pie de tarjeta: botón Atrás */}
          <div className="px-4 sm:px-6 py-4 mt-3 border-t border-border">
            <button
              type="button"
              className="btn-secondary tap-fast w-full"
              onClick={handleAtras}
              disabled={step === 0}
              style={{ opacity: step === 0 ? 0.4 : 1 }}
            >
              Atrás
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cuestionario;
