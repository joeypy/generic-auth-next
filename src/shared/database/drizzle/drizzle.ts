import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DatabaseConnection } from "@/shared/types/database";
import { schema } from "./schema";

// Define the database type with schema
export type Database = ReturnType<typeof drizzle<typeof schema>>;

// Database connection implementation following SOLID principles
export class DatabaseConnectionImpl implements DatabaseConnection {
  private client: postgres.Sql;
  private db: Database;
  private isConnectedFlag = false;

  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    this.client = postgres(connectionString);
    this.db = drizzle(connectionString, { schema });
  }

  async connect(): Promise<void> {
    try {
      // Test connection
      await this.client`SELECT 1`;
      this.isConnectedFlag = true;
    } catch (error) {
      this.isConnectedFlag = false;
      throw new Error(`Database connection failed: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.end();
    this.isConnectedFlag = false;
  }

  isConnected(): boolean {
    return this.isConnectedFlag;
  }

  getDb(): Database {
    return this.db;
  }

  getClient() {
    return this.client;
  }
}

// Singleton instance
export const databaseConnection = new DatabaseConnectionImpl();
