"use client";

import { useState } from "react";
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
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { LoadingSwap } from "@/shared/components/ui/loading-swap";
import { authClient } from "@/shared/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.email().min(1),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState<string>("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleForgotPassword(data: ForgotPasswordForm) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/auth/reset-password",
      },
      {
        onError: (error) => {
          toast.error(
            error.error.message ||
              "No se pudo enviar el correo de restablecimiento de contraseña"
          );
        },
        onSuccess: () => {
          toast.success("Correo de restablecimiento de contraseña enviado");
          setSentEmail(data.email);
          setEmailSent(true);
        },
      }
    );
  }

  if (emailSent) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Correo enviado exitosamente
          </CardTitle>
          <CardDescription>
            Hemos enviado un enlace de restablecimiento de contraseña a tu
            correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-medium">{sentEmail}</span>
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Por favor:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Revisa tu bandeja de entrada</li>
              <li>Busca el correo de restablecimiento de contraseña</li>
              <li>Haz clic en el enlace proporcionado</li>
            </ul>
            <p className="pt-2">
              Si no encuentras el correo, revisa tu carpeta de spam o correo no
              deseado.
            </p>
          </div>
          <Button className="w-full" asChild>
            <Link href="/auth/signin">Volver a Iniciar sesión</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleForgotPassword)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/auth/signin")}
              >
                Volver
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <LoadingSwap isLoading={isSubmitting}>
                  Enviar correo
                </LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
