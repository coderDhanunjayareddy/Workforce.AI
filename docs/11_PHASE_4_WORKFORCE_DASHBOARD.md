# ==============================================================================
# WORKFORCE AI
# PHASE_4_WORKFORCE_DASHBOARD.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

This phase builds the heart of Workforce AI.

The Workforce Dashboard is NOT a traditional analytics dashboard.

It is an Executive Command Center where business leaders monitor,
manage and optimize their Digital Workforce.

When users log in, this should be the first screen they see.

This screen alone should convince an investor that Workforce AI is a real enterprise platform.

==============================================================================

PHASE GOAL

Build a premium executive dashboard that answers four questions immediately.

1. What is happening?

2. What needs attention?

3. What business value are AI Employees creating?

4. What should I do next?

The dashboard should feel alive.

==============================================================================

ROUTE

/app/workforce

==============================================================================

PAGE HEADER

Title

Workforce Overview

Subtitle

Monitor your AI Workforce, business performance, live conversations and actionable insights from a single command center.

Primary Action

Hire AI Employee

Secondary Action

Launch Campaign

Additional Actions

Import Contacts

Upload Knowledge

Refresh Dashboard

==============================================================================

LAYOUT

12-column responsive grid

Desktop

Three-column executive dashboard

Tablet

Two-column layout

Mobile

Stacked widgets

Consistent spacing using 8px grid.

==============================================================================

SECTION 1

GLOBAL KPI BAR

==============================================================================

Display six executive KPI cards.

Card 1

Total AI Employees

18

Trend

+2 this month

--------------------------------

Card 2

Live Conversations

8

Trend

+18%

--------------------------------

Card 3

Calls Today

1,842

Trend

+12%

--------------------------------

Card 4

Appointments Booked

216

Trend

+9%

--------------------------------

Card 5

Customer Satisfaction

94%

Trend

+2%

--------------------------------

Card 6

Revenue Influenced

₹24.8L

Trend

+15%

Every KPI card contains

Icon

Metric

Trend

Comparison

Sparkline

==============================================================================

SECTION 2

BUSINESS IMPACT

==============================================================================

Large executive widget.

Displays

Revenue Influenced

Hours Saved

Policies Sold

Qualified Leads

Conversion Rate

Monthly Trend

Business Summary

Example

Your AI Workforce influenced ₹24.8L in revenue this month while saving approximately 1,842 working hours.

==============================================================================

SECTION 3

AI INSIGHTS

==============================================================================

This becomes one of the signature widgets.

Each insight includes

Priority

Title

Description

Business Impact

Recommended Action

Mock examples

Pricing Guide knowledge is outdated.

Action

Update Knowledge

--------------------------------

Sophia increased appointment booking by 14%.

Action

Review Performance

--------------------------------

Renewal Campaign completes tomorrow.

Action

Open Campaign

--------------------------------

Travel Insurance contacts are nearly exhausted.

Action

Import Contacts

Insights must always lead to actions.

==============================================================================

SECTION 4

LIVE AI WORKFORCE

==============================================================================

Real-time employee activity.

Display

Avatar

Employee Name

Role

Current Activity

Duration

Customer Name

Status

Examples

🟢 Sophia

Talking with Rajesh Kumar

03:41

--------------------------------

🟢 Emma

Renewal Discussion

05:18

--------------------------------

🟡 David

Training

12%

--------------------------------

⚪ Olivia

Idle

Last active 8 min ago

==============================================================================

SECTION 5

AI WORKFORCE HEALTH

==============================================================================

Overall Health Score

96%

Breakdown

Knowledge

95%

Conversation Quality

97%

Voice Quality

99%

Tool Connectivity

100%

Policy Compliance

98%

Display

Health Ring

Trend

Last Updated

==============================================================================

SECTION 6

TOP PERFORMERS

==============================================================================

Top 5 AI Employees

Columns

Rank

Avatar

Name

Role

Calls

Appointments

CSAT

Health

Open Workspace

Example

1

Sophia

Sales Executive

132 Calls

18 Appointments

98% CSAT

99% Health

==============================================================================

SECTION 7

WORKFORCE ACTIVITY FEED

==============================================================================

Chronological timeline.

Example

09:12

Sophia booked appointment.

--------------------------------

09:18

Emma renewed policy.

--------------------------------

09:31

Campaign launched.

--------------------------------

09:42

Knowledge updated.

--------------------------------

09:56

David resolved claim.

Support

Infinite scrolling

Relative timestamps

Status icons

==============================================================================

SECTION 8

