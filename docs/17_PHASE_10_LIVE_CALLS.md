# ==============================================================================
# WORKFORCE AI
# PHASE_10_LIVE_CALLS.md
# VERSION 1.0
# STATUS: LOCKED
# ==============================================================================

# PURPOSE

The Live Calls module is the operational control center of Workforce AI.

This is where organizations observe AI Employees working in real time.

This screen should make users feel like they are inside an Enterprise Operations Center.

It must not resemble a simple call log.

Instead it should provide complete visibility into

• Live AI Employees
• Active Conversations
• Customer Sentiment
• AI Decisions
• Business Outcomes
• Escalations
• Performance

This module should become one of the most impressive demonstrations during investor presentations.

==============================================================================

PHASE GOAL

Build a complete Real-Time Conversation Monitoring Center where users can

✓ Monitor live calls

✓ Listen to conversations (Mock)

✓ Read live transcripts

✓ View customer sentiment

✓ Observe AI reasoning (Business View)

✓ Track campaign progress

✓ Escalate conversations

✓ Review call outcomes

✓ Monitor AI Workforce utilization

==============================================================================

ROUTES

/app/live

/app/live/:conversationId

/app/conversations

/app/conversations/:conversationId

==============================================================================

PAGE HEADER

Title

Live Operations Center

Subtitle

Monitor every AI Employee, every conversation, and every customer interaction in real time.

Primary CTA

View Workforce Dashboard

Secondary CTA

Launch Campaign

==============================================================================

EXECUTIVE KPIs

Active Calls

8

--------------------------------

Waiting Queue

14

--------------------------------

Completed Today

1,842

--------------------------------

Average Duration

4m 28s

--------------------------------

Current CSAT

94%

--------------------------------

Appointments Today

216

==============================================================================

MAIN LAYOUT

Desktop

Three-panel layout

------------------------------------------------

LEFT

AI Workforce

------------------------------------------------

CENTER

Live Conversation

------------------------------------------------

RIGHT

Insights + Actions

==============================================================================

LEFT PANEL

LIVE AI EMPLOYEES

Display

Avatar

Employee

Department

Campaign

Status

Current Customer

Duration

Health

Examples

🟢 Sophia

Motor Insurance

Talking

03:42

--------------------------------

🟢 Emma

Renewals

Talking

05:11

--------------------------------

🟡 David

Support

On Hold

01:18

--------------------------------

⚪ Olivia

Idle

Ready

==============================================================================

CENTER PANEL

LIVE CONVERSATION

Customer

Rajesh Kumar

Phone

+91 XXXXX XXXXX

Campaign

Motor Insurance

AI Employee

Sophia

Call Duration

03:42

Call Status

Connected

==============================================================================

LIVE TRANSCRIPT

Streaming conversation UI

Example

Sophia

Good morning Mr. Rajesh.

I hope you're doing well today.

--------------------------------

Customer

Yes.

How can I help you?

--------------------------------

Sophia

I'm calling regarding our comprehensive motor insurance renewal.

--------------------------------

Customer

I'm interested.

Can you explain the premium?

Continue updating transcript automatically.

==============================================================================

CONVERSATION TIMELINE

Greeting

↓

Identity Verification

↓

Need Discovery

↓

Recommendation

↓

Objection Handling

↓

Appointment

↓

Closing

Current stage highlighted.

==============================================================================

RIGHT PANEL

REAL-TIME INSIGHTS

Customer Sentiment

Positive

Confidence

94%

Buying Intent

High

Risk Level

Low

Knowledge Used

Pricing Guide v3

Policy Handbook

Current Objective

Book Appointment

Recommended Action

Offer Premium Plan

==============================================================================

AI DECISION PANEL

Explain

Why AI asked current question

Knowledge referenced

Customer intent

Confidence

Next recommended action

Business language only.

Never expose prompts.

==============================================================================

CUSTOMER PROFILE PANEL

Customer Name

Company

Existing Policies

Lead Score

Previous Calls

Assigned Campaign

Last Conversation

Customer Lifetime Value (Mock)

==============================================================================

CALL CONTROLS (MOCK)

Listen

Pause Monitoring

Transfer

Escalate

Take Over (Future)

End Monitoring

==============================================================================

LIVE SENTIMENT

Real-time graph

Positive

Neutral

Negative

Display timeline changes.

==============================================================================

CALL SUMMARY

Updates continuously

Topics Discussed

Products

Objections

