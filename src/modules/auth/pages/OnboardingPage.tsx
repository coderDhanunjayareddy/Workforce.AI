import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardContent, Input, Select } from "@/components/ui";
import { WizardShell } from "@/components/shared";
import { useOrganization } from "@/providers/OrganizationProvider";

import { companySizeOptions, defaultOnboardingData, industryOptions } from "../constants/onboarding.constants";
import type { OnboardingData } from "../types/auth.types";

const steps = [
  "Welcome",
  "Organization Details",
  "Industry",
  "Company Size",
  "Branding",
  "Workspace Preferences",
  "Review",
  "Complete"
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}{children}</label>;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { organization, setOrganization } = useOrganization();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const isComplete = step === steps.length;

  const update = (key: keyof OnboardingData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const summaryItems = useMemo(
    () => [
      ["Organization", data.organizationName],
      ["Industry", data.industry],
      ["Company size", data.companySize],
      ["Timezone", data.timezone],
      ["Currency", data.currency],
      ["Business hours", data.businessHours]
    ],
    [data]
  );

  const finish = async () => {
    setOrganization({
      ...organization,
      name: data.organizationName,
      industry: data.industry,
      timezone: data.timezone
    });
    toast.success("Your Workforce is Ready.");
    await navigate({ to: "/app/workforce" });
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text-primary)]">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-display text-xl font-semibold">Workforce AI</Link>
        <WizardShell title="Organization Onboarding" step={step} totalSteps={steps.length}>
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-2">
              {steps.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`flex w-full items-center gap-2 rounded-[12px] px-3 py-2 text-left text-sm font-semibold ${step === index + 1 ? "bg-[var(--surface-elevated)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                  onClick={() => setStep(index + 1)}
                >
                  {index + 1 < step ? <CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> : <span className="grid h-4 w-4 place-items-center rounded-full border border-[var(--border)] text-[10px]">{index + 1}</span>}
                  {item}
                </button>
              ))}
            </aside>
            <section>
              {step === 1 ? (
                <Card>
                  <CardContent>
                    <h1 className="font-display text-3xl font-semibold">Welcome to Workforce AI</h1>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Let's build your digital workforce for Nova Insurance with secure organization settings, workspace preferences, and a review step before launch.</p>
                  </CardContent>
                </Card>
              ) : null}
              {step === 2 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Organization name"><Input value={data.organizationName} onChange={(event) => update("organizationName", event.target.value)} /></Field>
                  <Field label="Website"><Input value={data.website} onChange={(event) => update("website", event.target.value)} /></Field>
                  <Field label="Phone"><Input value={data.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
                  <Field label="Country"><Input value={data.country} onChange={(event) => update("country", event.target.value)} /></Field>
                  <Field label="Timezone"><Input value={data.timezone} onChange={(event) => update("timezone", event.target.value)} /></Field>
                </div>
              ) : null}
              {step === 3 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {industryOptions.map((industry) => (
                    <Button key={industry} type="button" variant={data.industry === industry ? "primary" : "secondary"} onClick={() => update("industry", industry)}>{industry}</Button>
                  ))}
                </div>
              ) : null}
              {step === 4 ? (
                <div className="grid gap-3 sm:grid-cols-3">
                  {companySizeOptions.map((size) => (
                    <Button key={size} type="button" variant={data.companySize === size ? "primary" : "secondary"} onClick={() => update("companySize", size)}>{size}</Button>
                  ))}
                </div>
              ) : null}
              {step === 5 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Logo file name"><Input value={data.logoName} onChange={(event) => update("logoName", event.target.value)} /></Field>
                  <Field label="Primary color"><Input value={data.primaryColor} onChange={(event) => update("primaryColor", event.target.value)} /></Field>
                  <Field label="Secondary color"><Input value={data.secondaryColor} onChange={(event) => update("secondaryColor", event.target.value)} /></Field>
                  <Card><CardContent><p className="text-sm text-[var(--text-secondary)]">Brand preview</p><p className="mt-2 font-display text-xl font-semibold">{data.organizationName}</p></CardContent></Card>
                </div>
              ) : null}
              {step === 6 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Default language"><Input value={data.language} onChange={(event) => update("language", event.target.value)} /></Field>
                  <Field label="Business hours"><Input value={data.businessHours} onChange={(event) => update("businessHours", event.target.value)} /></Field>
                  <Field label="Date format"><Input value={data.dateFormat} onChange={(event) => update("dateFormat", event.target.value)} /></Field>
                  <Field label="Currency"><Select value={data.currency} onChange={(event) => update("currency", event.target.value)}><option>INR</option><option>USD</option><option>EUR</option></Select></Field>
                </div>
              ) : null}
              {step === 7 ? (
                <Card>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    {summaryItems.map(([label, value]) => (
                      <div key={label} className="rounded-[12px] bg-[var(--surface-elevated)] p-4">
                        <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                        <p className="mt-1 font-semibold">{value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
              {isComplete ? (
                <Card>
                  <CardContent className="text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--success)]" />
                    <h1 className="mt-5 font-display text-3xl font-semibold">Your Workforce is Ready</h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">Your organization has been created successfully. Continue to the Workforce Dashboard or hire your first AI Employee.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button onClick={finish}>Go to Workforce Dashboard</Button>
                      <Link to="/app/employees/hire"><Button variant="secondary">Hire Your First AI Employee</Button></Link>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              {!isComplete ? (
                <div className="mt-8 flex justify-between gap-3">
                  <Button type="button" variant="secondary" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))}><ArrowLeft className="h-4 w-4" /> Back</Button>
                  <Button type="button" onClick={() => setStep((value) => Math.min(steps.length, value + 1))}>Next <ArrowRight className="h-4 w-4" /></Button>
                </div>
              ) : null}
            </section>
          </div>
        </WizardShell>
      </div>
    </main>
  );
}
