import type { EmailMessage, EmailSendResult } from "./types";

/**
 * Abstract base class for email providers
 * All email providers must extend this class and implement the send method
 */
export abstract class EmailProvider {
  /**
   * Send an email
   * @param message - The email message containing to, subject, html, and text
   * @returns Promise resolving to the send result
   */
  abstract send(message: EmailMessage): Promise<EmailSendResult>;
}
