import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getAnalyticsConsent, setAnalyticsConsent } from "@/lib/supabase";

const AnalyticsConsentBanner = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
  }, []);

  if (consent !== null) return null;

  const accept = () => {
    setAnalyticsConsent(true);
    setConsent(true);
  };

  const decline = () => {
    setAnalyticsConsent(false);
    setConsent(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:px-6">
      <div className="mx-auto w-full max-w-[430px] rounded-[1.5rem] border border-border bg-white/96 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md anim-fade-up">
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "var(--gradient-accent)", color: "white" }}
          >
            <ShieldCheck size={20} />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
              Consentimiento de analítica
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
              La app puede registrar eventos de uso para mejorar la experiencia. Solo se enviarán si aceptas.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Puedes rechazar la analítica y seguir usando la app. Consulta la{' '}
              <Link to="/privacidad" className="font-semibold text-primary hover:underline">
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            Solo esenciales
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:translate-y-[-1px]"
          >
            <Sparkles size={16} />
            Aceptar analítica
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsConsentBanner;