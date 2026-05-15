import type { FamiliaKey } from "./ciclos";

export interface Opcion {
  clave: string;
  texto: string;
}

export interface Pregunta {
  id: string;
  fase: 1 | 2;
  familia: FamiliaKey | null;
  texto: string;
  opciones: Opcion[];
}

export const PREGUNTAS_FASE1: Pregunta[] = [
  {
    id: "P1",
    fase: 1,
    familia: null,
    texto: "Cuando algo no sale a la primera, ¿qué te nace hacer?",
    opciones: [
      { clave: "A", texto: "Probar con las manos hasta que funcione" },
      { clave: "B", texto: "Buscar la causa paso a paso" },
      { clave: "C", texto: "Imaginar una mejora y dibujarla" },
      { clave: "D", texto: "Ordenar tareas y tiempos para avanzar" },
      { clave: "E", texto: "Apoyarme en herramientas digitales" },
    ],
  },
  {
    id: "P2",
    fase: 1,
    familia: null,
    texto: "¿En qué entorno te sentirías más a gusto aprendiendo?",
    opciones: [
      { clave: "A", texto: "En un espacio práctico con herramientas" },
      { clave: "B", texto: "En instalaciones reales resolviendo retos" },
      { clave: "C", texto: "Con planos, diseño o simulaciones" },
      { clave: "D", texto: "Coordinando personas y procesos" },
      { clave: "E", texto: "Combinando campo, equipo y tecnología" },
    ],
  },
  {
    id: "P3",
    fase: 1,
    familia: null,
    texto: "¿Qué fortaleza te reconocen más a menudo?",
    opciones: [
      { clave: "A", texto: "Constancia para hacer y terminar tareas" },
      { clave: "B", texto: "Curiosidad por entender cómo funciona algo" },
      { clave: "C", texto: "Orden para trabajar con datos y pasos" },
      { clave: "D", texto: "Creatividad para proponer soluciones" },
      { clave: "E", texto: "Facilidad para adaptarme a lo nuevo" },
    ],
  },
  {
    id: "P4",
    fase: 1,
    familia: null,
    texto: "En tu día a día, ¿con qué disfrutas más?",
    opciones: [
      { clave: "A", texto: "Reparar o mejorar cosas en casa" },
      { clave: "B", texto: "Aprender con apps, vídeos o tecnología" },
      { clave: "C", texto: "Dibujar, imaginar espacios o crear ideas" },
      { clave: "D", texto: "Organizar tareas, notas o documentos" },
      { clave: "E", texto: "Ayudar en tareas prácticas del entorno" },
    ],
  },
  {
    id: "P5",
    fase: 1,
    familia: null,
    texto: "¿Qué te ayudaría a confiar más en tu futuro laboral?",
    opciones: [
      { clave: "A", texto: "Ver resultados concretos de mi esfuerzo" },
      { clave: "B", texto: "Aprender herramientas actuales poco a poco" },
      { clave: "C", texto: "Resolver retos útiles para otras personas" },
      { clave: "D", texto: "Tener un método claro para trabajar" },
      { clave: "E", texto: "Crear soluciones propias con apoyo" },
    ],
  },
  {
    id: "P6",
    fase: 1,
    familia: null,
    texto: "Si te bloqueas con una tarea, ¿cómo sueles retomarla?",
    opciones: [
        { clave: "A", texto: "Probando en la práctica y ajustando" },
        { clave: "B", texto: "Dividiendo el problema en pasos" },
        { clave: "C", texto: "Buscando recursos digitales de apoyo" },
        { clave: "D", texto: "Haciendo un esquema visual" },
        { clave: "E", texto: "Siguiendo una guía clara" },
    ],
  },
];

