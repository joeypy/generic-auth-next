// Email verification module exports
export { EmailVerificationRepository } from "./db/repository";
export { EmailVerificationService } from "./services/email-verification-service";
export { emailVerifications } from "./db/schema";
export type {
  EmailVerification,
  CreateEmailVerificationData,
} from "./types/email-verification";
