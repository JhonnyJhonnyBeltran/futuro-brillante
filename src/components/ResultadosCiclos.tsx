import type { CicloConPuntuacion, FamiliaKey } from "@/data/ciclos";

const FAMILIA_LABEL: Record<FamiliaKey, string> = {
  FABRICACION: "Fabricación Mecánica",
  ELECTRICA: "Electricidad y Electrónica",
  CONSTRUCCION: "Edificación y Obra Civil",
  GESTION: "Gestión y Planificación",
  DIGITAL: "Automatización y Digital",
};

interface Props {
  ciclos: CicloConPuntuacion[];
  familia: FamiliaKey;
  onReset: () => void;
}

const NivelBadge = ({ nivel }: { nivel: string }) => (
  <span className="pill-dark">{nivel}</span>
);

const AreaBadge = ({ area }: { area: string }) => (
  <span
    className="inline-flex items-center text-xs font-semibold text-muted-foreground"
    style={{
      background: "hsl(var(--muted))",
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      border: "1px solid hsl(var(--border))",
    }}
  >
    {area}
  </span>
);

const ResultadosCiclos = ({ ciclos: resultados, familia, onReset }: Props) => {
  const [primero, ...resto] = resultados;

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-5 md:px-6 pt-4 pb-8 anim-fade-up">

      {/* Etiqueta de familia detectada */}
      <div
        className="anim-fade-up"
        style={{
          borderRadius: "1rem",
          background: "hsl(var(--muted))",
          border: "1px solid hsl(var(--border))",
          padding: "0.875rem 1rem",
        }}
      >
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground mb-1">
          Tu área vocacional
        </p>
        <p
          className="text-[1.05rem] font-black leading-snug text-gradient-accent"
          style={{ display: "inline-block" }}
        >
          {FAMILIA_LABEL[familia]}
        </p>
      </div>

      {/* Cabecera */}
      <div className="text-center">
        <h2 className="text-[clamp(1.1rem,5vw,1.35rem)] font-black leading-tight text-foreground">
          Ciclos formativos recomendados
        </h2>
        <p className="text-sm text-muted-foreground mt-1 px-2">
          Ordenados de mayor a menor afinidad con tu perfil.
        </p>
      </div>

      {/* Tarjeta principal */}
      {primero && (
        <div
          className="question-card anim-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <div className="px-5 pt-6 pb-5">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: "hsl(var(--primary))", letterSpacing: "0.08em" }}
            >
              Opción más afín
            </span>
            <h3 className="text-[1.15rem] font-black text-foreground leading-snug mb-3">
              {primero.nombre}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <NivelBadge nivel={primero.nivel} />
              <AreaBadge area={primero.area} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {primero.descripcion}
            </p>
          </div>
        </div>
      )}

      {/* Tarjetas secundarias */}
      {resto.map((ciclo, i) => (
        <div
          key={ciclo.id}
          className="anim-fade-up"
          style={{ animationDelay: `${(i + 2) * 80}ms` }}
        >
          <div
            className="relative bg-white overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              border: "2px solid hsl(var(--border))",
              padding: "1rem 1.25rem",
            }}
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {i === 0 ? "Segunda opción" : "Tercera opción"}
            </p>
            <h3 className="text-[1rem] font-bold text-foreground leading-snug mb-2">
              {ciclo.nombre}
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <NivelBadge nivel={ciclo.nivel} />
              <AreaBadge area={ciclo.area} />
            </div>
            <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
              {ciclo.descripcion}
            </p>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onReset}
        className="btn-secondary w-full mt-2 tap-fast"
      >
        Comenzar de nuevo
      </button>
    </div>
  );
};

export default ResultadosCiclos;
