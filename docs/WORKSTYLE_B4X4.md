
# WORKSTYLE B4X4 — Uso de Cursor (patrón A0.dev)

## Propósito
Que cualquier dev pueda editar el repo con un proceso predecible, seguro y auditable.

## Flujo de trabajo (obligatorio)
1. **Plan**: lista de pasos, archivos afectados y riesgos.
2. **Diffs**: parches por archivo, idempotentes, con marcas `// B4X4 v1.1 START/END`.
3. **Commit**: mensaje convencional + lista breve de archivos tocados.
4. **QA**: checklist de pruebas manuales + comandos para lint/typecheck/build.

## Roles en Cursor
- **Chat**: decisiones, planificación, dudas.
- **Inline Edit**: toques finos en 1–2 archivos.
- **Composer**: cambios multiarchivo con bloques `diff`.

## Convenciones
- **TypeScript estricto**; sin `any` salvo caso documentado.
- **Estilo visual**: tema neón B4X4 (no modificar tokens globales sin aprobación).
- **Idempotencia**: un segundo pase no debe duplicar imports ni estilos.
- **Marcas de cambio**: solo en archivos de código (ts/tsx/js/jsx/css/ts-node).  
  No usar en JSON, `.env`, imágenes o binarios.

## Commits (conventional commits)
- `feat(scope): descripción`
- `fix(scope): descripción`
- `refactor(scope): descripción`
- `docs(scope): descripción`
- `chore(scope): descripción`

## QA — Checklist rápido
- [ ] `npm run lint` sin errores (o `pnpm/yarn` según el repo).
- [ ] `npm run typecheck` sin errores.
- [ ] El proyecto compila (`npx react-native start` y `run-android`/`run-ios` si RN; o `npm run dev/build` si web).
- [ ] Navegación principal sin crashes.
- [ ] Sin warnings nuevos en consola.

> Si faltan scripts, proponer en PR:  
> `"lint": "eslint .", "typecheck": "tsc --noEmit"`

## Plantilla de Tarea (para prompts)
Objetivo: …
Alcance: …
Archivos afectados: …
Criterios de aceptación:

 …

 …
Entrega (formato):

Plan

Diffs (patch por archivo)

Commit

QA

## Ejemplo de marcas
```ts
// B4X4 v1.1 START: add guard before navigation
// …código…
// B4X4 v1.1 END
```

