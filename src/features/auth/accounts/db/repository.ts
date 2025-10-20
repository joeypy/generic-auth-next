import { eq, and } from "drizzle-orm";
import { account } from "./schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Account,
  CreateAccountData,
  UpdateAccountData,
} from "../types/account";

// Account repository implementation
export class AccountRepository extends BaseRepository<Account> {
  async create(data: CreateAccountData): Promise<Account> {
    const [newAccount] = await this.db.insert(account).values(data).returning();

    return newAccount as Account;
  }

  async findById(id: string): Promise<Account | null> {
    const [accountRecord] = await this.db
      .select()
      .from(account)
      .where(eq(account.id, id));

    return (accountRecord as Account) || null;
  }

  async findByUserId(userId: string): Promise<Account[]> {
    const userAccounts = await this.db
      .select()
      .from(account)
      .where(eq(account.userId, userId));

    return userAccounts as Account[];
  }

  async findByProviderAndAccountId(
    providerId: string,
    accountId: string
  ): Promise<Account | null> {
    const [accountRecord] = await this.db
      .select()
      .from(account)
      .where(
        and(
          eq(account.providerId, providerId),
          eq(account.accountId, accountId)
        )
      );

    return (accountRecord as Account) || null;
  }

  async update(id: string, data: UpdateAccountData): Promise<Account | null> {
    const [updatedAccount] = await this.db
      .update(account)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(account.id, id))
      .returning();

    return (updatedAccount as Account) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(account).where(eq(account.id, id));

    return result.rowCount > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.db
      .delete(account)
      .where(eq(account.userId, userId));

    return result.rowCount > 0;
  }
}
