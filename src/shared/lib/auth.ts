import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { databaseConnection } from "../database/drizzle/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(databaseConnection.getDb(), {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Add other plugins and configurations as needed
});
