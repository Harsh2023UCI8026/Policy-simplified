# Technical Implementation Plan

**Purpose**: Translate the Product Requirements Document (PRD) into an actionable engineering roadmap. This plan outlines development milestones, feature sequencing, module dependencies, architecture decisions, and definitions of done (DoD) for each milestone.

---

## 1. High‑Level Architecture Overview

- **Frontend**: React (Vite) SPA with a component library (styled CSS, design tokens from PRD). State management via Redux Toolkit. Lazy‑loaded feature modules.
- **Backend**: Node.js (NestJS) micro‑service architecture:
  - `auth-service`
  - `policy-service`
  - `ocr-service`
  - `ai-service`
  - `notification-service`
  - `claims-service`
  - `analytics-service`
- **Database**: PostgreSQL for relational data (users, policies, claims) + Cloud Object Storage (encrypted) for documents. A separate vector store (e.g., Pinecone) is optional for AI similarity search – **not** in MVP.
- **API Gateway**: Kong/Envoy handling routing, auth, rate‑limiting.
- **CI/CD**: GitHub Actions → Docker → GCP Cloud Run (or Azure App Service) with blue‑green deployments.
- **Observability**: OpenTelemetry → Loki/Grafana for logs, Prometheus for metrics.

---

## 2. Development Milestones

### Milestone 1 – Week 1 (Foundations & Authentication)
**Objective**: Establish core infrastructure, authentication, and initial CI/CD.

- **Features**: 
  - Project scaffolding (frontend Vite + backend NestJS monorepo).
  - User registration & login with OTP (phone/email).
  - JWT + refresh token implementation, optional MFA.
  - Basic UI: Sign‑up / Login screens.
