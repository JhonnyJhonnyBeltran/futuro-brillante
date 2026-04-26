import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { QUESTIONS } from "@/lib/quiz-data";
import { trackEvent } from "@/lib/supabase";

type AnswerMap = Record<number, "A" | "B" | "C" | "D" | undefined>;

const Quiz = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [anim, setAnim] = useState<string>("anim-enter-right");
  const transitioning = useRef(false);

  const q = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const completed = useRef(false);

  // Warn if leaving mid-quiz
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (completed.current) return;
      if (Object.keys(answers).length === 0) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [answers]);

  const select = (id: "A" | "B" | "C" | "D") => {
    setAnswers((a) => ({ ...a, [q.id]: id }));
  };

  const goTo = (nextIdx: number, direction: "next" | "prev") => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnim(direction === "next" ? "anim-exit-left" : "anim-exit-right");
    setTimeout(() => {
      setIndex(nextIdx);
      setAnim(direction === "next" ? "anim-enter-right" : "anim-enter-left");
      transitioning.current = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 380);
  };

  const onNext = () => {
    if (!answers[q.id]) return;
    trackEvent("quiz_answer", { question: q.id, answer: answers[q.id] });
    if (isLast) {
      completed.current = true;
      sessionStorage.setItem("eligetufuturo_answers", JSON.stringify(answers));
      navigate("/loading");
      return;
    }
    goTo(index + 1, "next");
  };

  const onPrev = () => {
    if (index === 0) return;
    goTo(index - 1, "prev");
  };

  return (
    <div className="mobile-shell">
      <Header />
      <ProgressBar current={index + 1} total={QUESTIONS.length} />

      <main className="px-4 sm:px-5 md:px-6 pt-2 sm:pt-4 pb-8 sm:pb-10">
        <QuestionCard
          key={q.id}
          question={q}
          index={index}
          total={QUESTIONS.length}
          selected={answers[q.id]}
          onSelect={select}
          onPrev={onPrev}
          onNext={onNext}
          canPrev={index > 0}
          isLast={isLast}
          animationClass={anim}
        />
      </main>
    </div>
  );
};

export default Quiz;
