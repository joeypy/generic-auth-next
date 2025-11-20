import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { databaseConnection } from "../../database/drizzle/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
  sendDeleteAccountVerificationEmail,
} from "../email/user-case";

export const COOKIE_COMPLETE_NAME = "better_session_token";

export const auth = betterAuth({
  database: drizzleAdapter(databaseConnection.getDb(), {
    provider: "pg",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        await sendEmailVerificationEmail({
          user: { ...user, email: newEmail },
          url,
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteAccountVerificationEmail({ user, url });
      },
    },
    additionalFields: {
      favoriteNumber: {
        type: "number",
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      // Better-auth ya valida que el usuario existe antes de llamar este callback
      // pero verificamos por si acaso
      if (!user) {
        const error = new Error("USER_NOT_FOUND");
        console.error("Error: Usuario no encontrado en sendResetPassword");
        throw error;
      }

      // Verificar que el correo esté verificado si requireEmailVerification está activo
      if (!user.emailVerified) {
        const error = new Error("EMAIL_NOT_VERIFIED");
        console.error("Error: Correo no verificado para usuario:", user.email);
        throw error;
      }

      try {
        await sendPasswordResetEmail({
          user,
          url,
        });
        console.log(
          "Correo de restablecimiento enviado exitosamente a:",
          user.email
        );
      } catch (error) {
        console.error("Error al enviar correo de restablecimiento:", error);
        // Re-lanzar el error para que better-auth lo maneje
        throw error;
      }
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerificationEmail({
        user,
        url,
      });
    },
  },
  rateLimit: {
    storage: "database",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  plugins: [nextCookies()],
  advanced: {
    // useSecureCookies: true,
    cookiePrefix: "auth",
    cookies: {
      session_token: {
        name: COOKIE_COMPLETE_NAME,
      },
    },
  },
  // Add other plugins and configurations as needed
});
