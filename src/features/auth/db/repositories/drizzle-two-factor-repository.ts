import { eq } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { twoFactor } from "../schemas/drizzle-two-factor-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  TwoFactor,
  CreateTwoFactorData,
  UpdateTwoFactorData,
} from "../../types/two-factor";

// Two-factor authentication repository implementation
export class TwoFactorRepository extends BaseRepository<TwoFactor> {
  async create(data: CreateTwoFactorData): Promise<TwoFactor> {
    const [newTwoFactor] = await this.db
      .insert(twoFactor)
      .values({
        id: generateId(),
        ...data,
      })
      .returning();

    return newTwoFactor as TwoFactor;
  }

  async findById(id: string): Promise<TwoFactor | null> {
    const [twoFactorRecord] = await this.db
      .select()
      .from(twoFactor)
      .where(eq(twoFactor.id, id));

    return (twoFactorRecord as TwoFactor) || null;
  }

  async findByUserId(userId: string): Promise<TwoFactor | null> {
    const [twoFactorRecord] = await this.db
      .select()
      .from(twoFactor)
      .where(eq(twoFactor.userId, userId));

    return (twoFactorRecord as TwoFactor) || null;
  }

  async update(
    id: string,
    data: UpdateTwoFactorData
  ): Promise<TwoFactor | null> {
    const [updatedTwoFactor] = await this.db
      .update(twoFactor)
      .set(data)
      .where(eq(twoFactor.id, id))
      .returning();

    return (updatedTwoFactor as TwoFactor) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(twoFactor).where(eq(twoFactor.id, id));

    return result.length > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.db
      .delete(twoFactor)
      .where(eq(twoFactor.userId, userId));

    return result.length > 0;
  }
}
