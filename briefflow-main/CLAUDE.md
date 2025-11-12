# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Quick Start:**
```bash
npm run up                    # Complete setup + start both apps
```

**Development:**
```bash
npm run dev                   # Main app (port 3000)
npm run dev:landing           # Landing page (port 3001)
npm run dev:all               # Start both apps concurrently
```

**Database:**
```bash
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Run migrations
```

**Testing & Quality:**
```bash
npm run test:landing          # Jest + RTL tests for landing
npm run lint                  # Lint all workspaces
```

## Architecture

**Monorepo Structure:**
- **Main App** (`apps/main/`): Next.js 14 brief creation/editing with Prisma/SQLite
- **Landing Page** (`apps/landing/`): Next.js 15 marketing site with TDD via Jest

**AI Integration:**
- Local Ollama server required: `qwen2.5:14b-instruct` (primary), `mistral:latest` (fast)
- Environment: `OPENAI_BASE_URL=http://localhost:11434/v1`

**Data Flow:**
```
/intake → /api/briefs → AI generation → /brief/[id]/edit → versioning
```

**Key Routes:**
- `/intake` - Form to create brief
- `/brief/[id]/edit` - Section editing with AI regeneration
- `/api/briefs/[id]/regenerate` - Fast model regeneration

## Critical Requirements

- Ollama server must be running with both models installed
- Copy `.env.example` to `.env` before development (`npm run up` auto-copies)
- Database: SQLite (dev) via `apps/main/prisma/schema.prisma`
- Landing page uses Jest/React Testing Library for TDD (`npm run test:landing`)
