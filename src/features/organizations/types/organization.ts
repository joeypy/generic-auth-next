import { BaseEntity } from "@/shared/types/database";

export interface Organization extends BaseEntity {
  name: string;
  slug?: string;
  logo?: string;
  createdAt: Date;
  metadata?: string;
}

export interface CreateOrganizationData {
  name: string;
  slug?: string;
  logo?: string;
  metadata?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  slug?: string;
  logo?: string;
  metadata?: string;
}
