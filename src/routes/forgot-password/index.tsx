import { Card, CardContent } from "@/components/ui/card";
import ForgotPasswordForm from "@/features/forgot-password/components/forgot-password-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password/")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen px-5">
      <Card className="w-full md:w-1/3">
        <CardContent>
          <h3 className="text-center font-bold text-xl mb-5">
            Reset Password Request
          </h3>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
