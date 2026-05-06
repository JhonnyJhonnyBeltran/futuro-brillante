import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

const normalizedUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

export const supabase: SupabaseClient = createClient(normalizedUrl, anonKey);

export async function trackEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    if (supabase) {
      supabase.from("events").insert([{ event, data, created_at: new Date().toISOString() }]);
      return;
    }
  } catch (error) {
    void error;
  }
  console.log("[trackEvent]", event, data);
}

export async function submitQuiz(
  quizId: string,
  questions: Array<{
    question_id: string;
    question_text: string;
    phase: number;
    family: string | null;
  }>,
  answers: Array<{
    question_id: string;
    answer_key: string;
    answer_text: string;
  }>,
  mainResult: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    const payload = { quiz_id: quizId, questions, answers, main_result: mainResult, metadata };

    const { data, error } = await supabase.from("quiz_submissions").insert([payload]);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
