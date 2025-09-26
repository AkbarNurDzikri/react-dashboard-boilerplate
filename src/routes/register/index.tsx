import { Card, CardContent } from "@/components/ui/card";
import RegisterForm from "@/features/register/components/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen px-5">
      <Card className="w-full md:w-1/3">
        <CardContent>
          <h3 className="text-center font-bold text-xl mb-5">
            Create an Account
          </h3>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
