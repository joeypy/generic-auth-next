import { eq } from "drizzle-orm";
import { session } from "./schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Session,
  CreateSessionData,
  UpdateSessionData,
} from "../types/session";

// Session repository implementation
export class SessionRepository extends BaseRepository<Session> {
  async create(data: CreateSessionData): Promise<Session> {
    const [newSession] = await this.db.insert(session).values(data).returning();

    return newSession as Session;
  }

  async findById(id: string): Promise<Session | null> {
    const [sessionRecord] = await this.db
      .select()
      .from(session)
      .where(eq(session.id, id));

    return (sessionRecord as Session) || null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const [sessionRecord] = await this.db
      .select()
      .from(session)
      .where(eq(session.token, token));

    return (sessionRecord as Session) || null;
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const userSessions = await this.db
      .select()
      .from(session)
      .where(eq(session.userId, userId));

    return userSessions as Session[];
  }

  async update(id: string, data: UpdateSessionData): Promise<Session | null> {
    const [updatedSession] = await this.db
      .update(session)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(session.id, id))
      .returning();

    return (updatedSession as Session) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(session).where(eq(session.id, id));

    return result.rowCount > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.db
      .delete(session)
      .where(eq(session.userId, userId));

    return result.rowCount > 0;
  }

  async findExpiredSessions(): Promise<Session[]> {
    const expiredSessions = await this.db
      .select()
      .from(session)
      .where(eq(session.expiresAt, new Date()));

    return expiredSessions as Session[];
  }
}
