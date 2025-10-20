import { BaseEntity } from "@/shared/types/database";

export interface Member extends BaseEntity {
  organizationId: string;
  userId: string;
  role: string;
  createdAt: Date;
}

export interface CreateMemberData {
  organizationId: string;
  userId: string;
  role?: string;
}

export interface UpdateMemberData {
  role?: string;
}
