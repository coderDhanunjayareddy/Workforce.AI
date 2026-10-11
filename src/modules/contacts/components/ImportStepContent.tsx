import { CheckCircle2, FileSpreadsheet, Upload } from "lucide-react";

import { Button, Input, Select } from "@/components/ui";
import type { ContactImportResult } from "@/types";

import { csvFields, type CsvMapping, type CsvPreview, type validateCsvRows } from "../utils/contactCsv";

interface Props {
  step: number;
  preview?: CsvPreview;
  validation?: ReturnType<typeof validateCsvRows>;
  result?: ContactImportResult;
  filename: string;
  onFile: (file: File) => void;
  onMapping: (field: keyof CsvMapping, header: string) => void;
  onComplete: () => void;
  completing: boolean;
}

export function ImportStepContent({ step, preview, validation, result, filename, onFile, onMapping, onComplete, completing }: Props) {
  if (step === 1) return <div className="flex items-center gap-3 p-4"><FileSpreadsheet className="h-6 w-6 text-[var(--ai-accent)]" /><div><h2 className="font-semibold">CSV</h2><p className="text-sm text-[var(--text-secondary)]">Up to 1,000 contacts per import.</p></div></div>;
  if (step === 2) return (
    <div className="grid gap-4">
      <label className="grid gap-2 text-sm font-semibold">Contact file
        <Input type="file" accept=".csv,text/csv" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); }} />
      </label>
      <p className="text-sm text-[var(--text-secondary)]">{filename || "Choose a CSV containing full name, email and phone columns."}</p>
      {preview ? <p className="text-sm">{preview.rows.length} rows found.</p> : null}
    </div>
  );
  if (step === 3) return (
    <div className="grid gap-4 sm:grid-cols-2">
      {csvFields.map((field) => <label key={field} className="grid gap-2 text-sm font-semibold">{field === "fullName" ? "Full name" : field.charAt(0).toUpperCase() + field.slice(1)}
        <Select value={preview?.mapping[field] ?? ""} onChange={(event) => onMapping(field, event.target.value)}>
          <option value="">{["fullName", "email", "phone"].includes(field) ? "Choose required column" : "Skip field"}</option>
          {preview?.headers.map((header) => <option key={header} value={header}>{header}</option>)}
        </Select>
      </label>)}
    </div>
  );
  if (step === 4) return (
    <div className="space-y-3">
      <p>{preview?.rows.length ?? 0} rows checked. {validation?.errors.length ?? 0} invalid rows will be skipped.</p>
      <ul className="max-h-48 overflow-y-auto text-sm text-[var(--danger)]">{validation?.errors.map((error) => <li key={error.row}>Row {error.row}: {error.message}</li>)}</ul>
    </div>
  );
  if (step === 5) return <p>{validation?.duplicates ?? 0} duplicates found by email or phone. Duplicate rows will be skipped; existing contacts stay unchanged.</p>;
  if (step === 6) return (
    <div className="space-y-4">
      <p>{validation?.contacts.length ?? 0} valid, unique contacts ready to import.</p>
      <Button type="button" onClick={onComplete} loading={completing} disabled={!validation?.contacts.length}><Upload className="h-4 w-4" aria-hidden="true" />Import Contacts</Button>
    </div>
  );
  return <div className="space-y-3 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-[var(--success)]" /><h2 className="font-display text-xl font-semibold">Import Completed</h2><p>{result?.imported ?? 0} contacts saved. {result?.duplicates ?? 0} duplicates skipped. {result?.validationErrors ?? 0} invalid rows skipped.</p></div>;
}
