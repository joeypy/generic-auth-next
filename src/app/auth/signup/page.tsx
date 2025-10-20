import { RegisterForm, AuthLayout } from "@/features/auth";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Or"
      linkText="sign in to your existing account"
      linkHref="/auth/signin"
      linkDescription=""
    >
      <RegisterForm />
    </AuthLayout>
  );
}
