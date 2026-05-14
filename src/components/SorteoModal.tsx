import { useState } from "react";
import { X } from "lucide-react";
import { submitRaffle } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

const SorteoModal = ({ open, onClose, onSuccess }: Props) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acepta) return;
    setEnviando(true);
    setErrorMsg("");
    const result = await submitRaffle({ nombreCompleto: nombre, email });
    setEnviando(false);
    if (result.success) {
      onSuccess();
    } else {
      setErrorMsg("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-md bg-white sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "95dvh", overflowY: "auto" }}
      >
        {/* Cabecera con gradiente */}
        <div
          className="relative px-5 pt-5 pb-4 text-white"
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
          <h2 className="text-[1.15rem] font-black leading-tight">
            ¡Sorteo Descubre-T!
          </h2>
          <p className="text-sm text-white/85 mt-1">
            Participa y gana una experiencia exclusiva en el centro
          </p>
        </div>

        {/* Cuerpo */}
        <div className="px-5 pt-4 pb-6">
          {/* Premio */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <p
              className="text-[0.7rem] font-black uppercase tracking-wider mb-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              Premio
            </p>
            <p className="text-sm font-bold text-foreground leading-snug mb-1.5">
              Visita guiada a los talleres y laboratorios de CPIFP El Arenal
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vivirás en primera persona las instalaciones de los ciclos formativos más afines a tu perfil,
              de la mano del alumnado y el profesorado del centro. Una jornada de experiencia real
              dentro del programa <strong>Descubre-T</strong>.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                Nombre completo *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre y apellidos"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                Correo electrónico *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className={inputClass}
              />
            </div>

            {/* Checkbox de consentimiento */}
            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded"
                style={{ accentColor: "hsl(var(--primary))" }}
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Consiento el tratamiento de mis datos personales (nombre y correo) para la gestión
                de este sorteo, conforme al <strong>RGPD (UE) 2016/679</strong> y la{" "}
                <strong>LOPDGDD 3/2018</strong>. Esta participación es <strong>voluntaria</strong>{" "}
                y completamente ajena al cuestionario de orientación, el cual es anónimo y no puede
                relacionarse con estos datos.
              </span>
            </label>

            {errorMsg && (
              <p className="text-xs text-red-500 text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={!acepta || enviando}
              className="btn-primary w-full mt-1 tap-fast"
              style={{ opacity: !acepta || enviando ? 0.45 : 1 }}
            >
              {enviando ? "Inscribiendo..." : "Participar en el sorteo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SorteoModal;
