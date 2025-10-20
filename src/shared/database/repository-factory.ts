import { databaseConnection } from "@/shared/database/drizzle/drizzle";
import { UserRepository } from "@/features/users";
import { SessionRepository } from "@/features/auth/sessions";
import { EmailVerificationRepository } from "@/features/auth/email-verification";

// Repository factory following SOLID principles
export class RepositoryFactory {
  private static userRepository: UserRepository | null = null;
  private static sessionRepository: SessionRepository | null = null;
  private static emailVerificationRepository: EmailVerificationRepository | null =
    null;

  static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(databaseConnection.getDb());
    }
    return this.userRepository;
  }

  static getSessionRepository(): SessionRepository {
    if (!this.sessionRepository) {
      this.sessionRepository = new SessionRepository(
        databaseConnection.getDb()
      );
    }
    return this.sessionRepository;
  }

  static getEmailVerificationRepository(): EmailVerificationRepository {
    if (!this.emailVerificationRepository) {
      this.emailVerificationRepository = new EmailVerificationRepository(
        databaseConnection.getDb()
      );
    }
    return this.emailVerificationRepository;
  }

  // Reset repositories (useful for testing)
  static reset(): void {
    this.userRepository = null;
    this.sessionRepository = null;
    this.emailVerificationRepository = null;
  }
}
