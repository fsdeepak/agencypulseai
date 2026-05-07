# 🧠 AgencyPulse AI

> **AI-powered website monitoring & alerting platform** — track HTTP logs, detect anomalies, and get instant AI-driven root-cause analysis for your web applications.

---

## 📌 What Is AgencyPulse AI?

AgencyPulse AI is a full-stack developer observability platform that lets you instrument any web application with a lightweight SDK snippet, then monitor it from a centralized dashboard. When traffic spikes, error rates climb, or suspicious patterns emerge, AgencyPulse AI's background AI job (powered by Google Gemini via LangChain) automatically analyzes high-severity alerts and surfaces a **root-cause reason** and **actionable suggestion** — so you spend less time debugging and more time building.

---

## 🚀 Key Highlights

- Middleware-based request tracking for backend monitoring
- Batched log ingestion to optimize network usage
- Severity-based alert classification (LOW / MEDIUM / HIGH)
- AI-driven root cause analysis using Google Gemini
- Near real-time dashboard updates using polling

---

## ✨ Features

| Feature                         | Description                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🌐 **Multi-website Management** | Register and manage multiple websites under a single account                                           |
| 📊 **Real-time Log Collection** | Capture HTTP request logs (method, URL, status, response time) via an SDK endpoint                     |
| 🚨 **Smart Alerting**           | Automatic alert generation for error patterns with severity levels (LOW / MEDIUM / HIGH)               |
| 🤖 **AI Root-Cause Analysis**   | Gemini-powered background job groups HIGH-severity alerts and generates `aiReason` + `aiSuggestion`    |
| 🔐 **Auth System**              | Full authentication flow with email/password, email verification, forgot & reset password (via Resend) |
| 🗂️ **Per-website Dashboards**   | Dedicated logs and alerts views per registered website                                                 |
| 🐳 **Docker Ready**             | Multi-stage Dockerfiles for both dev and optimized production builds                                   |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client Application                         │
│              (Your website sending logs via API Key)              │
└────────────────────────┬─────────────────────────────────────────┘
                         │ POST /api/collect
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Backend  (Express + TypeScript)                │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │  Auth Module │  │ Website CRUD │  │   Data Collection SDK  │  │
│  │ (Better-Auth)│  │   /website   │  │     /collect           │  │
│  └──────────────┘  └──────────────┘  └──────────┬─────────────┘  │
│                                                   │ saves logs     │
│  ┌──────────────────────────────────────────────▼─────────────┐  │
│  │                  PostgreSQL  (via Supabase + Prisma)        │  │
│  │  users · sessions · accounts · websites · logs · alerts    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │   AI Background Job  (setInterval — every 60 seconds)    │    │
│  │   · Fetches HIGH-severity alerts with no aiReason        │    │
│  │   · Groups by method:url                                 │    │
│  │   · Calls Google Gemini (LangChain) for analysis         │    │
│  │   · Writes aiReason + aiSuggestion back to DB            │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Frontend  (Next.js 16 + React 19)                │
│                                                                    │
│  /login  /register  /forgot-password  /reset-password             │
│  /dashboard  →  /dashboard/website  →  /dashboard/website/[id]    │
│                  /logs    /alerts                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Runtime    | Node.js 20, TypeScript 5                        |
| Framework  | Express.js 4                                    |
| ORM        | Prisma 7 (PostgreSQL adapter)                   |
| Database   | PostgreSQL via Supabase                         |
| Auth       | Better-Auth                                     |
| AI         | LangChain + `@langchain/google` (Google Gemini) |
| Email      | Resend                                          |
| Validation | Zod                                             |

### Frontend

| Layer         | Technology                |
| ------------- | ------------------------- |
| Framework     | Next.js 16.2 (App Router) |
| UI Library    | React 19                  |
| Styling       | Tailwind CSS 4            |
| Data Fetching | TanStack React Query 5    |
| HTTP Client   | Axios                     |
| Notifications | Sonner                    |
| Icons         | react-icons               |

---

## 📁 Project Structure

```
AgencyPulse AI/
├── backend/
│   ├── src/
│   │   ├── app.ts                  # Express app bootstrap & route mounting
│   │   ├── config/                 # DB (Prisma) & AI (Gemini) config
│   │   ├── globalMiddleware/       # Auth middleware (JWT / session check)
│   │   ├── lib/                    # Shared utilities
│   │   └── modules/
│   │       ├── auth/               # Register, login, verify, reset
│   │       ├── website/            # Website CRUD + API key generation
│   │       ├── collectData/        # SDK log ingestion + AI background job
│   │       └── logAlert/           # Logs & alerts retrieval endpoints
│   ├── prisma/
│   │   └── schema.prisma           # Full DB schema
│   ├── server.ts                   # HTTP server entrypoint
│
│
└── frontend/
    ├── src/
         ├── app/
         │   ├── (auth pages)        # login, register, forgot/reset-password
         │   └── dashboard/
         │       ├── page.tsx        # Website list dashboard
         │       └── website/
         │           ├── page.tsx    # Website overview
         │           └── [id]/
         │               ├── logs/   # HTTP log viewer
         │               └── alerts/ # Alert viewer with AI insights
         ├── components/             # Shared UI components
         ├── hooks/                  # Custom React hooks
         ├── services/               # Axios API service layer
         └── lib/                    # Helpers & constants

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9
- A PostgreSQL database (Supabase recommended)
- Google Gemini API key
- Resend API key (for transactional emails)

---

### 1. Clone the Repository

```bash
git clone https://github.com/fsdeepak/agencypulseai.git
cd agencypulseai
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
NODE_ENV=development

