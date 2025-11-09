import { BaseEntity } from "@/shared/types/database";

export interface TwoFactor extends BaseEntity {
  secret: string;
  backupCodes: string;
  userId: string;
}

export interface CreateTwoFactorData {
  secret: string;
  backupCodes: string;
  userId: string;
}

export interface UpdateTwoFactorData {
  secret?: string;
  backupCodes?: string;
}
