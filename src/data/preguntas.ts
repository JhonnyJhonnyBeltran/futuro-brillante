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
    texto: "¿Qué te imaginas haciendo?",
    opciones: [
      { clave: "A", emoji: "🔧", texto: "Arreglar o montar cosas" },
      { clave: "B", emoji: "💡", texto: "Resolver averías técnicas" },
      { clave: "C", emoji: "📐", texto: "Diseñar o dibujar ideas" },
      { clave: "D", emoji: "📋", texto: "Organizar y planificar" },
      { clave: "E", emoji: "💻", texto: "Trabajar con tecnología" },
    ],
  },
  {
    id: "P2",
    fase: 1,
    familia: null,
    texto: "¿Dónde te ves trabajando?",
    opciones: [
      { clave: "A", emoji: "🏭", texto: "En un taller o fábrica" },
      { clave: "B", emoji: "🏗️", texto: "En una obra" },
      { clave: "C", emoji: "🖥️", texto: "En oficina técnica" },
      { clave: "D", emoji: "📁", texto: "Gestionando en empresa" },
      { clave: "E", emoji: "🌍", texto: "En sitios variados" },
    ],
  },
  {
    id: "P3",
    fase: 1,
    familia: null,
    texto: "¿Cuál te define mejor?",
    opciones: [
      { clave: "A", emoji: "🙌", texto: "Me gusta hacer cosas" },
      { clave: "B", emoji: "⚙️", texto: "Me gusta entender cómo funciona" },
      { clave: "C", emoji: "📂", texto: "Me gusta el orden y los datos" },
      { clave: "D", emoji: "✏️", texto: "Me gusta crear y diseñar" },
      { clave: "E", emoji: "🔋", texto: "Me atrae la tecnología nueva" },
    ],
  },
  {
    id: "P4",
    fase: 1,
    familia: null,
    texto: "En tu tiempo libre, ¿qué haces?",
    opciones: [
      { clave: "A", emoji: "🔩", texto: "Arreglo o monto cosas" },
      { clave: "B", emoji: "🎮", texto: "Uso tecnología o programo" },
      { clave: "C", emoji: "🎨", texto: "Dibujo o diseño" },
      { clave: "D", emoji: "📝", texto: "Me organizo o informo" },
      { clave: "E", emoji: "🏠", texto: "Cosas en casa, bricolaje" },
    ],
  },
  {
    id: "P5",
    fase: 1,
    familia: null,
    texto: "¿Qué es lo más importante en un trabajo?",
    opciones: [
      { clave: "A", emoji: "🏆", texto: "Ver lo que hago con mis manos" },
      { clave: "B", emoji: "📡", texto: "Aprender tecnología nueva" },
      { clave: "C", emoji: "🎯", texto: "Tener responsabilidad técnica" },
      { clave: "D", emoji: "🗂️", texto: "Estabilidad y orden" },
      { clave: "E", emoji: "✏️", texto: "Crear o diseñar algo propio" },
    ],
  },
  {
    id: "P6",
    fase: 1,
    familia: null,
    texto: "¿Cómo prefieres resolver un problema?",
    opciones: [
      { clave: "A", emoji: "🔧", texto: "Desmontando y probando" },
      { clave: "B", emoji: "📊", texto: "Analizando datos y planificando" },
      { clave: "C", emoji: "💻", texto: "Buscando solución digital" },
      { clave: "D", emoji: "📐", texto: "Dibujando o esquematizando" },
      { clave: "E", emoji: "📋", texto: "Siguiendo un protocolo claro" },
    ],
  },
];

