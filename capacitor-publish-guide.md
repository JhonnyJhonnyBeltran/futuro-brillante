# Publicar apps con Capacitor en Google Play y App Store

## Android (Google Play)

No publicas el `.apk` directamente — Google recomienda el formato `.aab` (Android App Bundle).

### Pasos

**1. Preparar el build**
```bash
npm run build
npx cap sync android
npx cap open android   # abre Android Studio
```

**2. Generar la keystore (firma — solo 1ª vez)**
```bash
keytool -genkey -v -keystore mi-app.keystore \
  -alias mi-app -keyalg RSA -keysize 2048 -validity 10000
```
> ⚠️ Guarda este archivo y sus contraseñas. Si lo pierdes, nunca podrás actualizar la app.

**3. Configurar la firma en Android Studio**

En `Build > Generate Signed Bundle/APK`, selecciona tu keystore y genera el `.aab`.

**4. Subir a Google Play Console**
- Crea la app en [play.google.com/console](https://play.google.com/console)
- Sube el `.aab` en *Production > Releases*
- Rellena ficha, capturas, política de privacidad
- Pago único de **25 USD** para la cuenta de desarrollador

---

## iOS (App Store)

Necesitas obligatoriamente un **Mac con Xcode**.

### Requisitos de sistema

| | Mínimo | Recomendado |
|---|---|---|
| **macOS** | Ventura 13.x | Sequoia 15.x |
| **Xcode** | 15.x | 16.x (última) |

> Los Macs desde ~2017 en adelante soportan Ventura sin problema.

**Verificar versiones:**
```bash
sw_vers          # versión de macOS
xcode-select -v  # versión Xcode CLI
```

### Requisitos de cuenta

| Requisito | Detalle |
|---|---|
| Apple Developer Account | **99 USD/año** en developer.apple.com |
| Activación | Puede tardar 24-48h tras el registro |

### Pasos

**1. Preparar el proyecto**
```bash
npm run build
npx cap sync ios
npx cap open ios   # abre Xcode
```

**2. Crear en Apple Developer Portal** → [developer.apple.com](https://developer.apple.com)

En este orden:
```
App ID        →  Identifiers > App IDs  (ej: com.tuempresa.miapp)
Certificate   →  Certificates > Apple Distribution
Profile       →  Profiles > App Store Distribution
```

**3. Generar el Certificate (.p12)**

Desde **Keychain Access** en tu Mac:
1. `Keychain Access > Certificate Assistant > Request a Certificate from a CA`
2. Genera el `.certSigningRequest` (CSR)
3. Súbelo en Developer Portal → descarga el `.cer`
4. Instálalo en Keychain y expórtalo como `.p12` (con contraseña)

**4. Configurar en Xcode**

En `Signing & Capabilities`:
```
Team:                  [tu Apple Developer account]
Bundle Identifier:     com.tuempresa.miapp
Provisioning Profile:  el que creaste
```

> 💡 Activa **"Automatically manage signing"** con tu cuenta conectada para que Xcode lo gestione solo — recomendado para empezar.

**5. Archivar y subir**
```
Product > Archive   →  genera el .xcarchive
```
Luego en el **Organizer** de Xcode:
- `Distribute App > App Store Connect > Upload`
- Xcode firma, valida y sube automáticamente

**6. En App Store Connect** → [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- Crea la app y rellena metadatos y capturas
- Selecciona el build subido
- Envía a revisión (tarda **1-3 días**)

---

## Resumen comparativo

| | Android | iOS |
|---|---|---|
| **Herramienta** | Android Studio | Xcode (solo Mac) |
| **Firma** | Keystore `.jks` | Certificate + Provisioning Profile |
| **Formato de subida** | `.aab` | `.xcarchive` → App Store Connect |
| **Coste cuenta** | 25 USD (único) | 99 USD/año |
| **Tiempo de revisión** | Horas / 1-2 días | 1-3 días |
| **¿Sin Mac posible?** | ✅ Sí | Solo con Codemagic / Xcode Cloud |

---

## Alternativas si no tienes Mac

| Servicio | Notas |
|---|---|
| **Codemagic** | CI/CD especializado en Capacitor/Flutter, tier gratuito disponible |
| **Xcode Cloud** | De Apple, integrado con App Store Connect, 25h/mes gratis |
| **GitHub Actions** | Runner macOS de pago, muy flexible |
