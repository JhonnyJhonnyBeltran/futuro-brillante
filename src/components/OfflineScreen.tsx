import { WifiOff, RefreshCw } from "lucide-react";

const OfflineScreen = () => {
  const retry = () => window.location.reload();

  return (
    <div className="mobile-shell dot-pattern">
      {/* Background blobs */}
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          top: -80,
          left: -80,
          background: "rgba(255,107,53,0.05)",
          animation: "blob-float 8s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 280,
          height: 280,
          bottom: -60,
          right: -60,
          background: "rgba(59,130,246,0.05)",
          animation: "blob-float 10s ease-in-out infinite reverse",
        }}
      />

      <main className="shell-scroll relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-5 md:px-6 py-4 sm:py-6">
        <div className="anim-fade-up flex shrink-0 flex-col items-center">
          <div
            className="flex items-center justify-center mb-6"
            style={{
              width: "clamp(96px, 30vw, 120px)",
              height: "clamp(96px, 30vw, 120px)",
              borderRadius: "9999px",
              background: "var(--gradient-accent)",
              backgroundSize: "200% 200%",
              animation: "gradient-flow 4s ease infinite",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <WifiOff className="text-white" size={48} strokeWidth={2} />
          </div>

          <h1 className="text-[clamp(1.4rem,6vw,1.75rem)] font-black leading-tight">
            <span className="text-gradient-accent">Sin conexión</span>
          </h1>

          <p className="text-[15px] text-muted-foreground mt-2 max-w-xs sm:max-w-sm leading-relaxed">
            Necesitas conexión a internet para realizar el cuestionario.
            Comprueba tu Wi-Fi o datos móviles e inténtalo de nuevo.
          </p>
        </div>

        <div
          className="w-full mt-6 sm:mt-8 shrink-0 anim-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <button onClick={retry} className="btn-primary w-full text-base">
            <RefreshCw size={18} />
            Reintentar
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            La conexión se restablecerá automáticamente
          </p>
        </div>
      </main>
    </div>
  );
};

export default OfflineScreen;
