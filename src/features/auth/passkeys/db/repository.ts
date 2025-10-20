import { eq } from "drizzle-orm";
import { passkey } from "./schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Passkey,
  CreatePasskeyData,
  UpdatePasskeyData,
} from "../types/passkey";

// Passkey repository implementation
export class PasskeyRepository extends BaseRepository<Passkey> {
  async create(data: CreatePasskeyData): Promise<Passkey> {
    const [newPasskey] = await this.db.insert(passkey).values(data).returning();

    return newPasskey as Passkey;
  }

  async findById(id: string): Promise<Passkey | null> {
    const [passkeyRecord] = await this.db
      .select()
      .from(passkey)
      .where(eq(passkey.id, id));

    return (passkeyRecord as Passkey) || null;
  }

  async findByCredentialId(credentialId: string): Promise<Passkey | null> {
    const [passkeyRecord] = await this.db
      .select()
      .from(passkey)
      .where(eq(passkey.credentialID, credentialId));

    return (passkeyRecord as Passkey) || null;
  }

  async findByUserId(userId: string): Promise<Passkey[]> {
    const userPasskeys = await this.db
      .select()
      .from(passkey)
      .where(eq(passkey.userId, userId));

    return userPasskeys as Passkey[];
  }

  async update(id: string, data: UpdatePasskeyData): Promise<Passkey | null> {
    const [updatedPasskey] = await this.db
      .update(passkey)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(passkey.id, id))
      .returning();

    return (updatedPasskey as Passkey) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(passkey).where(eq(passkey.id, id));

    return result.rowCount > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.db
      .delete(passkey)
      .where(eq(passkey.userId, userId));

    return result.rowCount > 0;
  }
}