- **Components**: `AuthService`, `AuthUI`, Redux `authSlice`.
- **APIs**: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`.
- **Database Changes**: `users` table (id, email, phone, password_hash, mfa_enabled, created_at, updated_at).
- **AI Work**: None (foundation only).
- **Dependencies**: None (foundation).
- **Definition of Done**:
  - Unit tests ≥80% coverage for auth logic.
  - End‑to‑end test of registration/login flow.
  - CI pipeline runs lint, tests, builds Docker images.
  - Deploy to dev environment, manual QA passes.

### Milestone 2 – Week 2 (Policy Vault & Upload Workflow)
**Objective**: Enable document upload, OCR preview, and searchable vault.

- **Features**:
  - File upload UI (drag‑drop, format validation).
  - Real‑time OCR invocation and preview UI.
  - Low‑confidence field highlighting & edit option.
  - searchable Insurance Vault (card view, basic filters).
- **Components**:
  - `UploadUI`, `OCRPreview`, `VaultUI`, Redux `policySlice`.
- **APIs**:
  - `POST /upload` (multipart), returns `uploadId`.
  - `GET /ocr/{id}` returns extracted fields + confidence.
  - `GET /vault/search` (query, filters).
- **Database Changes**:
  - `policies` table (id, user_id, insurer, policy_number, start_date, end_date, sum_insured, ocr_status, created_at).
  - `policy_documents` (policy_id, storage_path, checksum).
- **AI Work**: None (OCR only).
- **Dependencies**: Authentication (Milestone 1).
- **Definition of Done**:
  - OCR latency ≤3 s on 10 MB file (dev test).
  - Vault search returns results ≤1 s.
  - UI shows confidence scores, edit flow works.
  - Integration tests covering upload→OCR→vault.

### Milestone 3 – Week 3 (Explainable AI Recommendations & Claims Workflow)
**Objective**: Deliver AI‑driven policy recommendations and claim‑status timeline.

- **Features**:
  - Explainable AI recommendation layer with confidence scores.
  - “X‑Ray” policy analysis summary.
  - Claims submission UI and timeline tracking.
- **Components**:
  - `RecommendationUI`, `PolicyXRay`, `ClaimsUI`, `ClaimsTimeline`, Redux `claimsSlice`.
- **APIs**:
  - `POST /recommendations` (policy data) → list of recommendations + rationale.
  - `POST /claims` (payload), `GET /claims/{id}/timeline`.
- **Database Changes**:
  - `recommendations` (id, policy_id, recommendation_text, confidence, factors_json).
  - `claims` (id, user_id, policy_id, status, created_at, updated_at).
  - `claim_events` (claim_id, event_type, timestamp, details).
- **AI Work**:
  - Train/serve recommendation model (baseline rules + LLM for rationale).
  - Implement Explainability wrapper that surfaces top factors.
- **Dependencies**: Upload & Vault (Milestone 2).
- **Definition of Done**:
  - Recommendations displayed with ≥2 factors + confidence.
  - Claims timeline UI updates via WebSocket without reload.
  - Automated tests for AI service contract and fallback handling.
  - Security review of data flow (PII protection).

### Milestone 4 – Week 4 (Notifications, Settings, Accessibility, Analytics)
**Objective**: Complete user‑centric workflows and observability.

- **Features**:
  - Configurable notification preferences (channel, frequency, mute).
  - Settings page (profile, privacy consent, notification centre).
  - WCAG 2.1 AA compliance audit & badge.
  - Front‑end performance telemetry (p95 latency, error rates).
  - Basic analytics events (uploads, recommendations click‑through, claim submissions).
- **Components**:
  - `NotificationPreferencesUI`, `SettingsUI`, `AccessibilityToggle`, `TelemetryProvider`.
- **APIs**:
  - `POST /notifications/preferences`.
  - `GET /analytics/events` (internal). 
- **Database Changes**:
  - `notification_preferences` (user_id, channel, frequency, muted_until).
  - `analytics_events` (event_id, user_id, type, payload, timestamp).
- **AI Work**: None (use existing recommendation service).
- **Dependencies**: Recommendations & Claims (Milestone 3).
- **Definition of Done**:
  - Preferences persisted and honoured across the app.
  - Accessibility audit passes 100 % of AA checklist.
  - Telemetry data visible in Grafana dashboards.
  - End‑to‑end smoke tests for all major flows.

---

## 3. MVP Completion (End of Week 4)
**Objective**: Deliver a production‑ready MVP covering core user journeys.

- **Features Delivered**:
  - Secure authentication with OTP.
  - Document upload with real‑time OCR validation.
  - Searchable Insurance Vault.
  - Explainable AI recommendations & policy X‑Ray.
  - Claims submission & timeline tracking.
  - Configurable notifications.
  - WCAG AA compliant UI.
  - Basic analytics and performance monitoring.
- **Components Integrated**: All frontend modules, backend micro‑services, database schema, CI/CD pipeline.
- **APIs Integrated**: Auth, Upload, OCR, Vault Search, Recommendations, Claims, Notifications, Analytics.
- **Database Schema**: Users, Policies, Documents, Recommendations, Claims, Claim Events, Notification Preferences, Analytics Events.
- **AI Deliverables**: Recommendation engine (rule‑based prototype + LLM fallback), Explainability layer.
- **Definition of Done**:
  - End‑to‑end test suite passes on staging.
  - Security audit (OWASP) cleared.
  - Performance metrics within targets (p95 ≤2 s on 3G).
  - Documentation updated (API specs, architecture diagram, runbooks).
  - Release notes prepared and MVP deployed to production.

---

## 4. Testing Strategy (Applicable Across All Milestones)
| Layer | Scope | Tools |
|-------|-------|-------|
| Unit | Service functions, reducers, UI components | Jest, React Testing Library |
| Integration | Service‑to‑service contracts, DB migrations | SuperTest, Testcontainers |
| End‑to‑End | User flows (signup → upload → recommendation → claim) | Cypress (headless) |
| Performance | API latency, front‑end load time | k6, Lighthouse CI |
| Security | Vulnerability scanning, auth/authorization checks | OWASP ZAP, Snyk |
| Accessibility | WCAG AA validation | axe‑core (CI) |

---

## 5. Deployment Milestones
| Milestone | Environment | Deploy Steps |
|-----------|-------------|--------------|
| M1 (Auth) | Dev → Staging | Build Docker images, run migration for `users`, helm deploy auth‑service |
| M2 (Upload/Vault) | Staging | Deploy `ocr-service`, `policy-service`, run DB migrations for `policies` & `policy_documents` |
| M3 (AI & Claims) | Staging | Deploy `ai-service`, `claims-service`, seed AI model, migrate `recommendations`, `claims`, `claim_events` |
| M4 (Notifications & Analytics) | Staging | Deploy `notification-service`, `analytics-service`, migrate related tables |
| MVP Release | Production | Blue‑green swap, run smoke tests, enable monitoring alerts |

---

**Next steps**: Review this technical implementation plan. Once approved, we will begin work on Milestone 1.
