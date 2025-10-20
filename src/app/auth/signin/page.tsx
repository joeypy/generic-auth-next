import { LoginForm, AuthLayout } from "@/features/auth";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Or"
      linkText="create a new account"
      linkHref="/auth/signup"
      linkDescription=""
    >
      <LoginForm />
    </AuthLayout>
  );
}
