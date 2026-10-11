import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AuthSuccessState } from "@/modules/auth/components";
import { Button, Card, CardContent } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";
import { authService } from "@/services";

import { AuthLayout } from "../components";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    try {
      const session = await authService.verifyEmail("mock-verification-token");
      setSession(session);
      setVerified(true);
      toast.success("Demo account confirmed.");
    } catch {
      toast.error("Verification link expired. Resend the email and try again.");
    }
  };

  return (
    <AuthLayout title="Continue demo setup" description="This confirmation step demonstrates the account setup flow. No email is sent.">
      {verified ? (
        <AuthSuccessState
          title="Demo account confirmed"
          description="Your account is confirmed. Continue to organization onboarding and build your digital workforce."
          action={<Button onClick={() => void navigate({ to: "/onboarding" })}>Continue to Onboarding</Button>}
        />
      ) : (
        <Card>
          <CardContent>
            <h3 className="font-display text-xl font-semibold">Demo confirmation</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Confirm this sample account to continue to organization onboarding.
            </p>
            <div className="mt-6"><Button onClick={verify}>Confirm demo account</Button></div>
            <Link to="/login" className="mt-5 block text-sm font-semibold text-[var(--secondary)]">Back to login</Link>
          </CardContent>
        </Card>
      )}
    </AuthLayout>
  );
}
