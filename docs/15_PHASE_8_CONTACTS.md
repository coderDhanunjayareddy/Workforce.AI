# ==============================================================================
# WORKFORCE AI
# PHASE_8_CONTACTS.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

The Contacts module is the Customer Intelligence Hub of Workforce AI.

AI Employees cannot work without people to communicate with.

This module is not just an address book.

It is a centralized customer database that powers campaigns,
voice conversations,
lead qualification,
customer support,
renewals,
and business analytics.

Every customer interaction throughout the platform should originate from here.

==============================================================================

PHASE GOAL

Build a complete Contact Management System where organizations can

✓ Import Contacts

✓ Manage Customers

✓ Create Segments

✓ Track Interaction History

✓ Assign AI Employees

✓ Launch Campaigns

✓ View Customer Timeline

✓ Analyze Customer Health

==============================================================================

ROUTES

/app/contacts

/app/contacts/import

/app/contacts/:contactId

/app/contacts/segments

/app/contacts/lists

==============================================================================

PAGE HEADER

Title

Contacts

Subtitle

Manage your customer database, organize intelligent segments, and power your AI Workforce.

Primary CTA

Import Contacts

Secondary CTA

Add Contact

==============================================================================

LAYOUT

Desktop

Three-column CRM layout

Tablet

Two-column

Mobile

Stacked layout

==============================================================================

CONTACT DASHBOARD

Widgets

Total Contacts

Qualified Leads

Customers

Renewals Due

Recently Added

Campaign Coverage

Active Conversations

Appointments Scheduled

==============================================================================

KPI CARDS

Total Contacts

2,350

--------------------------------

Qualified Leads

640

--------------------------------

Active Customers

1,280

--------------------------------

Renewals

310

--------------------------------

Pending Follow-ups

120

--------------------------------

Appointments Today

216

==============================================================================

IMPORT CONTACTS

Supported Sources

CSV

Excel

Google Contacts (Future)

CRM Integration (Future)

API Import (Future)

Manual Entry

==============================================================================

IMPORT WIZARD

Step 1

Select Source

↓

Step 2

Upload File

↓

Step 3

Field Mapping

↓

Step 4

Validation

↓

Step 5

Duplicate Detection

↓

Step 6

Review

↓

Step 7

Import Completed

==============================================================================

FIELD MAPPING

Standard Fields

First Name

Last Name

Company

Phone

Email

Country

City

State

Industry

Policy Type

Lead Source

Language

Notes

==============================================================================

CONTACT CARD

Every contact contains

Avatar

Full Name

Company

Email

Phone

Status

Lead Score

Assigned AI Employee

Current Campaign

Recent Activity

Tags

Quick Actions

==============================================================================

CONTACT STATUS

New Lead

Qualified

Customer

Renewal Due

Inactive

Blacklisted

Archived

==============================================================================

LEAD SCORING

Score

0–100

Categories

Cold

Warm

Hot

Qualified

Display

Score

Trend

Reason

==============================================================================

CONTACT PROFILE

Route

/app/contacts/:contactId

Contains

Personal Information

Communication History

Campaign History

Conversation Timeline

Appointments

Policies Purchased

Assigned AI Employee

Notes

Tags

==============================================================================

COMMUNICATION TIMELINE

Display

Phone Calls

Voice Conversations

Emails (Mock)

Appointments

Campaign Responses

Customer Feedback

==============================================================================

SEGMENTS

Create dynamic customer groups.

Examples

Motor Insurance

Health Insurance

Travel Insurance

Life Insurance

High Value Customers

Renewals Due

Cold Leads

Qualified Leads

Support Cases

==============================================================================

SMART FILTERS

Filter By

Status

Lead Score

Campaign

Assigned Employee

Industry

Policy Type

Location

Last Contact Date

==============================================================================

SEARCH

Search by

Name

Phone

Email

Company

Policy Number

Tags

==============================================================================

TABLE VIEW

Columns

Name

Company

Phone

Email

Lead Score

Status

Assigned Employee

Campaign

Last Contact

Actions

==============================================================================

BULK ACTIONS

Assign Employee

Launch Campaign

Export

Archive

Delete (Mock)

Tag

Move Segment

==============================================================================

AI RECOMMENDATIONS

Examples

120 contacts require follow-up.

↓

Launch Campaign

--------------------------------

45 renewals due this week.

↓

Assign Emma

--------------------------------

Lead quality decreasing.

↓

Review qualification workflow

==============================================================================

CONTACT INSIGHTS

Metrics

Lead Quality

Response Rate

Appointment Rate

Conversion Rate

Average Response Time

Customer Satisfaction

==============================================================================

CUSTOMER TIMELINE

Created

↓

Imported

↓

Assigned Employee

↓

Campaign Started

↓

Conversation

↓

Appointment

↓

Policy Purchased

↓

Renewal

==============================================================================

SERVICES

contact.service.ts

Methods

getContacts()

getContact()

importContacts()

createContact()

updateContact()

deleteContact()

createSegment()

assignEmployee()

==============================================================================

HOOKS

useContacts()

useContact()

useImportContacts()

useSegments()

useLeadScoring()

==============================================================================

MOCK DATA

Use MOCK_DATA_SPEC.md

Contacts

2,350

Qualified Leads

640

Customers

1,280

Renewals

310

Pending

120

Include realistic Indian customer names,
companies,
phone numbers,
email addresses,
and policy categories.

==============================================================================

INTERACTIONS

Click Contact

↓

Open Contact Profile

Click Assigned Employee

↓

Employee Workspace

Click Campaign

↓

Campaign Details

Click Conversation

↓

Conversation Timeline

==============================================================================

EMPTY STATES

Headline

No contacts available.

Description

Import your customer database to start building your digital workforce.

Primary CTA

Import Contacts

==============================================================================

LOADING STATES

Table Skeleton

Card Skeleton

Import Skeleton

Profile Skeleton

==============================================================================

ERROR STATES

Import Failed

Duplicate Contacts

Validation Error

Retry

==============================================================================

RESPONSIVE

Desktop

CRM Table + Side Panel

Tablet

Adaptive

Mobile

Card Layout

==============================================================================

ACCESSIBILITY

Keyboard Navigation

ARIA Labels

Semantic Tables

Focus States

==============================================================================

PERFORMANCE

Virtualized Tables

Lazy Loading

Fast Search

Optimized Filtering

==============================================================================

ANIMATIONS

Import Progress

Card Hover

Segment Selection

Fade

Slide

Duration

150–250ms

==============================================================================

DESIGN REQUIREMENTS

The Contacts module should resemble a premium CRM rather than a spreadsheet.

Users should immediately understand that every contact is connected to

AI Employees

Campaigns

Conversations

Knowledge

Analytics

==============================================================================

QUALITY CHECKLIST

✓ Contact Dashboard

✓ Contact Import Wizard

✓ Contact Directory

✓ Contact Profile

✓ Segments

✓ Smart Filters

✓ Search

✓ Bulk Actions

✓ AI Recommendations

✓ Customer Timeline

✓ Responsive

✓ Dark Mode

✓ Accessible

==============================================================================

EXIT CRITERIA

Users should feel they are managing customer relationships,
not rows in a database.

Every contact should appear as part of a larger business journey connected to AI Employees, Campaigns, Conversations, and Business Outcomes.

==============================================================================
END OF PHASE_8_CONTACTS.md
==============================================================================