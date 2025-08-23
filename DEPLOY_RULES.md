# Despliegue de Reglas de Seguridad Firebase

## Comandos para desplegar

### 1. Desplegar reglas de Firestore
```bash
firebase deploy --only firestore:rules
```

### 2. Desplegar reglas de Storage
```bash
firebase deploy --only storage
```

### 3. Desplegar ambas reglas
```bash
firebase deploy --only firestore:rules,storage
```

## Requisitos previos

1. **Firebase CLI instalado**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Autenticado en Firebase**:
   ```bash
   firebase login
   ```

3. **Proyecto inicializado**:
   ```bash
   firebase init
   ```

## Estructura de las reglas

### Firestore Rules (`firestore.rules`)
- **Usuarios**: Solo pueden leer perfiles de otros usuarios, escribir solo su propio perfil
- **Ligas**: Lectura pública, creación solo para `organizer` y `admin`
- **Posts**: Lectura pública, creación para usuarios autenticados, edición para propietario o moderadores

### Storage Rules (`storage.rules`)
- **Avatares**: Lectura pública, escritura solo para el propietario
- **Reels**: Lectura pública, escritura solo para el propietario

## Verificación

Después del despliegue, puedes verificar las reglas en:
- **Firestore**: Firebase Console > Firestore Database > Rules
- **Storage**: Firebase Console > Storage > Rules

## Notas importantes

- Las reglas se aplican inmediatamente después del despliegue
- Los cambios pueden tardar unos minutos en propagarse
- Siempre prueba las reglas en un entorno de desarrollo antes de producción
- Usa el simulador de reglas de Firebase para probar casos edge
