import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSub(true), 1000);
    const t2 = setTimeout(() => navigate("/results"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div className="mobile-shell flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-8">
        <div
          style={{
            width: 96, height: 96, borderRadius: "9999px",
            background: "conic-gradient(from 0deg, #ff6b35, #3b82f6, #ff6b35)",
            mask: "radial-gradient(circle, transparent 55%, black 56%)",
            WebkitMask: "radial-gradient(circle, transparent 55%, black 56%)",
            animation: "spin-grad 1.2s linear infinite",
          }}
          aria-label="cargando"
        />
        <p className="mt-6 text-base font-semibold text-foreground">
          Analizando tus respuestas...
        </p>
        {showSub && (
          <p className="mt-2 text-sm text-muted-foreground anim-fade-up">
            Encontrando tu ciclo formativo ideal
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
