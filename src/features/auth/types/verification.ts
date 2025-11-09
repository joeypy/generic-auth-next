import { BaseEntity } from "@/shared/types/database";

export interface Verification extends BaseEntity {
  identifier: string;
  value: string;
  expiresAt: Date;
}

export interface CreateVerificationData {
  identifier: string;
  value: string;
  expiresAt: Date;
}

export interface UpdateVerificationData {
  value?: string;
  expiresAt?: Date;
}
