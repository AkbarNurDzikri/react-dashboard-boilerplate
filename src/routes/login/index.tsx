import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/features/login/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen px-5">
      <Card className="w-full md:w-1/3">
        <CardContent>
          <h3 className="text-center font-bold text-xl mb-5">
            Login with email
          </h3>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
