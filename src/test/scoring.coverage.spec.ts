import { describe, expect, test } from "vitest";
import { calcularRecomendaciones } from "@/lib/scoring-v2";
import { ciclos, type Ciclo, type FamiliaKey } from "@/data/ciclos";
import { PREGUNTAS_FASE1 } from "@/data/preguntas";

type Respuestas = Record<string, string>;

type Grid = NonNullable<Ciclo["scores_f2"]>;

const FASE1_QUESTIONS = PREGUNTAS_FASE1.map((q) => ({
  id: q.id,
  opciones: q.opciones.map((o) => o.clave),
}));

function getScoreGrid(ciclo: Ciclo, familia: FamiliaKey): Grid | null {
  if (ciclo.familias.length === 1) return ciclo.scores_f2 ?? null;
  const key = `scores_f2_${familia}` as keyof Ciclo;
  return (ciclo[key] as Grid | undefined) ?? ciclo.scores_f2 ?? null;
}

function pickBestOption(questionScores: Record<string, number>) {
  let bestKey = Object.keys(questionScores)[0];
  let bestScore = questionScores[bestKey] ?? Number.NEGATIVE_INFINITY;
  for (const [key, score] of Object.entries(questionScores)) {
    if (score > bestScore) {
      bestKey = key;
      bestScore = score;
    }
  }
  return bestKey;
}

function buildBestFase2Base(grid: Grid) {
  return {
    P7: pickBestOption(grid.P7),
    P8: pickBestOption(grid.P8),
    P9: pickBestOption(grid.P9),
  };
}

function getAllowedNivelKeysForCiclo(nivel: string) {
  if (nivel === "Grado Básico") return ["A", "B", "C", "D"] as const;
  if (nivel === "Grado Medio") return ["B", "C", "D"] as const;
  if (nivel === "Certificado de Especialidad") return ["C", "D"] as const;
  if (nivel === "Grado Superior") return ["C", "D"] as const;
  return ["C", "D"] as const;
}

function* generateFase1Combos(): Generator<Respuestas> {
  const total = FASE1_QUESTIONS.length;
  const indices = new Array(total).fill(0);
  while (true) {
    const respuesta: Respuestas = {};
    for (let i = 0; i < total; i += 1) {
      const q = FASE1_QUESTIONS[i];
      respuesta[q.id] = q.opciones[indices[i]];
    }
    yield respuesta;

    let pos = total - 1;
    while (pos >= 0) {
      const q = FASE1_QUESTIONS[pos];
      indices[pos] += 1;
      if (indices[pos] < q.opciones.length) break;
      indices[pos] = 0;
      pos -= 1;
    }
    if (pos < 0) break;
  }
}

function findResponsesForCycle(ciclo: Ciclo) {
  let firstAttempt: {
    respuestas: Respuestas;
    top3: string[];
  } | null = null;

  for (const base of generateFase1Combos()) {
    const allowedNivelKeys = getAllowedNivelKeysForCiclo(ciclo.nivel);
    if (!allowedNivelKeys.includes(base.PNIVEL as any)) {
      continue;
    }
    for (const familia of ciclo.familias) {
      const grid = getScoreGrid(ciclo, familia);
      if (!grid) continue;
      const fase2Base = buildBestFase2Base(grid);
      const p10Options = Object.keys(grid.P10);
      for (const p10 of p10Options) {
        const respuestas = {
          ...base,
          ...fase2Base,
          P10: p10,
        };
        const resultado = calcularRecomendaciones(respuestas);
        const top3 = resultado.map((r) => r.id);
        const rank = top3.indexOf(ciclo.id);
        if (rank !== -1) {
          return { found: true, respuestas, top3 } as const;
        }
        if (!firstAttempt) {
          firstAttempt = { respuestas, top3 };
        }
      }
    }
  }

  return { found: false, firstAttempt } as const;
}

describe("scoring coverage", () => {
  test.each(ciclos)(
    "cobertura: el ciclo $id puede aparecer en el top 3",
    (ciclo) => {
      const found = findResponsesForCycle(ciclo);
      if (found.found) {
        expect(found.top3, `Ciclo ${ciclo.id} no aparece en top3. Respuestas: ${JSON.stringify(found.respuestas)}. Resultado: ${JSON.stringify(found.top3)}`).toContain(ciclo.id);
        return;
      }

      const attempt = found.firstAttempt;
      const attemptMsg = attempt
        ? `Primer intento con respuestas ${JSON.stringify(attempt.respuestas)}. Top3: ${JSON.stringify(attempt.top3)}.`
        : "No se encontro ninguna combinacion valida.";
      throw new Error(
        `Ciclo inalcanzable: ${ciclo.id}. ${attemptMsg}`,
      );
    },
  );

  test("regresion: respuestas fijas devuelven top3 estable", () => {
    const respuestas: Respuestas = {
      P1: "A",
      P2: "A",
      P3: "A",
      P4: "A",
      P5: "A",
      P6: "A",
      PNIVEL: "A",
      P7: "A",
      P8: "A",
      P9: "A",
      P10: "A",
    };

    const resultado = calcularRecomendaciones(respuestas);
    const ids = resultado.map((r) => r.id);

    expect(
      ids,
      `Regresion de scoring. Respuestas: ${JSON.stringify(respuestas)}. Resultado: ${JSON.stringify(ids)}.`,
    ).toEqual(["fpb_fabricacion", "fpb_electricidad"]);
  });
});
