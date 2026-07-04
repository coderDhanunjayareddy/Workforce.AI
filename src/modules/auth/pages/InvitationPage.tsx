import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, CardContent } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";
import { authService } from "@/services";

import { AuthLayout, FormField, PasswordStrength } from "../components";
import { invitationSchema, type InvitationFormValues } from "../schemas/auth.schemas";
import { zodResolver } from "../utils/zodResolver";

export function InvitationPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const token = "token" in params && typeof params.token === "string" ? params.token : "mock-invite";
  const { setSession } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: { password: "Workforce@123", confirmPassword: "Workforce@123" }
  });

  const onSubmit = async (values: InvitationFormValues) => {
    try {
      const session = await authService.acceptInvitation({ token, password: values.password });
      setSession(session);
      toast.success("Invitation accepted. Welcome to Nova Insurance.");
      await navigate({ to: "/app/workforce" });
    } catch {
      toast.error("This invitation expired. Ask an organization admin to resend it.");
    }
  };

  return (
    <AuthLayout title="Accept organization invitation" description="Join Nova Insurance Pvt. Ltd. and create your secure workspace password.">
      <Card className="mb-5">
        <CardContent>
          <p className="text-sm text-[var(--text-secondary)]">Organization</p>
          <p className="mt-1 font-display text-xl font-semibold">Nova Insurance Pvt. Ltd.</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            You have been invited as an Operations Manager to monitor AI Workforce activity, Campaigns, Conversations, and Analytics.
          </p>
        </CardContent>
      </Card>
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Create password" type="password" autoComplete="new-password" registration={register("password")} error={errors.password} />
        <PasswordStrength password={watch("password")} />
        <FormField label="Confirm password" type="password" autoComplete="new-password" registration={register("confirmPassword")} error={errors.confirmPassword} />
        <Button type="submit" loading={isSubmitting} className="w-full">Accept Invitation</Button>
      </form>
    </AuthLayout>
  );
}
