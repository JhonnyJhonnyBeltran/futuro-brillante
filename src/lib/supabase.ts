import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

const normalizedUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

export const supabase: SupabaseClient = createClient(normalizedUrl, anonKey);

const ANALYTICS_CONSENT_KEY = "descubre-t_analytics_consent";

function readStoredConsent(): boolean | null {
  if (typeof window === "undefined") return null;

  const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (storedValue === null) return null;

  return storedValue === "true";
}

export function getAnalyticsConsent(): boolean | null {
  return readStoredConsent();
}

export function setAnalyticsConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, accepted ? "true" : "false");
}

export async function trackEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const analyticsConsent = readStoredConsent();
  if (analyticsConsent !== true) return;

  try {
    if (supabase) {
      await supabase.from("events").insert([{ event, data, created_at: new Date().toISOString() }]);
    }
  } catch {
    // silently ignore analytics errors
  }
}

export interface SubmitQuizPayload {
  quizId: string;
  questions: Array<{
    question_id: string;
    question_text: string;
    phase: number;
    family: string | null;
  }>;
  answers: Array<{
    question_id: string;
    answer_key: string;
    answer_text: string;
  }>;
  results: string[];
  centro: string;
  genero: string;
  edad: string;
  durationSeconds: number | null;
  metadata?: Record<string, unknown>;
}

export interface SubmitQuizResult {
  success: boolean;
  submissionId?: string;
  reportUrl?: string;
  error?: unknown;
}

export async function submitRaffle(payload: {
  nombreCompleto: string;
  email: string;
  edad: string;
}): Promise<{ success: boolean; duplicate?: boolean; error?: unknown }> {
  try {
    const { data: existing } = await supabase
      .from("raffle_entries")
      .select("id")
      .eq("email", payload.email.toLowerCase().trim())
      .limit(1)
      .maybeSingle();

    if (existing) return { success: false, duplicate: true };

    const { error } = await supabase.from("raffle_entries").insert([{
      nombre_completo: payload.nombreCompleto,
      email: payload.email.toLowerCase().trim(),
      edad: payload.edad || null,
    }]);
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function submitQuiz(payload: SubmitQuizPayload): Promise<SubmitQuizResult> {
  try {
    const submissionId = crypto.randomUUID();
    const reportUrl = `${window.location.origin}/informe/${submissionId}`;

    const dbPayload = {
      id: submissionId,
      quiz_id: payload.quizId,
      questions: payload.questions,
      answers: payload.answers,
      main_result: payload.results[0] ?? "Unknown",
      result_2: payload.results[1] ?? null,
      result_3: payload.results[2] ?? null,
      centro: payload.centro || null,
      genero: payload.genero || null,
      edad: payload.edad ? parseInt(payload.edad, 10) : null,
      duration_seconds: payload.durationSeconds,
      metadata: payload.metadata ?? {},
      satisfied: true,
    };

    const { error } = await supabase.from("quiz_submissions").insert([dbPayload]);
    if (error) {
      console.error("[submitQuiz] Supabase error:", error.message, error.details, error.hint);
      return { success: false, error };
    }

    return { success: true, submissionId, reportUrl };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function updateSatisfied(
  submissionId: string,
  satisfied: boolean,
): Promise<void> {
  if (!submissionId) return;
  const { error } = await supabase.rpc("update_submission_satisfied", {
    submission_id: submissionId,
    satisfied_value: satisfied,
  });
  if (error) {
    console.error("[updateSatisfied] error:", error.message, error.details ?? "", error.hint ?? "");
  }
}
