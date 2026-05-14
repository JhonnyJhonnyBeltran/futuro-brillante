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

ALTER TABLE public.quiz_submissions
ADD COLUMN IF NOT EXISTS questions jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Compatibilidad con instalaciones donde la tabla ya existia sin esta columna
ALTER TABLE public.quiz_submissions
ADD COLUMN IF NOT EXISTS main_result text NOT NULL DEFAULT 'Unknown';

-- 3) Índices útiles
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_quiz_id ON public.quiz_submissions (quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_created_at ON public.quiz_submissions (created_at);

-- 4) Habilitar Row Level Security para controlar acceso
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- 5) Política: permitir INSERTS anónimos desde la role `anon` (clave: anon key en Supabase)
-- Esto permite que clientes que usen la "anon" key puedan enviar respuestas.
CREATE POLICY IF NOT EXISTS "Allow anonymous inserts"
  ON public.quiz_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 6) Política: permitir INSERTS para usuarios autenticados (opcional)
CREATE POLICY IF NOT EXISTS "Allow authenticated inserts"
  ON public.quiz_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 7) (Opcional) permitir SELECT solo a usuarios autenticados
-- Si prefieres que solo tu backend o usuarios autenticados lean los resultados,
-- habilita esta política. Si no la creas, por defecto nadie podrá seleccionar cuando RLS esté activo.
CREATE POLICY IF NOT EXISTS "Allow authenticated select"
  ON public.quiz_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- 8) Concesiones mínimas (por compatibilidad). Las policies son las que controlan el acceso;
-- estas GRANT ayudan en algunos setups, pero no sustituyen a las policies.
GRANT INSERT ON public.quiz_submissions TO anon;
GRANT INSERT, SELECT ON public.quiz_submissions TO authenticated;

-- NOTAS DE USO:
-- - Insertar desde cliente (JavaScript) usando la anon key de Supabase:
--   supabase.from('quiz_submissions').insert([{ quiz_id: 'quiz1', answers: {...}, metadata: {...} }])
-- - Para mantener anonimato: NO almacenar campos identificables (email, ip, auth.uid) en `answers` o `metadata`.
-- - Si necesitas agrupar respuestas del mismo usuario sin identificarlo, genera un `session_id` en el cliente
--   y envíalo como parte de `metadata` (uuid), sabiendo que sigue siendo anónimo si no se vincula a PII.

-- FIN
