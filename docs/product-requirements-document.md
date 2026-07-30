# 1. Product Overview

## Product name
Insurance Policy Analyzer (IPA)

## Purpose
Provide a mobile‑first, AI‑enhanced platform for users to upload insurance documents, receive explainable policy recommendations, analyze policies, and manage claims.

## Problem statement
Current market players (PolicyBazaar, Coverfox) lack transparency in AI decisions, real‑time OCR feedback, configurable notifications, and accessible design, leading to user distrust and friction.

## Vision
A fully transparent, mobile‑first insurance platform that empowers every user—digital native or low‑digital‑literacy—to understand, purchase, and manage policies with confidence. *(Executive Product Strategy, Vision)*

## Mission
Deliver end‑to‑end insurance journeys powered by explainable AI, real‑time data validation, and inclusive design. *(Executive Product Strategy, Mission)*

## Target users
- Tech‑savvy consumers seeking quick digital insurance purchases.
- Users with limited digital literacy needing guided assistance.
- Users requiring accessibility accommodations (WCAG AA).

## Value proposition
Explainable AI builds trust, real‑time OCR validation reduces errors, configurable notifications prevent fatigue, and a searchable Insurance Vault centralises policy management. *(Competitive Differentiators, Strategic Recommendations)*

---

# 2. Product Goals

| Goal type | Description | Success metric |
|-----------|-------------|----------------|
| Business | Increase conversion through trust‑building features. | ≥70% of users view AI rationale (Success Metrics). |
| Business | Reduce churn via post‑purchase support. | NPS ≥45 after launch (Success Metrics). |
| User | Enable users to verify OCR extraction instantly. | OCR validation error <5% (Success Metrics). |
| User | Allow users to control notification cadence. | Opt‑out rate <10% (Success Metrics). |
| Technical | Deploy microservices for AI, OCR, notifications. | Services autoscale, zero‑downtime releases. |
| AI | Provide confidence scores for recommendations and policy X‑Ray. | Explainable AI layer delivered in MVP. |
| Accessibility | Achieve WCAG 2.1 AA compliance. | Badge earned within 6 months (Success Metrics). |
| Performance | Front‑end 95th‑percentile latency ≤2 s. | Front‑end performance telemetry (Phase 3). |
| Security | Encrypt data at rest and in transit, audit logs for AI decisions. | Compliance with data‑privacy policy. |

---

# 3. Project Scope

**In Scope**
- Explainable AI recommendation layer.
- Real‑time OCR validation UI.
- Configurable notification preferences.
- Unified searchable Insurance Vault (MVP limited to card view and filter).
- Post‑purchase in‑app support hub (chat & ticketing).
- WCAG 2.1 AA compliance audit and badge.
- Claims status timeline UI.
- Progressive disclosure onboarding with quick KYC.
- Basic front‑end performance telemetry.

**Out of Scope**
- Hybrid “phygital” offline assistance (Phase 3 strategic bet).
- Multilingual AI assistant beyond English (Phase 3).
- Advanced performance telemetry dashboard (Phase 4).
- Physical assistance kiosks.

**Future Scope**
- Multilingual conversational AI.
- Hybrid offline assistance workflow.
- Full performance telemetry public portal.

**Assumptions**
- Users have internet‑connected devices.
- OCR service can achieve confidence ≥80% on typical documents.

**Constraints**
- Must comply with WCAG 2.1 AA.
- Data must be stored in encrypted cloud storage.

---

# 4. User Personas

## Persona 1 – Digital Natives
- **Description**: Young professionals, comfortable with mobile apps.
- **Goals**: Fast onboarding, clear AI recommendations.
- **Pain points**: Distrust of opaque AI, notification overload.
- **Technical proficiency**: High.
- **Primary tasks**: Upload policy, view recommendations, manage vault.
- **Expected usage**: Frequent, <5 min sessions.

## Persona 2 – Low‑Digital‑Literacy Users
- **Description**: Older adults or first‑time digital users.
- **Goals**: Guided onboarding, assistance on uploads.
- **Pain points**: Complex navigation, lack of accessibility.
- **Technical proficiency**: Low.
- **Primary tasks**: Guided KYC, OCR preview, support chat.
- **Expected usage**: Infrequent, longer sessions.

