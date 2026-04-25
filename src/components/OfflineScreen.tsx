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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 min-h-[100dvh] safe-top safe-bottom">
        <div className="anim-fade-up flex flex-col items-center">
          <div
            className="flex items-center justify-center mb-6"
            style={{
              width: 120,
              height: 120,
              borderRadius: "9999px",
              background: "var(--gradient-accent)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <WifiOff className="text-white" size={56} strokeWidth={2} />
          </div>

          <h1 className="text-[1.75rem] font-black leading-tight">
            <span className="text-gradient-accent">Sin conexión</span>
          </h1>

          <p className="text-[15px] text-muted-foreground mt-3 max-w-[300px] leading-relaxed">
            Necesitas conexión a internet para realizar el cuestionario.
            Comprueba tu Wi-Fi o datos móviles e inténtalo de nuevo.
          </p>
        </div>

        <div
          className="w-full mt-10 anim-fade-up"
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
      </div>
    </div>
  );
};

export default OfflineScreen;
