import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Avatar, Button, Card, CardContent, CardHeader } from "@/components/ui";

import {
  businessMetrics,
  comparisonRows,
  faqs,
  features,
  industries,
  platformModules,
  pricingPlans,
  testimonials,
  trustItems,
  workflowSteps
} from "../constants/marketing.constants";
import { MarketingSection, SectionHeader } from "./MarketingSection";

export function TrustBar() {
  return (
    <MarketingSection className="py-8">
      <div className="grid gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 md:grid-cols-3 lg:grid-cols-6">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-2 rounded-[12px] bg-[var(--surface-elevated)] p-3">
              <Icon className="h-4 w-4 text-[var(--ai-accent)]" aria-hidden="true" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          );
        })}
      </div>
    </MarketingSection>
  );
}

export function ProductIntro() {
  const capabilities = ["Talk", "Learn", "Train", "Analyze", "Perform", "Improve"];
  return (
    <MarketingSection>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          align="left"
          eyebrow="What is Workforce AI"
          title="An Enterprise AI Workforce Platform, built around accountable digital employees."
          description="Organizations hire AI Employees that work with company Knowledge, run Campaigns, handle Conversations, and report business Performance like a real workforce."
        />
        <Card>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[16px] bg-[var(--surface-elevated)] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MarketingSection>
  );
}

export function FeatureGrid() {
  return (
    <MarketingSection id="features">
      <SectionHeader
        eyebrow="Platform Features"
        title="Everything required to build, operate, and improve an AI Workforce."
        description="Each module connects naturally, so AI Employees, Knowledge, Contacts, Campaigns, Conversations, and Analytics tell one business story."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="transition hover:-translate-y-0.5 hover:shadow-sm">
              <CardContent>
                <Icon className="h-6 w-6 text-[var(--ai-accent)]" />
                <h3 className="mt-5 font-display text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{feature.description}</p>
                <Link to={feature.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MarketingSection>
  );
}

export function WorkflowSection() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="How it works"
        title="From hiring to measurable business performance in one connected flow."
        description="The product is designed around the operating rhythm of customer operations teams."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {workflowSteps.map((step, index) => (
          <Card key={step}>
            <CardContent>
              <span className="text-sm font-bold text-[var(--ai-accent)]">Step {index + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {index === 0
                  ? "Start with identity, responsibility, voice, and department."
                  : "Keep every next action tied to Knowledge, Contacts, Campaigns, and outcomes."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  );
}

export function PlatformOverview() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="Platform Overview"
        title="A complete operating system for digital employees."
        description="Every public CTA connects into a real application route prepared by the foundation."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformModules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.title} to={module.href}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-sm">
                <CardContent>
                  <Icon className="h-6 w-6 text-[var(--ai-accent)]" />
                  <h3 className="mt-4 font-semibold">{module.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{module.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </MarketingSection>
  );
}

export function IndustriesSection() {
  return (
    <MarketingSection id="solutions">
      <SectionHeader
        eyebrow="Industries"
        title="Built for teams where conversations create business outcomes."
        description="Workforce AI fits customer operations environments that need consistency, scale, trust, and visibility."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <Card key={industry.title}>
            <CardContent>
              <h3 className="font-display text-lg font-semibold">{industry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{industry.challenge}</p>
              <p className="mt-4 rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm font-semibold">{industry.outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  );
}

export function BusinessImpactSection() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="Business Impact"
        title="Measure the value your AI Workforce creates."
        description="Executives see outcomes that map to revenue, productivity, customer experience, and workforce performance."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {businessMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">{metric.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  );
}

export function ComparisonSection() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="Why Workforce AI"
        title="Designed for business ownership, not disconnected automation."
        description="The platform emphasizes scalability, availability, training, consistency, analytics, and measurable outcomes."
      />
      <Card className="mt-10 overflow-hidden">
        <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm font-semibold">
          <span>Capability</span>
          <span>Traditional Call Center</span>
          <span>Human Team Only</span>
          <span>Workforce AI</span>
        </div>
        {comparisonRows.map((row) => (
          <div key={row[0]} className="grid grid-cols-4 gap-3 border-b border-[var(--border)] p-4 text-sm last:border-b-0">
            {row.map((cell, index) => (
              <span key={cell} className={index === 3 ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </Card>
    </MarketingSection>
  );
}

export function TestimonialsSection() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="Customer Stories"
        title="Realistic operating teams, measurable workforce outcomes."
        description="Fictional demo companies show the buyer story without pretending the prototype has production customers."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item) => (
          <Card key={item.company}>
            <CardContent>
              <Avatar name={item.company} />
              <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">"{item.quote}"</p>
              <p className="mt-5 font-semibold">{item.company}</p>
              <p className="text-xs text-[var(--text-muted)]">{item.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  );
}

export function PricingPreview() {
  return (
    <MarketingSection id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Plans for every stage of digital workforce maturity."
        description="Start focused, scale across teams, then govern the AI Workforce as an enterprise platform."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.name === "Enterprise" ? "border-[var(--ai-accent)]" : undefined}>
            <CardHeader title={plan.name} description={plan.description} />
            <CardContent>
              <p className="font-display text-3xl font-semibold">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="mt-6 w-full" variant={plan.name === "Enterprise" ? "primary" : "secondary"}>
                  Contact Sales
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  );
}

export function FaqSection() {
  return (
    <MarketingSection>
      <SectionHeader
        eyebrow="FAQ"
        title="Questions enterprise buyers ask first."
        description="Clear answers about the AI Employee model, security, campaigns, training, integrations, and scale."
      />
      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-5">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </MarketingSection>
  );
}

export function FinalCta() {
  return (
    <MarketingSection>
      <div className="rounded-[24px] bg-[var(--primary)] p-8 text-white lg:p-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Ready to Build Your Digital Workforce?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Hire your first AI Employee, train with company Knowledge, launch a Campaign, and prove business impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register">
              <Button variant="success">Hire Your First AI Employee</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">Book Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
