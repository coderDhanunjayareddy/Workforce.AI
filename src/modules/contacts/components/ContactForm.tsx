import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Input, Select } from "@/components/ui";
import { useCreateContact, useEmployees, useUpdateContact } from "@/hooks";
import { contactInputSchema, type ContactInput } from "@/services/contactData.service";
import type { Contact } from "@/types";
import { zodResolver } from "@/utils/zodResolver";

import { statusLabel } from "./contactDisplay";

export function ContactForm({ contact, onComplete, onCancel }: { contact?: Contact; onComplete: () => void; onCancel: () => void }) {
  const create = useCreateContact();
  const update = useUpdateContact();
  const employees = useEmployees();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactInputSchema),
    defaultValues: {
      fullName: contact?.fullName ?? "", company: contact?.company ?? "", email: contact?.email ?? "",
      phone: contact?.phone ?? "", status: contact?.status ?? "new-lead", leadScore: contact?.leadScore ?? 0,
      assignedEmployeeId: contact?.assignedEmployeeId ?? "", city: contact?.city ?? "", country: contact?.country ?? "India"
    }
  });
  const submit = async (values: ContactInput) => {
    try {
      const employee = employees.data?.find((item) => item.id === values.assignedEmployeeId);
      const record: Contact = { ...values, id: contact?.id ?? `contact_${crypto.randomUUID()}`, assignedEmployeeName: employee?.name,
        recentActivity: contact?.recentActivity ?? "Manual Entry" };
      if (contact) await update.mutateAsync({ id: contact.id, updates: record });
      else await create.mutateAsync(record);
      toast.success(contact ? "Contact updated." : "Contact added.");
      onComplete();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Contact could not be saved. Please retry.");
    }
  };
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(submit)}>
      <fieldset disabled={isSubmitting} className="grid gap-4 sm:grid-cols-2">
        {([ ["fullName", "Full name"], ["company", "Company"], ["email", "Email"], ["phone", "Phone"], ["city", "City"], ["country", "Country"] ] as const).map(([name, label]) => (
          <label key={name} className="grid gap-1 text-sm font-semibold">
            {label}
            <Input {...register(name)} type={name === "email" ? "email" : name === "phone" ? "tel" : "text"} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />
            {errors[name] ? <span id={`${name}-error`} className="text-xs text-[var(--danger)]">{errors[name]?.message}</span> : null}
          </label>
        ))}
        <label className="grid gap-1 text-sm font-semibold">Status
          <Select {...register("status")}>
            {contactInputSchema.shape.status.options.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
          </Select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">Lead score
          <Input type="number" min={0} max={100} {...register("leadScore", { valueAsNumber: true })} />
          {errors.leadScore ? <span className="text-xs text-[var(--danger)]">{errors.leadScore.message}</span> : null}
        </label>
        <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Assigned AI Employee
          <Select {...register("assignedEmployeeId")} disabled={employees.isLoading || employees.isError}>
            <option value="">Unassigned</option>
            {(employees.data ?? []).filter((employee) => employee.status !== "archived").map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
          </Select>
          {employees.isError ? <span className="text-xs text-[var(--danger)]">Employees could not be loaded. Reopen this form to retry.</span> : null}
        </label>
      </fieldset>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" disabled={isSubmitting} onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}><Save className="h-4 w-4" aria-hidden="true" />Save Contact</Button>
      </div>
    </form>
  );
}
