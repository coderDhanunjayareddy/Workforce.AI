import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { authService } from "@/services";

import { AuthLayout, AuthSuccessState, FormField } from "../components";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schemas/auth.schemas";
import { zodResolver } from "../utils/zodResolver";

export function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "priya.reddy@nova-insurance.demo" }
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await authService.forgotPassword(values.email);
      setSentEmail(values.email);
      toast.success("Password reset instructions sent.");
    } catch {
      toast.error("We could not find that work email.");
    }
  };

  return (
    <AuthLayout title="Reset your password" description="Enter your work email and we will send secure reset instructions.">
      {sentEmail ? (
        <AuthSuccessState
          title="Password reset instructions sent"
          description={`We sent reset instructions to ${sentEmail}. Use the secure link to choose a new password.`}
          action={<Link to="/reset-password"><Button>Open Reset Screen</Button></Link>}
        />
      ) : (
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Work email" autoComplete="email" registration={register("email")} error={errors.email} />
          <Button type="submit" loading={isSubmitting} className="w-full">Send Reset Link</Button>
          <Link to="/login" className="text-center text-sm font-semibold text-[var(--secondary)]">Back to login</Link>
        </form>
      )}
    </AuthLayout>
  );
}
