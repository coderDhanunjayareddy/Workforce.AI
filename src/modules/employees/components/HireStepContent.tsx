import type { UseFormRegister } from "react-hook-form";

import { Checkbox, Input, Select } from "@/components/ui";

import {
  departmentOptions,
  knowledgeOptions,
  personalityOptions,
  policyOptions,
  responsibilityOptions,
  toolOptions
} from "../constants/employee.constants";
import type { HireEmployeeFormValues } from "../schemas/hireEmployee.schema";

interface HireStepContentProps {
  step: number;
  register: UseFormRegister<HireEmployeeFormValues>;
  values: HireEmployeeFormValues;
}

export function HireStepContent({ step, register, values }: HireStepContentProps) {
  if (step === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Employee Name">
          <Input {...register("name")} />
        </Field>
        <Field label="Department">
          <Select {...register("department")}>
            {departmentOptions.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Role">
          <Input {...register("role")} />
        </Field>
        <Field label="Avatar">
          <Input value={`${values.name || "New Employee"} professional avatar`} readOnly />
        </Field>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Voice">
          <Input {...register("voice")} />
        </Field>
        <Field label="Language">
          <Input {...register("language")} />
        </Field>
        <Field label="Accent">
          <Input {...register("accent")} />
        </Field>
        <Field label="Tone">
          <Input {...register("tone")} />
        </Field>
        <Field label="Speaking Speed">
          <Select {...register("speakingSpeed")}>
            <option value="Balanced">Balanced</option>
            <option value="Measured">Measured</option>
            <option value="Fast">Fast</option>
          </Select>
        </Field>
      </div>
    );
  }

  if (step === 2) return <Checklist label="Working style" options={personalityOptions} register={register} name="personality" />;
  if (step === 3) return <Checklist label="Responsibilities" options={responsibilityOptions} register={register} name="responsibilities" />;
  if (step === 4) return <Checklist label="Knowledge sources" options={knowledgeOptions} register={register} name="knowledge" />;
  if (step === 5) return <Checklist label="Connected tools" options={toolOptions} register={register} name="tools" />;
  if (step === 6) return <Checklist label="Policies" options={policyOptions} register={register} name="policies" />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ReviewItem label="Name" value={values.name} />
      <ReviewItem label="Role" value={values.role} />
      <ReviewItem label="Department" value={values.department} />
      <ReviewItem label="Voice" value={values.voice} />
      <ReviewItem label="Knowledge" value={values.knowledge.join(", ")} />
      <ReviewItem label="Tools" value={values.tools.join(", ")} />
      <ReviewItem label="Policies" value={values.policies.join(", ")} />
      <ReviewItem label="Status" value="Ready" />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-semibold">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Checklist({
  label,
  options,
  register,
  name
}: {
  label: string;
  options: string[];
  register: UseFormRegister<HireEmployeeFormValues>;
  name: keyof Pick<HireEmployeeFormValues, "personality" | "responsibilities" | "knowledge" | "tools" | "policies">;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm font-semibold">
            <Checkbox value={option} {...register(name)} />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
      <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}
