import type { FamiliaKey } from "./ciclos";

export interface Opcion {
  clave: string;
  emoji: string;
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
      { clave: "A", emoji: "🔧", texto: "Probar con las manos hasta que funcione" },
      { clave: "B", emoji: "💡", texto: "Buscar la causa paso a paso" },
      { clave: "C", emoji: "📐", texto: "Imaginar una mejora y dibujarla" },
      { clave: "D", emoji: "📋", texto: "Ordenar tareas y tiempos para avanzar" },
      { clave: "E", emoji: "💻", texto: "Apoyarme en herramientas digitales" },
    ],
  },
  {
    id: "P2",
    fase: 1,
    familia: null,
    texto: "¿En qué entorno te sentirías más a gusto aprendiendo?",
    opciones: [
      { clave: "A", emoji: "🏭", texto: "En un espacio práctico con herramientas" },
      { clave: "B", emoji: "🏗️", texto: "En instalaciones reales resolviendo retos" },
      { clave: "C", emoji: "🖥️", texto: "Con planos, diseño o simulaciones" },
      { clave: "D", emoji: "📁", texto: "Coordinando personas y procesos" },
      { clave: "E", emoji: "🌍", texto: "Combinando campo, equipo y tecnología" },
    ],
  },
  {
    id: "P3",
    fase: 1,
    familia: null,
    texto: "¿Qué fortaleza te reconocen más a menudo?",
    opciones: [
      { clave: "A", emoji: "🙌", texto: "Constancia para hacer y terminar tareas" },
      { clave: "B", emoji: "⚙️", texto: "Curiosidad por entender como funciona algo" },
      { clave: "C", emoji: "📂", texto: "Orden para trabajar con datos y pasos" },
      { clave: "D", emoji: "✏️", texto: "Creatividad para proponer soluciones" },
      { clave: "E", emoji: "🔋", texto: "Facilidad para adaptarme a lo nuevo" },
    ],
  },
  {
    id: "P4",
    fase: 1,
    familia: null,
    texto: "En tu dia a dia, ¿con que disfrutas mas?",
    opciones: [
      { clave: "A", emoji: "🔩", texto: "Reparar o mejorar cosas en casa" },
      { clave: "B", emoji: "🎮", texto: "Aprender con apps, videos o tecnologia" },
      { clave: "C", emoji: "🎨", texto: "Dibujar, imaginar espacios o crear ideas" },
      { clave: "D", emoji: "📝", texto: "Organizar tareas, notas o documentos" },
      { clave: "E", emoji: "🏠", texto: "Ayudar en tareas practicas del entorno" },
    ],
  },
  {
    id: "P5",
    fase: 1,
    familia: null,
    texto: "¿Que te ayudaria a confiar mas en tu futuro laboral?",
    opciones: [
      { clave: "A", emoji: "🏆", texto: "Ver resultados concretos de mi esfuerzo" },
      { clave: "B", emoji: "📡", texto: "Aprender herramientas actuales poco a poco" },
      { clave: "C", emoji: "🎯", texto: "Resolver retos utiles para otras personas" },
      { clave: "D", emoji: "🗂️", texto: "Tener un metodo claro para trabajar" },
      { clave: "E", emoji: "✏️", texto: "Crear soluciones propias con apoyo" },
    ],
  },
  {
    id: "P6",
    fase: 1,
    familia: null,
    texto: "Si te bloqueas con una tarea, ¿como sueles retomarla?",
    opciones: [
      { clave: "A", emoji: "🔧", texto: "Probando en la practica y ajustando" },
      { clave: "B", emoji: "📊", texto: "Dividiendo el problema en pasos" },
      { clave: "C", emoji: "💻", texto: "Buscando recursos digitales de apoyo" },
      { clave: "D", emoji: "📐", texto: "Haciendo un esquema visual" },
      { clave: "E", emoji: "📋", texto: "Siguiendo una guia clara" },
    ],
  },
];

