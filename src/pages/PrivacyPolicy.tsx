import { ArrowLeft, BadgeInfo, FileText, ShieldCheck, Clock3, Users, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: FileText,
    title: "Qué datos trata la app",
    body: [
      "Datos del cuestionario de orientación: respuestas, familia o ciclo recomendado, centro, género, edad y duración aproximada del test. El envío y el tratamiento de estos datos requieren tu consentimiento expreso: sin consentimiento no se puede iniciar ni completar el cuestionario desde la app.",
      "Datos del sorteo: nombre completo y correo electrónico, solo si decides participar y marcas la casilla correspondiente.",
      "Datos técnicos y de uso: eventos de inicio, visualización de resultados y eventos de diagnóstico. Estos eventos se registran únicamente si autorizas la analítica al aceptar el cuestionario o al inscribirte en el sorteo.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Para qué se usan",
    body: [
      "Generar las recomendaciones académicas y el informe descargable con tu perfil.",
      "Gestionar la inscripción voluntaria en el sorteo y contactar a los ganadores cuando proceda.",
      "Medir el uso de la aplicación y corregir incidencias técnicas —solo con tu consentimiento— para mejorar la experiencia.",
      "Si no otorgas consentimiento, no podrás utilizar el cuestionario dentro de la app; puedes solicitar alternativas o información al centro responsable.",
    ],
  },
  {
    icon: Database,
    title: "Base legal y destinatarios",
    body: [
      "La base legal del tratamiento para el cuestionario y el sorteo es el consentimiento informado que das en la propia app.",
      "Los datos enviados se almacenan en Supabase (proveedor tecnológico). Solo se compartirán con terceros cuando sea necesario para prestar el servicio o por obligación legal.",
      "No vendemos ni cedemos tus datos para publicidad comportamental.",
    ],
  },
  {
    icon: Clock3,
    title: "Conservación",
    body: [
      "Si aceptas el envío del cuestionario, las respuestas se conservan el tiempo necesario para generar el informe y prestar el servicio educativo.",
      "Si no das tu consentimiento, no se realizará ningún envío ni tratamiento de tus respuestas en el servidor; no existe una opción de procesamiento sólo local para completar el cuestionario dentro de la app.",
      "Los datos del sorteo se conservarán hasta su resolución o el periodo administrativo necesario para gestionar el premio.",
    ],
  },
  {
    icon: Users,
    title: "Tus derechos y cómo retirar el consentimiento",
    body: [
      "Tienes derecho de acceso, rectificación, supresión, oposición, limitación y portabilidad cuando proceda —dirígete al centro responsable o al contacto designado para Descubre-T.",
      "Si quieres retirar el consentimiento para el sorteo, ponte en contacto con el centro antes del cierre de la inscripción y tu participación será eliminada.",
      "Si diste consentimiento para enviar el cuestionario y quieres que tus datos sean eliminados del servidor, solicita su supresión indicando el `submissionId` (si lo conservas) o la fecha aproximada del envío; el centro gestionará la petición.",
      "Para revocar la analítica localmente, borra los datos del sitio en tu navegador o solicita la retirada por los canales del centro —la configuración se guarda en el almacenamiento local (`descubre-t_analytics_consent`).",
    ],
  },
];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className="mobile-shell dot-pattern">
      <div
        className="blob"
        style={{
          width: 320,
          height: 320,
          top: -90,
          right: -110,
          background: "rgba(59,130,246,0.06)",
          animation: "blob-float 9s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 260,
          height: 260,
          bottom: -70,
          left: -90,
          background: "rgba(255,107,53,0.06)",
          animation: "blob-float 11s ease-in-out infinite reverse",
        }}
      />

      <main className="shell-scroll relative z-10 px-4 sm:px-5 md:px-6 pt-4 pb-8">
        <div className="flex items-center justify-between gap-3 mb-4 anim-fade-up">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft size={14} />
            Volver atrás
          </button>

          <span className="pill-dark">Acceso dentro de la app</span>
        </div>

        <section className="rounded-[1.75rem] border border-border bg-white/95 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] anim-fade-up">
          <div className="flex items-start gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: "var(--gradient-accent)", color: "white" }}
            >
              <ShieldCheck size={22} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                Política de privacidad
              </p>
              <h1 className="mt-1 text-[clamp(1.7rem,6vw,2.15rem)] leading-[1.05] font-black tracking-tight text-foreground">
                Transparente, accesible y centrada en el uso educativo.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Última actualización: 23 de mayo de 2026. Esta política resume qué tratamos, por qué lo hacemos
                y cómo puedes ejercer tus derechos desde la propia aplicación.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Resumen rápido</p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                El cuestionario requiere consentimiento expreso; el sorteo es opcional; los datos no se usan para publicidad.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-[hsl(var(--muted))] p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Responsable</p>
              <p className="mt-2 text-sm font-semibold text-foreground">CPIFP El Arenal / programa Descubre-T.</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Usa los canales oficiales del centro para solicitudes formales de privacidad.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3">
          {sections.map(({ icon: Icon, title, body }, index) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-border bg-white p-5 text-left anim-fade-up"
              style={{ animationDelay: `${120 + index * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-primary">
                  <Icon size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">{title}</h2>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {body.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-4 rounded-[1.5rem] border border-border bg-white p-5 text-left anim-fade-up" style={{ animationDelay: "520ms" }}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-primary">
              <BadgeInfo size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Menores y uso de la app</h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  La plataforma está pensada para contexto educativo. Si el proyecto se abre a menores de edad,
                  el centro debe revisar el tratamiento aplicable y adaptar consentimientos y edades mínimas.
                </p>
                <p>
                  Si quieres reducir riesgos regulatorios, la vía más conservadora es limitar el uso a alumnado
                  con autorización válida del centro o de sus representantes legales.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
