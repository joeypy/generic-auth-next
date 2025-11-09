import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { databaseConnection } from "../../database/drizzle/drizzle";
import { nextCookies } from "better-auth/next-js";

export const COOKIE_COMPLETE_NAME = "better_session_token";

export const auth = betterAuth({
  database: drizzleAdapter(databaseConnection.getDb(), {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
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
