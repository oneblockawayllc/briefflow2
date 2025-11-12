BriefFlow Prototype

Quickstart
- One‑liner dev (front + API): `npm run up`

Manual steps (if you prefer)
- Copy `.env.example` to `.env` and adjust if needed.
- Ensure Ollama is running and you have: `qwen2.5:14b-instruct` (quality) and `mistral:latest` (fast).
- Install deps: `npm i`
- Prisma: `npm run prisma:generate && npm run prisma:migrate`
- Dev: `npm run dev` then open http://localhost:3000

Flows
- Intake → Draft: `/intake` posts to `/api/briefs` which calls Ollama via `lib/llm.ts`.
- Edit → Regenerate: `/brief/[id]/edit` with per-section “Regenerate” (Mistral) and Save versioning.
- Preview → Export: `/brief/[id]/preview` and download Markdown from `/api/briefs/[id]/markdown`.

Env (Ollama)
- `OPENAI_BASE_URL=http://localhost:11434/v1`
- `OPENAI_API_KEY=ollama`
- `LLM_MODEL_PRIMARY=qwen2.5:14b-instruct`
- `LLM_MODEL_FAST=mistral:latest`

Notes
- DB uses SQLite for dev; switch to Postgres later by updating `schema.prisma` and `DATABASE_URL`.
- PDF export is out-of-scope for the first pass; Markdown is provided.
- Auth is skipped for speed; add NextAuth in a later iteration if needed.

Production-like one‑liner
- Build + migrate + start: `npm run start:all`
