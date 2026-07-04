import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState, PageHeader, WizardShell } from "@/components/shared";
import { Button } from "@/components/ui";
import { useImportContacts } from "@/hooks";
import type { ContactImportResult } from "@/types";

import { ContactImportSkeleton } from "../components/ContactSkeletons";
import { ImportStepContent } from "../components/ImportStepContent";
import { importSteps } from "../constants/contact.constants";

export function ContactImportPage() {
  const importContacts = useImportContacts();
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("csv");
  const [result, setResult] = useState<ContactImportResult | undefined>();

  const completeImport = () => {
    importContacts.mutate(source, {
      onSuccess: (data) => {
        setResult(data);
        setStep(7);
        toast.success("Import Completed.");
      },
      onError: () => toast.error("Import Failed. Retry the upload or review validation.")
    });
  };

  if (importContacts.isPending && step === 1) return <ContactImportSkeleton />;

  if (importContacts.isError) {
    return (
      <ErrorState
        title="Import Failed"
        description="Validation Error. Duplicate Contacts were detected during processing. Retry after reviewing field mapping."
        onRetry={() => importContacts.reset()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contacts"
        title="Import Contacts"
        description="Bring customer data into Workforce AI, map fields, detect duplicates and prepare segments for action."
        actions={
          <Link to="/app/contacts" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Contacts
          </Link>
        }
      />

      <WizardShell title={importSteps[step - 1]} step={step} totalSteps={importSteps.length}>
        <div className="space-y-6">
          <div className="grid gap-2 md:grid-cols-7" aria-label="Import wizard steps">
            {importSteps.map((label, index) => (
              <div key={label} className={`rounded-[12px] p-3 text-xs font-semibold ${index + 1 <= step ? "bg-teal-50 text-[var(--ai-accent)] dark:bg-teal-950" : "bg-[var(--surface-elevated)] text-[var(--text-muted)]"}`}>
                {index + 1 < step ? <CheckCircle2 className="mb-2 h-4 w-4" aria-hidden="true" /> : null}
                {label}
              </div>
            ))}
          </div>

          <ImportStepContent
            step={step}
            source={source}
            result={result}
            onSourceChange={setSource}
            onComplete={completeImport}
            completing={importContacts.isPending}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" type="button" disabled={step === 1 || step === 7} onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Button>
            {step < 6 ? (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Next
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : step === 7 ? (
              <Link to="/app/contacts" className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">
                Open Contacts
              </Link>
            ) : null}
          </div>
        </div>
      </WizardShell>
    </div>
  );
}
