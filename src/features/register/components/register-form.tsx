import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  CaseSensitive,
  CloudUpload,
  Eye,
  EyeClosed,
  Lock,
  Mail,
  Unlock,
} from "lucide-react";
import { ControllerInput } from "@/components/moleculs/controller-input";
import useFormRegister from "../../../hooks/use-form-register";
import registerService from "../utils/register.service";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { useNavigate } from "@tanstack/react-router";
import useShowPassword from "@/hooks/use-show-password";
import useLoading from "@/hooks/use-loading";
import Spinner from "@/components/atoms/spinner";

const RegisterForm = () => {
  const form = useFormRegister();
  const { showPassword, showOrHidePassword } = useShowPassword();
  const { showSuccess, showError } = useFlashMessage();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          registerService({ data, showError, showSuccess, setLoading })
        )}
      >
        <ControllerInput
          form={form}
          label="Email"
          name="email"
          placeholder="example@gmail.com"
          leftIcon={<Mail size={15} />}
        />
        <ControllerInput
          form={form}
          label="Name"
          name="name"
          placeholder="Salman Alfarizi"
          leftIcon={<CaseSensitive size={15} />}
        />
        <ControllerInput
          form={form}
          label="Password"
          name="password"
          placeholder={showPassword ? "your secret password" : "******"}
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
          label="Confirm Password"
          name="confirmPassword"
          placeholder="******"
          leftIcon={<Lock size={15} />}
          type="password"
        />
        <p
          className="text-xs flex justify-end -mt-2 mb-3 cursor-pointer"
          onClick={() => navigate({ to: "/resend-verify" })}
        >
          Resend Verify
        </p>

        <Button className="cursor-pointer w-full">
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <CloudUpload /> Create Account
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

export default RegisterForm;
