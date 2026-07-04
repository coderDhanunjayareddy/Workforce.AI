import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Seo } from "@/components/shared/Seo";
import { Button, Card, CardContent, Input, Textarea } from "@/components/ui";

import {
  businessMetrics,
  features,
  industries,
  pricingPlans,
  subPageContent
} from "../constants/marketing.constants";
import { MarketingFooter, MarketingNav, MarketingSection, SectionHeader } from "../components";

type SubPageKey = keyof typeof subPageContent;

const contentByPage = {
  features: features.map((item) => ({ title: item.title, description: item.description })),
  solutions: industries.map((item) => ({ title: item.title, description: `${item.challenge} ${item.outcome}` })),
  pricing: pricingPlans.map((item) => ({ title: item.name, description: `${item.description} ${item.features.join(", ")}.` })),
  about: [
    {
      title: "Enterprise-first mission",
      description: "Workforce AI exists to help organizations build a scalable digital workforce with reliability, transparency, and measurable impact."
    },
    {
      title: "Digital employees, not disconnected tools",
      description: "Every AI Employee has identity, responsibility, Knowledge, Health, Performance, and business contribution."
    },
    {
      title: "Backend-ready architecture",
      description: "The prototype is structured so services can map naturally to production APIs, multi-tenancy, and enterprise controls."
    }
  ],
  contact: [
    {
      title: "Book a live demo",
      description: "Walk through hiring an AI Employee, uploading Knowledge, launching a Campaign, and reviewing Analytics."
    },
    {
      title: "Discuss enterprise readiness",
      description: "Review security, integrations, organization controls, and the backend roadmap for your operating environment."
    },
    {
      title: "Plan your first workforce",
      description: "Identify the first roles, departments, Knowledge sources, and measurable outcomes for deployment."
    }
  ]
} satisfies Record<SubPageKey, { title: string; description: string }[]>;

function ContactPanel() {
  return (
    <Card>
      <CardContent>
        <h2 className="font-display text-2xl font-semibold">Request a Workforce AI demo</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Tell us where your team wants to use AI Employees. This form is UI-only until the Phase 3 authentication and backend flows are implemented.
        </p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Work email
            <Input aria-label="Work email" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Company
            <Input aria-label="Company" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Customer operation
            <Textarea aria-label="What customer operation should your first AI Employee support?" />
          </label>
          <Button>
            Book Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketingSubPage({ page }: { page: SubPageKey }) {
  const pageContent = subPageContent[page];
  const Icon = pageContent.icon;
  const seoTitle = `${pageContent.title} | Workforce AI`;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Seo title={seoTitle} description={pageContent.description} path={`/${page}`} />
      <MarketingNav />
      <main>
        <MarketingSection className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--ai-accent)]">Workforce AI</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight">{pageContent.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{pageContent.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button>
                  Hire Your First AI Employee
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">Book Demo</Button>
              </Link>
            </div>
          </div>
          <Card>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] bg-[var(--primary)] p-6 text-white">
                <Icon className="h-8 w-8 text-[var(--ai-accent)]" />
                <p className="mt-8 font-display text-3xl font-semibold">Version 0.9</p>
                <p className="mt-2 text-sm text-white/75">Investor-ready enterprise prototype direction.</p>
              </div>
              <div className="grid gap-3">
                {businessMetrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
                    <p className="text-sm text-[var(--text-secondary)]">{metric.label}</p>
                    <p className="mt-1 font-display text-xl font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MarketingSection>
        <MarketingSection>
          <SectionHeader
            eyebrow={page === "contact" ? "Next Step" : "Details"}
            title={page === "contact" ? "Start with the business outcome you want to improve." : "A connected product story, ready for the next implementation phase."}
            description="These public pages use the same terminology, tokens, routing, and component system as the application shell."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contentByPage[page].map((item) => (
              <Card key={item.title}>
                <CardContent>
                  <h2 className="font-display text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MarketingSection>
        {page === "contact" ? (
          <MarketingSection className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Contact"
                title="Bring your customer operations scenario."
                description="The strongest demo starts with a real business workflow: renewals, lead qualification, claims support, appointment scheduling, or customer success."
              />
              <div className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@workforce-ai.demo</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 90000 00000</p>
              </div>
            </div>
            <ContactPanel />
          </MarketingSection>
        ) : null}
      </main>
      <MarketingFooter />
    </div>
  );
}
