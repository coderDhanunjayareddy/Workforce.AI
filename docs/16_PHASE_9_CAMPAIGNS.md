# ==============================================================================
# WORKFORCE AI
# PHASE_9_CAMPAIGNS.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

Campaigns are where AI Employees create measurable business value.

An AI Employee without work has no impact.

Campaigns assign business objectives to AI Employees and measure outcomes.

This module must feel like an Enterprise Campaign Management Platform,
not a simple calling queue.

Every campaign should have

Objective

Audience

AI Employee

Knowledge

Timeline

Business KPIs

Live Monitoring

Analytics

==============================================================================

PHASE GOAL

Build a complete Campaign Management System where users can

✓ Create Campaigns

✓ Assign AI Employees

✓ Select Contacts

✓ Configure Calling Strategy

✓ Schedule Campaigns

✓ Monitor Progress

✓ Pause / Resume

✓ Review Performance

✓ Optimize Campaigns

==============================================================================

ROUTES

/app/campaigns

/app/campaigns/create

/app/campaigns/:campaignId

/app/campaigns/templates

/app/campaigns/history

==============================================================================

PAGE HEADER

Title

Campaigns

Subtitle

Launch, monitor and optimize AI-powered customer engagement campaigns.

Primary CTA

Create Campaign

Secondary CTA

Import Campaign Template

==============================================================================

CAMPAIGN DASHBOARD

Widgets

Total Campaigns

Running Campaigns

Scheduled Campaigns

Completed Campaigns

Paused Campaigns

Appointments Generated

Revenue Influenced

Campaign Success Rate

==============================================================================

KPI CARDS

Total Campaigns

8

--------------------------------

Running

3

--------------------------------

Scheduled

2

--------------------------------

Completed

2

--------------------------------

Paused

1

--------------------------------

Appointments

216

--------------------------------

Revenue

₹24.8L

==============================================================================

CAMPAIGN TYPES

Sales

Lead Qualification

Renewals

Customer Support

Claims

Collections

Recruitment

Surveys

Feedback

Custom Campaign

==============================================================================

CREATE CAMPAIGN WIZARD

Step 1

Campaign Information

Campaign Name

Description

Business Goal

Department

Priority

--------------------------------

Step 2

Assign AI Employee

Choose Employee

Department

Health Score

Voice

Availability

--------------------------------

Step 3

Select Contacts

Segment

Manual Selection

CSV

Saved List

--------------------------------

Step 4

Knowledge Assignment

Select Knowledge Collection

FAQs

Scripts

Policies

Documents

--------------------------------

Step 5

Calling Strategy

Business Hours

Retry Rules

Call Attempts

Escalation Rules

Follow-up Delay

--------------------------------

Step 6

Schedule

Launch Now

Future Date

Recurring

Business Calendar

--------------------------------

Step 7

Review

Campaign Summary

Estimated Duration

Expected Outcomes

--------------------------------

Step 8

Launch

Success Screen

==============================================================================

CAMPAIGN STATUS

Draft

Scheduled

Running

Paused

Completed

Cancelled

Archived

==============================================================================

CAMPAIGN CARD

Campaign Name

Business Goal

Status

Assigned Employee

Contact Count

Progress

Appointments

Conversion Rate

Health

Launch Date

Quick Actions

==============================================================================

CAMPAIGN DETAILS

Route

/app/campaigns/:campaignId

==============================================================================

OVERVIEW TAB

Campaign Information

Business Objective

Assigned Employee

Knowledge Used

Target Audience

Timeline

Current Status

==============================================================================

LIVE MONITORING TAB

Display

Calls in Progress

Completed Calls

Pending Calls

Failed Calls

Current Queue

Average Duration

Sentiment Distribution

==============================================================================

PERFORMANCE TAB

Charts

Calls Over Time

Appointments

Lead Qualification

Revenue

Conversion Funnel

Customer Satisfaction

==============================================================================

CONTACTS TAB

Assigned Contacts

Status

Last Contact

Outcome

Next Action

Search

Filters

Bulk Actions

==============================================================================

KNOWLEDGE TAB

Knowledge Assigned

Knowledge Usage

Knowledge Performance

Freshness

Recommendations

==============================================================================