## Persona 3 – Accessibility‑Focused Users
- **Description**: Users relying on screen readers or high‑contrast mode.
- **Goals**: Fully accessible interface.
- **Pain points**: Non‑compliant UI, missing ARIA labels.
- **Technical proficiency**: Medium.
- **Primary tasks**: Search vault, read policy analysis.
- **Expected usage**: Regular interactions.

---

# 5. User Stories

## Authentication
- **US01** As a user, I want to sign up with phone number or email so that I can securely access my policies. **Priority** High **Acceptance Criteria**: 
  - Successful registration with OTP verification.
  - Account creation stored encrypted.

## Dashboard
- **US02** As a user, I want to see a card‑based overview of my policies so that I can quickly access each document. **Priority** High **Acceptance Criteria**: 
  - Dashboard displays at least one card per policy.
  - Cards show policy name, insurer, expiry.

## Upload
- **US03** As a user, I want to upload a PDF or image of my policy document and see a real‑time preview of extracted fields. **Priority** High **Acceptance Criteria**: 
  - Supported formats: PDF, JPG, PNG.
  - Extraction preview appears within 3 seconds.
  - Low‑confidence fields (<80%) are highlighted.

## OCR
- **US04** As a user, I want the system to indicate confidence scores for each extracted field so that I can trust the data. **Priority** High **Acceptance Criteria**: 
  - Confidence score displayed as percentage.
  - Scores <80% trigger edit option.

## Policy Analysis
- **US05** As a user, I want an “X‑Ray” summary that highlights gaps and shows confidence scores so that I understand coverage. **Priority** High **Acceptance Criteria**: 
  - Summary lists top three gaps.
  - Each gap shows confidence metric.

## Recommendations
- **US06** As a user, I want AI‑generated policy recommendations with rationale displayed so that I can decide to purchase. **Priority** High **Acceptance Criteria**: 
  - Up to three recommendations shown.
  - Rationale includes at least two factors and confidence score.

## Claims
- **US07** As a user, I want to submit a claim and track its status on a timeline so that I know progress. **Priority** High **Acceptance Criteria**: 
  - Claim submission form accepts documents.
  - Timeline shows stages: Received → Under Review → Decision.

## Notifications
- **US08** As a user, I want to set notification channel and frequency so that I am not overwhelmed. **Priority** Medium **Acceptance Criteria**: 
  - Preference centre allows email, SMS, in‑app toggle.
  - Frequency options: Immediate, Daily Digest, Weekly.

## Settings
- **US09** As a user, I want to update my profile and privacy settings so that I control my data. **Priority** Medium **Acceptance Criteria**: 
  - Profile fields editable.
  - Consent for data processing can be withdrawn.

## Profile
- **US10** As a user, I want to view my personal information securely. **Priority** Medium **Acceptance Criteria**: 
  - MFA optional.
  - Data displayed with masked PII where appropriate.

---

# 6. Functional Requirements

| ID | Description | Priority | Dependencies | Acceptance Criteria |
|----|-------------|----------|--------------|---------------------|
| FR01 | Implement Explainable AI layer that displays decision factors and confidence scores for each recommendation. | High | AI recommendation service | UI shows at least two factors and a numeric confidence score for every recommendation. |
| FR02 | Build real‑time OCR validation UI that previews extracted fields and highlights low‑confidence items. | High | OCR service, front‑end component | Preview appears within 3 seconds; fields <80% confidence are highlighted with edit option. |
| FR03 | Provide configurable notification preferences (channel, cadence, mute). | Medium | Notification service | Users can select channel, set frequency, and mute specific alerts; settings persisted. |
| FR04 | Develop searchable Insurance Vault with card view, filter, and instant search. | Medium | Policy storage, search index | Vault displays cards; search returns results within 1 second; filters work on insurer, expiry. |
| FR05 | Create in‑app post‑purchase support hub (chat + ticketing). | High | Messaging backend | Chat window reachable from dashboard; tickets can be opened and status viewed. |
| FR06 | Achieve WCAG 2.1 AA compliance and display accessibility badge. | High | Design system, audit | All pages pass WCAG AA checklist; badge shown on About page. |
| FR07 | Implement claims status timeline UI with real‑time updates via WebSocket. | High | Claims engine, WebSocket service | Timeline updates at each stage without page reload. |
| FR08 | Design progressive‑disclosure onboarding with quick KYC flow. | High | KYC service | Onboarding completes in ≤5 steps; optional help tooltips available. |
| FR09 | Emit front‑end performance telemetry (p95 latency, error rates). | Low | Observability stack | Telemetry sent to monitoring dashboard; alerts on latency >2 s. |
| FR10 | Add multilingual AI assistant support for English + one additional language. | Low | Language model | Assistant responds correctly in supported languages; intent coverage ≥80%. |

