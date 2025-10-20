import { BaseEntity } from "@/shared/types/database";

export interface Passkey extends BaseEntity {
  name?: string;
  publicKey: string;
  userId: string;
  credentialID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports?: string;
  createdAt?: Date;
  aaguid?: string;
}

export interface CreatePasskeyData {
  name?: string;
  publicKey: string;
  userId: string;
  credentialID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports?: string;
  createdAt?: Date;
  aaguid?: string;
}

export interface UpdatePasskeyData {
  name?: string;
  counter?: number;
  backedUp?: boolean;
  transports?: string;
}
