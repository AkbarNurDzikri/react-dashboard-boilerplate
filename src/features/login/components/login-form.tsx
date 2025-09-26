import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Lock, LogIn, Mail, Unlock } from "lucide-react";
import { ControllerInput } from "@/components/moleculs/controller-input";
import useShowPassword from "../../../hooks/use-show-password";
import useFormLogin from "../../../hooks/use-form-login";
import loginService from "../utils/login.service";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { useNavigate } from "@tanstack/react-router";
import useLoading from "@/hooks/use-loading";
import Spinner from "@/components/atoms/spinner";

const LoginForm = () => {
  const form = useFormLogin();
  const { showPassword, showOrHidePassword } = useShowPassword();
  const { showSuccess, showError } = useFlashMessage();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          loginService({ data, showError, showSuccess, navigate, setLoading })
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
        <p
          className="-mt-2 mb-3 text-xs flex justify-end cursor-pointer"
          onClick={() => navigate({ to: "/forgot-password" })}
        >
          Forgot password?
        </p>

        <Button className="cursor-pointer w-full" disabled={loading}>
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <LogIn /> Login
            </>
          )}
        </Button>
        <p
          className="text-center text-sm text-gray-500 mt-2 cursor-pointer"
          onClick={() => navigate({ to: "/register" })}
        >
          ••• Register •••
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
