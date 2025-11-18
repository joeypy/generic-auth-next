import { EmailProvider } from "./email-provider";
import type { EmailMessage, EmailSendResult } from "./types";

/**
 * Email service
 * Uses a specific email provider to send emails
 */
export class EmailService {
  constructor(private provider: EmailProvider) {}

  /**
   * Send an email using the configured provider
   * @param message - The email message containing to, subject, html, and text
   * @returns Promise resolving to the send result
   */
  async send(message: EmailMessage): Promise<EmailSendResult> {
    return this.provider.send(message);
  }
}
