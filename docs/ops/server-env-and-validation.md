# Server Env And Validation

> Status: active
> Role: operational guide
> Normative for product rules: no
> Canonical owner: engineering lead
> Depends on: `docs/prd/prd.md`
> Last reviewed: 2026-04-23

## Purpose

Operationalize the existing PRD secret-firewall rule for the current repo.

If this file and the PRD ever disagree, the PRD wins.

## Current repo rule

1. Shared secrets for this repo live in the project's git-common-dir as `.git/orpheus.server.env`.
2. Repo-root `.env.local` remains available for per-worktree overrides.
3. `ORPHEUS_SHARED_ENV_PATH` may still override the path explicitly when needed, but the default is project-scoped, not machine-global.
4. Current CLI entrypoints load files in this order: `.env` -> project-shared env -> `.env.local`.
5. Real shell environment variables still override file-based defaults.

## Secret boundary

These values must remain server-only:

- `INWORLD_API_KEY`
- `CARTESIA_API_KEY`
- `TURNSTILE_SECRET_KEY`
- future database, storage, payment, webhook, and OAuth secrets

These values are configuration knobs, not browser secrets:

- `INWORLD_RATE_USD_PER_1M_CHARS`
- `INWORLD_MAX_ATTEMPTS`
- `CARTESIA_API_VERSION`
- `CARTESIA_RATE_USD_PER_1M_CHARS`
- `CARTESIA_MAX_ATTEMPTS`
- `ALIGNMENT_COMPUTE_PER_AUDIO_MINUTE_USD`
- `STORAGE_DELIVERY_PER_AUDIO_MINUTE_USD`

`TURNSTILE_SITE_KEY` is public-safe for a future browser widget, but it should still be sourced from server-side env/config and passed down intentionally rather than mixed into provider-secret handling.

## Frontend and validation boundary

When the web app shell exists, keep this exact shape:

1. Browser submits script and validation token only to Orpheus-owned server endpoints.
2. Browser never calls `Inworld`, `Cartesia`, storage, or validation providers directly with secret credentials.
3. Server verifies the Turnstile token using `TURNSTILE_SECRET_KEY`.
4. Only after validation passes does the server call narration providers.
5. Provider API keys never appear in `NEXT_PUBLIC_*` or browser payloads.

## Current files

- `.env.example` is the committed template.
- `.git/orpheus.server.env` is the default shared env path across worktrees for this repo.
- `ORPHEUS_SHARED_ENV_PATH` can point to a different project-specific shared env file when needed.
- `.env.local` is the local working override file for one checkout.
- `src/config/env.ts` is the shared loader for current CLI/provider code.

## Minimum operator flow

1. Put shared provider secrets in `.git/orpheus.server.env` once for this repo so all worktrees can reuse them.
2. Use `.env.local` only for checkout-specific overrides, not as the primary place to duplicate every secret in every worktree.
3. Keep the shared env file and `.env.local` only on trusted machines/servers.
4. Use shell-exported values only when intentionally overriding file defaults.
5. Before live smoke, confirm the required provider key is set in the shell, the project-shared env file, or `.env.local`.
