import { describe, expect, test } from "vitest";
import { calcularRecomendaciones, detectarFamilia } from "@/lib/scoring-v2";
import { ciclos, type FamiliaKey } from "@/data/ciclos";
import { PREGUNTAS_FASE1 } from "@/data/preguntas";

type Respuestas = Record<string, string>;

type NivelKey = "A" | "B" | "C" | "D";

const FASE1_QUESTIONS = PREGUNTAS_FASE1.map((q) => ({
  id: q.id,
  opciones: q.opciones.map((o) => o.clave),
}));

const NIVEL_LABEL: Record<NivelKey, string> = {
  A: "ESO incompleta",
  B: "ESO completa",
  C: "Bachillerato",
  D: "No lo se",
};

const NIVEL_ALLOWED: Record<NivelKey, string[] | null> = {
  A: ["Grado Básico"],
  B: ["Grado Básico", "Grado Medio"],
  C: null,
  D: null,
};

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

function findFase1ForFamily(familia: FamiliaKey) {
  for (const base of generateFase1Combos()) {
    if (detectarFamilia(base) === familia) {
      return base;
    }
  }
  return null;
}

function buildFase2BaseForFamily(familia: FamiliaKey) {
  const ciclo = ciclos.find((c) => c.familias.includes(familia));
  if (!ciclo) throw new Error(`No hay ciclos para la familia ${familia}`);
  const grid = ciclo.scores_f2 ?? (ciclo[`scores_f2_${familia}` as const] as any);
  if (!grid) throw new Error(`No hay grid de scores para ${familia}`);

  const pickBest = (obj: Record<string, number>) =>
    Object.entries(obj).reduce((best, current) =>
      current[1] > best[1] ? current : best,
    )[0];

  return {
    P7: pickBest(grid.P7),
    P8: pickBest(grid.P8),
    P9: pickBest(grid.P9),
  };
}

const FAMILIAS: FamiliaKey[] = [
  "FABRICACION",
  "ELECTRICA",
  "CONSTRUCCION",
  "GESTION",
  "DIGITAL",
];

const NIVELES: NivelKey[] = ["A", "B", "C", "D"];

describe("scoring restricciones por nivel", () => {
  test("con respuestas completas hay recomendaciones", () => {
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
    expect(
      resultado.length,
      `Se esperaba al menos 1 recomendacion con respuestas completas. Respuestas: ${JSON.stringify(respuestas)}. Resultado: ${JSON.stringify(resultado.map((c) => c.id))}.`,
    ).toBeGreaterThan(0);
  });

  test.each(FAMILIAS.flatMap((familia) => NIVELES.map((nivel) => [familia, nivel])))(
    "nivel %s (%s) respeta restricciones de nivel en todas las familias",
    (familia, nivel) => {
      const base = findFase1ForFamily(familia);
      if (!base) {
        throw new Error(`No se pudo generar respuestas de fase 1 para ${familia}`);
      }

      const fase2 = buildFase2BaseForFamily(familia);
      const respuestas: Respuestas = {
        ...base,
        ...fase2,
        PNIVEL: nivel,
      };

      const resultado = calcularRecomendaciones(respuestas);
      expect(
        resultado.length,
        `Sin resultados para nivel ${NIVEL_LABEL[nivel]} y familia ${familia}. Respuestas: ${JSON.stringify(respuestas)}`,
      ).toBeGreaterThan(0);

      const allowed = NIVEL_ALLOWED[nivel];
      if (!allowed) return;

      const invalidos = resultado.filter((ciclo) => !allowed.includes(ciclo.nivel));
      if (invalidos.length > 0) {
        const ids = invalidos.map((c) => `${c.id} (${c.nivel})`);
        throw new Error(
          `Restriccion nivel ${NIVEL_LABEL[nivel]} incumplida para familia ${familia}. ` +
            `Respuestas: ${JSON.stringify(respuestas)}. ` +
            `Invalidos: ${ids.join(", ")}. Resultado: ${resultado.map((c) => c.id).join(", ")}.`,
        );
      }
    },
  );
});
