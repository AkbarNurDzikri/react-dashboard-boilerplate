import { Card, CardContent } from "@/components/ui/card";
import ResetPasswordForm from "@/features/reset-password/components/reset-password-form";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/reset-password/")({
  validateSearch: z.object({
    token: z.string().min(1, "Token not found"),
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <Card className="w-full md:w-1/3">
        <CardContent>
          <h3 className="text-center font-bold text-xl mb-5">Reset Password</h3>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
}
