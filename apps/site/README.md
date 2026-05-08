# Orpheus Public Site

Minimal Vercel-ready public site for `orpheusnarration.com`.

This site is intentionally narrow:

1. It establishes a credible domain and contact surface for supplier confirmation.
2. It does not expose self-serve generation, checkout, pricing, provider calls, or voice catalog access.
3. It must stay aligned with `docs/prd/specs/distribution-and-growth-surface.md` and `docs/prd/specs/mksaas-boundary-contract.md`.

Internal workspace:

1. `/workspace` is an operator-only Phase 2 surface for creating server-owned project runs.
2. Set `ORPHEUS_INTERNAL_WORKSPACE_TOKEN` before using it; the token unlocks a scoped HTTP-only cookie for workspace routes.
3. Set `ORPHEUS_PROJECT_RUNS_DIR` to control file-backed run storage. The default is `runs/site-project-runs` at repo root.
4. Provider credentials still stay server-side through the shared root env loader; the browser never receives provider keys.
5. This is not a public trial, pricing, checkout, or voice-catalog surface.
6. File-backed run storage is for local and preview validation only. On Vercel, `/workspace` is blocked by default until durable Neon/R2 adapters are wired. Set `ORPHEUS_ENABLE_FILE_BACKED_WORKSPACE_ON_VERCEL=1` only for an explicit non-durable preview.

Durable workspace storage:

1. Set `ORPHEUS_WORKSPACE_STORE=neon_r2` to use the durable adapter.
2. Set `DATABASE_URL` for Neon.
3. Set `ORPHEUS_R2_BUCKET`, `ORPHEUS_R2_ENDPOINT`, `ORPHEUS_R2_ACCESS_KEY_ID`, and `ORPHEUS_R2_SECRET_ACCESS_KEY` for Cloudflare R2.
4. The adapter stores project and run records in Neon as Orpheus-owned JSON records and uploads generated run artifacts to R2 using S3-compatible object keys under `project-runs/{run_id}/artifacts/`.

Run locally:

```bash
pnpm --dir apps/site dev
```

Build:

```bash
pnpm --dir apps/site build
```
