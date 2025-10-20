import { TwoFactorRepository } from "./db/repository";
import {
  TwoFactor,
  CreateTwoFactorData,
  UpdateTwoFactorData,
} from "./types/two-factor";

export class TwoFactorService {
  constructor(private twoFactorRepository: TwoFactorRepository) {}

  async createTwoFactor(data: CreateTwoFactorData): Promise<TwoFactor> {
    // Check if user already has 2FA enabled
    const existingTwoFactor = await this.twoFactorRepository.findByUserId(
      data.userId
    );
    if (existingTwoFactor) {
      throw new Error("User already has two-factor authentication enabled");
    }

    return this.twoFactorRepository.create(data);
  }

  async getTwoFactorById(id: string): Promise<TwoFactor | null> {
    return this.twoFactorRepository.findById(id);
  }

  async getTwoFactorByUserId(userId: string): Promise<TwoFactor | null> {
    return this.twoFactorRepository.findByUserId(userId);
  }

  async updateTwoFactor(
    id: string,
    data: UpdateTwoFactorData
  ): Promise<TwoFactor | null> {
    return this.twoFactorRepository.update(id, data);
  }

  async deleteTwoFactor(id: string): Promise<boolean> {
    return this.twoFactorRepository.delete(id);
  }

  async deleteTwoFactorByUserId(userId: string): Promise<boolean> {
    return this.twoFactorRepository.deleteByUserId(userId);
  }

  async generateBackupCodes(): Promise<string[]> {
    // Generate 10 backup codes
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push(this.generateRandomCode());
    }
    return codes;
  }

  private generateRandomCode(): string {
    // Generate a random 8-character code
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async validateBackupCode(
    backupCodes: string,
    code: string
  ): Promise<boolean> {
    const codes = backupCodes.split(",");
    return codes.includes(code);
  }

  async removeUsedBackupCode(
    backupCodes: string,
    usedCode: string
  ): Promise<string> {
    const codes = backupCodes.split(",");
    const updatedCodes = codes.filter((code) => code !== usedCode);
    return updatedCodes.join(",");
  }
}
