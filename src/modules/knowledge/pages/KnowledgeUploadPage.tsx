import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { useState } from "react";

import { PageHeader, WizardShell } from "@/components/shared";
import { Badge, Button, Card, CardContent, Checkbox, Input, Select } from "@/components/ui";
import { useUploadKnowledge } from "@/hooks";
import type { Knowledge } from "@/types";

import { knowledgeCategories, knowledgeSourceTypes, uploadStages, uploadWizardSteps } from "../constants/knowledge.constants";

export function KnowledgeUploadPage() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<Knowledge | null>(null);
  const [title, setTitle] = useState("Pricing Guide v4.pdf");
  const [department, setDepartment] = useState("Sales");
  const [sourceType, setSourceType] = useState("PDF");
  const uploadKnowledge = useUploadKnowledge();
  const isLastStep = step === uploadWizardSteps.length - 1;

  const complete = () => {
    const document: Knowledge = {
      id: `kn_${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}`,
      title,
      type: "pdf",
      status: "processing",
      department,
      freshness: 91,
      version: "v1.0"
    };
    uploadKnowledge.mutate(document, { onSuccess: setCompleted });
  };

  if (completed) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Upload Knowledge" title="Knowledge upload completed" description={`${completed.title} has entered processing and will be available after quality checks.`} />
        <Card>
          <CardContent className="space-y-4">
            <CheckCircle2 className="h-10 w-10 text-[var(--ai-accent)]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold">{completed.title}</h2>
            <p className="text-sm text-[var(--text-secondary)]">Assigned to {department}. Status: {completed.status}.</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/app/knowledge" className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Open Knowledge Center</Link>
              <Button variant="secondary" type="button" onClick={() => setCompleted(null)}>Upload Another Source</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Upload Knowledge"
        title="Upload Knowledge"
        description="Turn company documents, FAQs, websites and policies into reliable business knowledge for your AI Workforce."
        actions={<Link to="/app/knowledge" className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">Back to Knowledge Center</Link>}
      />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <Card>
          <CardContent className="space-y-2">
            {uploadWizardSteps.map((item, index) => (
              <button key={item} type="button" className={`w-full rounded-[12px] p-3 text-left text-sm font-semibold ${index === step ? "bg-[var(--surface-elevated)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]"}`} onClick={() => setStep(index)}>
                {index + 1}. {item}
              </button>
            ))}
          </CardContent>
        </Card>
        <WizardShell title={uploadWizardSteps[step]} step={step + 1} totalSteps={uploadWizardSteps.length}>
          <StepContent step={step} title={title} setTitle={setTitle} sourceType={sourceType} setSourceType={setSourceType} department={department} setDepartment={setDepartment} />
          <div className="mt-6 flex flex-wrap justify-between gap-2">
            <Button variant="secondary" type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
            {isLastStep ? (
              <Button type="button" loading={uploadKnowledge.isPending} onClick={complete}><Upload className="h-4 w-4" /> Complete Upload</Button>
            ) : (
              <Button type="button" onClick={() => setStep(step + 1)}>Continue <ArrowRight className="h-4 w-4" /></Button>
            )}
          </div>
        </WizardShell>
      </div>
    </div>
  );
}

function StepContent({
  step,
  title,
  setTitle,
  sourceType,
  setSourceType,
  department,
  setDepartment
}: {
  step: number;
  title: string;
  setTitle: (value: string) => void;
  sourceType: string;
  setSourceType: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
}) {
  if (step === 0) return <div className="grid gap-3 md:grid-cols-2">{knowledgeSourceTypes.map((type) => <button key={type} type="button" className={`rounded-[16px] border border-[var(--border)] p-4 text-left font-semibold ${sourceType === type ? "bg-[var(--surface-elevated)]" : ""}`} onClick={() => setSourceType(type)}>{type}</button>)}</div>;
  if (step === 1) return <div className="rounded-[20px] border border-dashed border-[var(--muted-border)] bg-[var(--surface-elevated)] p-10 text-center"><Upload className="mx-auto h-10 w-10 text-[var(--ai-accent)]" /><p className="mt-3 font-semibold">Drop files here or choose from your computer</p><p className="mt-1 text-sm text-[var(--text-secondary)]">Supports documents, spreadsheets, presentations, FAQs and websites.</p></div>;
  if (step === 2) return <div className="grid gap-4 md:grid-cols-2"><Field label="Title"><Input value={title} onChange={(event) => setTitle(event.target.value)} /></Field><Field label="Department"><Select value={department} onChange={(event) => setDepartment(event.target.value)}>{knowledgeCategories.slice(1, 7).map((item) => <option key={item}>{item}</option>)}</Select></Field><Field label="Category"><Select>{knowledgeCategories.map((item) => <option key={item}>{item}</option>)}</Select></Field><Field label="Language"><Input defaultValue="English" /></Field><Field label="Owner"><Input defaultValue="Priya Reddy" /></Field><Field label="Tags"><Input defaultValue="Insurance, Policy, Nova" /></Field></div>;
  if (step === 3) return <fieldset><legend className="text-sm font-semibold">Employee Assignment</legend><div className="mt-4 grid gap-3 md:grid-cols-3">{["Individual Employee", "Department", "Entire Workforce"].map((item) => <label key={item} className="flex items-center gap-3 rounded-[16px] border border-[var(--border)] p-4"><Checkbox defaultChecked={item === "Department"} />{item}</label>)}</div></fieldset>;
  if (step === 4) return <div className="grid gap-3 md:grid-cols-2"><Review label="Source Type" value={sourceType} /><Review label="Title" value={title} /><Review label="Department" value={department} /><Review label="Assignment" value="Department" /></div>;
  if (step === 5) return <div className="space-y-3">{uploadStages.map((stage, index) => <div key={stage} className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><div className="flex items-center justify-between"><span className="font-semibold">{stage}</span><Badge tone={index < 7 ? "green" : "blue"}>{index < 7 ? "complete" : "next"}</Badge></div><div className="mt-3 h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${Math.min(100, (index + 1) * 12)}%` }} /></div></div>)}</div>;
  return <p className="rounded-[16px] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--text-secondary)]">The source is ready to be added to Nova Insurance's knowledge system.</p>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="space-y-2 text-sm font-semibold"><span>{label}</span>{children}</label>;
}

function Review({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-muted)]">{label}</p><p className="mt-2 font-semibold">{value}</p></div>;
}
