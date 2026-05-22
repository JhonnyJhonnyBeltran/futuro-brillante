# Auditoría Capacitor — Plan de 9 días para publicación en iOS y Android

**Fecha:** 21 May 2026  
**Proyecto:** futuro-brillante  
**Estado global:** 🔴 Bloqueantes críticos antes de enviar

---

## Resumen ejecutivo

| | Cantidad |
|---|---|
| Bloqueantes críticos | 5 |
| Advertencias | 12 |
| OK sin acción | 6 |
| Días disponibles | 9 |

---

## 5 Bloqueantes críticos

### B1 — Capacitor no instalado (sin binarios nativos)
**Plataformas:** iOS + Android

- **Problema:** No hay dependencias `@capacitor/*` ni `capacitor.config.*`. Sin esto no existe proyecto iOS ni Android.
- **Por qué rechaza:** No se puede generar ningún binario. Es el paso 0.
- **Solución:**
  ```bash
  npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
  npx cap init
  npx cap add ios
  npx cap add android
  ```
- **Cuándo:** Día 1 — sin esto nada más funciona

---

### B2 — Sin política de privacidad accesible en la app
**Plataformas:** iOS + Android

- **Problema:** No hay ninguna pantalla ni enlace a política de privacidad dentro de la app.
- **Por qué rechaza:** Apple (guideline 5.1.1) y Google Play requieren política accesible desde la propia app, no solo en la ficha.
- **Solución:** Crear componente `PrivacyPolicy.tsx` y enlazarlo desde la pantalla de inicio o formulario de registro. Puedes usar iubenda o similar para generarla.
- **Cuándo:** Días 3-4

---

### B3 — Recogida de PII sin disclosure (sorteo)
**Plataformas:** iOS + Android

- **Problema:** Nombre y email se envían a Supabase. El consentimiento existe pero sin enlace a política.
- **Por qué rechaza:** Google Data Safety y App Store Privacy Nutrition Label requieren disclosure explícito del uso de datos.
- **Solución:** Añadir junto al formulario: *"Tus datos se usan para X. Ver política de privacidad [enlace]"*. Activar Data Safety en Play Console.
- **Cuándo:** Días 3-4

---

### B4 — Edad mínima 10 años — riesgo COPPA/RGPD
**Plataformas:** iOS + Android

- **Problema:** La app acepta menores de 13 años. Edad mínima = 10. Se recogen datos obligatorios (edad, género).
- **Por qué rechaza:** COPPA (EE.UU.) y RGPD requieren consentimiento parental verificable para menores de 13/16. Apple y Google tienen revisión estricta.
- **Solución:**
  - Opción A (recomendada para el deadline): subir edad mínima a 18.
  - Opción B: implementar parental gate + policy específica.
- **Cuándo:** Días 3-4 — decisión urgente

---

### B5 — Tracking de eventos sin consentimiento (RGPD)
**Plataformas:** iOS + Android

- **Problema:** `trackEvent()` envía eventos a Supabase sin opt-in. Hay `console.log` con datos sensibles.
- **Por qué rechaza:** Incumplimiento RGPD. Google Play Data Safety lo detecta. Apple ATT requiere prompt si hay tracking cross-app.
- **Solución:** Mostrar banner de consentimiento analytics al primer arranque. Gatear `trackEvent()` detrás de la aceptación. Eliminar `console.log` en build de producción.
- **Cuándo:** Días 3-4

---

## Plan de 9 días

### Días 1-2 — Capacitor y proyectos nativos 🔴
- Instalar Capacitor: core, cli, ios, android
- Crear `capacitor.config.ts` con `appId` correcto
- `npx cap add ios && npx cap add android`
- Primer build: `npm run build` → `npx cap sync`
- Abrir Xcode y Android Studio — verificar que compila

