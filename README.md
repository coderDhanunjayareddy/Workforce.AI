# Workforce AI — Version 1 Demo

Workforce AI is an interactive client demo of an AI workforce platform. It uses a fictional Nova Insurance workspace and sample data to show AI Employees, knowledge, contacts, campaigns, conversations, analytics, and organization settings.

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, choose **Login**, and use the prefilled sample credentials. In the workspace, select **Guided Demo** for a narrated tour. The tour includes local audio and conversation playback.

For a production build:

```bash
npm run lint
npm run build
npm run preview
```

The static build in `dist/` can be hosted on a service that serves `index.html` for application routes. `vercel.json` includes a rewrite for Vercel.

## Version 1 scope

- Responsive public pages and a protected sample workspace
- Sample account creation, onboarding, and password reset screens
- AI Employee directory, hiring flow, and workspace
- Knowledge, contacts, campaigns, conversation review, and analytics views
- Guided tour with narration, transcripts, and audio examples
- Employee changes saved in the browser so the hiring demo survives a refresh

## Demo boundaries

The workspace is a demonstration. The account and administration screens do not provide production authentication, email delivery, tenant isolation, API keys, billing, or live integrations. Calls, metrics, testimonials, and organization details are fictional. The contact page downloads a demo brief; it does not send a request. Most sample services return fixed data, while employee changes are stored locally in the browser. Do not enter real customer data or use the demo to run operations.

Product and architecture references are in `docs/`. The production backend roadmap is in [`docs/20_BACKEND_READY_GUIDE.md`](docs/20_BACKEND_READY_GUIDE.md).
