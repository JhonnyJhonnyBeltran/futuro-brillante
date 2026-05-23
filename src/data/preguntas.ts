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
  opciones: Opcion[]; // Mantengo opciones por compatibilidad, pero corrijo si tenías tipado estricto
}

export const PREGUNTAS_FASE1: Pregunta[] = [
  {
    id: "P1",
    fase: 1,
    familia: null,
    texto: "Si algo no te sale a la primera, ¿qué haces?",
    opciones: [
      { clave: "A", texto: "Sigo probando con las manos hasta que funcione" },
      { clave: "B", texto: "Me paro a buscar el fallo paso a paso" },
      { clave: "C", texto: "Imagino cómo mejorarlo y hago un dibujo" },
      { clave: "D", texto: "Organizo el tiempo y las tareas para avanzar" },
      { clave: "E", texto: "Busco ayuda en el móvil, ordenador o alguna app" },
    ],
  },
  {
    id: "P2",
    fase: 1,
    familia: null,
    texto: "¿Dónde te gustaría más aprender cosas nuevas?",
    opciones: [
      { clave: "A", texto: "En un taller con herramientas reales" },
      { clave: "B", texto: "En una empresa real resolviendo problemas" },
      { clave: "C", texto: "En un ordenador haciendo diseños o planos" },
      { clave: "D", texto: "En una oficina organizando tareas y equipos" },
      { clave: "E", texto: "En un lugar que mezcle práctica con tecnología y trabajo en equipo" },
    ],
  },
  {
    id: "P3",
    fase: 1,
    familia: null,
    texto: "¿Qué se te da mejor o qué dicen los demás de ti?",
    opciones: [
      { clave: "A", texto: "Que soy constante y termino lo que empiezo" },
      { clave: "B", texto: "Que soy curioso/a y me gusta saber cómo funcionan las cosas" },
      { clave: "C", texto: "Que me manejo bien con herramientas y materiales" },
      { clave: "D", texto: "Que tengo buenas ideas y soy creativo/a" },
      { clave: "E", texto: "Que aprendo rápido cuando algo cambia" },
    ],
  },
  {
    id: "P4",
    fase: 1,
    familia: null,
    texto: "En tu día a día, ¿con qué disfrutas más?",
    opciones: [
      { clave: "A", texto: "Arreglando o mejorando cosas de casa" },
      { clave: "B", texto: "Trasteando con el móvil, apps o tecnología" },
      { clave: "C", texto: "Dibujando, diseñando o inventando cosas" },
      { clave: "D", texto: "Teniendo mis apuntes, notas o tareas ordenadas" },
      { clave: "E", texto: "Echando una mano a los demás en tareas prácticas" },
    ],
  },
  {
    id: "P5",
    fase: 1,
    familia: null,
    texto: "¿Qué te daría más tranquilidad pensando en tu futuro trabajo?",
    opciones: [
      { clave: "A", texto: "Ver rápido el resultado de mi esfuerzo" },
      { clave: "B", texto: "Aprender a usar tecnologías nuevas poco a poco" },
      { clave: "C", texto: "Que mi trabajo deje algo físico y útil que la gente use" },
      { clave: "D", texto: "Tener unas normas claras y saber qué hay que hacer" },
      { clave: "E", texto: "Poder crear mis propias soluciones con ayuda" },
    ],
  },
  {
    id: "P6",
    fase: 1,
    familia: null,
    texto: "Si te atascas con una tarea, ¿cómo la sigues?",
    opciones: [
        { clave: "A", texto: "Sigo probando a ver si sale" },
        { clave: "B", texto: "Divido el problema en partes más pequeñas" },
        { clave: "C", texto: "Busco un vídeo o ayuda por internet" },
        { clave: "D", texto: "Hago un dibujo o un esquema visual" },
        { clave: "E", texto: "Sigo una guía o un manual paso a paso" },
    ],
  },
];

