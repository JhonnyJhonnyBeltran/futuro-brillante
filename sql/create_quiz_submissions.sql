-- Archivo: sql/create_quiz_submissions.sql
-- Objetivo: Crear persistencia anónima de respuestas al finalizar un cuestionario

-- 1) Activar extensión para generar UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) Crear la tabla que almacena cada envío (una fila = un cuestionario completado)
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  answers jsonb NOT NULL,
  main_result text NOT NULL DEFAULT 'Unknown',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Compatibilidad con instalaciones donde la tabla ya existía sin estas columnas
ALTER TABLE public.quiz_submissions
ADD COLUMN IF NOT EXISTS questions jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.quiz_submissions
ADD COLUMN IF NOT EXISTS main_result text NOT NULL DEFAULT 'Unknown';

-- 3) Nuevas columnas (v2): top 3 resultados, perfil del alumno, tiempo y URL de informe
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS result_2 text;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS result_3 text;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS centro text;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS genero text;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS edad text;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS duration_seconds integer;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS report_url text;

-- 4) Índices útiles
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_quiz_id ON public.quiz_submissions (quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_created_at ON public.quiz_submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_genero ON public.quiz_submissions (genero);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_centro ON public.quiz_submissions (centro);

-- 5) Habilitar Row Level Security para controlar acceso
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- 6) Política: permitir INSERTS anónimos desde la role `anon` (clave: anon key en Supabase)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_submissions;
CREATE POLICY "Allow anonymous inserts"
  ON public.quiz_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 7) Política: permitir INSERTS para usuarios autenticados
DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.quiz_submissions;
CREATE POLICY "Allow authenticated inserts"
  ON public.quiz_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 8) Política: permitir SELECT para usuarios autenticados (panel de datos)
DROP POLICY IF EXISTS "Allow authenticated select" ON public.quiz_submissions;
CREATE POLICY "Allow authenticated select"
  ON public.quiz_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- 9) Concesiones mínimas
GRANT INSERT ON public.quiz_submissions TO anon;
GRANT INSERT, SELECT ON public.quiz_submissions TO authenticated;

-- NOTAS DE USO:
-- - main_result = primer resultado (mayor afinidad), result_2 y result_3 los siguientes.
-- - centro, genero, edad: recogidos en el formulario previo al cuestionario.
-- - duration_seconds: segundos desde que el alumno empieza la primera pregunta hasta que ve resultados.
-- - report_url: URL de la página /informe/{id} generada en el momento del envío.
-- - Para mantener anonimato: NO almacenar campos identificables (email, ip, auth.uid).

-- FIN
