import { SessionRepository } from "./db/repository";
import {
  CreateSessionData,
  UpdateSessionData,
  Session,
} from "../types/session";

// Session service implementing business logic (SOLID - Single Responsibility)
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async createSession(data: CreateSessionData): Promise<Session> {
    // Business logic: validate token uniqueness, check expiration, etc.
    const existingSession = await this.sessionRepository.findByToken(
      data.token
    );
    if (existingSession) {
      throw new Error("Session with this token already exists");
    }

    return this.sessionRepository.create(data);
  }

  async getSessionById(id: string): Promise<Session | null> {
    return this.sessionRepository.findById(id);
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    return this.sessionRepository.findByToken(token);
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return this.sessionRepository.findByUserId(userId);
  }

  async updateSession(
    id: string,
    data: UpdateSessionData
  ): Promise<Session | null> {
    const session = await this.sessionRepository.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }

    return this.sessionRepository.update(id, data);
  }

  async deleteSession(id: string): Promise<boolean> {
    const session = await this.sessionRepository.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }

    return this.sessionRepository.delete(id);
  }

  async deactivateUserSessions(userId: string): Promise<boolean> {
    return this.sessionRepository.deactivateByUserId(userId);
  }

  async isSessionValid(sessionId: string): Promise<boolean> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) return false;

    return session.isActive && session.expiresAt > new Date();
  }
}
