# Tina: Turners Insurance Chatbot Consultant

Tina is a conversational AI consultant for Turners Car Insurance. She asks a
customer a few questions about themselves and their vehicle, then recommends
the most suitable policy.

Mission 4 of the Mission Ready Level 5 Diploma in Advanced Full-Stack
Development. Individual project.

## What Tina does

- Introduces herself and asks permission before asking personal questions
- Adapts each question to the customer's previous answer instead of following a fixed script
- Recommends one of three products while respecting the business rules:
  - **Mechanical Breakdown Insurance** is not available for trucks or racing cars
  - **Comprehensive Car Insurance** is only for vehicles less than 10 years old
  - **Third Party Car Insurance** is available to anyone

The rules live in the system prompt (`tina-chatbot-backend/src/prompts/tinaPrompt.js`),
and a unit test checks they are still there, so a prompt edit can't silently drop one.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React, Vite, Vitest, Testing Library |
| Backend | Node.js, Express, Anthropic Claude API |
| Testing | Jest, Supertest |
| Delivery | Docker, Docker Compose |

## Architecture

```
tina-chatbot-frontend/   React chat UI (message bubbles, typing indicator)
tina-chatbot-backend/    Express API
  src/routes/            POST /api/chat
  src/controllers/       Validates the request body
  src/services/          Calls the Claude API with the conversation history
  src/prompts/           Tina's persona and business rules
docker-compose.yml       Runs both containers together
```

The browser never sees the API key: the frontend sends the conversation history
to the backend, and only the backend talks to Claude.

## Getting started

Copy `tina-chatbot-backend/.env.example` to `tina-chatbot-backend/.env` and add
your `ANTHROPIC_API_KEY`.

**With Docker**

```bash
docker compose up --build
```

Frontend: http://localhost:5173. Backend: http://localhost:3000.

**Without Docker**

```bash
cd tina-chatbot-backend && npm install && npm run dev
cd tina-chatbot-frontend && npm install && npm run dev
```

## Tests

```bash
cd tina-chatbot-backend && npm test    # Jest + Supertest (one test calls the live Claude API)
cd tina-chatbot-frontend && npm test   # Vitest + Testing Library
```

## What I learned

- Prompt engineering a persona that follows business rules without sounding scripted
- Keeping an API key server-side behind a small proxy backend
- Containerising a two-service app and wiring it together with Docker Compose
