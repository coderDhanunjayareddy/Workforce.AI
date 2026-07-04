# ==============================================================================
# WORKFORCE AI
# PHASE_3_AUTH.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

This phase implements the complete authentication and organization onboarding
experience for Workforce AI.

Authentication is more than login.

It is the user's first experience with the platform.

The experience should immediately communicate professionalism,
security and enterprise quality.

==============================================================================

PHASE GOAL

Build a complete authentication system using a mock backend.

Every flow should work exactly like a production SaaS application.

Users should be able to:

✓ Register

✓ Login

✓ Verify Email

✓ Reset Password

✓ Accept Organization Invitation

✓ Create Organization

✓ Complete Onboarding

==============================================================================

SCREENS

/login

/register

/forgot-password

/reset-password

/verify-email

/invite/:token

/onboarding

==============================================================================

USER FLOW

Landing

↓

Register

↓

Email Verification

↓

Create Organization

↓

Organization Onboarding

↓

Welcome Screen

↓

Workforce Dashboard

==============================================================================

LOGIN PAGE

==============================================================================

Layout

Two-column desktop

Single-column mobile

Left Panel

Brand illustration

Product message

Key benefits

Right Panel

Login form

Logo

Welcome back heading

Email

Password

Remember me

Forgot password

Sign in button

Google sign-in (UI only)

Footer

Create account link

==============================================================================

REGISTER PAGE

==============================================================================

Fields

First Name

Last Name

Work Email

Password

Confirm Password

Organization Name

Terms & Conditions

Privacy Policy

Create Account

Validation

Required fields

Valid email

Strong password

Password confirmation

Terms acceptance

==============================================================================

PASSWORD POLICY

==============================================================================

Minimum 8 characters

Uppercase

Lowercase

Number

Special Character

Visual password strength indicator

Weak

Medium

Strong

Excellent

==============================================================================

FORGOT PASSWORD

==============================================================================

Input

Email

Action

Send Reset Link

Success Screen

Password reset instructions sent.

Error State

Email not found (mock)

==============================================================================

RESET PASSWORD

==============================================================================

Fields

New Password

Confirm Password

Validation

Success Screen

Password updated successfully.

Redirect to login.

==============================================================================

EMAIL VERIFICATION

==============================================================================

States

Waiting

Verified

Expired

Resend Email

Countdown Timer (Mock)

==============================================================================

INVITATION FLOW

==============================================================================

User receives invitation.

↓

Invitation page opens.

↓

Organization details shown.

↓

Accept invitation.

↓

Create password.

↓

Redirect to dashboard.

==============================================================================

ONBOARDING WIZARD

==============================================================================

Step 1

Welcome

Step 2

Organization Details

Step 3

Industry

Step 4

Company Size

Step 5

Logo Upload

Step 6

Workspace Preferences

Step 7

Review

Step 8

Complete

==============================================================================

STEP 1

WELCOME

==============================================================================

Headline

Welcome to Workforce AI

Description

Let's build your digital workforce.

CTA

Start Setup

==============================================================================

STEP 2

ORGANIZATION DETAILS

==============================================================================

Fields

Organization Name

Website

Phone

Country

Timezone

==============================================================================

STEP 3

INDUSTRY

==============================================================================

Insurance

Healthcare

Education

Finance

Retail

Travel

Manufacturing

Other

==============================================================================

STEP 4

COMPANY SIZE

==============================================================================

1–10

11–50

51–200

201–1000

1000+

==============================================================================

STEP 5

BRANDING

==============================================================================

Upload

Logo

Primary Color

Secondary Color

Preview

==============================================================================

STEP 6

WORKSPACE PREFERENCES

==============================================================================

Default Language

Business Hours

Date Format

Currency

Timezone

==============================================================================

STEP 7

REVIEW

==============================================================================

Organization Summary

Branding Preview

Preferences

Back

Finish Setup

==============================================================================

STEP 8

COMPLETION

==============================================================================

Animation

Confetti (Subtle)

Headline

Your Workforce is Ready

Description

Your organization has been created successfully.

Primary CTA

Go to Workforce Dashboard

Secondary CTA

Hire Your First AI Employee

==============================================================================

AUTH SERVICE

==============================================================================

Create

auth.service.ts

Methods

login()

register()

logout()

forgotPassword()

resetPassword()

verifyEmail()

acceptInvitation()

refreshSession()

getCurrentUser()

All methods return Promise.

==============================================================================

SESSION MANAGEMENT

==============================================================================

Mock JWT

Session Context

User Context

Organization Context

Protected Routes

Auto Redirect

==============================================================================

ROUTE PROTECTION

==============================================================================

Public Routes

Landing

Login

Register

Forgot Password

Protected Routes

Dashboard

Employees

Knowledge

Campaigns

Analytics

Redirect unauthenticated users to login.

==============================================================================

FORM VALIDATION

==============================================================================

React Hook Form

+

Zod

Inline Errors

Field Validation

Disable Submit While Loading

==============================================================================

LOADING STATES

==============================================================================

Button Loading

Skeleton

Spinner (Minimal)

Form Disabled

==============================================================================

ERROR STATES

==============================================================================

Invalid Credentials

Email Exists

Network Error (Mock)

Session Expired

Invitation Expired

==============================================================================

SUCCESS STATES

==============================================================================

Login Successful

Account Created

Password Updated

Invitation Accepted

Organization Created

==============================================================================

TOAST MESSAGES

==============================================================================

Success

Information

Warning

Error

Use Sonner

==============================================================================

RESPONSIVE

==============================================================================

Desktop

Tablet

Mobile

All authentication screens responsive.

==============================================================================

ACCESSIBILITY

==============================================================================

Keyboard Navigation

Visible Focus

ARIA Labels

Semantic Forms

Password Visibility Toggle

==============================================================================

SECURITY UX

==============================================================================

Password Visibility Toggle

Session Timeout (Mock)

Remember Me

Secure Form Design

==============================================================================

DESIGN REQUIREMENTS

==============================================================================

Use Design System

Enterprise Layout

Professional Illustration

Minimal Animation

Consistent Typography

Soft Shadows

Accessible Contrast

==============================================================================

ACCEPTANCE CRITERIA

==============================================================================

✓ Login Flow

✓ Register Flow

✓ Forgot Password

✓ Reset Password

✓ Email Verification

✓ Invitation Flow

✓ Organization Onboarding

✓ Protected Routes

✓ Session Context

✓ Mock Authentication

✓ Responsive

✓ Accessible

✓ Dark Mode

==============================================================================

EXIT CRITERIA

==============================================================================

A new user should be able to:

Register

↓

Verify Email

↓

Create Organization

↓

Complete Onboarding

↓

Enter Workforce Dashboard

without encountering unfinished screens or broken workflows.

The authentication experience should establish confidence that Workforce AI is a secure, enterprise-grade platform.

==============================================================================
END OF PHASE_3_AUTH.md
==============================================================================