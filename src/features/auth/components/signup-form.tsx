"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpSchema, type SignUpFormData } from "@/features/auth/zod/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Field,
  FieldControl,
  FieldLabel,
  FieldMessage,
} from "@/shared/components/ui/field";
import { LoadingSwap } from "@/shared/components/ui/loading-swap";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { toast } from "sonner";
import { authClient } from "@/shared/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleFormSubmit = async (data: SignUpFormData) => {
    const res = await authClient.signUp.email(
      { ...data, callbackURL: "/" },
      {
        onSuccess: (data) => {
          console.log("Registration success:", data);
          toast.success("¡Cuenta creada exitosamente! 🎉", {
            description: `Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.`,
          });
          router.push("/");
        },
        onError: (error) => {
          console.error("Registration error:", error);
          toast.error("Error al crear la cuenta", {
            description:
              error.error.message ||
              "No se pudo crear tu cuenta. Si el problema persiste, contacta con los administradores.",
          });
        },
      }
    );

    console.log("Registration response:", res);
  };

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session?.data != null) router.push("/");
    });
  }, [router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          🚀 Create your account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <FieldControl>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
            </FieldControl>
            <FieldMessage>{errors.name?.message}</FieldMessage>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <FieldControl>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FieldControl>
            <FieldMessage>{errors.email?.message}</FieldMessage>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldControl>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
            </FieldControl>
            <FieldMessage>{errors.password?.message}</FieldMessage>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <FieldControl>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
            </FieldControl>
            <FieldMessage>{errors.confirmPassword?.message}</FieldMessage>
          </Field>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <LoadingSwap isLoading={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </LoadingSwap>
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
