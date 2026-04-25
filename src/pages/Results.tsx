import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";
import Header from "@/components/Header";
import ResultCard from "@/components/ResultCard";
import { computeResults } from "@/lib/scoring";
import { trackEvent } from "@/lib/supabase";

const Results = () => {
  const navigate = useNavigate();

  const results = useMemo(() => {
    const raw = sessionStorage.getItem("eligetufuturo_answers");
    const answers = raw ? JSON.parse(raw) : {};
    return computeResults(answers).slice(0, 3);
  }, []);

  useEffect(() => {
    trackEvent("results_view", { top: results[0]?.family });
  }, [results]);

  const restart = () => {
    sessionStorage.removeItem("eligetufuturo_answers");
    navigate("/");
  };

  const moreInfo = () => {
    window.open("https://www.cpifpelarenal.es", "_blank", "noopener,noreferrer");
  };

  const share = async () => {
    const text = `Mi mejor coincidencia en "Elige tu Futuro" es ${results[0]?.label} (${results[0]?.percentage}%) — CPIFP El Arenal`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Elige tu Futuro", text, url: window.location.origin });
        trackEvent("results_share");
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Resultado copiado al portapapeles");
    }
  };

  return (
    <div className="mobile-shell">
      <Header />
      <main className="px-4 pt-4 pb-10">
        <div className="text-center mb-6 anim-fade-up">
          <h1 className="text-[1.75rem] font-black leading-tight">
            <span className="text-gradient-accent">🎉 ¡Tus resultados!</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 px-2">
            Basándonos en tus respuestas, estos son los ciclos formativos más adecuados para ti
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {results.map((r, i) => (
            <div key={r.family} className="anim-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <ResultCard result={r} rank={i} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={moreInfo} className="btn-primary w-full">
            Ver más información
          </button>
          <button onClick={restart} className="btn-secondary w-full">
            Repetir test
          </button>
        </div>

        <button
          onClick={share}
          className="mt-6 mx-auto flex items-center gap-2 text-sm font-semibold text-gradient-accent"
        >
          <Share2 size={16} />
          Compartir mis resultados
        </button>
      </main>
    </div>
  );
};

export default Results;
