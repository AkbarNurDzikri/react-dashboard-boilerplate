import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CloudUpload, Eye, EyeClosed, Lock, Unlock } from "lucide-react";
import { ControllerInput } from "@/components/moleculs/controller-input";
import useResetPassword from "@/hooks/use-reset-password";
import resetPasswordService from "../utils/reset-password.service";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { useNavigate } from "@tanstack/react-router";
import useShowPassword from "@/hooks/use-show-password";
import useLoading from "@/hooks/use-loading";
import Spinner from "@/components/atoms/spinner";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const form = useResetPassword();
  const { showPassword, showOrHidePassword } = useShowPassword();
  const { showSuccess, showError } = useFlashMessage();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          resetPasswordService({
            data: { ...data, token },
            showError,
            showSuccess,
            setLoading,
            navigate,
          })
        )}
      >
        <ControllerInput
          form={form}
          label="New Password"
          name="newPassword"
          placeholder={showPassword ? "your new secret password" : "******"}
          leftIcon={showPassword ? <Unlock size={15} /> : <Lock size={15} />}
          rightIcon={
            showPassword ? (
              <Eye onClick={showOrHidePassword} className="cursor-pointer" />
            ) : (
              <EyeClosed
                onClick={showOrHidePassword}
                className="cursor-pointer"
              />
            )
          }
          type={showPassword ? "text" : "password"}
        />
        <ControllerInput
          form={form}
          label="Confirm New Password"
          name="confirmNewPassword"
          placeholder="******"
          leftIcon={<Lock size={15} />}
          type="password"
        />

        <Button className="cursor-pointer w-full">
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <CloudUpload /> Update Password
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

export default ResetPasswordForm;
