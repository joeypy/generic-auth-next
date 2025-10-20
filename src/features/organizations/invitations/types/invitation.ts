import { BaseEntity } from "@/shared/types/database";

export interface Invitation extends BaseEntity {
  organizationId: string;
  email: string;
  role?: string;
  status: string;
  expiresAt: Date;
  inviterId: string;
}

export interface CreateInvitationData {
  organizationId: string;
  email: string;
  role?: string;
  expiresAt: Date;
  inviterId: string;
}

export interface UpdateInvitationData {
  role?: string;
  status?: string;
  expiresAt?: Date;
}
