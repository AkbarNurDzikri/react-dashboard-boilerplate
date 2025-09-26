import { Card, CardContent } from "@/components/ui/card";
import type { IVerifyEmail } from "../interfaces/verify-email.interface";
import { CheckCheck } from "lucide-react";
import Spinner from "@/components/atoms/spinner";

const VerifyEmail = ({ loading, isSuccess }: IVerifyEmail) => {
  return loading ? (
    <Card>
      <CardContent>
        <h3 className="font-semibold text-center">Verifying your email ... </h3>
        <p className="text-center text-gray-500">
          Please wait while we verify your email address
        </p>
      </CardContent>
    </Card>
  ) : (
    isSuccess && (
      <Card className="mx-auto">
        <CardContent>
          <div className="flex items-center gap-1">
            <CheckCheck color="green" /> Email Verified
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className="text-center">redirecting</p>
            <Spinner />
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default VerifyEmail;
