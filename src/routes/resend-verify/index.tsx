import { Card, CardContent } from "@/components/ui/card";
import ResendVerifyEmailForm from "@/features/resend-verify-email/components/resend-verify-email-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resend-verify/")({
  component: ResendVerifyEmailPage,
});

function ResendVerifyEmailPage() {
  return (
    <div className="flex items-center justify-center h-screen px-5">
      <Card className="w-full md:w-1/3">
        <CardContent>
          <h3 className="text-center font-bold text-xl mb-5">
            Resend Email Verification
          </h3>
          <ResendVerifyEmailForm />
        </CardContent>
      </Card>
    </div>
  );
}
