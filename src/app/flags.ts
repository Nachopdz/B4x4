// B4X4 v3.2 START
export const FLAGS = {
  USE_API_ECONOMY: false,   // mantenemos por compatibilidad, pero UI dice Vault
  ENABLE_BOOKINGS: false,
  ENABLE_STATS_IMPORT: false,
} as const;
// B4X4 v3.2 END

// B4X4 v3.6 START
// Extensión de flags para v3.6 (sin modificar la exportación original)
export const FLAGS_V36 = {
  ...FLAGS,
  USE_AUTH_MOCK: true, // ← true por defecto: OTP 123456
} as const;
// B4X4 v3.6 END