---

# 7. Non‑Functional Requirements

| Category | Requirement | Metric |
|----------|-------------|--------|
| Performance | Page load time (p95) | ≤2 seconds on 3G. |
| Scalability | Support 10,000 concurrent users. | Auto‑scale pods, CDN caching. |
| Availability | System uptime | ≥99.9% monthly. |
| Reliability | OCR success rate | ≥95% on standard documents. |
| Accessibility | WCAG 2.1 AA compliance. | Full audit pass. |
| Localization | Support English UI; framework ready for additional languages. | No hard‑coded strings. |
| Security | Data at rest encryption (AES‑256). | Verified by audit. |
| Security | Transmission encryption (TLS 1.2+). | All APIs over HTTPS. |
| Privacy | GDPR‑compatible consent management. | Consent records stored. |
| Maintainability | Modular front‑end component library. | Each component isolated with unit tests ≥80% coverage. |
| Observability | Centralised logging with trace IDs. | Logs searchable within 5 seconds. |
| Auditability | AI decision audit log retained 12 months. | Log entries contain model version, input, output, confidence. |

---

# 8. Information Architecture

- **Primary navigation**: Dashboard → Vault, Upload, Claims, Support, Settings.
- **Secondary navigation**: Within Vault – Filters, Search, Sort.
- **Search behavior**: Instant autosuggest, results ranked by relevance.
- **Breadcrumbs**: Display on deep pages (e.g., Vault → Policy Detail).
- **Dashboard structure**: Summary cards for recent policies, notifications, claim status.

---

# 9. Screen‑by‑Screen Requirements

*Due to length, key screens are enumerated with purpose and actions. All requirements are traceable to the strategy sections.*

1. **Login Screen** – Purpose: authentication. Primary: sign‑in form. Validation: email/phone format, OTP.
2. **Onboarding / KYC** – Purpose: quick registration. Primary: phone entry, OTP, basic personal info. Validation: required fields, format checks.
3. **Dashboard** – Purpose: overview. Primary actions: open policy card, view notifications, start upload.
4. **Upload Screen** – Purpose: document upload. Primary: file picker, drag‑drop, real‑time OCR preview. Validation: file type, size ≤10 MB.
5. **OCR Preview** – Purpose: validation. Primary: field list with confidence, edit button for low‑confidence items.
6. **Policy Detail (Vault)** – Purpose: view full policy. Primary: document viewer, download, share.
7. **Recommendations Modal** – Purpose: show AI suggestions. Primary: list with rationale and confidence.
8. **Claims Submission** – Purpose: file claim. Primary: form fields, document upload, submit button.
9. **Claims Timeline** – Purpose: track status. Primary: visual timeline, step details.
10. **Support Hub** – Purpose: assistance. Primary: chat widget, ticket creation, status view.
11. **Settings** – Purpose: preferences. Primary: notification settings, privacy consent, account details.
12. **Accessibility Settings** – Purpose: adjust UI for WCAG. Primary: contrast toggle, font size, screen‑reader hints.

---

# 10. Upload Module

- **Supported formats**: PDF, JPEG, PNG.
- **Validation**: File type check, max size 10 MB.
- **Progress**: Upload bar with percentage.
- **Failure handling**: Retry up to 3 times; error message with code.
- **OCR trigger**: Automatic after successful upload.
- **Manual correction**: Edit low‑confidence fields.
- **Preview**: Real‑time field list displayed.
- **Success flow**: Document saved, policy card created in Vault.

---

# 11. OCR Requirements

- **Workflow**: Receive file → pre‑process (contrast, de‑skew) → OCR engine → confidence scoring.
- **Extraction**: Key fields (policy number, insurer, dates, sum insured).
- **Confidence score**: Numeric 0‑100%; <80% flagged.
- **Manual correction**: Inline edit for flagged fields.
- **Unsupported documents**: Display “Unsupported format” message.
- **Fallback**: Allow manual entry if confidence <60%.

---

# 12. AI Requirements

