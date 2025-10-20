import { eq } from "drizzle-orm";
import { user } from "./schema";
import { BaseRepository } from "@/shared/database/base-repository";
import { User, CreateUserData, UpdateUserData } from "../types/user";

// User repository implementation
export class DrizzleUserRepository extends BaseRepository<User> {
  async create(data: CreateUserData): Promise<User> {
    const [newUser] = await this.db
      .insert(user)
      .values({
        ...data,
        emailVerified: false,
        twoFactorEnabled: false,
        banned: false,
      })
      .returning();

    return newUser as User;
  }

  async findById(id: string): Promise<User | null> {
    const [userRecord] = await this.db
      .select()
      .from(user)
      .where(eq(user.id, id));

    return (userRecord as User) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [userRecord] = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email));

    return (userRecord as User) || null;
  }

  async update(id: string, data: UpdateUserData): Promise<User | null> {
    const [updatedUser] = await this.db
      .update(user)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    return (updatedUser as User) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(user).where(eq(user.id, id));

    return result.rowCount > 0;
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
    const [userRecord] = await this.db
      .select()
      .from(user)
      .where(eq(user.stripeCustomerId, stripeCustomerId));

    return (userRecord as User) || null;
  }

  async findBannedUsers(): Promise<User[]> {
    const bannedUsers = await this.db
      .select()
      .from(user)
      .where(eq(user.banned, true));

    return bannedUsers as User[];
  }
}
