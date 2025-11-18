// Types
export type { EmailMessage, EmailSendResult } from "./types";

// Abstract provider class
export { EmailProvider } from "./email-provider";

// Service
export { EmailService } from "./email-service";

// Configuration
export { emailService } from "./email-config";

// Concrete providers
export { ResendProvider } from "./providers/resend-provider";

// Email templates
export * from "./user-case";
