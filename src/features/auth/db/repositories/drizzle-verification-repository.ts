import { eq, and } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { verification } from "../schemas/drizzle-verification-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Verification,
  CreateVerificationData,
  UpdateVerificationData,
} from "../../types/email-verification";

// Verification repository implementation
export class VerificationRepository extends BaseRepository<Verification> {
  async create(data: CreateVerificationData): Promise<Verification> {
    const [newVerification] = await this.db
      .insert(verification)
      .values({
        id: generateId(),
        ...data,
      })
      .returning();

    return newVerification as Verification;
  }

  async findById(id: string): Promise<Verification | null> {
    const [verificationRecord] = await this.db
      .select()
      .from(verification)
      .where(eq(verification.id, id));

    return (verificationRecord as Verification) || null;
  }

  async findByIdentifierAndValue(
    identifier: string,
    value: string
  ): Promise<Verification | null> {
    const [verificationRecord] = await this.db
      .select()
      .from(verification)
      .where(
        and(
          eq(verification.identifier, identifier),
          eq(verification.value, value)
        )
      );

    return (verificationRecord as Verification) || null;
  }

  async findByIdentifier(identifier: string): Promise<Verification[]> {
    const verifications = await this.db
      .select()
      .from(verification)
      .where(eq(verification.identifier, identifier));

    return verifications as Verification[];
  }

  async update(
    id: string,
    data: UpdateVerificationData
  ): Promise<Verification | null> {
    const [updatedVerification] = await this.db
      .update(verification)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(verification.id, id))
      .returning();

    return (updatedVerification as Verification) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(verification)
      .where(eq(verification.id, id));

    return result.length > 0;
  }

  async deleteExpired(): Promise<boolean> {
    const result = await this.db
      .delete(verification)
      .where(eq(verification.expiresAt, new Date()));

    return result.length > 0;
  }
}
