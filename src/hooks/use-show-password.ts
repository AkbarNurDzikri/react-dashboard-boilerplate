import { useState } from "react";

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const showOrHidePassword = () => setShowPassword((prev) => !prev);

  return {
    showPassword,
    showOrHidePassword,
  };
};

export default useShowPassword;