TIMELINE TAB

Campaign Created

↓

Knowledge Assigned

↓

Employee Assigned

↓

Campaign Started

↓

Appointments Generated

↓

Campaign Completed

==============================================================================

AI RECOMMENDATIONS

Examples

Appointment rate is below average.

↓

Improve sales script.

--------------------------------

Contact response rate decreasing.

↓

Adjust calling hours.

--------------------------------

Knowledge outdated.

↓

Update Pricing Guide.

--------------------------------

High-performing campaign detected.

↓

Duplicate campaign.

==============================================================================

LIVE METRICS

Calls Today

Calls Completed

Appointments

Interested Customers

Not Interested

Follow-up Required

Voicemail

Failed Calls

==============================================================================

CAMPAIGN HEALTH

Overall Score

Knowledge Quality

Employee Health

Contact Quality

Conversion Rate

Completion Progress

==============================================================================

CAMPAIGN TEMPLATES

Sales Outreach

Policy Renewal

Claims Follow-up

Lead Qualification

Customer Satisfaction

Recruitment

Collections

==============================================================================

SEARCH

Campaign Name

Employee

Department

Business Goal

Knowledge

==============================================================================

FILTERS

Status

Employee

Department

Campaign Type

Priority

Date

==============================================================================

TABLE VIEW

Columns

Campaign

Status

Employee

Contacts

Calls

Appointments

Revenue

Health

Launch Date

Actions

==============================================================================

BULK ACTIONS

Pause

Resume

Archive

Duplicate

Export

Assign Employee

==============================================================================

SERVICES

campaign.service.ts

Methods

getCampaigns()

getCampaign()

createCampaign()

updateCampaign()

pauseCampaign()

resumeCampaign()

deleteCampaign()

duplicateCampaign()

==============================================================================

HOOKS

useCampaigns()

useCampaign()

useCreateCampaign()

useCampaignAnalytics()

useCampaignHealth()

==============================================================================

MOCK DATA

Use MOCK_DATA_SPEC.md

Campaigns

Motor Insurance Q3

Health Insurance Premium

Policy Renewal Drive

Claim Support July

Recruitment Campaign

Every campaign references

Employees

Contacts

Knowledge

Analytics

Conversations

==============================================================================

INTERACTIONS

Click Employee

↓

Employee Workspace

Click Contact

↓

Contact Profile

Click Knowledge

↓

Knowledge Center

Click Analytics

↓

Campaign Analytics

==============================================================================

EMPTY STATES

Headline

No campaigns available.

Description

Create your first campaign to activate your AI Workforce.

Primary CTA

Create Campaign

==============================================================================

LOADING STATES

Campaign Skeleton

Analytics Skeleton

Timeline Skeleton

Chart Skeleton

==============================================================================

ERROR STATES

Launch Failed

Campaign Error

Retry

Support

==============================================================================

RESPONSIVE

Desktop

Campaign Dashboard

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

Lazy Charts

Virtualized Contacts

Optimized Search

Fast Filters

==============================================================================

ANIMATIONS

Launch Progress

Campaign Status

Charts

Card Hover

Timeline Reveal

==============================================================================

DESIGN REQUIREMENTS

Campaigns should feel like assigning strategic business objectives to AI Employees.

Avoid looking like a telecalling dashboard.

Emphasize

Business Outcomes

AI Workforce

Performance

Revenue

==============================================================================

QUALITY CHECKLIST

✓ Campaign Dashboard

✓ Create Campaign Wizard

✓ Campaign Details

✓ Live Monitoring

✓ Performance Analytics

✓ Contacts

✓ Knowledge

✓ AI Recommendations

✓ Campaign Templates

✓ Responsive

✓ Dark Mode

✓ Accessible

==============================================================================

EXIT CRITERIA

Users should understand that Campaigns are the operational layer where AI Employees execute business objectives.

An investor should immediately recognize:

• AI Employees are assigned meaningful work.
• Campaign performance is measurable.
• Business outcomes are continuously tracked.
• Workforce AI connects Employees, Knowledge, Contacts, Conversations, and Analytics into one unified workflow.

==============================================================================
END OF PHASE_9_CAMPAIGNS.md
==============================================================================