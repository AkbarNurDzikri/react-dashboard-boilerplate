import { Form } from "@/components/ui/form";
import useResendVerifyEmail from "@/hooks/use-form-resend-verify-email";
import resendVerifyEmailService from "../utils/resend-verify-email.service";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { ControllerInput } from "@/components/moleculs/controller-input";
import { Button } from "@/components/ui/button";
import { Mails, Send } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import useLoading from "@/hooks/use-loading";
import Spinner from "@/components/atoms/spinner";

const ResendVerifyEmailForm = () => {
  const form = useResendVerifyEmail();
  const { showError, showSuccess } = useFlashMessage();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          resendVerifyEmailService({ data, showError, showSuccess, setLoading })
        )}
      >
        <ControllerInput
          form={form}
          label="Email"
          name="email"
          placeholder="registered@gmail.com"
          type="email"
          leftIcon={<Mails size={15} />}
        />

        <Button className="w-full cursor-pointer" disabled={loading}>
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <Send /> Resend Verification
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

export default ResendVerifyEmailForm;
