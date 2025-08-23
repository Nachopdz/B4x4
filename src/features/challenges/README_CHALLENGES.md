# Sistema de Challenges - B4X4

## Descripción
Sistema completo de retos E2E (End-to-End) que permite crear, participar y validar desafíos de baloncesto.

## Modelo de Datos

### Challenge (`challenges/{id}`)
```typescript
{
  title: string;           // Título del reto
  type: 'skill'|'time'|'trick';  // Tipo de reto
  rules: string;           // Reglas del reto
  creatorUid: string;      // ID del creador
  status: 'open'|'closed'|'settled';  // Estado del reto
  deadlineAt: number;      // Fecha límite (timestamp)
  minValidators: number;   // Mínimo de validadores requeridos
  createdAt: Timestamp;    // Fecha de creación
}
```

### Attempt (`challenges/{id}/attempts/{uid}`)
```typescript
{
  uid: string;             // ID del usuario
  mediaUrl: string;        // URL del media (video/imagen)
  note: string;            // Nota del intento
  status: 'pending'|'approved'|'rejected';  // Estado
  score?: number;          // Puntuación (opcional)
  createdAt: Timestamp;    // Fecha de creación
}
```

### Validation (`challenges/{id}/validations/{vid}`)
```typescript
{
  validatorUid: string;    // ID del validador
  targetUid: string;       // ID del usuario validado
  decision: 'approve'|'reject';  // Decisión
  createdAt: Timestamp;    // Fecha de validación
}
```

## Funcionalidades

### 1. Crear Challenge
- **Pantalla**: `CreateChallengeScreen`
- **Función**: `createChallenge()`
- **Permisos**: Usuarios autenticados
- **Campos**: Título, tipo, reglas, validadores mínimos

### 2. Listar Challenges
- **Pantalla**: `ChallengesHomeScreen`
- **Función**: `listOpenChallenges()`
- **Filtro**: Solo challenges abiertos
- **Orden**: Por fecha de creación (descendente)

### 3. Ver Detalle del Challenge
- **Pantalla**: `ChallengeDetailScreen`
- **Función**: `getChallenge()`, `listAttempts()`
- **Acciones**: Subir intento, ver intentos existentes

### 4. Subir Intento
- **Función**: `addAttempt()`
- **Media**: Imagen o video
- **Estado inicial**: `pending`
- **Permisos**: Solo el propietario del intento

### 5. Validar Intentos
- **Pantalla**: `ValidateAttemptsScreen`
- **Función**: `addValidation()`
- **Permisos**: Moderadores, organizadores, administradores
- **Decisiones**: Aprobar o rechazar

## Tipos de Retos

### Skill
- **Descripción**: Habilidades técnicas
- **Ejemplo**: "10 triples consecutivos"
- **Validación**: Por calidad técnica

### Time
- **Descripción**: Retos contra reloj
- **Ejemplo**: "Máximo triples en 1 minuto"
- **Validación**: Por tiempo y precisión

### Trick
- **Descripción**: Trucos y movimientos especiales
- **Ejemplo**: "360° dunk"
- **Validación**: Por dificultad y ejecución

## Flujo de Validación

1. **Usuario sube intento** → Estado: `pending`
2. **Validadores revisan** → Votan `approve` o `reject`
3. **Sistema calcula resultado** → Basado en votos y `minValidators`
4. **Estado final** → `approved` o `rejected`

## Seguridad

### Firestore Rules
- **Challenges**: Lectura pública, creación por usuarios autenticados
- **Attempts**: Lectura pública, escritura solo por propietario
- **Validations**: Solo moderadores/organizadores pueden crear

### Validaciones
- **Media**: Verificación de tipo y tamaño
- **Permisos**: Verificación de roles en cliente y servidor
- **Integridad**: Verificación de propiedad de recursos

## Pantallas

1. **ChallengesHomeScreen** - Lista de challenges abiertos
2. **CreateChallengeScreen** - Formulario de creación
3. **ChallengeDetailScreen** - Detalle y subida de intentos
4. **ValidateAttemptsScreen** - Panel de validación (mods)

## Integración

- **Media System**: Usa el sistema de upload existente
- **RBAC**: Integrado con el sistema de roles
- **Navigation**: Integrado en VsStack
- **UI**: Diseño consistente con el resto de la app

## Casos de Uso

### Jugador
1. Ver challenges disponibles
2. Participar en retos
3. Subir intentos con media
4. Ver estado de validación

### Moderador/Organizador
1. Crear challenges
2. Validar intentos de otros
3. Gestionar estado de challenges
4. Ver estadísticas de participación

### Administrador
1. Todas las funcionalidades anteriores
2. Gestionar usuarios y permisos
3. Moderar contenido inapropiado
4. Configurar parámetros del sistema
