import { Link } from "@tanstack/react-router";
import { ShieldCheck, UsersRound, Building2 } from "lucide-react";
import type { ReactNode } from "react";

import { MarketingNav } from "@/modules/marketing/components";

export function AuthLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <MarketingNav />
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-12">
        <section className="hidden rounded-[24px] border border-[var(--border)] bg-[var(--primary)] p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="font-display text-2xl font-semibold">Workforce AI</Link>
            <h1 className="mt-12 max-w-xl font-display text-4xl font-semibold leading-tight">
              Secure access to your digital workforce operating system.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/75">
              Manage AI Employees, Knowledge, Campaigns, Conversations, and Analytics with enterprise-grade controls.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              [ShieldCheck, "Mock JWT session with route protection"],
              [Building2, "Nova Insurance organization workspace"],
              [UsersRound, "18 AI Employees ready for onboarding"]
            ].map(([Icon, text]) => (
              <div key={String(text)} className="flex items-center gap-3 rounded-[16px] bg-white/10 p-4">
                <Icon className="h-5 w-5 text-[var(--ai-accent)]" />
                <span className="text-sm font-semibold">{String(text)}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center">
          <div className="w-full rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            <Link to="/" className="font-display text-xl font-semibold lg:hidden">Workforce AI</Link>
            <h2 className="mt-6 font-display text-3xl font-semibold lg:mt-0">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
            <div className="mt-7">{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
