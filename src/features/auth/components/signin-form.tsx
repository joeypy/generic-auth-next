"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signInSchema, type SignInFormData } from "@/features/auth/zod/schemas";
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
import { PasswordInput } from "@/shared/components/ui/password-input";
import { toast } from "sonner";
import { authClient } from "@/shared/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleFormSubmit = async (data: SignInFormData) => {
    const res = await authClient.signIn.email(
      { ...data, callbackURL: "/" },
      {
        onSuccess: (data: any) => {
          console.log("Login success:", data);
        },
        onError: (error: any) => {
          console.error("Login error:", error);
          toast.error("Error al iniciar sesión", {
            description:
              error.error.message ||
              "No se pudo iniciar sesión. Si el problema persiste, contacta con los administradores.",
          });
        },
      }
    );

    console.log("Login response:", res);
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
          🔐 Bienvenido de nuevo
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
            <FieldControl>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FieldControl>
            {errors.email && (
              <FieldMessage>{errors.email.message}</FieldMessage>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <FieldControl>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
            </FieldControl>
            {errors.password && (
              <FieldMessage>{errors.password.message}</FieldMessage>
            )}
          </Field>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-primary hover:text-primary/80"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              ¿No tienes una cuenta?{" "}
            </span>
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Crear cuenta
            </Link>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-center">
        <SocialAuthButtons className="w-full" />
      </CardFooter> */}
    </Card>
  );
}
