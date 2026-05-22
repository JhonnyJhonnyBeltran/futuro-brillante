# Informe de Auditoria — Preparacion App Store / Play Store (Capacitor)

Fecha: 21 May 2026  
Proyecto: futuro-brillante

## 1. Viabilidad con Capacitor

- ✅ Framework/rutas: React + Vite es compatible con Capacitor.
- ⚠️ Router: se usa `BrowserRouter`; en WebView funciona, pero para deep links se recomienda `HashRouter` o configurar `server`/`androidScheme`.
- ⚠️ APIs web fragiles en WebView:
  - Generacion PDF con `html2canvas` + `pdf-lib` y descarga via `a.download` puede fallar en iOS/Android.
  - Recomendado: `@capacitor/filesystem` + `@capacitor/share`.
- ✅ No se detecta uso de WebRTC/Web Workers/Service Workers.
- ❌ No hay configuracion de Capacitor (no existe `capacitor.config.*` ni dependencias `@capacitor/*`).

## 2. Checklist App Store (iOS)

- ❌ Info.plist: NSUsageDescription para cada permiso usado (no hay proyecto iOS).
- ⚠️ WKWebView: no UIWebView (Capacitor usa WKWebView, pero sin proyecto iOS no es verificable).
- ⚠️ HTTPS en todas las llamadas de red (sin config ATS verificable).
- ⚠️ Sin APIs privadas en plugins nativos (no hay plugins declarados).
- ⚠️ Soporte IPv6 (no verificable).
- ✅ Sin referencias a otras plataformas detectadas.
- ❌ Politica de privacidad accesible desde la app (no hay enlace/pantalla).
- ✅ Compras in-app: no aplica.
- ✅ Sin pantallas de carga > 20s sin feedback.
- ⚠️ Thin wrapper: funcional, pero sin integracion nativa podria considerarse wrapper simple.

## 3. Checklist Play Store (Android)

- ❌ AndroidManifest: permisos minimos (no hay proyecto Android).
- ❌ Target SDK >= 34 (no hay build Android).
- ⚠️ Permisos alto riesgo: no verificable sin manifest.
- ❌ Politica de privacidad enlazada en consola y en app.
- ❌ Data Safety: se recogen datos personales sin disclosure visible.
- ⚠️ APK/AAB firmado: no hay pipeline ni proyecto nativo.
- ⚠️ Sin logs sensibles: hay `console.log` en tracking.
- ⚠️ Soporte 64-bit: no verificable.
- ✅ Deep links/App Links: no detectados.

## 4. Bloqueantes criticos (Top 5)

1) **Falta Capacitor y proyectos nativos**  
   - **Problema:** No hay dependencias `@capacitor/*` ni config `capacitor.config.*`.  
   - **Rechazo:** No se puede generar binarios nativos ni cumplir requisitos de SDK/Manifest/Info.plist.  
   - **Solucion:** instalar Capacitor y crear ios/android.

2) **Sin politica de privacidad accesible desde la app**  
   - **Problema:** no hay pantalla ni link de privacidad.  
   - **Rechazo:** Apple/Google requieren politica accesible desde la app.  
   - **Solucion:** crear pagina `PrivacyPolicy` y enlazarla desde Welcome/Resultados y/o menu.

3) **Recoleccion de PII para sorteo sin disclosure claro**  
   - **Problema:** nombre y email se envian a Supabase; consentimiento sin link a politica.  
   - **Rechazo:** falta disclosure y cumplimiento de Data Safety.  
   - **Solucion:** añadir link visible a politica + texto de uso de datos.

4) **Datos sensibles (edad/genero) con posible menor de edad**  
   - **Problema:** edad minima 10, genero obligatorio; requiere consideracion COPPA/consentimiento parental.  
   - **Rechazo:** riesgo legal si hay menores.  
   - **Solucion:** subir edad minima o agregar consentimiento parental y policy especifica.

5) **Tracking de eventos sin opt-in/opt-out**  
   - **Problema:** `trackEvent` envia eventos a Supabase sin consentimiento.  
   - **Rechazo:** incumplimiento GDPR/Play Data Safety.  
   - **Solucion:** pedir consentimiento y gatear el tracking.

## 5. Plan de accion (7 dias)

- **Dia 1-2:**  
  - Instalar y configurar Capacitor.  
  - Crear ios/ y android/.  
  - Definir `appId`, `webDir`, `server` correcto.
- **Dia 3-4:**  
  - Implementar politica de privacidad en app.  
  - Añadir consentimiento para analytics y datos personales.  
  - Ajustar edad minima o consentimiento parental.
- **Dia 5:**  
  - Pruebas en dispositivos iOS + Android reales.  
  - Verificar flujo de PDF y enlaces externos.
- **Dia 6:**  
  - Build de produccion.  
  - Xcode Archive + Validate.  
  - Android Studio Signed Bundle (AAB).
- **Dia 7:**  
  - Buffer para ajustes y respuesta a revisores.

## 6. Configuracion de Capacitor (recomendada)

- Crear `capacitor.config.ts`:
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

- Verificar:
  - `appId` unico y en reverse domain.  
  - `webDir` apunta a build real (`dist`).  
  - `server.hostname` no debe ser `localhost`.  
  - No incluir secrets en config; usar `.env`.

## 7. Tests antes de enviar

- `npm run build`  
- `npx cap sync`  
- `npx cap open ios`  
- `npx cap open android`  
- Xcode: Archive + Validate  
- Android Studio: Generate Signed Bundle  
- Automatizacion recomendada:
  - Appium para pruebas end-to-end sobre WebView.  
  - Playwright para smoke tests de UI (modo web).

---

## Semaforo global

🔴 **bloqueantes criticos antes de enviar**