const PREGUNTAS_FABRICACION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "FABRICACION",
    texto: "Aunque estés empezando, ¿en qué crees que mejorarías más rápido?",
    opciones: [
      { clave: "A", texto: "Usando las manos y las herramientas" },
      { clave: "B", texto: "Haciendo cálculos y tomando medidas exactas" },
      { clave: "C", texto: "Haciendo planos y diseños por ordenador" },
      { clave: "D", texto: "Organizando el trabajo y los horarios" },
      { clave: "E", texto: "Usando tecnología moderna como impresoras 3D (impresión tridimensional)" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Cómo te llevas con los planos y las medidas?",
    opciones: [
      { clave: "A", texto: "Me cuesta, pero sé que puedo aprender" },
      { clave: "B", texto: "Entiendo lo básico si me ponen ejemplos" },
      { clave: "C", texto: "Se me da bien ser preciso y detallista" },
      { clave: "D", texto: "Me motiva aprender a usarlos con programas CAD/CAM (diseño asistido / fabricación asistida por ordenador)" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Cómo aprenderías mejor a fabricar cosas?",
    opciones: [
      { clave: "A", texto: "Con herramientas manuales y un profesor/a al lado" },
      { clave: "B", texto: "Usando máquinas reales con supervisión" },
      { clave: "C", texto: "Con programas de ordenador que simulan el trabajo" },
      { clave: "D", texto: "Con plantillas y guías para planificar el proceso" },
      { clave: "E", texto: "Haciendo maquetas e imprimiendo en 3D (impresión tridimensional)" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "FABRICACION",
    texto: "¿Qué estudios tienes o estás terminando ahora?",
    opciones: [
      { clave: "A", texto: "No terminé la ESO (Educación Secundaria Obligatoria) — quiero entrar a FP (Formación Profesional) Básica" },
      { clave: "B", texto: "Tengo la ESO o la prueba de acceso a Grado Medio" },
      { clave: "C", texto: "Tengo Bachillerato o la prueba de acceso a Grado Superior" },
      { clave: "D", texto: "No lo sé todavía" },
    ],
  },
];

const PREGUNTAS_ELECTRICA: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "ELECTRICA",
    texto: "Pensando que empiezas de cero, ¿qué te gustaría aprender primero?",
    opciones: [
      { clave: "A", texto: "A montar cables e instalaciones seguras" },
      { clave: "B", texto: "A arreglar y mantener aparatos paso a paso" },
      { clave: "C", texto: "A programar sistemas automáticos" },
      { clave: "D", texto: "A leer planos eléctricos y organizar el trabajo" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Te llama la atención la idea de programar?",
    opciones: [
      { clave: "A", texto: "Prefiero el trabajo manual con cables y herramientas" },
      { clave: "B", texto: "Me interesa si veo que sirve para algo real" },
      { clave: "C", texto: "Me gustaría mucho aprender a programar a fondo" },
      { clave: "D", texto: "Me interesa si es para automatización industrial: PLCs (controladores lógicos programables) y cuadros eléctricos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Qué te haría sentir más orgulloso/a en este trabajo?",
    opciones: [
      { clave: "A", texto: "Encontrar un apagón o avería y arreglarlo de forma segura" },
      { clave: "B", texto: "Ajustar una máquina grande con ayuda" },
      { clave: "C", texto: "Hacer que un sistema automático funcione solo" },
      { clave: "D", texto: "Mirar un plano y saber perfectamente dónde va cada cable" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "ELECTRICA",
    texto: "¿Qué estudios tienes o estás terminando ahora?",
    opciones: [
      { clave: "A", texto: "No terminé la ESO (Educación Secundaria Obligatoria) — quiero entrar a FP (Formación Profesional) Básica" },
      { clave: "B", texto: "Tengo la ESO o la prueba de acceso a Grado Medio" },
      { clave: "C", texto: "Tengo Bachillerato o la prueba de acceso a Grado Superior" },
      { clave: "D", texto: "No lo sé todavía" },
    ],
  },
];

const PREGUNTAS_CONSTRUCCION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿En qué parte de una obra te verías ayudando más?",
    opciones: [
      { clave: "A", texto: "A pie de obra viendo cómo avanza la construcción" },
      { clave: "B", texto: "Haciendo planos y pensando cómo aprovechar el espacio" },
      { clave: "C", texto: "Haciendo las cuentas y controlando los materiales" },
      { clave: "D", texto: "Organizando a la gente y los pasos a seguir" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "Cuando miras el plano de una casa, ¿lo entiendes?",
    opciones: [
      { clave: "A", texto: "Sí, me imagino las habitaciones bastante bien" },
      { clave: "B", texto: "Lo entiendo si alguien me lo explica con ejemplos" },
      { clave: "C", texto: "Me cuesta, pero tengo ganas de aprender a leerlos" },
      { clave: "D", texto: "Me siento cómodo usando maquinaria y herramientas en obra" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿Qué te gustaría aprender a hacer primero?",
    opciones: [
      { clave: "A", texto: "Medir el terreno y calcular materiales con precisión" },
      { clave: "B", texto: "Diseñar casas y edificios con programas de ordenador" },
      { clave: "C", texto: "Hacer presupuestos y saber cuánto cuesta una obra" },
      { clave: "D", texto: "Conocer las normas de seguridad y los papeles necesarios" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "CONSTRUCCION",
    texto: "¿En qué momento del trabajo crees que aportarías más?",
    opciones: [
      { clave: "A", texto: "Trabajando directamente en la obra" },
      { clave: "B", texto: "Dibujando y dando ideas al principio" },
      { clave: "C", texto: "Revisando que todo cumpla las normas" },
      { clave: "D", texto: "Planificando las fechas y cómo se va a hacer todo" },
    ],
  },
];

const PREGUNTAS_GESTION: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué tipo de tarea te motivaría más?",
    opciones: [
      { clave: "A", texto: "Cuidar que el equipo trabaje seguro y sin riesgos" },
      { clave: "B", texto: "Organizar las tareas para que todo salga a tiempo" },
      { clave: "C", texto: "Escribir y explicar a los demás cómo se hace un proceso" },
      { clave: "D", texto: "Mirar datos e información para ver qué podemos mejorar" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué resultado te haría sentir mejor con tu trabajo?",
    opciones: [
      { clave: "A", texto: "Evitar un peligro o un accidente a tiempo" },
      { clave: "B", texto: "Conseguir que el equipo cumpla los horarios" },
      { clave: "C", texto: "Crear una guía de trabajo que sea fácil de entender" },
      { clave: "D", texto: "Tener todo ordenado para que nadie cometa fallos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "GESTION",
    texto: "¿Con qué tareas te sientes más cómodo/a?",
    opciones: [
      { clave: "A", texto: "Hablar con la gente y prevenir problemas" },
      { clave: "B", texto: "Coordinarme con los compañeros y compañeras técnicas" },
      { clave: "C", texto: "Leer, escribir y rellenar documentos bien hechos" },
      { clave: "D", texto: "Coordinar equipos y gestionar la documentación administrativa" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "GESTION",
    texto: "¿Qué te daría más seguridad trabajando en una oficina?",
    opciones: [
      { clave: "A", texto: "Saber que con mi trabajo protejo a mis compañeros" },
      { clave: "B", texto: "Ver que el equipo trabaja mejor gracias a mi organización" },
      { clave: "C", texto: "Tener los papeles al día, claros y ordenados" },
      { clave: "D", texto: "Saber reaccionar bien si hay un imprevisto de última hora" },
    ],
  },
];

const PREGUNTAS_DIGITAL: Pregunta[] = [
  {
    id: "P7",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué parte de la tecnología te gustaría explorar primero?",
    opciones: [
      { clave: "A", texto: "Programar robots o máquinas automáticas" },
      { clave: "B", texto: "Aprender cómo se junta la mecánica con la electricidad" },
      { clave: "C", texto: "Diseñar cosas en el ordenador e imprimirlas en 3D (impresión tridimensional)" },
      { clave: "D", texto: "Conectar ordenadores y sistemas en red" },
    ],
  },
  {
    id: "P8",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Cómo prefieres aprender tecnología?",
    opciones: [
      { clave: "A", texto: "Escribiendo código y probando cosas reales" },
      { clave: "B", texto: "Viendo cómo se mueven los motores con sensores" },
      { clave: "C", texto: "Haciendo una pieza en 3D (impresión tridimensional) y luego tocándola en la realidad" },
      { clave: "D", texto: "Conectando aparatos entre sí para que pasen datos" },
    ],
  },
  {
    id: "P9",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué reto tecnológico te daría más confianza superar?",
    opciones: [
      { clave: "A", texto: "Conseguir programar los movimientos de una máquina" },
      { clave: "B", texto: "Encontrar por qué falla la conexión entre una máquina y el PC (ordenador)" },
      { clave: "C", texto: "Diseñar algo útil desde cero e imprimirlo en 3D (impresión tridimensional)" },
      { clave: "D", texto: "Ver toda una sala de ordenadores conectada y funcionando" },
    ],
  },
  {
    id: "P10",
    fase: 2,
    familia: "DIGITAL",
    texto: "¿Qué área del sector digital te interesa más?",
    opciones: [
      { clave: "A", texto: "Programación y robótica (hacer que máquinas hagan tareas)" },
      { clave: "B", texto: "Redes y comunicaciones (conectar sistemas y mantener redes)" },
      { clave: "C", texto: "Fabricación digital (diseño 3D, impresión y prototipado)" },
      { clave: "D", texto: "Mecatrónica (mecánica + electrónica aplicada a máquinas)" },
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