import { BaseEntity } from "@/shared/types/database";

export interface Session extends BaseEntity {
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  impersonatedBy?: string;
  activeOrganizationId?: string;
}

export interface CreateSessionData {
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  impersonatedBy?: string;
  activeOrganizationId?: string;
}

export interface UpdateSessionData {
  expiresAt?: Date;
  token?: string;
  ipAddress?: string;
  userAgent?: string;
  impersonatedBy?: string;
  activeOrganizationId?: string;
}
