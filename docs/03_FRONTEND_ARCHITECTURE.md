# ==============================================================================
# WORKFORCE AI
# FRONTEND ARCHITECTURE
# VERSION 1.0
# ==============================================================================

# PURPOSE

This document defines the complete frontend architecture of Workforce AI.

Every AI coding agent MUST follow this architecture.

Do NOT invent a different architecture.

Do NOT change folder names.

Do NOT mix responsibilities.

Do NOT bypass the service layer.

================================================================================
1. FRONTEND GOALS
================================================================================

The frontend must feel like a production Enterprise SaaS application.

Goals

✓ Modular

✓ Scalable

✓ Maintainable

✓ Type Safe

✓ Component Driven

✓ Backend Independent

✓ Fast

✓ Responsive

✓ Accessible

✓ Beautiful

================================================================================
2. TECHNOLOGY STACK
================================================================================

Framework

React 19

Language

TypeScript

Bundler

Vite

Routing

TanStack Router

Data

TanStack Query

Styling

Tailwind CSS v4

UI Library

shadcn/ui

Icons

Lucide React

Forms

React Hook Form

Validation

Zod

Charts

Recharts

Animation

Framer Motion

Notifications

Sonner

Date

date-fns

Table

TanStack Table

Command Palette

cmdk

Theme

next-themes (or equivalent)

================================================================================
3. PROJECT STRUCTURE
================================================================================

src/

    app/

    routes/

    modules/

    components/

        ui/

        shared/

        layout/

        charts/

        employee/

        dashboard/

        forms/

    hooks/

    services/

    mocks/

    types/

    lib/

    assets/

    constants/

    providers/

    utils/

    styles/

Every folder has one responsibility.

================================================================================
4. ROUTING STRUCTURE
================================================================================

/

Landing

/login

/register

/forgot-password

/onboarding

/app

/app/workforce

/app/employees

/app/employees/hire

/app/employees/:id

/app/knowledge

/app/contacts

/app/campaigns

/app/conversations

/app/analytics

/app/settings

/app/organization

Every authenticated page lives inside AppShell.

================================================================================
5. APPLICATION SHELL
================================================================================

Every authenticated page uses

Sidebar

Topbar

Breadcrumbs

Command Palette

Notifications

Organization Switcher

Theme Toggle

User Menu

Main Content

Nothing should bypass AppShell.

================================================================================
6. SIDEBAR STRUCTURE
================================================================================

Overview

AI Workforce

Knowledge

Contacts

Campaigns

Conversations

Analytics

Organization

Settings

Collapse supported.

Responsive supported.

================================================================================
7. PAGE STRUCTURE
================================================================================

Every page follows

Page Header

↓

Description

↓

Primary Actions

↓

Toolbar

↓

Main Content

↓

Supporting Widgets

↓

Activity

↓

Footer (optional)

Never invent layouts per page.

================================================================================
8. COMPONENT ARCHITECTURE
================================================================================

Reusable Components Only

Button

Card

Table

Badge

Input

Dialog

Drawer

Tabs

Charts

Metric Cards

Health Ring

Employee Card

Command Palette

Data Table

Page Header

Empty State

Loading State

Error State

Wizard

Breadcrumbs

Filter Bar

Toolbar

No duplicate UI.

================================================================================
9. MODULE STRUCTURE
================================================================================

Each module owns

Components

Hooks

Types

Services

Utils

Example

modules/

employees/

components/

hooks/

types/

utils/

Never place employee logic in dashboard module.

================================================================================
10. SERVICE LAYER
================================================================================

Every page talks ONLY to services.

UI

↓

Hook

↓

Service

↓

Mock API

↓

Future Backend

Never fetch inside components.

Never import mock data directly.

================================================================================
11. DATA FLOW
================================================================================

User

↓

UI

↓

React Hook Form

↓

Validation

↓

Service

↓

Mock API

↓

TanStack Query

↓

Component

Single direction only.

================================================================================
12. STATE MANAGEMENT
================================================================================

Local State

UI only

React Context

Theme

Session

Organization

TanStack Query

Server data

Forms

React Hook Form

Never duplicate server state.

================================================================================
13. MOCK STRATEGY
================================================================================

Every service returns Promise.

Example

employeeService.getEmployees()

returns

Promise<Employee[]>

Latency

300-1000ms

Randomized.

Errors simulated.

Loading simulated.

================================================================================
14. QUERY STRATEGY
================================================================================

One query key per resource.

Example

employees

employee

campaigns

knowledge

analytics

organization

Invalidate after mutations.

================================================================================
15. DESIGN SYSTEM
================================================================================

Single source of truth.

Typography

Spacing

Radius

Shadow

Buttons

Colors

Status

Charts

Icons

Dark Mode

Everything token based.

================================================================================
16. THEME
================================================================================

Default

Light

Support

Dark

System

Persist preference.

No hardcoded colors.

Use semantic tokens.

================================================================================
17. RESPONSIVE
================================================================================

Desktop

Primary

Tablet

Optimized

Mobile

Executive Dashboard

Quick Actions

Notifications

Sidebar Drawer

================================================================================
18. PERFORMANCE
================================================================================

Lazy routes

Code splitting

Memoization

Image optimization

Skeleton loading

Virtualized tables where required

Avoid unnecessary re-rendering.

================================================================================
19. ACCESSIBILITY
================================================================================

Keyboard Navigation

Visible Focus

ARIA labels

Semantic HTML

Color Contrast

Screen Reader Support

Accessible Forms

Every feature accessible.

================================================================================
20. EMPLOYEE CARD
================================================================================

This is the signature component.

Shows

Avatar

Employee Name

Role

Department

Health

Status

Voice

Calls

Performance

Quick Actions

Open Workspace

Every employee card should feel premium.

================================================================================
21. WORKFORCE DASHBOARD
================================================================================

Contains

KPIs

Business Impact

AI Insights

Activity Feed

Health Overview

Performance Charts

Recommendations

Quick Actions

Upcoming Campaigns

Never show charts without insight.

================================================================================
22. EMPTY STATES
================================================================================

Explain

What happened

Why

Next Action

Never display

"No Data"

================================================================================
23. LOADING
================================================================================

Skeletons

Progress

Animated placeholders

Never blank pages.

================================================================================
24. ERROR HANDLING
================================================================================

Friendly language.

Retry.

Support.

Explanation.

Never expose stack traces.

================================================================================
25. CODE QUALITY
================================================================================

Strict TypeScript

No any

Reusable hooks

Reusable components

Small files

Readable code

Meaningful naming

No duplication

================================================================================
26. INVESTOR MODE
================================================================================

Every screen must be demo-ready.

Every click should work.

Every workflow should complete.

Every chart should contain believable data.

Every employee should have personality.

Every module should connect naturally.

The application should look like Version 0.9 of a real product.

Not a UI concept.

================================================================================
END
================================================================================