const PREGUNTAS_FABRICACION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Qué parte de fabricar te atrae?",
    opciones: [
      { clave: "A", emoji: "🔨", texto: "Montar piezas con mis manos" },
      { clave: "B", emoji: "⚙️", texto: "Trabajar máquinas de precisión" },
      { clave: "C", emoji: "🖥️", texto: "Diseñar piezas en ordenador" },
      { clave: "D", emoji: "📊", texto: "Planificar cómo se fabrica" },
      { clave: "E", emoji: "🖨️", texto: "Crear con impresión 3D" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Cómo te llevas con planos y medidas?",
    opciones: [
      { clave: "A", emoji: "😬", texto: "Regular, prefiero instrucciones directas" },
      { clave: "B", emoji: "🙂", texto: "Bien, entiendo planos básicos" },
      { clave: "C", emoji: "😎", texto: "Muy bien, leo cualquier plano técnico" },
      { clave: "D", emoji: "🖥️", texto: "Lo mío es el diseño en CAD" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Qué herramienta usarías con más ganas?",
    opciones: [
      { clave: "A", emoji: "🔧", texto: "Llave inglesa o destornillador" },
      { clave: "B", emoji: "🏭", texto: "Torno o fresadora" },
      { clave: "C", emoji: "🖱️", texto: "Software de diseño (CAD/CAM)" },
      { clave: "D", emoji: "📋", texto: "Hoja de planificación de producción" },
      { clave: "E", emoji: "🖨️", texto: "Impresora 3D" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Qué nivel de estudios tienes o quieres?",
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
    texto: "¿Qué parte del mundo eléctrico te atrae?",
    opciones: [
      { clave: "A", emoji: "🔌", texto: "Instalar enchufes y circuitos en edificios" },
      { clave: "B", emoji: "🏭", texto: "Mantener máquinas industriales" },
      { clave: "C", emoji: "🤖", texto: "Programar robots o autómatas" },
      { clave: "D", emoji: "📋", texto: "Diseñar y supervisar instalaciones" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Cuánto te interesa la programación?",
    opciones: [
      { clave: "A", emoji: "😴", texto: "Nada, prefiero lo físico y manual" },
      { clave: "B", emoji: "🙂", texto: "Algo, si es para controlar máquinas" },
      { clave: "C", emoji: "🔥", texto: "Mucho, me apasiona programar" },
      { clave: "D", emoji: "🤖", texto: "Solo si es robótica o automatización" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Qué situación te motiva más?",
    opciones: [
      { clave: "A", emoji: "🔦", texto: "Detectar y reparar una avería eléctrica" },
      { clave: "B", emoji: "⚙️", texto: "Reparar una máquina con motor y electrónica" },
      { clave: "C", emoji: "💻", texto: "Programar una línea de producción automatizada" },
      { clave: "D", emoji: "📐", texto: "Calcular y diseñar una instalación eléctrica compleja" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Qué nivel de estudios tienes o quieres?",
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
    texto: "¿Qué te llama más de una obra?",
    opciones: [
      { clave: "A", emoji: "🏗️", texto: "Ver cómo se levanta el edificio físicamente" },
      { clave: "B", emoji: "📐", texto: "Diseñar los planos antes de construir" },
      { clave: "C", emoji: "📋", texto: "Calcular costes y gestionar documentación" },
      { clave: "D", emoji: "🔄", texto: "Todo: planos, obra, materiales y gestión" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Ves bien las cosas en 3D mentalmente?",
    opciones: [
      { clave: "A", emoji: "✅", texto: "Sí, imagino el espacio con facilidad" },
      { clave: "B", emoji: "🤔", texto: "Algo, me ayuda verlo en plano" },
      { clave: "C", emoji: "📚", texto: "No mucho, pero me interesa aprender" },
      { clave: "D", emoji: "🏗️", texto: "Prefiero estar en la obra, no en los planos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Qué herramienta te gustaría dominar?",
    opciones: [
      { clave: "A", emoji: "📏", texto: "Cinta métrica y nivel en obra" },
      { clave: "B", emoji: "🖥️", texto: "AutoCAD o Revit para diseñar" },
      { clave: "C", emoji: "📊", texto: "Excel o Presto para presupuestos" },
      { clave: "D", emoji: "📄", texto: "Gestión de normativa y permisos" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Qué parte del proceso te gusta más?",
    opciones: [
      { clave: "A", emoji: "🧱", texto: "Que se construya de verdad" },
      { clave: "B", emoji: "💡", texto: "Tener la idea y plasmarla en planos" },
      { clave: "C", emoji: "✅", texto: "Que todo cumpla la normativa" },
      { clave: "D", emoji: "🗂️", texto: "Organizar el proyecto de principio a fin" },
    ],
  },
];

const PREGUNTAS_GESTION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué tipo de gestión te atrae más?",
    opciones: [
      { clave: "A", emoji: "🦺", texto: "Seguridad y bienestar de los trabajadores" },
      { clave: "B", emoji: "🏭", texto: "Organizar cómo y cuándo se fabrica algo" },
      { clave: "C", emoji: "📄", texto: "Redactar normativas y procedimientos" },
      { clave: "D", emoji: "📊", texto: "Analizar datos para mejorar procesos" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué situación te motiva más?",
    opciones: [
      { clave: "A", emoji: "🔍", texto: "Inspeccionar riesgos y proponer mejoras" },
      { clave: "B", emoji: "📅", texto: "Organizar el calendario de producción de una fábrica" },
      { clave: "C", emoji: "📝", texto: "Redactar el plan de seguridad de una obra" },
      { clave: "D", emoji: "📦", texto: "Planificar qué piezas se fabrican y en qué orden" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "GESTION",
    texto: "¿Con qué disfrutarías más trabajando?",
    opciones: [
      { clave: "A", emoji: "👷", texto: "Con trabajadores, explicando normas de seguridad" },
      { clave: "B", emoji: "⚙️", texto: "Con ingenieros, optimizando la producción" },
      { clave: "C", emoji: "📋", texto: "Con documentos, protocolos y registros" },
      { clave: "D", emoji: "🖥️", texto: "Con software de planificación industrial" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué valoras más en tu día a día laboral?",
    opciones: [
      { clave: "A", emoji: "🤝", texto: "Que mi trabajo proteja a las personas" },
      { clave: "B", emoji: "⚡", texto: "Que mi trabajo haga la producción más eficiente" },
      { clave: "C", emoji: "📂", texto: "Tener todo documentado y en orden" },
      { clave: "D", emoji: "🔄", texto: "Resolver imprevistos y reorganizar sobre la marcha" },
    ],
  },
];

const PREGUNTAS_DIGITAL: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué parte digital te llama más?",
    opciones: [
      { clave: "A", emoji: "🤖", texto: "Programar robots industriales" },
      { clave: "B", emoji: "⚡", texto: "Integrar mecánica, electricidad e informática" },
      { clave: "C", emoji: "🖨️", texto: "Diseñar y fabricar con impresión 3D" },
      { clave: "D", emoji: "🌐", texto: "Conectar máquinas en red (Industria 4.0)" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué te resulta más interesante?",
    opciones: [
      { clave: "A", emoji: "💻", texto: "Escribir código que controla máquinas reales" },
      { clave: "B", emoji: "🔧", texto: "Que la máquina combine motor, sensor y chip" },
      { clave: "C", emoji: "🖥️", texto: "Modelar un objeto en 3D y verlo impreso" },
      { clave: "D", emoji: "📡", texto: "Que todas las máquinas de la fábrica se comuniquen" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué situación te gustaría vivir en el trabajo?",
    opciones: [
      { clave: "A", emoji: "🦾", texto: "Programar el movimiento de un brazo robótico" },
      { clave: "B", emoji: "🔬", texto: "Diagnosticar un fallo que mezcla mecánica y electrónica" },
      { clave: "C", emoji: "🎨", texto: "Diseñar una pieza personalizada e imprimirla" },
      { clave: "D", emoji: "🏭", texto: "Que toda la línea de producción funcione sola y conectada" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Cómo aprendes mejor la tecnología?",
    opciones: [
      { clave: "A", emoji: "🧪", texto: "Probando, rompiendo y volviendo a intentar" },
      { clave: "B", emoji: "📖", texto: "Entendiendo la lógica antes de tocar nada" },
      { clave: "C", emoji: "🎨", texto: "Creando algo desde cero que pueda ver y tocar" },
      { clave: "D", emoji: "🔗", texto: "Conectando piezas hasta que el sistema funcione" },
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
