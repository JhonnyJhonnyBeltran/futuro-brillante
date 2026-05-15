export type FamiliaKey = "FABRICACION" | "ELECTRICA" | "CONSTRUCCION" | "GESTION" | "DIGITAL";

export interface ScoreGrid {
  P7: Record<string, number>;
  P8: Record<string, number>;
  P9: Record<string, number>;
  P10: Record<string, number>;
}

export interface Ciclo {
  id: string;
  nombre: string;
  nombreGenerico: string;
  nivel: string;
  area: string;
  descripcion: string;
  familias: FamiliaKey[];
  scores_f2?: ScoreGrid;
  scores_f2_FABRICACION?: ScoreGrid;
  scores_f2_ELECTRICA?: ScoreGrid;
  scores_f2_CONSTRUCCION?: ScoreGrid;
  scores_f2_GESTION?: ScoreGrid;
  scores_f2_DIGITAL?: ScoreGrid;
}

export interface CicloConPuntuacion extends Ciclo {
  puntuacion: number;
}

export const ciclos: Ciclo[] = [
  {
    id: "fpb_fabricacion",
    nombre: "FPB Fabricación y Montaje",
    nombreGenerico: "Taller y Herramienta",
    nivel: "Grado Básico",
    area: "Fabricación",
    descripcion: "Montas y fabricas piezas en taller bajo supervisión directa.",
    familias: ["FABRICACION"],
    scores_f2: {
      P7: { A: 3, B: 1, C: 0, D: 0, E: 0 },
      P8: { A: 3, B: 1, C: 0, D: 0 },
      P9: { A: 3, B: 1, C: 0, D: 0, E: 0 },
      P10: { A: 3, B: 0, C: -4, D: 1 },
    },
  },
  {
    id: "gm_mecanizado",
    nombre: "GM Mecanizado",
    nombreGenerico: "Precisión en Metal",
    nivel: "Grado Medio",
    area: "Fabricación",
    descripcion: "Fabricas piezas de precisión con tornos y fresadoras.",
    familias: ["FABRICACION"],
    scores_f2: {
      P7: { A: 2, B: 3, C: 0, D: 0, E: 0 },
      P8: { A: 0, B: 3, C: 1, D: 0 },
      P9: { A: 1, B: 3, C: 0, D: 0, E: 0 },
      P10: { A: -3, B: 3, C: 0, D: 1 },
    },
  },
  {
    id: "gs_diseno_fabricacion",
    nombre: "GS Diseño en Fabricación Mecánica",
    nombreGenerico: "Del Plano a la Pieza",
    nivel: "Grado Superior",
    area: "Fabricación",
    descripcion: "Diseñas y programas procesos de fabricación con software CAD/CAM.",
    familias: ["FABRICACION"],
    scores_f2: {
      P7: { A: 0, B: 1, C: 3, D: 1, E: 1 },
      P8: { A: 0, B: 1, C: 3, D: 2 },
      P9: { A: 0, B: 1, C: 3, D: 1, E: 1 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
  },
  {
    id: "gs_prog_produccion",
    nombre: "GS Programación de la Producción Mecánica",
    nombreGenerico: "Orquestando la Fábrica",
    nivel: "Grado Superior",
    area: "Fabricación / Gestión",
    descripcion: "Planificas cuándo y cómo se fabrica cada pieza en la empresa.",
    familias: ["FABRICACION", "GESTION"],
    scores_f2_FABRICACION: {
      P7: { A: 0, B: 0, C: 1, D: 3, E: 0 },
      P8: { A: 0, B: 1, C: 3, D: 1 },
      P9: { A: 0, B: 0, C: 1, D: 3, E: 0 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
    scores_f2_GESTION: {
      P7: { A: 0, B: 3, C: 1, D: 2 },
      P8: { A: 0, B: 3, C: 0, D: 3 },
      P9: { A: 0, B: 3, C: 0, D: 3 },
      P10: { A: 0, B: 3, C: 1, D: 2 },
    },
  },
  {
    id: "ce_fabricacion_aditiva",
    nombre: "CE Fabricación Aditiva",
    nombreGenerico: "Imprime el Futuro",
    nivel: "Certificado de Especialidad",
    area: "Fabricación / Digital",
    descripcion: "Diseñas y fabricas objetos con impresión 3D y tecnología digital.",
    familias: ["FABRICACION", "DIGITAL"],
    scores_f2_FABRICACION: {
      P7: { A: 0, B: 0, C: 1, D: 0, E: 3 },
      P8: { A: 0, B: 0, C: 1, D: 3 },
      P9: { A: 0, B: 0, C: 1, D: 0, E: 3 },
      P10: { A: 1, B: 2, C: 1, D: 2 },
    },
    scores_f2_DIGITAL: {
      P7: { A: 0, B: 0, C: 3, D: 0 },
      P8: { A: 0, B: 0, C: 3, D: 0 },
      P9: { A: 0, B: 0, C: 3, D: 0 },
      P10: { A: 2, B: 2, C: 1, D: 2 },
    },
  },
  {
    id: "fpb_electricidad",
    nombre: "FPB Electricidad y Electrónica",
    nombreGenerico: "Corriente y Circuitos",
    nivel: "Grado Básico",
    area: "Eléctrica",
    descripcion: "Realizas instalaciones eléctricas básicas en edificios bajo supervisión.",
    familias: ["ELECTRICA"],
    scores_f2: {
      P7: { A: 3, B: 0, C: 0, D: 0 },
      P8: { A: 3, B: 0, C: 0, D: 0 },
      P9: { A: 3, B: 0, C: 0, D: 0 },
      P10: { A: 3, B: 0, C: -4, D: 1 },
    },
  },
  {
    id: "gm_instalaciones",
    nombre: "GM Instalaciones Eléctricas y Automáticas",
    nombreGenerico: "Luz en Cada Espacio",
    nivel: "Grado Medio",
    area: "Eléctrica",
    descripcion: "Instalas y mantienes sistemas eléctricos en edificios e industria.",
    familias: ["ELECTRICA"],
    scores_f2: {
      P7: { A: 3, B: 1, C: 0, D: 1 },
      P8: { A: 2, B: 1, C: 0, D: 0 },
      P9: { A: 3, B: 1, C: 0, D: 1 },
      P10: { A: -3, B: 3, C: 0, D: 1 },
    },
  },
  {
    id: "gm_electro",
    nombre: "GM Mantenimiento Electromecánico",
    nombreGenerico: "Motor y Voltaje",
    nivel: "Grado Medio",
    area: "Eléctrica / Mecánica",
    descripcion: "Mantienes y reparas máquinas industriales que combinan motor y electricidad.",
    familias: ["ELECTRICA", "FABRICACION"],
    scores_f2_ELECTRICA: {
      P7: { A: 1, B: 3, C: 0, D: 0 },
      P8: { A: 2, B: 2, C: 0, D: 1 },
      P9: { A: 2, B: 3, C: 0, D: 0 },
      P10: { A: -3, B: 3, C: 0, D: 1 },
    },
    scores_f2_FABRICACION: {
      P7: { A: 3, B: 2, C: 0, D: 0, E: 0 },
      P8: { A: 1, B: 3, C: 0, D: 0 },
      P9: { A: 3, B: 2, C: 0, D: 0, E: 0 },
      P10: { A: -3, B: 3, C: 0, D: 1 },
    },
  },
  {
    id: "gs_mecatronica",
    nombre: "GS Mecatrónica Industrial",
    nombreGenerico: "Máquinas Inteligentes",
    nivel: "Grado Superior",
    area: "Eléctrica / Digital",
    descripcion: "Integras mecánica, electricidad e informática para mantener sistemas industriales complejos.",
    familias: ["ELECTRICA", "DIGITAL"],
    scores_f2_ELECTRICA: {
      P7: { A: 0, B: 2, C: 2, D: 3 },
      P8: { A: 0, B: 1, C: 2, D: 3 },
      P9: { A: 0, B: 3, C: 1, D: 2 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
    scores_f2_DIGITAL: {
      P7: { A: 1, B: 3, C: 0, D: 2 },
      P8: { A: 1, B: 3, C: 0, D: 2 },
      P9: { A: 1, B: 3, C: 0, D: 2 },
      P10: { A: -4, B: 1, C: 3, D: 1 },
    },
  },
  {
    id: "gs_automatizacion",
    nombre: "GS Automatización y Robótica Industrial",
    nombreGenerico: "Programando Robots",
    nivel: "Grado Superior",
    area: "Digital / Eléctrica",
    descripcion: "Programas robots y sistemas automatizados en entornos de Industria 4.0.",
    familias: ["DIGITAL", "ELECTRICA"],
    scores_f2_DIGITAL: {
      P7: { A: 3, B: 1, C: 0, D: 3 },
      P8: { A: 3, B: 1, C: 0, D: 3 },
      P9: { A: 3, B: 1, C: 0, D: 3 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
    scores_f2_ELECTRICA: {
      P7: { A: 0, B: 0, C: 3, D: 2 },
      P8: { A: 0, B: 0, C: 3, D: 2 },
      P9: { A: 0, B: 0, C: 3, D: 2 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
  },
  {
    id: "gs_sistemas",
    nombre: "GS Sistemas Electrotécnicos y Automatizados",
    nombreGenerico: "Diseña la Red Eléctrica",
    nivel: "Grado Superior",
    area: "Eléctrica",
    descripcion: "Diseñas y supervisas instalaciones eléctricas, telecomunicaciones y automatización.",
    familias: ["ELECTRICA"],
    scores_f2: {
      P7: { A: 1, B: 1, C: 1, D: 3 },
      P8: { A: 0, B: 1, C: 1, D: 2 },
      P9: { A: 1, B: 1, C: 1, D: 3 },
      P10: { A: -4, B: 0, C: 3, D: 1 },
    },
  },
  {
    id: "gs_edificacion",
    nombre: "GS Proyectos de Edificación",
    nombreGenerico: "Del Plano al Edificio",
    nivel: "Grado Superior",
    area: "Construcción",
    descripcion: "Elaboras planos, presupuestos y documentación técnica de proyectos de obra.",
    familias: ["CONSTRUCCION"],
    scores_f2: {
      P7: { A: 1, B: 3, C: 2, D: 3 },
      P8: { A: 3, B: 2, C: 2, D: 1 },
      P9: { A: 1, B: 3, C: 2, D: 2 },
      P10: { A: 1, B: 2, C: 2, D: 3 },
    },
  },
  {
    id: "gs_prl",
    nombre: "GS Prevención de Riesgos Laborales",
    nombreGenerico: "Seguridad para Todos",
    nivel: "Grado Superior",
    area: "Gestión",
    descripcion: "Gestionas la seguridad y salud laboral en empresas de cualquier sector.",
    familias: ["GESTION"],
    scores_f2: {
      P7: { A: 3, B: 0, C: 3, D: 1 },
      P8: { A: 3, B: 0, C: 3, D: 0 },
      P9: { A: 3, B: 0, C: 1, D: 0 },
      P10: { A: 0, B: 1, C: 3, D: 1 },
    },
  },
];
