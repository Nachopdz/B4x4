# Sistema RBAC (Role-Based Access Control)

## Descripción
Sistema de control de acceso basado en roles para el cliente de B4X4.

## Roles disponibles
- `player`: Jugador básico
- `creator`: Creador de contenido
- `viewer`: Solo visualización
- `organizer`: Organizador de eventos/ligas
- `mod`: Moderador
- `admin`: Administrador

## Permisos disponibles

### `can.createLeague(role)`
- **Permitido para**: `organizer`, `admin`
- **Uso**: Crear nuevas ligas o torneos

### `can.createChallenge(role)`
- **Permitido para**: `player`, `creator`, `organizer`, `admin`
- **Uso**: Crear desafíos o retos

### `can.moderate(role)`
- **Permitido para**: `mod`, `admin`
- **Uso**: Acceso a herramientas de moderación

## Ejemplos de uso

### 1. Hook useRole
```tsx
import { useRole } from '@/features/auth/useRole';
import { can } from '@/features/auth/roles';

function MyComponent() {
  const role = useRole();
  
  if (!can.createLeague(role)) return null;
  
  return <Button title="Crear Liga" />;
}
```

### 2. Componente RoleGuard
```tsx
import { RoleGuard } from '@/features/auth/RoleGuard';

function MyComponent() {
  return (
    <RoleGuard action="createChallenge" role={userRole}>
      <Button title="Crear Desafío" />
    </RoleGuard>
  );
}
```

### 3. Hook useCan
```tsx
import { useCan } from '@/features/auth/RoleGuard';

function MyComponent() {
  const canModerate = useCan('moderate', userRole);
  
  if (!canModerate) return null;
  
  return <ModerationPanel />;
}
```

## Mejores prácticas

1. **Siempre verificar permisos en el cliente** antes de mostrar contenido sensible
2. **Usar el hook useRole** para obtener el rol del usuario actual
3. **Implementar fallbacks** para usuarios sin permisos
4. **Mantener consistencia** entre permisos del cliente y del servidor
5. **Documentar nuevos permisos** en este archivo
