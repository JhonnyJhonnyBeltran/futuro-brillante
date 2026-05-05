# Futuro Brillante

## Configurar Supabase

1. Crea tu proyecto en Supabase.
2. Copia el archivo `.env.example` a `.env`.
3. Rellena estas variables con los valores de `Project Settings > API`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

4. Arranca la app con `npm run dev`.

El cliente de Supabase queda disponible en `src/lib/supabase.ts`.
