export type Family =
  | "IT"
  | "Health"
  | "Business"
  | "Electronics"
  | "Design"
  | "Construction"
  | "Mechanics"
  | "Hospitality";

export const FAMILY_LABELS: Record<Family, string> = {
  IT: "Informática y Comunicaciones",
  Health: "Sanidad",
  Business: "Administración y Gestión",
  Electronics: "Electricidad y Electrónica",
  Design: "Diseño y Artes Gráficas",
  Construction: "Edificación y Obra Civil",
  Mechanics: "Mecánica y Mantenimiento",
  Hospitality: "Hostelería y Turismo",
};

export const FAMILY_DESCRIPTIONS: Record<Family, string> = {
  IT: "Desarrolla aplicaciones, gestiona redes y crea soluciones digitales que transforman el mundo.",
  Health: "Cuida y mejora la calidad de vida de las personas trabajando en hospitales, clínicas o laboratorios.",
  Business: "Gestiona empresas, finanzas y equipos en entornos profesionales dinámicos.",
  Electronics: "Diseña, instala y mantiene sistemas eléctricos y electrónicos en industria y hogar.",
  Design: "Da vida a ideas creativas a través del diseño gráfico, ilustración y producción visual.",
  Construction: "Participa en la planificación y ejecución de obras y proyectos arquitectónicos.",
  Mechanics: "Diagnostica, repara y mantiene maquinaria, vehículos e instalaciones técnicas.",
  Hospitality: "Crea experiencias memorables en restauración, alojamiento y turismo.",
};

export type Option = {
  id: "A" | "B" | "C" | "D";
  text: string;
  weights: Partial<Record<Family, number>>;
};

export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Qué actividad disfrutarías más en tu tiempo libre?",
    options: [
      { id: "A", text: "Programar o diseñar webs", weights: { IT: 3, Design: 1 } },
      { id: "B", text: "Cuidar o ayudar a personas", weights: { Health: 3 } },
      { id: "C", text: "Organizar eventos o gestionar proyectos", weights: { Business: 3 } },
      { id: "D", text: "Montar o reparar aparatos", weights: { Electronics: 3, Mechanics: 2 } },
    ],
  },
  {
    id: 2,
    text: "¿En qué asignatura destacas más?",
    options: [
      { id: "A", text: "Matemáticas e informática", weights: { IT: 2, Electronics: 2 } },
      { id: "B", text: "Biología y química", weights: { Health: 3 } },
      { id: "C", text: "Economía y lengua", weights: { Business: 3 } },
      { id: "D", text: "Tecnología y dibujo técnico", weights: { Mechanics: 2, Construction: 2 } },
    ],
  },
  {
    id: 3,
    text: "¿Qué tipo de trabajo te imaginas haciendo?",
    options: [
      { id: "A", text: "Frente a un ordenador resolviendo problemas", weights: { IT: 3 } },
      { id: "B", text: "Atendiendo pacientes o en laboratorio", weights: { Health: 3 } },
      { id: "C", text: "Gestionando una empresa o atendiendo clientes", weights: { Business: 3 } },
      { id: "D", text: "Trabajando con máquinas o instalaciones", weights: { Electronics: 3, Mechanics: 2 } },
    ],
  },
  {
    id: 4,
    text: "¿En qué entorno preferirías trabajar?",
    options: [
      { id: "A", text: "Una oficina moderna o desde casa", weights: { IT: 2, Business: 2 } },
      { id: "B", text: "Un hospital, clínica o centro de salud", weights: { Health: 3 } },
      { id: "C", text: "Un taller, planta industrial o exterior", weights: { Mechanics: 2, Electronics: 2, Construction: 2 } },
      { id: "D", text: "Un hotel, restaurante o evento", weights: { Hospitality: 3 } },
    ],
  },
  {
    id: 5,
    text: "¿Cómo prefieres trabajar?",
    options: [
      { id: "A", text: "En equipo, coordinando con otras personas", weights: { Business: 2, Hospitality: 2, Health: 1 } },
      { id: "B", text: "De forma independiente y concentrada", weights: { IT: 2, Design: 2 } },
      { id: "C", text: "Combinando ambos según el proyecto", weights: { Construction: 1, Electronics: 1, Mechanics: 1 } },
      { id: "D", text: "Atendiendo directamente al público", weights: { Hospitality: 3, Health: 1 } },
    ],
  },
  {
    id: 6,
    text: "¿Dentro o fuera?",
    options: [
      { id: "A", text: "Prefiero trabajar en interior", weights: { IT: 2, Business: 2, Design: 1 } },
      { id: "B", text: "Me encanta el aire libre y moverme", weights: { Construction: 3, Mechanics: 1 } },
      { id: "C", text: "Me da igual, lo importante es lo que hago", weights: { Electronics: 1, Hospitality: 1 } },
      { id: "D", text: "Mezcla de ambos", weights: { Health: 1, Construction: 1, Hospitality: 1 } },
    ],
  },
  {
    id: 7,
    text: "¿Cómo te describirías?",
    options: [
      { id: "A", text: "Creativo/a y visual", weights: { Design: 3, IT: 1 } },
      { id: "B", text: "Analítico/a y lógico/a", weights: { IT: 2, Electronics: 2, Business: 1 } },
      { id: "C", text: "Empático/a y servicial", weights: { Health: 3, Hospitality: 2 } },
      { id: "D", text: "Práctico/a y manual", weights: { Mechanics: 3, Construction: 2, Electronics: 1 } },
    ],
  },
  {
    id: 8,
    text: "Ante un problema, ¿qué haces?",
    options: [
      { id: "A", text: "Busco información y la analizo", weights: { IT: 2, Business: 2 } },
      { id: "B", text: "Pido ayuda y trabajo en grupo", weights: { Hospitality: 2, Health: 2 } },
      { id: "C", text: "Lo desmonto y experimento", weights: { Electronics: 2, Mechanics: 2 } },
      { id: "D", text: "Dibujo o visualizo la solución", weights: { Design: 3, Construction: 1 } },
    ],
  },
  {
    id: 9,
    text: "¿Qué es más importante para ti en un trabajo?",
    options: [
      { id: "A", text: "Un buen sueldo y estabilidad", weights: { IT: 2, Business: 2, Electronics: 1 } },
      { id: "B", text: "Sentirme útil ayudando a otros", weights: { Health: 3, Hospitality: 1 } },
      { id: "C", text: "Crear cosas y expresarme", weights: { Design: 3, Construction: 1 } },
      { id: "D", text: "Variedad y aprender constantemente", weights: { IT: 1, Electronics: 1, Mechanics: 1, Hospitality: 1 } },
    ],
  },
  {
    id: 10,
    text: "¿Qué prefieres: trabajo físico o intelectual?",
    options: [
      { id: "A", text: "Totalmente intelectual", weights: { IT: 3, Business: 2 } },
      { id: "B", text: "Más físico y dinámico", weights: { Construction: 3, Mechanics: 2 } },
      { id: "C", text: "Una mezcla equilibrada", weights: { Health: 2, Electronics: 2, Hospitality: 2 } },
      { id: "D", text: "Manual pero con creatividad", weights: { Design: 2, Mechanics: 1, Construction: 1 } },
    ],
  },
];
