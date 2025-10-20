import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/shared/database/drizzle/schemas.ts"],
  out: "./src/shared/database/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