const PREGUNTAS_FABRICACION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "FABRICACION",
    texto: "Aunque estes empezando, ¿en que te ves mejorando antes?",
    opciones: [
      { clave: "A", emoji: "🔨", texto: "Destreza manual y uso de herramientas" },
      { clave: "B", emoji: "⚙️", texto: "Medidas, calculos y precision" },
      { clave: "C", emoji: "🖥️", texto: "Dibujo tecnico y diseno por ordenador" },
      { clave: "D", emoji: "📊", texto: "Organizacion de procesos y tiempos" },
      { clave: "E", emoji: "🖨️", texto: "Uso de tecnologia digital como 3D" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "FABRICACION",
    texto: "Con planos o medidas, ¿como te sientes hoy?",
    opciones: [
      { clave: "A", emoji: "😬", texto: "Necesito apoyo, pero puedo aprender" },
      { clave: "B", emoji: "🙂", texto: "Entiendo lo basico con ejemplos" },
      { clave: "C", emoji: "😎", texto: "Me manejo bien con detalle y precision" },
      { clave: "D", emoji: "🖥️", texto: "Me motiva aprenderlo con software" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Con que tipo de recurso aprenderias mejor?",
    opciones: [
      { clave: "A", emoji: "🔧", texto: "Herramientas manuales y guia practica" },
      { clave: "B", emoji: "🏭", texto: "Maquinaria con supervision" },
      { clave: "C", emoji: "🖱️", texto: "Programas de diseno y simulacion" },
      { clave: "D", emoji: "📋", texto: "Documentos para planificar mejor" },
      { clave: "E", emoji: "🖨️", texto: "Impresion 3D y prototipos" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Desde que punto te gustaria impulsar tu formacion?",
    opciones: [
      { clave: "A", emoji: "📚", texto: "ESO incompleta o acceso básico" },
      { clave: "B", emoji: "🎓", texto: "ESO completa o prueba de acceso a GM" },
      { clave: "C", emoji: "🏅", texto: "Bachillerato o prueba de acceso a GS" },
      { clave: "D", emoji: "🤷", texto: "No lo sé aún" },
    ],
  },
];

const PREGUNTAS_ELECTRICA: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "ELECTRICA",
    texto: "Sin necesidad de experiencia previa, ¿que te gustaria aprender primero?",
    opciones: [
      { clave: "A", emoji: "🔌", texto: "Montaje basico de instalaciones seguras" },
      { clave: "B", emoji: "🏭", texto: "Mantenimiento de equipos paso a paso" },
      { clave: "C", emoji: "🤖", texto: "Automatizacion y control con programacion" },
      { clave: "D", emoji: "📋", texto: "Lectura de planos y organizacion tecnica" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Como te llevas con la logica y la programacion?",
    opciones: [
      { clave: "A", emoji: "😴", texto: "Prefiero empezar por lo practico manual" },
      { clave: "B", emoji: "🙂", texto: "Me interesa si tiene aplicacion real" },
      { clave: "C", emoji: "🔥", texto: "Me motiva mucho aprenderla a fondo" },
      { clave: "D", emoji: "🤖", texto: "Me gusta cuando se aplica a robots" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿En que situacion te verias ganando mas confianza?",
    opciones: [
      { clave: "A", emoji: "🔦", texto: "Resolver una averia con seguridad" },
      { clave: "B", emoji: "⚙️", texto: "Ajustar una maquina con apoyo tecnico" },
      { clave: "C", emoji: "💻", texto: "Configurar un sistema automatizado" },
      { clave: "D", emoji: "📐", texto: "Interpretar planos y decidir conexiones" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Desde que nivel te ves avanzando ahora?",
    opciones: [
      { clave: "A", emoji: "📚", texto: "ESO incompleta o acceso básico" },
      { clave: "B", emoji: "🎓", texto: "ESO completa o prueba de acceso a GM" },
      { clave: "C", emoji: "🏅", texto: "Bachillerato o prueba de acceso a GS" },
      { clave: "D", emoji: "🤷", texto: "No lo sé aún" },
    ],
  },
];

const PREGUNTAS_CONSTRUCCION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Que parte del trabajo en edificacion te haria sentir util?",
    opciones: [
      { clave: "A", emoji: "🏗️", texto: "Seguir el avance real de una obra" },
      { clave: "B", emoji: "📐", texto: "Trabajar planos y vision espacial" },
      { clave: "C", emoji: "📋", texto: "Ordenar datos, mediciones y documentos" },
      { clave: "D", emoji: "🔄", texto: "Coordinar varias partes del proyecto" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "Cuando miras un plano, ¿como te orientas?",
    opciones: [
      { clave: "A", emoji: "✅", texto: "Visualizo espacios con bastante facilidad" },
      { clave: "B", emoji: "🤔", texto: "Lo entiendo mejor con ejemplos guiados" },
      { clave: "C", emoji: "📚", texto: "Me cuesta, pero tengo ganas de entrenarlo" },
      { clave: "D", emoji: "🏗️", texto: "Me veo mas en tareas practicas de campo" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Que habilidad te gustaria dominar primero?",
    opciones: [
      { clave: "A", emoji: "📏", texto: "Mediciones y precision en obra" },
      { clave: "B", emoji: "🖥️", texto: "Diseno tecnico con software" },
      { clave: "C", emoji: "📊", texto: "Calculo y presupuesto de materiales" },
      { clave: "D", emoji: "📄", texto: "Normativa y documentacion tecnica" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿En que fase del proyecto te ves aportando mejor?",
    opciones: [
      { clave: "A", emoji: "🧱", texto: "Ejecucion practica en el terreno" },
      { clave: "B", emoji: "💡", texto: "Diseno y representacion de ideas" },
      { clave: "C", emoji: "✅", texto: "Revision tecnica y cumplimiento" },
      { clave: "D", emoji: "🗂️", texto: "Planificacion integral del proceso" },
    ],
  },
];

const PREGUNTAS_GESTION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "GESTION",
    texto: "¿En que tipo de responsabilidad te verias creciendo?",
    opciones: [
      { clave: "A", emoji: "🦺", texto: "Cuidar la seguridad y bienestar del equipo" },
      { clave: "B", emoji: "🏭", texto: "Ordenar tareas para que todo avance" },
      { clave: "C", emoji: "📄", texto: "Redactar y explicar procedimientos claros" },
      { clave: "D", emoji: "📊", texto: "Analizar datos para decidir mejoras" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "GESTION",
    texto: "¿Que situacion te daria mas sensacion de logro?",
    opciones: [
      { clave: "A", emoji: "🔍", texto: "Detectar riesgos y proponer soluciones" },
      { clave: "B", emoji: "📅", texto: "Planificar tiempos y prioridades del equipo" },
      { clave: "C", emoji: "📝", texto: "Crear documentos utiles y faciles de aplicar" },
      { clave: "D", emoji: "📦", texto: "Ordenar procesos para evitar errores" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "GESTION",
    texto: "¿Con que tipo de tareas te ves mas comoda/o?",
    opciones: [
      { clave: "A", emoji: "👷", texto: "Comunicacion con personas y prevencion" },
      { clave: "B", emoji: "⚙️", texto: "Coordinacion con equipos tecnicos" },
      { clave: "C", emoji: "📋", texto: "Documentacion, lectura y redaccion" },
      { clave: "D", emoji: "🖥️", texto: "Herramientas digitales de planificacion" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "GESTION",
    texto: "¿Que te haria sentir mas segura/o en tu dia a dia laboral?",
    opciones: [
      { clave: "A", emoji: "🤝", texto: "Saber que ayudo a proteger a otras personas" },
      { clave: "B", emoji: "⚡", texto: "Ver mejoras reales en resultados del equipo" },
      { clave: "C", emoji: "📂", texto: "Tener orden, trazabilidad y claridad" },
      { clave: "D", emoji: "🔄", texto: "Responder bien ante cambios e imprevistos" },
    ],
  },
];

const PREGUNTAS_DIGITAL: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Que parte digital te gustaria explorar primero, a tu ritmo?",
    opciones: [
      { clave: "A", emoji: "🤖", texto: "Programacion aplicada a robots o control" },
      { clave: "B", emoji: "⚡", texto: "Unir mecanica, electricidad y software" },
      { clave: "C", emoji: "🖨️", texto: "Diseno y fabricacion con tecnologia 3D" },
      { clave: "D", emoji: "🌐", texto: "Conexion de equipos y datos en red" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Que forma de aprender tecnologia va mas contigo?",
    opciones: [
      { clave: "A", emoji: "💻", texto: "Practicar logica y codigo con casos reales" },
      { clave: "B", emoji: "🔧", texto: "Entender como interactuan sensores y motores" },
      { clave: "C", emoji: "🖥️", texto: "Crear un modelo 3D y verlo hecho pieza" },
      { clave: "D", emoji: "📡", texto: "Conectar equipos para que compartan datos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿En que reto digital te verias avanzando con confianza?",
    opciones: [
      { clave: "A", emoji: "🦾", texto: "Programar acciones de un sistema automatico" },
      { clave: "B", emoji: "🔬", texto: "Detectar fallos entre hardware y software" },
      { clave: "C", emoji: "🎨", texto: "Disenar una pieza util e imprimirla" },
      { clave: "D", emoji: "🏭", texto: "Ver una linea conectada funcionando en conjunto" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "DIGITAL",
    texto: "Cuando aprendes algo nuevo, ¿que te funciona mejor?",
    opciones: [
      { clave: "A", emoji: "🧪", texto: "Practica guiada con ensayo y mejora" },
      { clave: "B", emoji: "📖", texto: "Entender primero la logica general" },
      { clave: "C", emoji: "🎨", texto: "Crear un proyecto propio desde cero" },
      { clave: "D", emoji: "🔗", texto: "Integrar partes hasta lograr un sistema completo" },
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