# Auth
BETTER_AUTH_URL=http://localhost:8000
BETTER_AUTH_SECRET=your_secret_here

# Email (Resend)
RESEND_API=re_your_resend_api_key

# Frontend URLs (used in email links)
REDIRECT_LOGIN=http://localhost:3000/login
RESETPASSWORD=http://localhost:3000/reset-password

# Google Gemini
GEMINI_API=your_gemini_api_key

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://user:password@host:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://user:password@host:5432/postgres
```

Run Prisma migrations:

```bash
npx prisma migrate deploy
# or for a fresh development DB:
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
# Server runs at http://localhost:8000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the development server:

```bash
npm run dev
# App runs at http://localhost:3000
```

---

## 🔌 Middleware Integration

Once you register a website on the dashboard, you receive a unique API Key to ship logs from your application.

You will find the implementation code for both the frontend and backend in the frontend documentation.

The backend will persist the log, evaluate it for alert conditions, and if it's flagged HIGH severity, the AI background job will analyze it within 60 seconds.

---

## 🔐 API Reference

| Method   | Endpoint           | Auth    | Description                                           |
| -------- | ------------------ | ------- | ----------------------------------------------------- |
| `POST`   | `/api/auth/*`      | ✅      | Auth routes (register, login, verify, reset)          |
| `GET`    | `/api/website`     | ✅      | List all websites for the logged-in user              |
| `POST`   | `/api/website`     | ✅      | Register a new website                                |
| `DELETE` | `/api/website/:id` | ✅      | Remove a website                                      |
| `POST`   | `/api/collect`     | API Key | Ingest a log entry from a monitored website           |
| `GET`    | `/api/logs/:id`    | ✅      | Retrieve logs for a website                           |
| `GET`    | `/api/alerts/:id`  | ✅      | Retrieve alerts (including AI insights) for a website |

---

## 🗄️ Database Schema (Overview)

```
users ──< sessions
users ──< accounts
users ──< websites ──< logs
                   └──< alerts  (with aiReason & aiSuggestion)
```

Key models:

- **`website`** — stores URL, API key, environment (PRODUCTION / DEVELOPMENT)
- **`log`** — HTTP request/error snapshot (method, URL, status, responseTime)
- **`alert`** — derived event with severity, plus optional `aiReason` / `aiSuggestion` from Gemini

---

## 🤖 How the AI Job Works

1. **Every 60 seconds**, the background job queries alerts where `severity = HIGH` and `aiReason IS NULL` from the last minute.
2. Alerts are **grouped by `method:url`** to identify patterns (e.g., all `POST /api/login` 500s together).
3. A structured prompt is sent to **Google Gemini** via LangChain asking for `reason` + `suggestion` in strict JSON.
4. The response is parsed and written back to the alert rows as `aiReason` / `aiSuggestion`.
5. The dashboard surfaces this next time the user views the alerts panel.

---

## 🧪 Development Scripts

| Command         | Location    | Description                                   |
| --------------- | ----------- | --------------------------------------------- |
| `npm run dev`   | `backend/`  | Start backend with hot-reload (`ts-node-dev`) |
| `npm run build` | `backend/`  | Compile TypeScript to `dist/`                 |
| `npm run start` | `backend/`  | Run compiled production build                 |
| `npm run dev`   | `frontend/` | Start Next.js dev server                      |
| `npm run build` | `frontend/` | Build Next.js for production                  |
| `npm run lint`  | `frontend/` | Run ESLint                                    |

---

<div align="center">
  <sub>Built with ❤️ using Next.js, Express, Prisma, and Google Gemini</sub>
</div>

🌐 Deployment (Render)
This project is optimized for deployment on Render as two separate services.

📡 Backend Service
Root Directory: backend

Build Command: npm install && npm run build

Start Command: npm start

Env Vars: Ensure DATABASE_URL, GEMINI_API, and BETTER_AUTH_SECRET are set.

🖥️ Frontend Service
Root Directory: frontend

Build Command: npm install && npm run build

Start Command: npm start

Env Vars: NEXT_PUBLIC_API_URL (Pointing to your Backend URL).

## 🔗 Live

- **Frontend:** https://agencypulse.onrender.com
- **Backend API:** https://agencypulseai.onrender.com
