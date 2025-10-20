import { BaseEntity } from "@/shared/types/database";

export interface Subscription extends BaseEntity {
  plan: string;
  referenceId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: string;
  periodStart?: Date;
  periodEnd?: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  seats?: number;
}

export interface CreateSubscriptionData {
  plan: string;
  referenceId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status?: string;
  periodStart?: Date;
  periodEnd?: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  seats?: number;
}

export interface UpdateSubscriptionData {
  plan?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status?: string;
  periodStart?: Date;
  periodEnd?: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  seats?: number;
}
