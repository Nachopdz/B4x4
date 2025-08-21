# ROADMAP B4X4 — Plan maestro hasta APK debug

## Visión
Cierre funcional del Frontend, definición contract-first (API/DB), Backend MVP y primer APK debug descargable por CI manual.

---

## Fase A — Cierre Frontend
- Objetivos:
  - Completar pantallas y flujos críticos (Auth, Home, Play, Vs, Vault, Perfil, Settings, Reports).
  - Activar feature flags para usar mocks o API real.
- Criterios de aceptación:
  - [ ] Todas las pantallas renderizan sin crashes ni warnings críticos.
  - [ ] Navegación principal estable; deep links básicos documentados.
  - [ ] Flags `USE_API`, `USE_MOCKS`, `API_BASE_URL` disponibles.
- Riesgos:
  - Inconsistencias entre mocks y API futura.
- PRs sugeridos (scope y archivos):
  - feat(frontend): completar flujos pendientes (`src/pages/**`, `src/services/**`).
  - chore(config): introducir flags de runtime (`src/config/flags.ts`).
- Prompts recomendados:
  - “Completar pantalla X con mocks, respetando flags y TS estricto”.

## Fase B — API Contract-First (OpenAPI)
- Objetivos:
  - Definir OpenAPI 3.0 como fuente de verdad: Auth, Perfil, Equipos, Ligas/Partidos, Posts/Reels, Wallet/Bets.
- Criterios de aceptación:
  - [ ] `docs/API/openapi.yaml` cubre endpoints prioritarios con respuestas 200/201/400/401/404.
  - [ ] Schemas mínimos: User, Team, League, Match, Post, Comment, WalletTx, Bet, AuthTokens.
- Riesgos:
  - Cambios frecuentes; mantener versionado del contrato.
- PRs sugeridos:
  - docs(api): OpenAPI v0.x inicial (`docs/API/openapi.yaml`).
- Prompts recomendados:
  - “Extiende OpenAPI con endpoints de notificaciones y paginación”.

## Fase C — DB (PostgreSQL)
- Objetivos:
  - Esqueleto SQL con tablas base e índices.
- Criterios de aceptación:
  - [ ] `docs/DB/schema.sql` incluye users, teams, team_members, leagues, matches, posts, comments, wallets, wallet_transactions, bets.
  - [ ] Claves foráneas e índices básicos.
- Riesgos:
  - Normalización vs. velocidad de entrega.
- PRs sugeridos:
  - docs(db): DDL mínimo inicial (`docs/DB/schema.sql`).
- Prompts recomendados:
  - “Añadir constraints y vistas materializadas para feed”.

## Fase D — Backend MVP (doc-driven)
- Objetivos:
  - Backend en Node (NestJS o Fastify TS) siguiendo OpenAPI; adapters REST + auth JWT.
- Criterios de aceptación:
  - [ ] Servicios Auth/Login, Me y Feed documentados con mapas a OpenAPI.
  - [ ] Estrategia de errores y códigos consistente.
- Riesgos:
  - Desalineación entre contrato y controladores.
- PRs sugeridos (documentales, sin instalar deps):
  - docs(backend): estructura de módulos y endpoints (README y diagramas opcionales).
- Prompts recomendados:
  - “Proponer estructura NestJS con módulos y controladores mapeados a OpenAPI”.

## Fase E — Testing (propuesto)
- Objetivos:
  - Unit (Jest), UI (React Native Testing Library), E2E (Detox) — sólo propuesto, sin instalar.
- Criterios de aceptación:
  - [ ] Roadmap de pruebas y convenciones de test naming.
- PRs sugeridos:
  - docs(test): guidelines y ejemplos mínimos.
- Prompts recomendados:
  - “Esqueleto de suites Jest/RTL sin instalar dependencias”.

## Fase F — CI/CD
- Objetivos:
  - Lint, typecheck, build Android debug; pipeline de release firmada (en PR separado).
- Criterios de aceptación:
  - [ ] Workflow manual `android-debug-apk.yml` construye y publica APK debug como artefacto.
- Riesgos:
  - Entorno Android/Expo en runners.
- PRs sugeridos:
  - ci(android): workflow manual de APK debug.
- Prompts recomendados:
  - “Agregar job de lint/typecheck en PRs (sin release)”.

## Fase G — Beta interna
- Objetivos:
  - Distribuir APK a testers; checklist de feedback.
- Criterios de aceptación:
  - [ ] APK descargable desde artefactos de CI.
  - [ ] Checklist de feedback completado en 1 iteración.
- PRs sugeridos:
  - docs(beta): guía de distribución interna y notas de test.

---

## Dependencias y restricciones
- No añadir dependencias sin aprobación.
- Mantener TypeScript estricto y estilo B4X4 (neón).
- Marcas `// B4X4 v1.1 START/END` sólo en archivos de código.

## Checkpoints y PRs guía
- PR1: flags y documentación (este cambio).
- PR2: completar pantallas y mocks alineados con flags.
- PR3: OpenAPI y DB schema.
- PR4: CI manual de APK debug.
- PR5: conectar endpoints críticos (login, me, feed).

## Prompts recomendados para Cursor por fase
- Fase A: “Revisar Home/Play/Vs para asegurar idempotencia y flags”.
- Fase B: “Ampliar OpenAPI con errores y paginación estándar (RFC)”.
- Fase C: “Agregar índices y constraints adicionales para rendimiento”.
- Fase D: “Mapa contrato→controladores y políticas de auth”.
- Fase F: “Pipeline de lint/typecheck en PRs”.