- **Recommendation Engine**: Generate up to three policy suggestions with top factors and confidence scores. *(Explainable AI layer)*
- **Policy Analysis (X‑Ray)**: Summarise gaps, show confidence per gap.
- **Claim Analysis**: Automatic triage with explainable flags.
- **Explainability**: UI displays decision factors for recommendations and claim flags.
- **Confidence Scores**: Provided for each AI output.
- **Human Review**: Low‑confidence recommendations escalated to support agent.
- **Audit Logs**: Record model version, input, output, confidence for 12 months.
- **Bias Monitoring**: Quarterly bias review.
- **Versioning**: Models versioned via MLflow; rollback capability.
- **Failure Handling**: Graceful fallback to manual suggestions if AI service unavailable.

---

# 13. Dashboard Requirements

- **Widgets**: Recent policies, upcoming renewals, claim status summary.
- **Cards**: Policy vault cards with insurer logo, expiry badge.
- **Search**: Global search bar with instant results.
- **Filters**: By insurer, status, expiry date.
- **Sorting**: Alphabetical, expiry date.
- **Quick Actions**: Download, view OCR preview, initiate claim.

---

# 14. Claims Module

- **Submission**: Form with required fields, document upload.
- **Status Tracking**: Timeline UI with real‑time updates.
- **Notifications**: Push/email on status change.
- **Escalation**: Option to request human assistance via support hub.

---

# 15. Notification System

- **Channels**: Email, SMS, in‑app.
- **Frequency**: Immediate, daily digest, weekly.
- **Preferences**: User can enable/disable per channel and set mute periods.
- **Critical Alerts**: Marked as high priority (e.g., claim rejection).
- **Scheduling**: Backend scheduler respects user‑defined cadence.

---

# 16. Accessibility Requirements

- WCAG 2.1 AA compliance (contrast ratio ≥4.5:1, keyboard navigation, ARIA labels).
- Keyboard‑only operation for all interactive elements.
- Screen‑reader friendly markup with meaningful alt text.
- High‑contrast mode toggle.
- Resizable text (up to 200%).
- Focus indicators visible.
- Error messages announced to screen readers.

---

# 17. Performance Requirements

- **Target response time**: API ≤300 ms; UI ≤2 s on 3G.
- **Upload performance**: ≤5 s for 10 MB file.
- **OCR latency**: ≤3 s for standard document.
- **Dashboard loading**: ≤1 s for initial view.
- **Caching**: Recommendation results cached for 5 minutes.

---

# 18. Security Requirements

- **Authentication**: JWT with refresh tokens, optional MFA.
- **Authorization**: Role‑based (user, admin).
- **Encryption**: TLS 1.2+ for transport; AES‑256 for storage.
- **Audit Logs**: All data access and AI decisions logged.
- **File Security**: Virus scan on upload, stored in encrypted bucket.
- **PII Handling**: Minimal personal data stored; consent recorded.
- **Rate Limiting**: 100 requests per minute per user.
- **Session Management**: Idle timeout 15 minutes.

---

# 19. API Requirements

| API | Purpose | Input | Output | Auth | Errors |
|-----|---------|-------|--------|------|--------|
| POST /auth/register | User registration | phone/email, OTP | JWT token | Public | 400, 429 |
| POST /auth/login | Login | credentials | JWT token | Public | 401, 429 |
| GET /policies | List user policies | pagination | policy list | Bearer | 401, 404 |
| POST /upload | Upload document | file (binary) | upload ID | Bearer | 400, 413, 500 |
| GET /ocr/{id} | Retrieve OCR preview | upload ID | fields + confidence | Bearer | 404, 500 |
| POST /recommendations | Get AI recommendations | policy data | list of recommendations with rationale | Bearer | 400, 500 |
| GET /claims/{id}/timeline | Claims status | claim ID | timeline events | Bearer | 404, 500 |
| POST /notifications/preferences | Set user preferences | channel, frequency | success flag | Bearer | 400, 500 |
| GET /vault/search | Search vault | query string | policy cards | Bearer | 400, 500 |
| POST /support/chat | Initiate chat | message | chat session ID | Bearer | 429, 500 |

---

# 20. Analytics Requirements

- Track number of uploads per user.
- Record OCR success vs. failure rates.
- Log recommendation acceptance (click‑through).
- Capture claim submission and completion times.
- Measure dashboard interaction (cards viewed, filters used).
- Record notification engagement (opens, clicks).
- Log search queries and result clicks.
- Capture error occurrences by type.

---

# 21. Error Handling

