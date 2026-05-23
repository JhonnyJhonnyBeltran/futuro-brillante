import {
  ciclos,
  type CicloConPuntuacion,
  type FamiliaKey,
} from "@/data/ciclos";
import { PREGUNTAS_FASE2 } from "@/data/preguntas";

const PESOS_FAMILIA: Record<FamiliaKey, Record<string, number>> = {
  FABRICACION: {
    "P1-A": 3,
    "P1-B": 1,
    "P2-A": 3,
    "P2-B": 1,
    "P3-A": 3,
    "P3-D": 1,
    "P4-A": 3,
    "P4-E": 2,
    "P5-A": 3,
    "P5-E": 1,
    "P6-A": 3,
    "P6-D": 1,
  },
  ELECTRICA: {
    "P1-B": 3,
    "P1-E": 2,
    "P2-A": 2,
    "P2-B": 2,
    "P2-E": 1,
    "P3-B": 3,
    "P3-E": 2,
    "P4-A": 1,
    "P4-B": 2,
    "P5-B": 2,
    "P5-C": 2,
    "P6-A": 2,
    "P6-C": 2,
  },
  CONSTRUCCION: {
    "P1-C": 3,
    "P1-D": 1,
    "P2-B": 3,
    "P2-C": 2,
    "P3-D": 3,
    "P3-A": 1,
    "P4-C": 3,
    "P4-E": 1,
    "P5-E": 3,
    "P5-C": 1,
    "P6-D": 3,
    "P6-B": 1,
  },
  GESTION: {
    "P1-D": 3,
    "P1-C": 1,
    "P2-D": 3,
    "P2-C": 1,
    "P3-C": 3,
    "P3-B": 1,
    "P4-D": 3,
    "P5-D": 3,
    "P5-C": 1,
    "P6-B": 3,
    "P6-E": 3,
  },
  DIGITAL: {
    "P1-E": 3,
    "P1-B": 2,
    "P2-C": 2,
    "P2-D": 1,
    "P3-E": 3,
    "P3-B": 1,
    "P4-B": 3,
    "P5-B": 3,
    "P5-C": 1,
    "P6-C": 3,
    "P6-A": 1,
  },
};

const ALPHA = 0.3; // peso de la señal de familia vs ciclo (0..1)
const SOFTMAX_BETA = 2.5; // controla la nitidez de la softmax (mayor = más enfocada)

const NIVEL_CICLO_RANK: Record<string, number> = {
  "Grado Básico": 0,
  "Grado Medio": 1,
  "Certificado de Especialidad": 1.5,
  "Grado Superior": 2,
};

const NIVEL_OBJETIVO_POR_RESPUESTA: Record<string, number | null> = {
  A: 0,
  B: 1,
  C: 2,
  D: null,
};

function getNivelObjetivoAcademico(respuestas: Record<string, string>) {
  return NIVEL_OBJETIVO_POR_RESPUESTA[respuestas.P10] ?? null;
}

function getCompatibilidadAcademica(
  nivelCiclo: string,
  nivelObjetivo: number | null,
) {
  if (nivelObjetivo === null) return 0;

  const nivelCicloRank = NIVEL_CICLO_RANK[nivelCiclo] ?? 1;

  if (nivelCicloRank === nivelObjetivo) return 2;
  if (nivelCicloRank < nivelObjetivo) return 1;
  return 0;
}

function computeMaxFamilyScores(): Record<FamiliaKey, number> {
  const maxScores: Record<FamiliaKey, number> = {
    FABRICACION: 0,
    ELECTRICA: 0,
    CONSTRUCCION: 0,
    GESTION: 0,
    DIGITAL: 0,
  };

  for (const familia of Object.keys(PESOS_FAMILIA) as FamiliaKey[]) {
    const pesos = PESOS_FAMILIA[familia];
    let total = 0;
    for (let p = 1; p <= 6; p++) {
      let maxOpt = 0;
      const prefix = `P${p}-`;
      for (const k of Object.keys(pesos)) {
        if (k.startsWith(prefix)) {
          maxOpt = Math.max(maxOpt, pesos[k] ?? 0);
        }
      }
      total += maxOpt;
    }
    maxScores[familia] = total;
  }

  return maxScores;
}

