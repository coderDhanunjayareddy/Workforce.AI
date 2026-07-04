# ==============================================================================
# WORKFORCE AI
# PHASE_1_FOUNDATION.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

This document defines the complete implementation plan for the foundation of
Workforce AI.

Nothing in later phases should violate this document.

Every future module depends on the architecture established here.

This phase DOES NOT build business features.

This phase builds the platform that every future feature will use.

==============================================================================

# PHASE GOAL

Build a production-quality frontend foundation.

At the end of this phase the application should already contain:

✓ Complete project architecture

✓ Routing

✓ Theme System

✓ Design Tokens

✓ Application Shell

✓ Navigation

✓ Providers

✓ Service Layer

✓ Mock API Infrastructure

✓ Reusable Components

✓ Dark Mode

✓ Command Palette

✓ Responsive Layout

==============================================================================

EXPECTED RESULT

The application already feels like an enterprise SaaS before any business
feature is added.

==============================================================================

TECH STACK

React 19

TypeScript

Vite

TanStack Router

TanStack Query

TailwindCSS v4

shadcn/ui

React Hook Form

Zod

Lucide React

Recharts

Sonner

Framer Motion

date-fns

cmdk

==============================================================================

PROJECT STRUCTURE

src/

    app/

    routes/

    modules/

    components/

        ui/

        shared/

        layout/

        feedback/

        charts/

        employee/

        dashboard/

    providers/

    services/

    hooks/

    mocks/

    types/

    constants/

    assets/

    utils/

    lib/

    styles/

==============================================================================

STEP 1

PROJECT INITIALIZATION

==============================================================================

Create

✓ React + Vite + TypeScript

Configure

ESLint

Prettier

Strict TypeScript

Absolute Imports

TailwindCSS

Install

All required dependencies

Configure aliases

@

points to src

==============================================================================

STEP 2

THEME SYSTEM

==============================================================================

Implement

ThemeProvider

Support

Light

Dark

System

Persist

localStorage

Automatic

OS Theme Detection

Every component must support both themes.

==============================================================================

STEP 3

DESIGN TOKENS

==============================================================================

Create semantic tokens

Background

Surface

Surface Elevated

Primary

Secondary

AI Accent

Success

Warning

Danger

Info

Border

Muted Border

Text Primary

Text Secondary

Text Muted

Radius

Spacing

Shadows

Typography

Never hardcode colors.

==============================================================================

STEP 4

TYPOGRAPHY

==============================================================================

Display Font

Sora

Body Font

Manrope

Code

JetBrains Mono

Load fonts globally.

Typography must be token driven.

==============================================================================

STEP 5

QUERY PROVIDER

==============================================================================

Configure

TanStack Query

Provide

Global QueryClient

Devtools

Development only

Prepare

Future backend integration.

==============================================================================

STEP 6

APPLICATION SHELL

==============================================================================

Build

Sidebar

Topbar

Page Container

Breadcrumbs

Theme Toggle

Organization Switcher

Notifications

User Menu

Command Palette

Outlet

Every authenticated page uses AppShell.

==============================================================================

SIDEBAR

==============================================================================

Overview

AI Workforce

Knowledge

Contacts

Campaigns

Conversations

Analytics

Organization

Settings

Support

Collapse supported.

==============================================================================

TOPBAR

==============================================================================

Contains

Breadcrumbs

Global Search

Notifications

Theme Toggle

Organization Switch

Profile

==============================================================================

STEP 7

COMMAND PALETTE

==============================================================================

Shortcut

Ctrl + K

Search

Pages

Employees

Campaigns

Knowledge

Contacts

Settings

Quick Actions

Recently Visited

Must feel similar to

Linear

Raycast

==============================================================================

STEP 8

ROUTING

==============================================================================

Public

/

Login

Register

Forgot Password

Authenticated

/app

/app/workforce

/app/employees

/app/knowledge

/app/contacts

/app/campaigns

/app/conversations

/app/analytics

/app/settings

/app/organization

Protect authenticated routes.

==============================================================================

STEP 9