Questions

Commitments

Appointment Status

==============================================================================

POST CALL SUMMARY

Automatically generated

Customer Intent

Summary

Products Discussed

Outcome

Appointment

Follow-up Needed

Suggested Next Steps

Knowledge Used

Employee Performance

==============================================================================

CONVERSATION DETAILS

Route

/app/conversations/:conversationId

==============================================================================

SECTIONS

Conversation Overview

Transcript

Timeline

Customer Profile

Knowledge Used

Employee Actions

Outcome

Follow-up

==============================================================================

CALL QUEUE

Display

Queued Customers

Priority

Estimated Wait

Assigned Employee

Campaign

==============================================================================

WORKFORCE UTILIZATION

Charts

Employees Busy

Employees Idle

Average Wait

Queue Length

Calls Per Hour

==============================================================================

LIVE NOTIFICATIONS

Examples

Sophia booked appointment.

--------------------------------

Customer requested callback.

--------------------------------

David escalated conversation.

--------------------------------

Emma completed renewal.

==============================================================================

AI RECOMMENDATIONS

Examples

Customer showing strong buying intent.

↓

Offer Premium Plan.

--------------------------------

Negative sentiment increasing.

↓

Escalate conversation.

--------------------------------

Customer requested documentation.

↓

Send brochure.

==============================================================================

SEARCH

Customer

Employee

Campaign

Conversation ID

==============================================================================

FILTERS

Employee

Campaign

Department

Status

Sentiment

Duration

==============================================================================

TABLE VIEW

Conversation ID

Employee

Customer

Campaign

Duration

Status

Sentiment

Outcome

Actions

==============================================================================

SERVICES

conversation.service.ts

Methods

getLiveCalls()

getConversation()

getTranscript()

getSentiment()

getSummary()

getQueue()

==============================================================================

HOOKS

useLiveCalls()

useConversation()

useTranscript()

useSentiment()

useQueue()

==============================================================================

MOCK DATA

Use MOCK_DATA_SPEC.md

Active Calls

8

Customers

Rajesh Kumar

Anjali Rao

Suresh Patel

ABC Hospitals

Employees

Sophia

Emma

David

Noah

==============================================================================

INTERACTIONS

Employee

↓

Employee Workspace

Customer

↓

Customer Profile

Campaign

↓

Campaign Details

Knowledge

↓

Knowledge Center

Analytics

↓

Analytics Dashboard

==============================================================================

EMPTY STATES

Headline

No live conversations.

Description

Your AI Workforce is ready to start customer conversations.

Primary CTA

Launch Campaign

==============================================================================

LOADING STATES

Conversation Skeleton

Transcript Skeleton

Insight Skeleton

Queue Skeleton

==============================================================================

ERROR STATES

Connection Lost

Transcript Error

Retry

Reconnect

==============================================================================

RESPONSIVE

Desktop

Operations Center

Tablet

Adaptive Panels

Mobile

Conversation-first layout

==============================================================================

ACCESSIBILITY

Keyboard Navigation

ARIA Labels

Semantic Regions

Transcript Navigation

==============================================================================

PERFORMANCE

Virtualized Transcript

Incremental Updates

Optimized Charts

Efficient State Management

==============================================================================

ANIMATIONS

Live Pulse

Typing Indicator

Transcript Fade

Sentiment Animation

Counter Updates

Duration

150–250ms

==============================================================================

DESIGN REQUIREMENTS

The Operations Center should resemble a mission control dashboard.

Everything should feel

Live

Intelligent

Operational

Enterprise

Avoid visual clutter.

Use meaningful animations.

Prioritize readability.

==============================================================================

QUALITY CHECKLIST

✓ Live Workforce

✓ Live Transcript

✓ Customer Profile

✓ AI Insights

✓ Sentiment

✓ Queue

✓ Call Summary

✓ Post Call Analysis

✓ Workforce Utilization

✓ Notifications

✓ Responsive

✓ Dark Mode

✓ Accessible

==============================================================================

EXIT CRITERIA

When an investor opens the Live Operations Center, they should immediately feel that AI Employees are actively handling real customer conversations.

The experience should clearly demonstrate:

• Real-time monitoring
• AI decision support
• Business intelligence
• Customer understanding
• Workforce visibility
• Operational excellence

This screen should become one of the strongest visual demonstrations of the Workforce AI platform.

==============================================================================
END OF PHASE_10_LIVE_CALLS.md
==============================================================================