const PREGUNTAS_FABRICACION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "FABRICACION",
    texto: "Aunque estés empezando, ¿en qué te ves mejorando antes?",
    opciones: [
      { clave: "A", texto: "Destreza manual y uso de herramientas" },
      { clave: "B", texto: "Medidas, cálculos y precisión" },
      { clave: "C", texto: "Diseño técnico y diseño por ordenador" },
      { clave: "D", texto: "Organización de procesos y tiempos" },
      { clave: "E", texto: "Uso de tecnología digital como 3D" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "FABRICACION",
    texto: "Con planos o medidas, ¿cómo te sientes hoy?",
    opciones: [
      { clave: "A", texto: "Necesito apoyo, pero puedo aprender" },
      { clave: "B", texto: "Entiendo lo básico con ejemplos" },
      { clave: "C", texto: "Me manejo bien con detalle y precisión" },
      { clave: "D", texto: "Me motiva aprenderlo con software" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Con qué tipo de recurso aprenderías mejor?",
    opciones: [
      { clave: "A", texto: "Herramientas manuales y guía práctica" },
      { clave: "B", texto: "Maquinaria con supervisión" },
      { clave: "C", texto: "Programas de diseño y simulación" },
      { clave: "D", texto: "Documentos para planificar mejor" },
      { clave: "E", texto: "Impresión 3D y prototipos" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Desde qué punto te gustaría impulsar tu formación?",
    opciones: [
      { clave: "A", texto: "ESO incompleta o acceso básico" },
      { clave: "B", texto: "ESO completa o prueba de acceso a GM" },
      { clave: "C", texto: "Bachillerato o prueba de acceso a GS" },
      { clave: "D", texto: "No lo sé aún" },
    ],
  },
];

const PREGUNTAS_ELECTRICA: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "ELECTRICA",
    texto: "Sin necesidad de experiencia previa, ¿qué te gustaría aprender primero?",
    opciones: [
      { clave: "A", texto: "Montaje básico de instalaciones seguras" },
      { clave: "B", texto: "Mantenimiento de equipos paso a paso" },
      { clave: "C", texto: "Automatización y control con programación" },
      { clave: "D", texto: "Lectura de planos y organización técnica" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Cómo te llevas con la lógica y la programación?",
    opciones: [
      { clave: "A", texto: "Prefiero empezar por lo práctico manual" },
      { clave: "B", texto: "Me interesa si tiene aplicación real" },
      { clave: "C", texto: "Me motiva mucho aprenderla a fondo" },
      { clave: "D", texto: "Me gusta cuando se aplica a robots" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿En qué situación te verías ganando más confianza?",
    opciones: [
      { clave: "A", texto: "Resolver una avería con seguridad" },
      { clave: "B", texto: "Ajustar una máquina con apoyo técnico" },
      { clave: "C", texto: "Configurar un sistema automatizado" },
      { clave: "D", texto: "Interpretar planos y decidir conexiones" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Desde qué nivel te ves avanzando ahora?",
    opciones: [
      { clave: "A", texto: "ESO incompleta o acceso básico" },
      { clave: "B", texto: "ESO completa o prueba de acceso a GM" },
      { clave: "C", texto: "Bachillerato o prueba de acceso a GS" },
      { clave: "D", texto: "No lo sé aún" },
    ],
  },
];

const PREGUNTAS_CONSTRUCCION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Qué parte del trabajo en edificación te haría sentir útil?",
    opciones: [
      { clave: "A", texto: "Seguir el avance real de una obra" },
      { clave: "B", texto: "Trabajar planos y visión espacial" },
      { clave: "C", texto: "Ordenar datos, mediciones y documentos" },
      { clave: "D", texto: "Coordinar varias partes del proyecto" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "Cuando miras un plano, ¿cómo te orientas?",
    opciones: [
      { clave: "A", texto: "Visualizo espacios con bastante facilidad" },
      { clave: "B", texto: "Lo entiendo mejor con ejemplos guiados" },
      { clave: "C", texto: "Me cuesta, pero tengo ganas de entrenarlo" },
      { clave: "D", texto: "Me veo más en tareas prácticas de campo" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Qué habilidad te gustaría dominar primero?",
    opciones: [
      { clave: "A", texto: "Mediciones y precisión en obra" },
      { clave: "B", texto: "Diseño técnico con software" },
      { clave: "C", texto: "Cálculo y presupuesto de materiales" },
      { clave: "D", texto: "Normativa y documentación técnica" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿En qué fase del proyecto te ves aportando mejor?",
    opciones: [
      { clave: "A", texto: "Ejecución práctica en el terreno" },
      { clave: "B", texto: "Diseño y representación de ideas" },
      { clave: "C", texto: "Revisión técnica y cumplimiento" },
      { clave: "D", texto: "Planificación integral del proceso" },
    ],
  },
];

const PREGUNTAS_GESTION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "GESTION",
    texto: "¿En qué tipo de responsabilidad te verías creciendo?",
    opciones: [
      { clave: "A", texto: "Cuidar la seguridad y bienestar del equipo" },
      { clave: "B", texto: "Ordenar tareas para que todo avance" },
      { clave: "C", texto: "Redactar y explicar procedimientos claros" },
      { clave: "D", texto: "Analizar datos para decidir mejoras" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué situación te daría más sensación de logro?",
    opciones: [
      { clave: "A", texto: "Detectar riesgos y proponer soluciones" },
      { clave: "B", texto: "Planificar tiempos y prioridades del equipo" },
      { clave: "C", texto: "Crear documentos útiles y fáciles de aplicar" },
      { clave: "D", texto: "Ordenar procesos para evitar errores" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "GESTION",
    texto: "¿Con qué tipo de tareas te ves más cómoda/o?",
    opciones: [
      { clave: "A", texto: "Comunicación con personas y prevención" },
      { clave: "B", texto: "Coordinación con equipos técnicos" },
      { clave: "C", texto: "Documentación, lectura y redacción" },
      { clave: "D", texto: "Herramientas digitales de planificación" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué te haría sentir más segura/o en tu día a día laboral?",
    opciones: [
      { clave: "A", texto: "Saber que ayudo a proteger a otras personas" },
      { clave: "B", texto: "Ver mejoras reales en resultados del equipo" },
      { clave: "C", texto: "Tener orden, trazabilidad y claridad" },
      { clave: "D", texto: "Responder bien ante cambios e imprevistos" },
    ],
  },
];

const PREGUNTAS_DIGITAL: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué parte digital te gustaría explorar primero, a tu ritmo?",
    opciones: [
      { clave: "A", texto: "Programación aplicada a robots o control" },
      { clave: "B", texto: "Unir mecánica, electricidad y software" },
      { clave: "C", texto: "Diseño y fabricación con tecnología 3D" },
      { clave: "D", texto: "Conexión de equipos y datos en red" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué forma de aprender tecnología va más contigo?",
    opciones: [
      { clave: "A", texto: "Practicar lógica y código con casos reales" },
      { clave: "B", texto: "Entender cómo interactúan sensores y motores" },
      { clave: "C", texto: "Crear un modelo 3D y verlo hecho pieza" },
      { clave: "D", texto: "Conectar equipos para que compartan datos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿En qué reto digital te verías avanzando con confianza?",
    opciones: [
      { clave: "A", texto: "Programar acciones de un sistema automático" },
      { clave: "B", texto: "Detectar fallos entre hardware y software" },
      { clave: "C", texto: "Diseñar una pieza útil e imprimirla" },
      { clave: "D", texto: "Ver una línea conectada funcionando en conjunto" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "DIGITAL",
    texto: "Cuando aprendes algo nuevo, ¿qué te funciona mejor?",
    opciones: [
      { clave: "A", texto: "Práctica guiada con ensayo y mejora" },
      { clave: "B", texto: "Entender primero la lógica general" },
      { clave: "C", texto: "Crear un proyecto propio desde cero" },
      { clave: "D", texto: "Integrar partes hasta lograr un sistema completo" },
    ],
  },
];

export const PREGUNTAS_FASE2: Record<FamiliaKey, Pregunta[]> = {
  FABRICACION: PREGUNTAS_FABRICACION,
  ELECTRICA: PREGUNTAS_ELECTRICA,
  CONSTRUCCION: PREGUNTAS_CONSTRUCCION,
  GESTION: PREGUNTAS_GESTION,
  DIGITAL: PREGUNTAS_DIGITAL,
};
