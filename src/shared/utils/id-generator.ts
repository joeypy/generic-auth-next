import { randomUUID } from "crypto";

// Utility function to generate unique IDs
export function generateId(): string {
  return randomUUID();
}