QUICK ACTIONS

==============================================================================

Display as action cards.

Hire AI Employee

Upload Knowledge

Import Contacts

Launch Campaign

Review Analytics

View Live Calls

Open Employee Directory

Quick actions should require one click.

==============================================================================

SECTION 9

ACTIVE CAMPAIGNS

==============================================================================

Campaign Card

Campaign Name

Status

Assigned Employee

Progress

Contacts Remaining

Appointments

Completion ETA

CTA

Open Campaign

==============================================================================

SECTION 10

CONVERSATION METRICS

==============================================================================

Charts

Calls Per Hour

Average Duration

Sentiment Distribution

Conversation Funnel

First Call Resolution

All charts include

Legend

Tooltip

Business Summary

==============================================================================

SECTION 11

WORKFORCE MAP

==============================================================================

Mini visualization.

Display

Departments

Sales

Support

Finance

HR

Claims

Show

Employee Count

Health

Performance

==============================================================================

SECTION 12

NOTIFICATIONS

==============================================================================

Display

Knowledge updated

Campaign scheduled

Employee paused

Policy published

Appointment booked

Conversation escalated

Unread badge supported.

==============================================================================

SECTION 13

COMMAND CENTER PANEL

==============================================================================

Today's Priorities

Example

Review Pricing Guide

Launch Renewal Campaign

Approve Emma Training

Import 250 Travel Leads

Each item contains

Priority

Description

CTA

==============================================================================

SECTION 14

SEARCH

==============================================================================

Global Search Bar

Search

Employees

Campaigns

Knowledge

Contacts

Conversations

Recent Items

Quick Actions

Powered through Command Palette.

==============================================================================

DASHBOARD COMPONENTS

==============================================================================

PageHeader

MetricCard

BusinessImpactCard

InsightCard

HealthRing

EmployeeCardMini

CampaignCard

ActivityFeed

NotificationPanel

QuickActionCard

TrendChart

Sparkline

ChartCard

Toolbar

==============================================================================

SERVICES REQUIRED

==============================================================================

analytics.service.ts

employee.service.ts

campaign.service.ts

conversation.service.ts

notification.service.ts

organization.service.ts

==============================================================================

MOCK DATA

==============================================================================

Use

MOCK_DATA_SPEC.md

Everything displayed on dashboard references

Nova Insurance

18 AI Employees

Existing Campaigns

Knowledge

Contacts

Live Calls

Notifications

==============================================================================

INTERACTIONS

==============================================================================

Click Employee

↓

Open Workspace

Click Campaign

↓

Campaign Details

Click Insight

↓

Recommended Screen

Click Notification

↓

Related Object

No dead-end interactions.

==============================================================================

LOADING

==============================================================================

Dashboard Skeleton

Metric Skeleton

Chart Skeleton

Feed Skeleton

Health Skeleton

==============================================================================

EMPTY STATES

==============================================================================

Every widget supports

Title

Explanation

Primary Action

==============================================================================

ERROR STATES

==============================================================================

Retry

Refresh

Contact Support (Mock)

==============================================================================

RESPONSIVE

==============================================================================

Desktop

Three-column dashboard

Tablet

Adaptive widgets

Mobile

Single-column executive dashboard

==============================================================================

ACCESSIBILITY

==============================================================================

Keyboard Navigation

ARIA Labels

Focus States

Accessible Charts

==============================================================================

PERFORMANCE

==============================================================================

Lazy chart loading

Memoized widgets

Optimized rendering

Deferred animations

==============================================================================

ANIMATIONS

==============================================================================

Counter animation

Chart transitions

Hover cards

Live status pulse

Fade

Slide

Duration

150–250ms

==============================================================================

ACCEPTANCE CRITERIA

==============================================================================

✓ Executive Dashboard

✓ Live Workforce Widget

✓ Business Impact

✓ AI Insights

✓ Activity Feed

✓ Workforce Health

✓ Campaign Overview

✓ Notifications

✓ Quick Actions

✓ Responsive

✓ Dark Mode

✓ Accessible

✓ Connected Navigation

==============================================================================

EXIT CRITERIA

==============================================================================

When an investor logs into Workforce AI for the first time,

the dashboard alone should communicate:

• AI Employees are actively working.

• Business outcomes are measurable.

• The platform provides actionable intelligence.

• Every major workflow is one click away.

The dashboard should feel like the operating center of an organization's digital workforce, not just another analytics page.

==============================================================================
END OF PHASE_4_WORKFORCE_DASHBOARD.md
==============================================================================