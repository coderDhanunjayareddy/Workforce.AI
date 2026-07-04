import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Checkbox } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";
import { authService } from "@/services";

import { AuthLayout, FormField } from "../components";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schemas";
import { zodResolver } from "../utils/zodResolver";

export function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "priya.reddy@nova-insurance.demo",
      password: "Workforce@123",
      remember: true
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const session = await authService.login(values);
      setSession(session);
      toast.success("Login successful. Welcome back to Nova Insurance.");
      await navigate({ to: "/app/workforce" });
    } catch {
      toast.error("Invalid credentials. Check your work email and password.");
    }
  };

  return (
    <AuthLayout title="Welcome back" description="Sign in to manage your AI Workforce, Knowledge, Campaigns, Conversations, and Analytics.">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Work email" autoComplete="email" registration={register("email")} error={errors.email} />
        <FormField label="Password" type="password" autoComplete="current-password" registration={register("password")} error={errors.password} />
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Checkbox {...register("remember")} />
            Remember this workspace
          </label>
          <Link to="/forgot-password" className="font-semibold text-[var(--secondary)]">Forgot password?</Link>
        </div>
        <Button type="submit" loading={isSubmitting} className="w-full">Sign in</Button>
        <Button type="button" variant="secondary" className="w-full">Continue with Google</Button>
        <p className="text-center text-sm text-[var(--text-secondary)]">
          New to Workforce AI? <Link to="/register" className="font-semibold text-[var(--secondary)]">Create account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
