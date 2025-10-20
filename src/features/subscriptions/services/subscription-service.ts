import { SubscriptionRepository } from "./db/repository";
import {
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
} from "./types/subscription";

export class SubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async createSubscription(
    data: CreateSubscriptionData
  ): Promise<Subscription> {
    // Check if subscription already exists for this reference ID
    const existingSubscription =
      await this.subscriptionRepository.findByReferenceId(data.referenceId);
    if (existingSubscription) {
      throw new Error("Subscription with this reference ID already exists");
    }

    return this.subscriptionRepository.create(data);
  }

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findById(id);
  }

  async getSubscriptionByReferenceId(
    referenceId: string
  ): Promise<Subscription | null> {
    return this.subscriptionRepository.findByReferenceId(referenceId);
  }

  async getSubscriptionsByStripeCustomerId(
    stripeCustomerId: string
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.findByStripeCustomerId(stripeCustomerId);
  }

  async getSubscriptionByStripeSubscriptionId(
    stripeSubscriptionId: string
  ): Promise<Subscription | null> {
    return this.subscriptionRepository.findByStripeSubscriptionId(
      stripeSubscriptionId
    );
  }

  async getSubscriptionsByStatus(status: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findByStatus(status);
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.findAll();
  }

  async updateSubscription(
    id: string,
    data: UpdateSubscriptionData
  ): Promise<Subscription | null> {
    return this.subscriptionRepository.update(id, data);
  }

  async deleteSubscription(id: string): Promise<boolean> {
    return this.subscriptionRepository.delete(id);
  }

  async activateSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.update(id, { status: "active" });
  }

  async cancelSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.update(id, {
      status: "canceled",
      cancelAtPeriodEnd: true,
    });
  }

  async pauseSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.update(id, { status: "paused" });
  }

  async resumeSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.update(id, { status: "active" });
  }

  async isSubscriptionActive(subscriptionId: string): Promise<boolean> {
    const subscription = await this.subscriptionRepository.findById(
      subscriptionId
    );
    if (!subscription) return false;

    return (
      subscription.status === "active" &&
      (!subscription.periodEnd || subscription.periodEnd > new Date())
    );
  }

  async isSubscriptionInTrial(subscriptionId: string): Promise<boolean> {
    const subscription = await this.subscriptionRepository.findById(
      subscriptionId
    );
    if (!subscription) return false;

    const now = new Date();
    return (
      subscription.trialStart &&
      subscription.trialEnd &&
      subscription.trialStart <= now &&
      subscription.trialEnd > now
    );
  }

  async getExpiringSubscriptions(
    daysFromNow: number = 7
  ): Promise<Subscription[]> {
    const allSubscriptions = await this.subscriptionRepository.findAll();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysFromNow);

    return allSubscriptions.filter(
      (sub) =>
        sub.periodEnd && sub.periodEnd <= expiryDate && sub.status === "active"
    );
  }
}
