import { Pencil, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button, Input, Modal } from "@/components/ui";
import { useUpdateEmployee } from "@/hooks";
import type { Employee } from "@/types";
import { zodResolver } from "@/utils/zodResolver";

const schema = z.object({
  name: z.string().trim().min(1, "Enter an employee name.").max(160),
  role: z.string().trim().min(1, "Enter a role.").max(160),
  department: z.string().trim().min(1, "Enter a department.").max(160),
  language: z.string().trim().min(1, "Enter a language.").max(100)
});

function EmployeeForm({ employee, onClose }: { employee: Employee; onClose: () => void }) {
  const update = useUpdateEmployee();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: employee });
  const submit = async (values: z.infer<typeof schema>) => {
    try {
      await update.mutateAsync({ id: employee.id, updates: values });
      toast.success("Employee profile saved.");
      onClose();
    } catch {
      // The mutation hook displays the save error and retains the form for retry.
    }
  };
  return <form className="grid gap-4" onSubmit={handleSubmit(submit)}>
    <fieldset disabled={isSubmitting} className="grid gap-4">
      {(["name", "role", "department", "language"] as const).map((field) => <label key={field} className="grid gap-1 text-sm font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}
        <Input {...register(field)} aria-invalid={Boolean(errors[field])} />
        {errors[field] ? <span className="text-xs text-[var(--danger)]">{errors[field]?.message}</span> : null}
      </label>)}
    </fieldset>
    <div className="flex justify-end gap-2"><Button variant="secondary" type="button" disabled={isSubmitting} onClick={onClose}>Cancel</Button><Button type="submit" loading={isSubmitting}><Save className="h-4 w-4" />Save Profile</Button></div>
  </form>;
}

export function EmployeeEditButton({ employee }: { employee: Employee }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" size="sm" onClick={() => setOpen(true)}><Pencil className="h-4 w-4" />Edit Profile</Button>
    <Modal open={open} title={`Edit ${employee.name}`} onClose={() => setOpen(false)}>{open ? <EmployeeForm employee={employee} onClose={() => setOpen(false)} /> : null}</Modal>
  </>;
}
