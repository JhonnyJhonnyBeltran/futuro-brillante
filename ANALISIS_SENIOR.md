# 📋 ANÁLISIS SENIOR: DESCUBRE-T vs Código Actual

**Fecha**: 12 de mayo de 2026  
**Estado**: ⚠️ PARCIALMENTE IMPLEMENTADO  
**Criticidad**: 🔴 CRÍTICA (Bug de imports que rompe producción)

---

## 🎯 RESUMEN EJECUTIVO

El proyecto **DESCUBRE-T** es una plataforma de orientación vocacional que debe:
1. Detectar competencias del alumno (Fase 1: 6 preguntas genéricas)
2. Ocultar nombres de ciclos hasta el final (✨ diferenciador clave)
3. Personalizar Fase 2 según familia detectada (4 preguntas específicas)
4. Recomendar 3 ciclos por afinidad competencial
5. Romper estereotipos de género con neutralidad

**Veredicto**: El código tiene ~70% de funcionalidad implementada, pero le faltan funcionalidades críticas y tiene bugs que impiden que funcione en producción.

---

## 🔴 PROBLEMAS CRÍTICOS (BLOQUEAN PRODUCCIÓN)

### 2. Falta Ocultación de Nombres de Ciclos
```typescript
// ACTUAL - Muestra el nombre real del ciclo:
resultado = {
  nombre: "GM Mantenimiento Electromecánico",  // ❌ Nombre visible
  puntuacion: 15
}

// REQUERIDO - Debe ocultarse:
resultado = {
  nombreGenerico: "Ciclo de Especialidad Técnica",  // ✅ Nombre oculto
  nombre: "GM Mantenimiento Electromecánico",       // Se revela al hacer clic
  puntuacion: 15
}
```
- **POR QUE ES IMPORTANTE**: Elimina sesgo de género. Si ven "Electricidad" primero, las chicas pueden autodescartarse
- **IMPACTO**: El proyecto NO cumple su misión de romper estereotipos
- **FIX**: 2-3 horas

---

## 🟠 PROBLEMAS IMPORTANTES (FUNCIONALIDAD FALTANTE)

| Funcionalidad | Estado | Impacto | Requisito |
|---|---|---|---|
| Campo de Género | ❌ No existe | Alto | "Análisis de disparidad de género" |
| Contexto (edad, centro) | ❌ No existe | Alto | "Información procedente de... centros" |
| Competencias Requeridas | ⚠️ Mínima | Alto | "Competencias requeridas para cada ciclo" |
| Explicación DESCUBRE-T | ⚠️ Genérica | Medio | "Explicar metodología en Welcome" |
| PDF/Informe | ❌ No existe | Medio | "Descargar resultados" (inferido) |

---

## 📊 MATRIZ DE IMPLEMENTACIÓN

```
FUNCIONALIDAD CORE                                  ESTADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Fase 1: 6 preguntas genéricas                    100%
✅ Detección de familia por competencias            100%
✅ Fase 2: 4 preguntas por familia                  100%
✅ Scoring con pesos personalizados                 100%
✅ Recomendación de 3 ciclos                        100%
✅ Interfaz atractiva + animaciones                 100%
❌ Ocultación de nombres de ciclos                   0%
❌ Campo de género                                   0%
❌ Contexto del alumno                               0%
⚠️  Tracking de analytics                           30% (básico)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL                                                ~70%
```

---

## 🏗️ PLAN DE ACCIÓN RECOMENDADO

### FASE 0: Hotfixes (30 minutos) 🔴 URGENTE
1. Crear `src/lib/scoring.ts` como adapter
2. Corregir imports en `Results.tsx`
3. ✅ Resulta funcionando

### FASE 1: Ocultación de Ciclos (2-3 horas) 🔴 CRÍTICA
1. Ampliar estructura de `Ciclo` con `nombreGenerico`
2. Crear componente `RevealCard.tsx` con animación de reveal
3. Integrar en `Results.tsx`
4. ✅ Cumple requisito de género

### FASE 2: Contexto del Alumno (1.5 horas) 🟠 ALTA
1. Crear `ContextForm.tsx` antes del cuestionario
2. Capturar: género, edad, centro, nivel previo
3. Guardar en sessionStorage
4. Pasar a `submitQuiz`

### FASE 3: Información Mejorada (1 hora) 🟠 ALTA
1. Ampliar estructura de ciclos con competencias requeridas
2. Crear `CompetenciasInfo.tsx`
3. Mostrar en resultados

### FASE 4: Analytics & UX (2 horas) 🟡 MEDIA
1. Mejorar tracking
2. Crear `PreTest.tsx` (explica DESCUBRE-T)
3. Agregar opción de descargar informe

---

## 📂 CAMBIOS DETALLADOS POR ARCHIVO

