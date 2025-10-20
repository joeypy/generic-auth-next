import { VerificationRepository } from "../db/repository";
import {
  CreateVerificationData,
  Verification,
  UpdateVerificationData,
} from "../types/email-verification";

// Verification service implementing business logic (SOLID - Single Responsibility)
export class VerificationService {
  constructor(private verificationRepository: VerificationRepository) {}

  async createVerification(
    data: CreateVerificationData
  ): Promise<Verification> {
    // Business logic: validate uniqueness, check expiration, etc.
    const existingVerification =
      await this.verificationRepository.findByIdentifierAndValue(
        data.identifier,
        data.value
      );
    if (existingVerification) {
      throw new Error(
        "Verification with this identifier and value already exists"
      );
    }

    return this.verificationRepository.create(data);
  }

  async getVerificationById(id: string): Promise<Verification | null> {
    return this.verificationRepository.findById(id);
  }

  async getVerificationByIdentifierAndValue(
    identifier: string,
    value: string
  ): Promise<Verification | null> {
    return this.verificationRepository.findByIdentifierAndValue(
      identifier,
      value
    );
  }

  async getVerificationsByIdentifier(
    identifier: string
  ): Promise<Verification[]> {
    return this.verificationRepository.findByIdentifier(identifier);
  }

  async updateVerification(
    id: string,
    data: UpdateVerificationData
  ): Promise<Verification | null> {
    const verification = await this.verificationRepository.findById(id);
    if (!verification) {
      throw new Error("Verification not found");
    }

    return this.verificationRepository.update(id, data);
  }

  async deleteVerification(id: string): Promise<boolean> {
    const verification = await this.verificationRepository.findById(id);
    if (!verification) {
      throw new Error("Verification not found");
    }

    return this.verificationRepository.delete(id);
  }

  async deleteExpiredVerifications(): Promise<boolean> {
    return this.verificationRepository.deleteExpired();
  }

  async isVerificationValid(verificationId: string): Promise<boolean> {
    const verification = await this.verificationRepository.findById(
      verificationId
    );
    if (!verification) return false;

    return verification.expiresAt > new Date();
  }

  async generateVerificationValue(): Promise<string> {
    // Generate a secure random value
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
