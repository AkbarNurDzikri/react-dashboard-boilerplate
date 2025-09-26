import VerifyEmail from "@/features/verify-email/components/verify-email";
import useVerifyEmailService from "@/hooks/use-verify-email-service";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/verify-email/")({
  validateSearch: z.object({
    token: z.string().min(1, "Token not found"),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const { loading, isSuccess } = useVerifyEmailService({ token });

  return (
    <div className="h-screen flex items-center justify-center">
      <VerifyEmail loading={loading} isSuccess={isSuccess} />
    </div>
  );
}