### 🆕 Crear (7 archivos)
```
src/lib/scoring.ts                      [60 líneas]
src/data/contexto.ts                    [30 líneas]
src/components/RevealCard.tsx           [120 líneas]
src/components/ContextForm.tsx          [180 líneas]
src/components/CompetenciasInfo.tsx     [100 líneas]
src/pages/PreTest.tsx                   [120 líneas]
```

### 📝 Modificar (5 archivos)
```
src/data/ciclos.ts                      [+5 propiedades en Ciclo]
src/pages/Results.tsx                   [import + integración RevealCard]
src/lib/supabase.ts                     [mejorar submitQuiz con contexto]
src/components/Cuestionario.tsx         [integrar ContextForm]
src/pages/Welcome.tsx                   [mejorar explicación]
```

---

## 💡 RECOMENDACIONES DE ARQUITECTURA

### Flujo de Datos Mejorado
```
Welcome 
  ↓
PreTest (explica DESCUBRE-T)
  ↓
ContextForm (género, edad, centro)
  ↓
Fase 1: 6 preguntas genéricas
  ↓
[Detecta familia]
  ↓
Fase 2: 4 preguntas por familia
  ↓
[Calcula scoring + recomendaciones]
  ↓
Results.tsx (RevealCard: oculta→revela nombres)
  ↓
Opción: Descargar informe | Compartir | Más info
```

### Estructura de Datos de Ciclo Mejorada
```typescript
interface Ciclo {
  // Existente
  id: string;
  nombre: string;              // "GM Instalaciones Eléctricas"
  nivel: string;               // "Grado Medio"
  descripcion: string;
  familias: FamiliaKey[];
  
  // NUEVO - Para DESCUBRE-T
  nombreGenerico: string;      // "Ciclo de Especialización Técnica"
  competenciasRequeridas: string[];  // Según Anexo 3 del PDF
  salidasProfesionales: string[];
  requisitosAcceso: string;    // "ESO completa"
  modalidades: string[];       // ["Presencial", "Dual"]
}
```

---

## 🎓 COMPETENCIAS REQUERIDAS POR CICLO

Según el Anexo 3 del requisitos.pdf, para **Mantenimiento Electromecánico**:
```
✓ Matemáticas (ecuaciones, trigonometría, conversión unidades)
✓ Física Básica
✓ Dibujo Técnico Básico
✓ Electricidad Básica
✓ Comprensión Lectora
✓ Herramientas Básicas
✓ Prevención de Riesgos Laborales
✓ Informática Básica
✓ Inglés Básico
```

→ Esto DEBE agregarse a cada ciclo para permitir análisis y recomendaciones de apoyo.

---

## 📈 MÉTRICAS A TRACKEAR

Para cumplir "Implicación de la comunidad educativa en la actividad":
```
1. Número de alumnos: Total respuestas
2. % Mujeres vs Hombres: Cuestión de género
3. Familia detectada: Distribución por competencia
4. Ciclo recomendado #1: Más popular
6. Centros educativos: Procedencia
7. Tiempo de respuesta: Facilidad de uso
8. % Reveals: Curiosidad sobre ciclos
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Hotfixes
- [ ] Crear `src/lib/scoring.ts`
- [ ] Corregir imports en `Results.tsx`
- [ ] Test: Página de resultados carga

### Ocultación de Ciclos (Crítico)
- [ ] Ampliar `Ciclo` interface
- [ ] Crear `RevealCard.tsx`
- [ ] Agregar datos de `nombreGenerico` a ciclos
- [ ] Integrar en `Results.tsx`
- [ ] Test: Click en card revela nombre

### Contexto
- [ ] Crear `ContextForm.tsx`
- [ ] Crear `src/data/contexto.ts`
- [ ] Integrar en `Cuestionario.tsx` (antes de Fase 1)
- [ ] Guardar contexto en sessionStorage
- [ ] Pasar a `submitQuiz`

### Info Mejorada
- [ ] Ampliar ciclos.ts con competencias
- [ ] Crear `CompetenciasInfo.tsx`
- [ ] Mostrar en resultados

---

## 🚀 PRÓXIMOS PASOS

**Opción A: Comenzar con Hotfixes (RECOMENDADO)**
→ Arregla el bug crítico primero (30 min)

**Opción B: Implementación Completa**
→ Toma ~8 horas pero deja el proyecto production-ready

**Mi recomendación**: 
1. Hotfix ahora (30 min)
2. Ocultación de ciclos mañana (2 horas, es el corazón de DESCUBRE-T)
3. Contexto + Info el resto de la semana

---

## 📞 DUDAS O CLARIFICACIONES

¿Necesitas que:
- [ ] Genere código para alguna fase?
- [ ] Expanda el análisis de algún área?
- [ ] Te muestre ejemplos de RevealCard?
- [ ] Cree estructura de datos específica?

