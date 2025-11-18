import { EmailService } from "./email-service";
import { ResendProvider } from "./providers/resend-provider";

/**
 * Email service configuration
 * Instantiates EmailService with ResendProvider
 */
export const emailService = new EmailService(
  new ResendProvider({
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.EMAIL_FROM || process.env.RESEND_FROM || "",
  })
);

