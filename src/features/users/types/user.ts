import { BaseEntity } from "@/shared/types/database";

// User domain types
export interface User extends BaseEntity {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  twoFactorEnabled?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  stripeCustomerId?: string;
  favoriteNumber: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  image?: string;
  role?: string;
  favoriteNumber: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  image?: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  stripeCustomerId?: string;
  favoriteNumber?: number;
}