function computeMaxCicloScore(
  ciclo: (typeof ciclos)[0],
  familia: FamiliaKey,
  respuestas?: Record<string, string>,
) {
  const grid = getScoreGrid(ciclo, familia);
  if (!grid) return 0;
  let total = 0;
  for (const p of ["P7", "P8", "P9", "P10"] as const) {
    // si hay respuestas y la respuesta es una opción "No lo sé todavía", omitimos esta pregunta del máximo
    if (respuestas && respuestas[p]) {
      const respKey = respuestas[p];
      const preguntasFamilia = PREGUNTAS_FASE2[familia] ?? [];
      const pregunta = preguntasFamilia.find((q) => q.id === p);
      const opt = pregunta?.opciones.find((o) => o.clave === respKey);
      if (opt && /no lo sé/i.test(opt.texto)) continue;
    }
    const opts = grid[p];
    if (!opts) continue;
    const maxOpt = Math.max(...Object.values(opts as Record<string, number>));
    total += maxOpt;
  }
  return total;
}

function calcularScoresFamilia(
  respuestas: Record<string, string>,
): Record<FamiliaKey, number> {
  const scores: Record<FamiliaKey, number> = {
    FABRICACION: 0,
    ELECTRICA: 0,
    CONSTRUCCION: 0,
    GESTION: 0,
    DIGITAL: 0,
  };

  for (const familia of Object.keys(PESOS_FAMILIA) as FamiliaKey[]) {
    const pesos = PESOS_FAMILIA[familia];
    for (let p = 1; p <= 6; p++) {
      const resp = respuestas[`P${p}`];
      if (resp) {
        scores[familia] += pesos[`P${p}-${resp}`] ?? 0;
      }
    }
  }

  return scores;
}

export function detectarFamilia(
  respuestas: Record<string, string>,
): FamiliaKey {
  const scores = calcularScoresFamilia(respuestas);
  const maxFamilyScores = computeMaxFamilyScores();

  // normalizar por el máximo posible de cada familia
  const normalized: Record<FamiliaKey, number> = {
    FABRICACION: (scores.FABRICACION ?? 0) / (maxFamilyScores.FABRICACION || 1),
    ELECTRICA: (scores.ELECTRICA ?? 0) / (maxFamilyScores.ELECTRICA || 1),
    CONSTRUCCION:
      (scores.CONSTRUCCION ?? 0) / (maxFamilyScores.CONSTRUCCION || 1),
    GESTION: (scores.GESTION ?? 0) / (maxFamilyScores.GESTION || 1),
    DIGITAL: (scores.DIGITAL ?? 0) / (maxFamilyScores.DIGITAL || 1),
  };

  const maxNorm = Math.max(...Object.values(normalized));
  const empatadas = (Object.keys(normalized) as FamiliaKey[]).filter(
    (f) => normalized[f] === maxNorm,
  );

  if (empatadas.length === 1) return empatadas[0];

  // Desempate: usar la misma idea que había (B/E) pero normalizando por su máximo posible
  let mejorFamilia = empatadas[0];
  let mejorEB = -1;

  for (const familia of empatadas) {
    const pesos = PESOS_FAMILIA[familia];
    // calcular la puntuación EB (B o E) y su máximo posible para esta familia
    let ebScore = 0;
    let ebMax = 0;
    for (let p = 1; p <= 6; p++) {
      const resp = respuestas[`P${p}`];
      if (resp === "B" || resp === "E") {
        ebScore += pesos[`P${p}-${resp}`] ?? 0;
      }
      // calcular máximo posible entre B y E para este p (si existen en pesos)
      const optB = pesos[`P${p}-B`] ?? Number.NEGATIVE_INFINITY;
      const optE = pesos[`P${p}-E`] ?? Number.NEGATIVE_INFINITY;
      ebMax += Math.max(0, Math.max(optB, optE, 0));
    }
    const ebNorm = ebMax > 0 ? ebScore / ebMax : ebScore;
    if (ebNorm > mejorEB) {
      mejorEB = ebNorm;
      mejorFamilia = familia;
    }
  }

  return mejorFamilia;
}

