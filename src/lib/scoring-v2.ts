import { ciclos, type CicloConPuntuacion, type FamiliaKey } from "@/data/ciclos";

const PESOS_FAMILIA: Record<FamiliaKey, Record<string, number>> = {
  FABRICACION: {
    "P1-A": 3, "P1-B": 1,
    "P2-A": 3, "P2-B": 1,
    "P3-A": 3, "P3-D": 1,
    "P4-A": 3, "P4-E": 2,
    "P5-A": 3, "P5-E": 1,
    "P6-A": 3, "P6-D": 1,
  },
  ELECTRICA: {
    "P1-B": 3, "P1-E": 2,
    "P2-A": 2, "P2-B": 2, "P2-E": 1,
    "P3-B": 3, "P3-E": 2,
    "P4-A": 1, "P4-B": 2,
    "P5-B": 2, "P5-C": 2,
    "P6-A": 2, "P6-C": 2,
  },
  CONSTRUCCION: {
    "P1-C": 3, "P1-D": 1,
    "P2-B": 3, "P2-C": 2,
    "P3-D": 3, "P3-A": 1,
    "P4-C": 3, "P4-E": 1,
    "P5-E": 3, "P5-C": 1,
    "P6-D": 3, "P6-B": 1,
  },
  GESTION: {
    "P1-D": 3, "P1-C": 1,
    "P2-D": 3, "P2-C": 1,
    "P3-C": 3, "P3-B": 1,
    "P4-D": 3,
    "P5-D": 3, "P5-C": 1,
    "P6-B": 3, "P6-E": 3,
  },
  DIGITAL: {
    "P1-E": 3, "P1-B": 2,
    "P2-C": 2, "P2-D": 1,
    "P3-E": 3, "P3-B": 1,
    "P4-B": 3,
    "P5-B": 3, "P5-C": 1,
    "P6-C": 3, "P6-A": 1,
  },
};

const ALPHA = 0.4; // peso de la señal de familia vs ciclo (0..1)
const SOFTMAX_BETA = 4; // controla la nitidez de la softmax (mayor = más enfocada)

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

function computeMaxCicloScore(ciclo: (typeof ciclos)[0], familia: FamiliaKey) {
  const grid = getScoreGrid(ciclo, familia);
  if (!grid) return 0;
  let total = 0;
  for (const p of ["P7", "P8", "P9", "P10"] as const) {
    const opts = grid[p];
    if (!opts) continue;
    const maxOpt = Math.max(...Object.values(opts as Record<string, number>));
    total += maxOpt;
  }
  return total;
}

function calcularScoresFamilia(respuestas: Record<string, string>): Record<FamiliaKey, number> {
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

export function detectarFamilia(respuestas: Record<string, string>): FamiliaKey {
  const scores = calcularScoresFamilia(respuestas);

  const maxScore = Math.max(...Object.values(scores));
  const empatadas = (Object.keys(scores) as FamiliaKey[]).filter(
    (f) => scores[f] === maxScore,
  );

  if (empatadas.length === 1) return empatadas[0];

  // Desempate: familia con mayor puntuación acumulada sólo con respuestas B y E en P1-P6
  let mejorFamilia = empatadas[0];
  let mejorEB = -1;

  for (const familia of empatadas) {
    const pesos = PESOS_FAMILIA[familia];
    let ebScore = 0;
    for (let p = 1; p <= 6; p++) {
      const resp = respuestas[`P${p}`];
      if (resp === "B" || resp === "E") {
        ebScore += pesos[`P${p}-${resp}`] ?? 0;
      }
    }
    if (ebScore > mejorEB) {
      mejorEB = ebScore;
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
      total += grid[p][resp] ?? 0;
    }
  }
  return total;
}

export function calcularRecomendaciones(
  respuestas: Record<string, string>,
): Array<CicloConPuntuacion & { percentage: number; confidence: number; familyUsed: FamiliaKey }> {
  const familiaScores = calcularScoresFamilia(respuestas);
  const familia = detectarFamilia(respuestas);

  const maxFamilyScores = computeMaxFamilyScores();

  function scoreCandidatesForFamily(familiaUsada: FamiliaKey) {
    const candidatos = ciclos.filter((c) => c.familias.includes(familiaUsada));
    return candidatos.map((ciclo) => {
      const cicloRaw = puntuarCiclo(ciclo, familiaUsada, respuestas);
      const maxCiclo = computeMaxCicloScore(ciclo, familiaUsada) || 1;
      const normalizedCiclo = cicloRaw / maxCiclo;

      const familyRaw = familiaScores[familiaUsada] ?? 0;
      const maxFamily = maxFamilyScores[familiaUsada] || 1;
      const normalizedFamily = familyRaw / maxFamily;

      const finalScore = ALPHA * normalizedFamily + (1 - ALPHA) * normalizedCiclo;
      return {
        ...ciclo,
        puntuacion: finalScore,
        familyUsed: familiaUsada,
      } as CicloConPuntuacion & { familyUsed: FamiliaKey };
    });
  }

  // primeros candidatos usando la familia detectada
  let puntuados = scoreCandidatesForFamily(familia).filter((c) => c.puntuacion > 0)
    .sort((a, b) => b.puntuacion - a.puntuacion);

  if (puntuados.length < 3) {
    const familiasOrdenadas = (Object.keys(familiaScores) as FamiliaKey[])
      .filter((f) => f !== familia)
      .sort((a, b) => familiaScores[b] - familiaScores[a]);

    const yaIncluidos = new Set(puntuados.map((c) => c.id));

    for (const segundaFamilia of familiasOrdenadas) {
      if (puntuados.length >= 3) break;
      const puntuadosSF = scoreCandidatesForFamily(segundaFamilia)
        .filter((c) => !yaIncluidos.has(c.id) && c.puntuacion >= 0)
        .sort((a, b) => b.puntuacion - a.puntuacion);

      for (const ciclo of puntuadosSF) {
        if (puntuados.length >= 3) break;
        yaIncluidos.add(ciclo.id);
        puntuados.push(ciclo);
      }
    }
  }

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
    const conf = next ? (puntuados[i] as any).percentage - (next as any).percentage : (puntuados[i] as any).percentage;
    (puntuados[i] as any).confidence = conf;
  }

  return puntuados;
}