GLOBAL COMPONENTS

==============================================================================

Build reusable

Button

Card

Badge

Avatar

Tooltip

Dropdown

Modal

Drawer

Tabs

Table

Input

Textarea

Select

Checkbox

Radio

Breadcrumbs

PageHeader

MetricCard

HealthRing

InsightCard

QuickActionCard

EmptyState

LoadingState

ErrorState

Skeleton

ChartCard

Toolbar

FilterBar

WizardShell

EmployeeCard

StatusBadge

All future modules reuse these.

==============================================================================

STEP 10

GLOBAL PROVIDERS

==============================================================================

Create

ThemeProvider

QueryProvider

ToastProvider

OrganizationProvider

SessionProvider

NotificationProvider

Future providers can be added without changing architecture.

==============================================================================

STEP 11

SERVICE LAYER

==============================================================================

Create

employee.service.ts

organization.service.ts

knowledge.service.ts

campaign.service.ts

conversation.service.ts

analytics.service.ts

notification.service.ts

auth.service.ts

Every service returns Promise.

Never expose mock data directly.

==============================================================================

STEP 12

MOCK API

==============================================================================

Every request

Random delay

300–1000ms

Random failures (optional)

Loading

Success

Error

Future backend replacement should require changing only services.

==============================================================================

STEP 13

GLOBAL TYPES

==============================================================================

Employee

Organization

Campaign

Conversation

Knowledge

Analytics

Notification

User

Session

Settings

Everything strongly typed.

==============================================================================

STEP 14

UTILITIES

==============================================================================

Create

Formatter

Date Utils

Currency Utils

Percentage Utils

Avatar Generator

Chart Helpers

Validators

Theme Helpers

==============================================================================

STEP 15

APPLICATION STATE

==============================================================================

React Context

Theme

Session

Organization

Notifications

TanStack Query

Server State

React Hook Form

Forms

No duplicated state.

==============================================================================

STEP 16

FEEDBACK COMPONENTS

==============================================================================

Every module must have

Loading

Error

Empty

Success

Skeleton

Retry

Nothing should render blank.

==============================================================================

STEP 17

RESPONSIVE LAYOUT

==============================================================================

Desktop

Primary

Tablet

Adaptive

Mobile

Executive View

Sidebar

Drawer

Cards

Stack

Tables

Responsive

==============================================================================

STEP 18

ACCESSIBILITY

==============================================================================

Keyboard Navigation

ARIA Labels

Semantic HTML

Visible Focus

Accessible Contrast

Skip Navigation

==============================================================================

STEP 19

PERFORMANCE

==============================================================================

Lazy Routes

Dynamic Imports

Memoization

Optimized Rendering

Skeleton Loading

Minimal Re-renders

==============================================================================

STEP 20

FOUNDATION ACCEPTANCE CRITERIA

==============================================================================

The following must work before Phase 2 begins.

✓ Theme Toggle

✓ Dark Mode

✓ Routing

✓ Sidebar

✓ Topbar

✓ Breadcrumbs

✓ Command Palette

✓ Toasts

✓ Providers

✓ Service Layer

✓ Mock API

✓ Reusable Components

✓ Responsive Layout

✓ Global Tokens

✓ Typography

✓ Application Shell

✓ Type Safety

✓ Accessibility

==============================================================================

DELIVERABLES

==============================================================================

Expected folders

src/

routes/

components/

modules/

providers/

hooks/

services/

mocks/

types/

utils/

constants/

styles/

assets/

Expected reusable components

30+

Expected providers

6+

Expected services

8+

Expected routes

15+

Expected foundation completeness

100%

==============================================================================

EXIT CRITERIA

==============================================================================

Do NOT begin Phase 2 until:

The application shell is complete.

The design system is implemented.

Dark mode is fully working.

Routing is complete.

The service layer is functional.

Mock APIs are working.

Reusable components are finished.

The project should already look like a premium enterprise SaaS platform,
even though no business modules have been implemented yet.

==============================================================================

END OF PHASE_1_FOUNDATION.md

==============================================================================