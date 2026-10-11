import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ErrorState, PageHeader, WizardShell } from "@/components/shared";
import { Button } from "@/components/ui";
import { useContacts, useImportContacts } from "@/hooks";
import type { ContactImportResult } from "@/types";

import { ContactImportSkeleton } from "../components/ContactSkeletons";
import { ImportStepContent } from "../components/ImportStepContent";
import { importSteps } from "../constants/contact.constants";
import { parseContactCsv, validateCsvRows, type CsvMapping, type CsvPreview } from "../utils/contactCsv";

export function ContactImportPage() {
  const importContacts = useImportContacts();
  const [step, setStep] = useState(1);
  const contactsQuery = useContacts();
  const [preview, setPreview] = useState<CsvPreview>();
  const [filename, setFilename] = useState("");
  const validation = useMemo(() => preview ? validateCsvRows(preview, contactsQuery.data ?? []) : undefined, [preview, contactsQuery.data]);
  const [result, setResult] = useState<ContactImportResult | undefined>();

  const completeImport = () => {
    if (!validation?.contacts.length || contactsQuery.isLoading || contactsQuery.isError) return;
    importContacts.mutate({ contacts: validation.contacts, validationErrors: validation.errors.length }, {
      onSuccess: (data) => {
        setResult({ ...data, duplicates: data.duplicates + validation.duplicates });
        setStep(7);
        toast.success("Import Completed.");
      },
      onError: () => toast.error("Import Failed. Retry the upload or review validation.")
    });
  };

  const chooseFile = async (file: File) => {
    setPreview(undefined);
    setFilename("");
    try {
      if (file.size > 1_000_000) throw new Error("Choose a CSV smaller than 1 MB.");
      const parsed = parseContactCsv(await file.text());
      setPreview(parsed);
      setFilename(file.name);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The file could not be read.");
    }
  };
  const mappingComplete = preview && ["fullName", "email", "phone"].every((field) => Boolean(preview.mapping[field as keyof CsvMapping]));
  const canContinue = step === 1 || (step === 2 && Boolean(preview)) || (step === 3 && mappingComplete) || (step > 3 && Boolean(validation?.contacts.length));

  if (importContacts.isPending && step === 1) return <ContactImportSkeleton />;

  if (importContacts.isError) {
    return (
      <ErrorState
        title="Import Failed"
        description={importContacts.error.message}
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
            preview={preview}
            validation={validation}
            filename={filename}
            result={result}
            onFile={(file) => void chooseFile(file)}
            onMapping={(field, header) => setPreview((current) => current ? { ...current, mapping: { ...current.mapping, [field]: header } } : current)}
            onComplete={completeImport}
            completing={importContacts.isPending}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" type="button" disabled={step === 1 || step === 7} onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Button>
            {step < 6 ? (
              <Button type="button" disabled={!canContinue || contactsQuery.isLoading || contactsQuery.isError} onClick={() => setStep(step + 1)}>
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
