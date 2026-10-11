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

## Working Contacts and Employee Profiles

Contacts now support editable forms, persistent create/edit/delete, CSV imports
with field mapping and duplicate detection, selected-contact export, and archive.
CSV imports accept up to 1,000 rows and files smaller than 1 MB. Employee profiles
can be edited, and hiring/pause/resume/archive changes persist.

With no `VITE_API_URL`, changes are stored in the current browser and survive
refreshes. They are not shared with other browsers. With `VITE_API_URL` configured,
contacts and employees use the FastAPI backend and PostgreSQL for shared storage.
Backend errors never fall back to browser-only storage.

See [backend setup and deployment](backend/README.md) to connect the existing
Vercel URL. Pushing this repository only publishes the client changes if Vercel is
configured to deploy that branch. The hosted backend still requires configuration.
No Routerplus credits are consumed by this release.

```bash
npm test
```

## Sample Experience

- Responsive public pages and a protected sample workspace
- Sample account creation, onboarding, and password reset screens
- AI Employee directory, hiring flow, and workspace
- Knowledge, contacts, campaigns, conversation review, and analytics views
- Guided tour with narration, transcripts, and audio examples
- Employee changes saved in the browser so the hiring demo survives a refresh

## Demo boundaries

The workspace is a demonstration. Browser mode uses sample authentication; backend mode uses a private client workspace login. Neither mode is a complete identity platform. Email delivery, billing, and live integrations remain unavailable. Calls, performance metrics, testimonials, and organization details are fictional. Contacts and employee profiles persist in the selected storage mode. The contact page downloads a demo brief; it does not send a request. Use synthetic demonstration data until the remaining access controls are implemented.

Product and architecture references are in `docs/`. The production backend roadmap is in [`docs/20_BACKEND_READY_GUIDE.md`](docs/20_BACKEND_READY_GUIDE.md).
