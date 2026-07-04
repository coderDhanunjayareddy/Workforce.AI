import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthSuccessState } from "@/modules/auth/components";
import { Button, Card, CardContent } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";
import { authService } from "@/services";

import { AuthLayout } from "../components";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [seconds, setSeconds] = useState(30);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verified || seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, verified]);

  const verify = async () => {
    try {
      const session = await authService.verifyEmail("mock-verification-token");
      setSession(session);
      setVerified(true);
      toast.success("Email verified successfully.");
    } catch {
      toast.error("Verification link expired. Resend the email and try again.");
    }
  };

  return (
    <AuthLayout title="Verify your email" description="Confirm your work email before creating the Nova Insurance workspace.">
      {verified ? (
        <AuthSuccessState
          title="Email verified"
          description="Your account is confirmed. Continue to organization onboarding and build your digital workforce."
          action={<Button onClick={() => void navigate({ to: "/onboarding" })}>Continue to Onboarding</Button>}
        />
      ) : (
        <Card>
          <CardContent>
            <h3 className="font-display text-xl font-semibold">Verification email sent</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              We sent a secure verification link to your work email. For this mock flow, use the action below to confirm the account.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={verify}>Verify Email</Button>
              <Button variant="secondary" disabled={seconds > 0}>
                {seconds > 0 ? `Resend in ${seconds}s` : "Resend Email"}
              </Button>
            </div>
            <Link to="/login" className="mt-5 block text-sm font-semibold text-[var(--secondary)]">Back to login</Link>
          </CardContent>
        </Card>
      )}
    </AuthLayout>
  );
}
