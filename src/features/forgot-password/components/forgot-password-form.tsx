import { Form } from "@/components/ui/form";
import useFormForgotPassword from "@/hooks/use-form-forgot-password";
import forgotPasswordService from "../utils/forgot-password.service";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { ControllerInput } from "@/components/moleculs/controller-input";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import useLoading from "@/hooks/use-loading";
import Spinner from "@/components/atoms/spinner";

const ForgotPasswordForm = () => {
  const form = useFormForgotPassword();
  const { showError, showSuccess } = useFlashMessage();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          forgotPasswordService({ data, showError, showSuccess, setLoading })
        )}
      >
        <ControllerInput
          form={form}
          label="Email"
          name="email"
          placeholder="youremail@gmail.com"
          type="email"
          leftIcon={<Mail size={15} />}
        />

        <Button className="w-full cursor-pointer" disabled={loading}>
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <Send /> Reset Password
            </>
          )}
        </Button>

        <p
          className="text-center text-sm text-gray-500 mt-2 cursor-pointer"
          onClick={() => navigate({ to: "/login" })}
        >
          ••• Login •••
        </p>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