function getScoreGrid(ciclo: (typeof ciclos)[0], familia: FamiliaKey) {
  if (ciclo.familias.length === 1) return ciclo.scores_f2 ?? null;
  const key = `scores_f2_${familia}` as keyof typeof ciclo;
  return (ciclo[key] as (typeof ciclo)["scores_f2"]) ?? ciclo.scores_f2 ?? null;
}

function puntuarCiclo(
  ciclo: (typeof ciclos)[0],
  familia: FamiliaKey,
  respuestas: Record<string, string>,
): number {
  const grid = getScoreGrid(ciclo, familia);
  if (!grid) return 0;

  let total = 0;
  for (const p of ["P7", "P8", "P9", "P10"] as const) {
    const resp = respuestas[p];
    if (resp && grid[p]) {
      // si la opción textual es "No lo sé todavía", no la contabilizamos
      const preguntasFamilia = PREGUNTAS_FASE2[familia] ?? [];
      const pregunta = preguntasFamilia.find((q) => q.id === p);
      const opt = pregunta?.opciones.find((o) => o.clave === resp);
      if (opt && /no lo sé/i.test(opt.texto)) {
        continue;
      }
      total += grid[p][resp] ?? 0;
    }
  }
  return total;
}

export function calcularRecomendaciones(
  respuestas: Record<string, string>,
): Array<
  CicloConPuntuacion & {
    percentage: number;
    confidence: number;
    familyUsed: FamiliaKey;
  }
> {
  const familiaScores = calcularScoresFamilia(respuestas);
  const maxFamilyScores = computeMaxFamilyScores();
  const nivelObjetivoAcademico = getNivelObjetivoAcademico(respuestas);

  let puntuados = ciclos
    .map((ciclo) => {
      const familias = ciclo.familias as FamiliaKey[];
      let familyUsed = familias[0];
      let bestFamilyScore = -1;

      for (const familia of familias) {
        const familyRaw = familiaScores[familia] ?? 0;
        const maxFamily = maxFamilyScores[familia] || 1;
        const normalizedFamily = familyRaw / maxFamily;
        if (normalizedFamily > bestFamilyScore) {
          bestFamilyScore = normalizedFamily;
          familyUsed = familia;
        }
      }

      const cicloRaw = puntuarCiclo(ciclo, familyUsed, respuestas);
      const maxCiclo = computeMaxCicloScore(ciclo, familyUsed, respuestas) || 1;
      const normalizedCiclo = maxCiclo > 0 ? cicloRaw / maxCiclo : 0;
      const normalizedFamily = Math.max(0, bestFamilyScore);

      const finalScore =
        ALPHA * normalizedFamily + (1 - ALPHA) * normalizedCiclo;
      const scoreOrdenado =
        finalScore + getCompatibilidadAcademica(ciclo.nivel, nivelObjetivoAcademico);

      return {
        ...ciclo,
        puntuacion: scoreOrdenado,
        familyUsed,
      } as CicloConPuntuacion & { familyUsed: FamiliaKey };
    })
    .filter((c) => c.puntuacion > 0)
    .sort((a, b) => b.puntuacion - a.puntuacion);

  if (puntuados.length === 0) return [];

  // aplicar softmax sobre los scores finales para obtener probabilidades relativas
  const scores = puntuados.map((p) => p.puntuacion);
  const maxScore = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(SOFTMAX_BETA * (s - maxScore)));
  const sumExps = exps.reduce((a, b) => a + b, 0) || 1;
  const probs = exps.map((e) => e / sumExps);

  // asignar percentage (softmax * 100) y confidence (diferencia porcentual)
  for (let i = 0; i < puntuados.length; i++) {
    (puntuados[i] as any).percentage = Math.round(probs[i] * 100);
  }

  puntuados = puntuados.slice(0, 3);
  for (let i = 0; i < puntuados.length; i++) {
    const next = puntuados[i + 1];
    const conf = next
      ? (puntuados[i] as any).percentage - (next as any).percentage
      : (puntuados[i] as any).percentage;
    (puntuados[i] as any).confidence = conf;
  }

  return puntuados;
}