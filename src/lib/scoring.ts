import { Family, FAMILY_DESCRIPTIONS, FAMILY_LABELS, QUESTIONS } from "./quiz-data";

export type ScoredFamily = {
  family: Family;
  label: string;
  description: string;
  score: number;
  percentage: number;
};

export function computeResults(
  answers: Record<number, "A" | "B" | "C" | "D" | undefined>
): ScoredFamily[] {
  const scores: Record<Family, number> = {
    IT: 0, Health: 0, Business: 0, Electronics: 0,
    Design: 0, Construction: 0, Mechanics: 0, Hospitality: 0,
  };

  for (const q of QUESTIONS) {
    const ansId = answers[q.id];
    if (!ansId) continue;
    const opt = q.options.find((o) => o.id === ansId);
    if (!opt) continue;
    for (const [fam, w] of Object.entries(opt.weights)) {
      scores[fam as Family] += w as number;
    }
  }

  const max = Math.max(...Object.values(scores), 1);

  return (Object.keys(scores) as Family[])
    .map((f) => ({
      family: f,
      label: FAMILY_LABELS[f],
      description: FAMILY_DESCRIPTIONS[f],
      score: scores[f],
      percentage: Math.round((scores[f] / max) * 100),
    }))
    .sort((a, b) => b.score - a.score);
}
