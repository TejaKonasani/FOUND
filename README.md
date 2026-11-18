# FOUND — Where Understanding Becomes Forever

An AI-powered Indian matrimonial platform built for meaningful connections and marriage.

**Tagline:** Where Understanding Becomes Forever  
**Supporting tagline:** Find your person. Build your forever.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Python FastAPI, SQLAlchemy, Alembic
- **Database:** PostgreSQL
- **AI:** Ollama (local), Qwen-family models
- **Testing:** Pytest, Vitest, React Testing Library, Playwright

## Project Structure

```
FOUND/
  apps/
    web/                 # Next.js frontend
  services/
    api/                 # FastAPI backend
    matching/            # Matching engine
    ai/                  # AI services
  packages/
    ui/                  # Shared UI components
    shared-types/        # Shared TypeScript/Python types
  database/
    migrations/          # Alembic migrations
    seeds/               # Seed data
  tests/
  docs/
  docker-compose.yml
  README.md
```

## Getting Started (Local Development)

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Ollama (optional, for AI features)

### Frontend Setup

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

### Backend Setup

```bash
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
npm run dev
```

### Ollama Setup

```bash
# Install Ollama from https://ollama.ai
ollama pull qwen2.5:0.5b
```

## Development

```bash
# Run frontend
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

Proprietary — FOUND. All rights reserved.
