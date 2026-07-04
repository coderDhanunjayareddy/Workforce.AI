# ==============================================================================
# WORKFORCE AI
# IMPLEMENTATION_RULES.md
# VERSION 1.0
# ==============================================================================

# PURPOSE

This document defines the engineering standards for Workforce AI.

Every AI coding agent (Claude Code, Cursor, GitHub Copilot Agent, etc.) MUST follow these rules.

Do not optimize for speed.

Optimize for production-quality code.

================================================================================
1. ENGINEERING PHILOSOPHY
================================================================================

Every line of code should satisfy:

✓ Readable

✓ Reusable

✓ Maintainable

✓ Type Safe

✓ Testable

✓ Scalable

Never write code that only works for this prototype.

Write code that could become production.

================================================================================
2. FRONTEND PRINCIPLES
================================================================================

Component Driven

Module Driven

Feature Based

Type Safe

Service Layer First

Backend Independent

Never tightly couple UI to data.

================================================================================
3. TYPESCRIPT RULES
================================================================================

Strict Mode

Enabled

Never use

any

Prefer

unknown

Generics

Interfaces

Union Types

Enums only when appropriate.

Every API response must be typed.

================================================================================
4. COMPONENT RULES
================================================================================

Each component should have one responsibility.

Preferred size

100–250 lines

Maximum

350 lines

If larger

Split component.

Never duplicate components.

================================================================================
5. FILE NAMING
================================================================================

PascalCase

Components

EmployeeCard.tsx

HealthRing.tsx

camelCase

Hooks

useEmployees.ts

Services

employee.service.ts

Types

employee.types.ts

Constants

employee.constants.ts

================================================================================
6. FOLDER RULES
================================================================================

Every module owns

components/

hooks/

services/

types/

utils/

constants/

Never import across unrelated modules.

================================================================================
7. SERVICE LAYER
================================================================================

Components

↓

Hooks

↓

Services

↓

API

Never call fetch()

inside UI components.

Never access mock files directly.

================================================================================
8. CUSTOM HOOKS
================================================================================

Business logic belongs inside hooks.

Example

useEmployees()

useCampaigns()

useKnowledge()

UI should stay simple.

================================================================================
9. STATE MANAGEMENT
================================================================================

React State

UI only

TanStack Query

Server Data

Context

Theme

Organization

Session

Forms

React Hook Form

Never duplicate server state locally.

================================================================================
10. MOCK SERVICES
================================================================================

Every service returns Promise.

Example

employeeService.getEmployees()

campaignService.getCampaign()

knowledgeService.upload()

Add

Latency

Random delay

Loading

Errors

Success

Prototype should behave like production.

================================================================================
11. ERROR HANDLING
================================================================================

Every async call

try/catch

Meaningful error

Retry option

Toast notification

Never show raw exceptions.

================================================================================
12. FORMS
================================================================================

React Hook Form

+

Zod

Validation

Inline Errors

Disabled Submit

Loading State

Success Toast

================================================================================
13. TABLES
================================================================================

Every table supports

Search

Filter

Sort

Pagination

Responsive

Empty State

Loading

Bulk Actions

================================================================================
14. CHARTS
================================================================================

Every chart needs

Title

Description

Legend

Tooltip

Trend

Business Meaning

Never display meaningless charts.

================================================================================
15. LOADING
================================================================================

Always use

Skeleton

Placeholder

Progress

Avoid blank screens.

================================================================================
16. EMPTY STATES
================================================================================

Explain

Why

Next Action

Primary CTA

Never say

"No Data"

================================================================================
17. ANIMATIONS
================================================================================

Framer Motion

Use only

Fade

Slide

Scale

Collapse

Duration

150–250ms

Avoid decorative animations.

================================================================================
18. RESPONSIVE
================================================================================

Desktop First

Tablet

Mobile

No broken layouts.

Sidebar becomes drawer.

Tables adapt gracefully.

================================================================================
19. ACCESSIBILITY
================================================================================

Keyboard Support

ARIA Labels

Visible Focus

Semantic HTML

Contrast

Screen Reader

Every interactive element accessible.

================================================================================
20. PERFORMANCE
================================================================================

Lazy Routes

Memoization

Code Splitting

Image Optimization

Avoid unnecessary renders.

================================================================================
21. SEARCH
================================================================================

Global Search

Ctrl/Cmd + K

Search

Employees

Knowledge

Campaigns

Contacts

Pages

Quick Actions

================================================================================
22. COMMAND PALETTE
================================================================================

Must support

Navigation

Employee Search

Quick Actions

Recent Pages

Theme Toggle

Organization Switch

================================================================================
23. EMPLOYEE CARD
================================================================================

Signature Component

Shows

Avatar

Name

Role

Department

Status

Voice

Health

Performance

Quick Actions

Open Workspace

Always reusable.

================================================================================
24. DASHBOARD
================================================================================

Never build KPI-only dashboards.

Every dashboard contains

KPIs

Insights

Recommendations

Business Impact

Health

Activity

Quick Actions

================================================================================
25. AI INSIGHTS
================================================================================

Insights must be actionable.

Every recommendation should include

Reason

Impact

Suggested Action

Priority

================================================================================
26. CODE COMMENTS
================================================================================

Comment only

Complex logic

Algorithms

Business Rules

Do not comment obvious code.

================================================================================
27. LOGGING
================================================================================

Console logs

Development only.

No console.log()

left in production build.

================================================================================
28. IMPORTS
================================================================================

Absolute imports preferred.

Avoid long relative paths.

Organize

External

Internal

Types

Styles

================================================================================
29. TESTING READINESS
================================================================================

Code should be easy to test.

Avoid hidden dependencies.

Pure utility functions.

Small hooks.

Reusable services.

================================================================================
30. GIT DISCIPLINE
================================================================================

Logical commits.

Meaningful names.

Avoid giant commits.

Example

feat(employee): add workspace overview

fix(dashboard): improve KPI loading

================================================================================
31. DESIGN CONSISTENCY
================================================================================

Never invent

new spacing

new typography

new colors

new shadows

Everything comes from Design System.

================================================================================
32. QUALITY CHECKLIST
================================================================================

Before considering any module complete

✓ Type Safe

✓ Responsive

✓ Accessible

✓ Reusable

✓ No Duplicate Code

✓ Dark Mode

✓ Loading States

✓ Empty States

✓ Error States

✓ Connected Navigation

✓ Mock Data Working

✓ Business Copy Correct

================================================================================
33. GOLDEN RULE
================================================================================

Always ask

"If this prototype were shown to an investor today,
would they believe this product could launch within six months?"

If the answer is NO

Improve it.

Do not ship mediocre UI.

Do not ship incomplete workflows.

Do not generate code that only looks good in screenshots.

Generate a real enterprise SaaS application.

================================================================================
END OF IMPLEMENTATION_RULES.md
================================================================================