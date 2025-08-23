import React from 'react';
import { can, Role } from './roles';

type RoleGuardProps = {
  action: keyof typeof can;
  role?: Role;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * Componente para proteger contenido basado en roles
 * 
 * @example
 * <RoleGuard action="createLeague" role={userRole}>
 *   <Button title="Crear Liga" />
 * </RoleGuard>
 */
export function RoleGuard({ action, role, children, fallback = null }: RoleGuardProps) {
  if (!can[action](role)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

/**
 * Hook para verificar permisos en componentes funcionales
 * 
 * @example
 * const canCreateLeague = useCan('createLeague', role);
 * if (!canCreateLeague) return null;
 */
export function useCan(action: keyof typeof can, role?: Role): boolean {
  return can[action](role);
}
