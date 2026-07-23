import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, UsersRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PageHeader, WizardShell } from "@/components/shared";
import { Avatar, Button, Card, CardContent } from "@/components/ui";
import { useHireEmployee } from "@/hooks";
import type { Employee } from "@/types";
import { zodResolver } from "@/modules/auth/utils/zodResolver";

import { HireStepContent } from "../components/HireStepContent";
import { employeeWizardSteps } from "../constants/employee.constants";
import { hireEmployeeSchema, type HireEmployeeFormValues } from "../schemas/hireEmployee.schema";

const defaultValues: HireEmployeeFormValues = {
  name: "Sophia",
  department: "Enterprise Sales",
  role: "Senior AI Sales Executive",
  voice: "Sophia Premium",
  language: "Telugu + English",
  accent: "Neutral Telangana Telugu",
  tone: "Warm, Calm, Professional",
  speakingSpeed: "Medium",
  personality: ["Professional", "Empathetic", "Consultative"],
  responsibilities: ["Lead Qualification", "Product Recommendation", "Appointment Booking"],
  knowledge: ["Motor Insurance Handbook", "Premium Pricing Guide", "Sales Conversation Playbook"],
  tools: ["CRM", "Calendar", "Email"],
  policies: ["Business Rules", "Escalation", "Compliance"]
};

export function HireEmployeePage() {
  const [step, setStep] = useState(0);
  const [createdEmployee, setCreatedEmployee] = useState<Employee | null>(null);
  const hireEmployee = useHireEmployee();
  const form = useForm<HireEmployeeFormValues>({
    defaultValues,
    resolver: zodResolver(hireEmployeeSchema)
  });
  const values = form.watch();
  const currentStep = employeeWizardSteps[step];
  const isLastStep = step === employeeWizardSteps.length - 1;

  const completeHire = form.handleSubmit((formValues) => {
    const employee: Employee = {
      id: `emp_${formValues.name.toLowerCase().replaceAll(" ", "_")}_${Date.now()}`,
      name: formValues.name,
      role: formValues.role,
      department: formValues.department,
      status: "active",
      voice: formValues.voice,
      language: formValues.language,
      health: 98,
      knowledgeScore: 96,
      performance: 97,
      callsToday: 0,
      appointmentsToday: 0,
      csat: 98,
      currentCampaign: "Ready for assignment",
      lastActive: new Date().toISOString()
    };

    hireEmployee.mutate(employee, {
      onSuccess: (created) => setCreatedEmployee(created)
    });
  });

  if (createdEmployee) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Hire AI Employee"
          title={`${createdEmployee.name} has joined your workforce.`}
          description="Your new AI Employee profile is ready with communication, knowledge, tools and policies configured."
        />
        <Card>
          <CardContent className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <Avatar name={createdEmployee.name} className="h-20 w-20" />
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ai-accent)]">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Ready
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold">{createdEmployee.name}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {createdEmployee.role} for {createdEmployee.department}. Voice: {createdEmployee.voice}. Knowledge:
                {values.knowledge.join(", ")}. Tools: {values.tools.join(", ")}.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/app/employees/$employeeId"
                  params={{ employeeId: createdEmployee.id }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
                >
                  Open Workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Button variant="secondary" type="button" onClick={() => setCreatedEmployee(null)}>
                  Hire Another Employee
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={completeHire}>
      <PageHeader
        eyebrow="Hire AI Employee"
        title="Hire AI Employee"
        description="Create a new member of your digital workforce with identity, communication, responsibilities, knowledge, tools and policies."
        actions={
          <Link
            to="/app/employees"
            className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"
          >
            Back to AI Workforce
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <Card>
          <CardContent className="space-y-2">
            {employeeWizardSteps.map((wizardStep, index) => (
              <button
                key={wizardStep.id}
                type="button"
                className={`w-full rounded-[12px] p-3 text-left text-sm transition ${
                  index === step ? "bg-[var(--surface-elevated)] font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]"
                }`}
                onClick={() => setStep(index)}
              >
                <span className="block">{index + 1}. {wizardStep.label}</span>
                <span className="mt-1 block text-xs text-[var(--text-muted)]">{wizardStep.description}</span>
              </button>
            ))}
          </CardContent>
        </Card>

        <WizardShell title={currentStep.label} step={step + 1} totalSteps={employeeWizardSteps.length}>
          <HireStepContent step={step} register={form.register} values={values} />
          {Object.values(form.formState.errors).length ? (
            <p className="mt-4 text-sm font-semibold text-[var(--danger)]">Complete the required fields before finishing setup.</p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-between gap-2">
            <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Previous
            </Button>
            {isLastStep ? (
              <Button type="submit" loading={hireEmployee.isPending}>
                Complete Hire
                <UsersRound className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </WizardShell>
      </div>
    </form>
  );
}
