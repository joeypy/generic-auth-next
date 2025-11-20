import { ForgotPassword } from "@/features/auth/components/forgot-password-form";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <ForgotPassword />
    </div>
  );
}
