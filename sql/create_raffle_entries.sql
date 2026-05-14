-- Archivo: sql/create_raffle_entries.sql
-- Tabla para inscripciones al sorteo Descubre-T.
-- Es completamente independiente de quiz_submissions (anónima).
-- Los datos se recogen solo si el usuario acepta explícitamente el tratamiento.

CREATE TABLE IF NOT EXISTS public.raffle_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_completo text NOT NULL,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_raffle_entries_created_at ON public.raffle_entries (created_at);

ALTER TABLE public.raffle_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous raffle inserts" ON public.raffle_entries;
CREATE POLICY "Allow anonymous raffle inserts"
  ON public.raffle_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated raffle select" ON public.raffle_entries;
CREATE POLICY "Allow authenticated raffle select"
  ON public.raffle_entries
  FOR SELECT
  TO authenticated
  USING (true);

GRANT INSERT ON public.raffle_entries TO anon;
GRANT INSERT, SELECT ON public.raffle_entries TO authenticated;

-- NOTAS:
-- - Esta tabla NO guarda el acepta_datos (el usuario no puede inscribirse sin aceptar en el frontend).
-- - No se relaciona con quiz_submissions: no hay session_id ni ningún campo común.
