# BriefFlow Development Commands

## Quick Start
```bash
# One-liner development (main app + landing page)
npm run up

# Alternative: manual development
npm run dev  # Main application at http://localhost:3000
```

## Main Application Commands
```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production  
npm run start         # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations

# Environment setup
cp .env.example .env     # Copy environment file
```

## Landing Page Commands (in apps/landing/)
```bash
# Development
npm run dev           # Start landing page dev server
npm run build         # Build landing page
npm run start         # Start production server

# Testing
npm run test          # Run Jest tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting
npm run lint          # Run ESLint
```

## Production-like Commands
```bash
npm run start:all     # Build + migrate + start both apps
```

## Environment Requirements
- Ollama running locally with models:
  - qwen2.5:14b-instruct (primary, quality)
  - mistral:latest (fast)
- Environment variables:
  - OPENAI_BASE_URL=http://localhost:11434/v1
  - OPENAI_API_KEY=ollama
  - LLM_MODEL_PRIMARY=qwen2.5:14b-instruct
  - LLM_MODEL_FAST=mistral:latest

## Git Workflow
```bash
git add -A && git commit -m "feat: description" && git push
```