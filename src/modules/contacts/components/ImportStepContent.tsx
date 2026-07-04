import { CheckCircle2, FileSpreadsheet, UploadCloud, Wand2 } from "lucide-react";

import { Badge, Button, Card, CardContent, Select } from "@/components/ui";
import type { ContactImportResult } from "@/types";

import { importSources, standardFields } from "../constants/contact.constants";

interface ImportStepContentProps {
  step: number;
  source: string;
  result?: ContactImportResult;
  onSourceChange: (source: string) => void;
  onComplete: () => void;
  completing: boolean;
}

export function ImportStepContent({ step, source, result, onSourceChange, onComplete, completing }: ImportStepContentProps) {
  if (step === 1) {
    return (
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {importSources.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!item.available}
            onClick={() => onSourceChange(item.id)}
            className={`rounded-[16px] border p-5 text-left transition ${
              source === item.id ? "border-[var(--ai-accent)] bg-teal-50 dark:bg-teal-950" : "border-[var(--border)] bg-[var(--surface-elevated)]"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <FileSpreadsheet className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
            <p className="mt-4 font-semibold text-[var(--text-primary)]">{item.label}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.available ? "Available for this import" : "Planned for backend integration"}</p>
          </button>
        ))}
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="rounded-[20px] border border-dashed border-[var(--muted-border)] bg-[var(--surface-elevated)] p-10 text-center">
        <UploadCloud className="mx-auto h-10 w-10 text-[var(--ai-accent)]" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">Upload File</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">
          Drop a CSV or Excel file here. The mock import validates the expected customer database structure.
        </p>
        <Button className="mt-5" type="button" variant="secondary">Choose File</Button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {standardFields.map((field, index) => (
          <Card key={field}>
            <CardContent className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{field}</p>
                <p className="text-sm text-[var(--text-muted)]">Mapped from column {index + 1}</p>
              </div>
              <Select aria-label={`Map ${field}`}>
                <option>{field}</option>
                <option>Skip field</option>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["2,350", "Rows scanned", "All required columns detected."],
          ["3", "Validation Error", "Phone and email rows need review."],
          ["98%", "Field confidence", "Mapping quality is ready for import."]
        ].map(([value, label, description]) => (
          <Card key={label}>
            <CardContent>
              <p className="font-display text-3xl font-semibold text-[var(--text-primary)]">{value}</p>
              <p className="mt-2 font-semibold text-[var(--text-primary)]">{label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">Duplicate Contacts</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">12 probable duplicates were found by phone and email.</p>
            </div>
            <Badge tone="amber">Review required</Badge>
          </CardContent>
        </Card>
        <div className="grid gap-3 md:grid-cols-3">
          {["Merge safest records", "Skip archived matches", "Keep latest activity"].map((item) => (
            <div key={item} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm font-semibold">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["2,350", "Contacts"],
            ["640", "Qualified Leads"],
            ["310", "Renewals"],
            ["120", "Pending Follow-ups"]
          ].map(([value, label]) => (
            <Card key={label}>
              <CardContent>
                <p className="font-display text-2xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button type="button" onClick={onComplete} loading={completing}>
          <Wand2 className="h-4 w-4" aria-hidden="true" />
          Import Contacts
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-[var(--surface-elevated)] p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
      <h2 className="mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">Import Completed</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">
        {result ? `${result.imported} contacts imported, ${result.duplicates} duplicates reviewed, ${result.validationErrors} validation issues retained for audit.` : "Contacts are ready for segmentation and campaign launch."}
      </p>
    </div>
  );
}
