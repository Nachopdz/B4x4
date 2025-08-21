# RELEASE ANDROID — Debug y preparación de release (documentado)

## Local (React Native/Expo)
- Metro limpio:
  - `npx react-native start --reset-cache`
- Debug en dispositivo/emulador:
  - `npx react-native run-android`
- Generar APK debug sin CI:
  - `cd android && ./gradlew assembleDebug`
  - APK en: `android/app/build/outputs/apk/debug/app-debug.apk`
  - Nota: En proyectos Expo (managed), crear android con `npx expo prebuild --platform android` antes de gradle.

## CI (workflow manual incluido)
- Se provee `.github/workflows/android-debug-apk.yml` con `workflow_dispatch`.
- Pasos:
  1. Lanzar workflow manual desde GitHub Actions.
  2. Esperar build `assembleDebug`.
  3. Descargar artefacto `app-debug.apk` desde la ejecución.

## Preparación de release firmada (documentada, NO aplicada en este PR)
- Generar keystore:
  - `keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
- Variables de entorno requeridas (en CI):
  - `ANDROID_KEYSTORE_BASE64`
  - `ANDROID_KEYSTORE_PASSWORD`
  - `KEY_ALIAS`
  - `KEY_PASSWORD`
- Cambios Gradle propuestos (en PR aparte):
  - Configurar `signingConfigs` y `buildTypes release`.
  - Decodificar keystore en CI y configurar `gradle.properties`.

## Troubleshooting
- SDK Android faltante: usar acción de setup Android o instalar paquetes mínimos.
- Dependencias nativas: ejecutar `npx expo prebuild --platform android` en CI.
- Cachés: limpiar `~/.gradle/caches` si hay fallos curiosos.
