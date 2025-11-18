import { EmailProvider } from "../email-provider";
import type { EmailMessage, EmailSendResult } from "../types";
import { Resend } from "resend";

/**
 * Resend email provider implementation
 * Extends the abstract EmailProvider class
 * Contains all the Resend-specific logic
 */
export class ResendProvider extends EmailProvider {
  private resend: Resend;
  private apiKey: string;
  private from: string;

  constructor(config: { apiKey: string; from: string }) {
    super();
    this.apiKey = config.apiKey;
    this.from = config.from;
    this.resend = new Resend(this.apiKey);
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        messageId: data?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