- **Validation errors**: Inline field highlight, message with error code.
- **OCR failures**: Show retry button, fallback to manual entry.
- **AI failures**: Display generic recommendation with “manual selection” prompt.
- **Upload failures**: Automatic retry up to 3 times; after failure show error with support link.
- **Server failures**: Global error banner with “Try again later”.
- **Network failures**: Offline toast, queue actions for later sync.
- **User guidance**: Contextual help links for each error.

---

# 22. Empty States

- **Dashboard empty**: Message “No policies added yet.” with “Upload now” button.
- **Vault search no results**: “No policies match your query.” and suggestion to broaden search.
- **Claims list empty**: “You have no active claims.” with link to start a claim.
- **Support tickets empty**: “No tickets opened.” and “Create a ticket”.

---

# 23. Loading States

- Skeleton placeholders for dashboard cards.
- Progress bar for file upload.
- Spinner while OCR processes.
- Shimmer effect during AI recommendation fetch.

---

# 24. Edge Cases

- Invalid file type – reject with clear message.
- Corrupted PDF – detect and prompt re‑upload.
- Duplicate uploads – warn user and offer to replace.
- OCR confidence <60% – force manual entry.
- Missing pages – alert user to provide complete document.
- Session expiry – redirect to login with state preserved.
- Offline – allow viewing cached vault; queue uploads.

---

# 25. Dependencies

- **AI services**: Recommendation engine, X‑Ray analysis, claim triage.
- **OCR service**: Cloud OCR provider.
- **Storage**: Encrypted object storage (S3/GCS).
- **Authentication**: Auth provider (e.g., Auth0 or custom).
- **Notifications**: Email/SMS gateway.
- **Analytics**: telemetry platform (e.g., Segment).

---

# 26. Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Opaque AI decisions eroding trust | High | High | Deploy Explainable AI layer with confidence scores. |
| OCR extraction errors causing frustration | Medium | High | Real‑time validation UI, fallback manual correction. |
| Notification fatigue leading to opt‑outs | Medium | Medium | Configurable preferences, frequency caps. |
| WCAG non‑compliance legal exposure | Low | High | Conduct WCAG 2.1 AA audit, remediate, display badge. |
| Lack of claim status visibility increasing support load | High | Medium | Build claim timeline UI with real‑time updates. |
| Performance regressions without telemetry | Medium | Medium | Implement front‑end performance telemetry, alerts. |
| Data privacy incidents damaging brand | Low | High | Publish privacy audit, enforce strict handling policies. |

---

# 27. Release Plan

**MVP (Phase 1)**
- Explainable AI layer.
- Real‑time OCR validation UI.
- Configurable notification preferences.
- Basic searchable vault (card view only).
- Post‑purchase support chat.
- WCAG 2.1 AA audit (baseline compliance).
- Claims timeline UI.
- Progressive disclosure onboarding.

**Phase 2 – Core Enhancements**
- Full filterable vault with sorting.
- In‑app ticketing system.
- Expanded notification channels.
- Performance telemetry instrumentation.

**Phase 3 – Advanced AI & Accessibility**
- Multilingual AI assistant.
- Hybrid offline assistance workflow.
- Public performance dashboard.

**Future (Phase 4)**
- Physical assistance kiosks.
- Publish AI model documentation & privacy audit portal.

---

# 28. Definition of Done

- All functional requirements satisfied.
- Acceptance criteria for each user story passed.
- Accessibility validation (WCAG AA) completed.
- Performance targets met in staging.
- Security tests (penetration, auth) passed.
- Automated unit, integration, and end‑to‑end tests ≥80% coverage.
- Documentation (API specs, user guides) updated.

---

# 29. Acceptance Criteria Summary

- **Auth**: Register/login succeed with OTP, tokens issued.
- **Upload**: Files accepted, OCR preview appears, low‑confidence flagged.
- **Explainable AI**: Recommendations show at least two factors + confidence.
- **Vault**: Search returns correct policies within 1 s.
- **Claims**: Timeline updates without page refresh.
- **Notifications**: Preferences saved and respected.
- **Accessibility**: All pages pass WCAG AA audit.
- **Performance**: Dashboard loads ≤1 s, API latency ≤300 ms.
- **Security**: No sensitive data stored in plaintext; audit logs captured.
- **Analytics**: Events emitted for all key actions.

---

*All content is derived exclusively from* `docs/competitor-research.md`, `docs/competitor-strategy-analysis.md`, *and* `docs/executive-product-strategy.md`.
