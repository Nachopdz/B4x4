// B4X4 v3.2 START
import React, { createContext, useContext, useMemo } from 'react';
import { COLORS, GlobalRole } from './tokens';

type Theme = {
  background: string;
  text: string;
  muted: string;
  accent: string;
  card: string;
  border: string;
  danger: string;
  success: string;
};

const ThemeCtx = createContext<Theme | null>(null);

export function getAccentByRole(role: GlobalRole): string {
  return (
    COLORS.roleAccent[role] ??
    COLORS.roleAccent.viewer // fallback
  );
}

export const ThemeProvider: React.FC<{ role: GlobalRole; children: React.ReactNode }> = ({
  role,
  children,
}) => {
  const value = useMemo<Theme>(() => {
    const accent = getAccentByRole(role);
    return {
      background: COLORS.background,
      text: COLORS.textPrimary,
      muted: COLORS.textMuted,
      accent,
      card: COLORS.card,
      border: COLORS.border,
      danger: COLORS.danger,
      success: COLORS.success,
    };
  }, [role]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

export function useThemeB4() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useThemeB4 must be used within ThemeProvider');
  return ctx;
}
// B4X4 v3.2 END