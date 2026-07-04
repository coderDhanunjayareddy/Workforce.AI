import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { authService } from "@/services";

import { AuthLayout, FormField, PasswordStrength } from "../components";
import { resetPasswordSchema, type ResetPasswordFormValues } from "../schemas/auth.schemas";
import { zodResolver } from "../utils/zodResolver";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "Workforce@123", confirmPassword: "Workforce@123" }
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await authService.resetPassword({ token: "mock-reset-token", password: values.password });
      toast.success("Password updated successfully.");
      await navigate({ to: "/login" });
    } catch {
      toast.error("The reset link expired. Request a new reset link.");
    }
  };

  return (
    <AuthLayout title="Choose a new password" description="Use a strong password to protect access to your Workforce AI workspace.">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="New password" type="password" autoComplete="new-password" registration={register("password")} error={errors.password} />
        <PasswordStrength password={watch("password")} />
        <FormField label="Confirm new password" type="password" autoComplete="new-password" registration={register("confirmPassword")} error={errors.confirmPassword} />
        <Button type="submit" loading={isSubmitting} className="w-full">Update Password</Button>
        <Link to="/login" className="text-center text-sm font-semibold text-[var(--secondary)]">Back to login</Link>
      </form>
    </AuthLayout>
  );
}
