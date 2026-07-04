import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Checkbox } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";
import { authService } from "@/services";

import { AuthLayout, FormField, PasswordStrength } from "../components";
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schemas";
import { zodResolver } from "../utils/zodResolver";

export function RegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "Priya",
      lastName: "Reddy",
      email: "priya.reddy@nova-insurance.demo",
      organizationName: "Nova Insurance Pvt. Ltd.",
      password: "Workforce@123",
      confirmPassword: "Workforce@123",
      terms: true
    }
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const session = await authService.register(values);
      setSession(session);
      toast.success("Account created. Verify your email to continue.");
      await navigate({ to: "/verify-email" });
    } catch {
      toast.error("This work email is already registered.");
    }
  };

  return (
    <AuthLayout title="Create your Workforce AI account" description="Start with a secure account, then create your organization workspace.">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="First name" autoComplete="given-name" registration={register("firstName")} error={errors.firstName} />
          <FormField label="Last name" autoComplete="family-name" registration={register("lastName")} error={errors.lastName} />
        </div>
        <FormField label="Work email" autoComplete="email" registration={register("email")} error={errors.email} />
        <FormField label="Organization name" autoComplete="organization" registration={register("organizationName")} error={errors.organizationName} />
        <FormField label="Password" type="password" autoComplete="new-password" registration={register("password")} error={errors.password} />
        <PasswordStrength password={watch("password")} />
        <FormField label="Confirm password" type="password" autoComplete="new-password" registration={register("confirmPassword")} error={errors.confirmPassword} />
        <label className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
          <Checkbox {...register("terms")} />
          <span>I accept the Terms and Conditions and Privacy Policy.</span>
        </label>
        {errors.terms ? <p className="text-xs font-medium text-[var(--danger)]">{errors.terms.message}</p> : null}
        <Button type="submit" loading={isSubmitting} className="w-full">Create Account</Button>
        <p className="text-center text-sm text-[var(--text-secondary)]">
          Already have an account? <Link to="/login" className="font-semibold text-[var(--secondary)]">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