### Días 3-4 — Privacidad y compliance 🟠
- Crear pantalla `PrivacyPolicy` y enlazarla desde la app
- Decidir edad mínima (recomendado: subir a 18)
- Añadir disclosure de datos junto a formularios
- Banner de consentimiento analytics (RGPD)
- Gatear `trackEvent()` detrás del consentimiento
- Eliminar `console.log` en producción (`vite --mode production`)

### Día 5 — Configuración nativa 🔵
- Configurar `Info.plist`: `NSUsageDescription` para cada permiso
- Verificar `AndroidManifest.xml` — permisos mínimos
- Confirmar Target SDK >= 34 en `build.gradle`
- Migrar a `HashRouter` o configurar `androidScheme: https`
- Probar descarga de PDF con `@capacitor/filesystem` + share

### Día 6 — Pruebas en dispositivos reales 🔵
- Pruebas en dispositivo iOS real (no solo simulador)
- Pruebas en dispositivo Android real
- Verificar que todas las llamadas de red son HTTPS (ATS)
- Smoke test del flujo completo: registro → sorteo → resultado

### Día 7 — Builds de producción 🟢
- Xcode: `Product → Archive → Validate → Upload` a App Store Connect
- Android Studio: Generate Signed Bundle (`.aab`) con keystore
- Subir AAB a Google Play Console — internal testing track
- Rellenar Data Safety en Play Console

### Día 8 — Envío a revisión 🟢
- App Store Connect: rellenar metadatos, capturas, categoría
- Completar App Privacy en App Store Connect
- Enviar a revisión App Store
- Enviar a revisión Google Play (production)

### Día 9 — Buffer ⚪
- Reservado para responder a reviewers si piden aclaraciones
- Tener preparadas capturas extra y respuestas a preguntas comunes

> ⚠️ Con la revisión de Apple tomando 1-3 días, el build debe estar subido antes del día 8. El día 9 es el único margen de maniobra.

---

## Checklist por plataforma

### App Store (iOS)

| Estado | Item |
|---|---|
| ❌ | Proyecto iOS creado (`cap add ios`) |
| ❌ | `Info.plist` con `NSUsageDescription` |
| ❌ | Política de privacidad en app |
| ⚠️ | WKWebView (Capacitor lo usa — verificar) |
| ⚠️ | HTTPS en todas las llamadas (ATS) |
| ⚠️ | Sin APIs privadas en plugins |
| ⚠️ | Soporte IPv6 |
| ✅ | Sin referencias a otras plataformas |
| ✅ | Sin compras in-app problemáticas |
| ✅ | Sin pantallas de carga > 20s |
| ⚠️ | App no considerada thin wrapper |

### Google Play (Android)

| Estado | Item |
|---|---|
| ❌ | Proyecto Android creado (`cap add android`) |
| ❌ | `AndroidManifest.xml` con permisos mínimos |
| ❌ | Target SDK >= 34 |
| ❌ | Política de privacidad en app |
| ❌ | Data Safety configurado en Play Console |
| ⚠️ | Permisos alto riesgo declarados |
| ⚠️ | AAB firmado con keystore |
| ⚠️ | Sin `console.log` con datos sensibles |
| ⚠️ | Soporte 64-bit |
| ✅ | Deep links: no aplica |
| ✅ | Sin WebRTC / Service Workers |

---

## Riesgo de rechazo por área

| Área | Riesgo |
|---|---|
| Capacitor / proyecto nativo | 🔴 100% |
| Privacidad y datos (RGPD / COPPA) | 🔴 90% |
| Firma y distribución (keystore / certificados) | 🟠 60% |
| WebView — router / PDF / HTTPS | 🟠 45% |
| Metadatos y fichas de tienda | 🟢 20% |

---

## Configuración Capacitor recomendada

```ts
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.tuorg.descubret",
  appName: "Descubre-T",
  webDir: "dist",
  bundledWebRuntime: false,
  server: { androidScheme: "https" }
};

export default config;
```

- `appId` único y en reverse domain
- `webDir` apunta al build real (`dist`)
- `server.hostname` no debe ser `localhost`
- No incluir secrets en config — usar `.env`
