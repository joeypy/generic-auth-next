import { eq } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { subscription } from "../schemas/drizzle-subscription-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
} from "../../types/subscription";

// Subscription repository implementation
export class SubscriptionRepository extends BaseRepository<Subscription> {
  async create(data: CreateSubscriptionData): Promise<Subscription> {
    const [newSubscription] = await this.db
      .insert(subscription)
      .values({
        id: generateId(),
        ...data,
      })
      .returning();

    return newSubscription as Subscription;
  }

  async findById(id: string): Promise<Subscription | null> {
    const [subscriptionRecord] = await this.db
      .select()
      .from(subscription)
      .where(eq(subscription.id, id));

    return (subscriptionRecord as Subscription) || null;
  }

  async findByReferenceId(referenceId: string): Promise<Subscription | null> {
    const [subscriptionRecord] = await this.db
      .select()
      .from(subscription)
      .where(eq(subscription.referenceId, referenceId));

    return (subscriptionRecord as Subscription) || null;
  }

  async findByStripeCustomerId(
    stripeCustomerId: string
  ): Promise<Subscription[]> {
    const subscriptions = await this.db
      .select()
      .from(subscription)
      .where(eq(subscription.stripeCustomerId, stripeCustomerId));

    return subscriptions as Subscription[];
  }

  async findByStripeSubscriptionId(
    stripeSubscriptionId: string
  ): Promise<Subscription | null> {
    const [subscriptionRecord] = await this.db
      .select()
      .from(subscription)
      .where(eq(subscription.stripeSubscriptionId, stripeSubscriptionId));

    return (subscriptionRecord as Subscription) || null;
  }

  async findByStatus(status: string): Promise<Subscription[]> {
    const subscriptions = await this.db
      .select()
      .from(subscription)
      .where(eq(subscription.status, status));

    return subscriptions as Subscription[];
  }

  async findAll(): Promise<Subscription[]> {
    const subscriptions = await this.db.select().from(subscription);

    return subscriptions as Subscription[];
  }

  async update(
    id: string,
    data: UpdateSubscriptionData
  ): Promise<Subscription | null> {
    const [updatedSubscription] = await this.db
      .update(subscription)
      .set(data)
      .where(eq(subscription.id, id))
      .returning();

    return (updatedSubscription as Subscription) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(subscription)
      .where(eq(subscription.id, id));

    return result.length > 0;
  }
}
