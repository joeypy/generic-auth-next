"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { LoadingSwap } from "@/shared/components/ui/loading-swap";
import { authClient } from "@/shared/lib/auth/auth-client";
import { toast } from "sonner";
import { PasswordInput } from "@/shared/components/ui/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const resetPasswordSchema = z.object({
  password: z.string().min(6),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleResetPassword(data: ResetPasswordForm) {
    if (token == null) return;

    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to reset password");
        },
        onSuccess: () => {
          toast.success("Password reset successful", {
            description: "Redirection to login...",
          });
          setTimeout(() => {
            router.push("/auth/signin");
          }, 1000);
        },
      }
    );
  }

  if (token == null || error != null) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            Enlace de restablecimiento de contraseña inválido
          </CardTitle>
          <CardDescription>
            El enlace de restablecimiento de contraseña es inválido o ha
            expirado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/auth/signin">Volver a Iniciar sesión</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="flex-1">
              <LoadingSwap isLoading={isSubmitting}>
                Restablecer contraseña
              </LoadingSwap>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
