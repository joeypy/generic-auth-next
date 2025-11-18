/**
 * Email message data structure
 * This interface defines the standard format for all email messages
 * regardless of the email provider used
 */
export interface EmailMessage {
  /** Recipient email address */
  to: string;
  /** Email subject line */
  subject: string;
  /** HTML content of the email */
  html: string;
  /** Plain text version of the email */
  text: string;
  /** Optional: Reply-to address */
  replyTo?: string;
  /** Optional: CC recipients */
  cc?: string[];
  /** Optional: BCC recipients */
  bcc?: string[];
}

/**
 * Result of sending an email
 */
export interface EmailSendResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Optional message ID from the email provider */
  messageId?: string;
  /** Optional error message if sending failed */
  error?: string;
}

