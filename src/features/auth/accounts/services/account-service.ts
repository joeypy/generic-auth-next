import { AccountRepository } from "./db/repository";
import { Account, CreateAccountData, UpdateAccountData } from "./types/account";

export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(data: CreateAccountData): Promise<Account> {
    return this.accountRepository.create(data);
  }

  async getAccountById(id: string): Promise<Account | null> {
    return this.accountRepository.findById(id);
  }

  async getAccountsByUserId(userId: string): Promise<Account[]> {
    return this.accountRepository.findByUserId(userId);
  }

  async getAccountByProviderAndAccountId(
    providerId: string,
    accountId: string
  ): Promise<Account | null> {
    return this.accountRepository.findByProviderAndAccountId(
      providerId,
      accountId
    );
  }

  async updateAccount(
    id: string,
    data: UpdateAccountData
  ): Promise<Account | null> {
    return this.accountRepository.update(id, data);
  }

  async deleteAccount(id: string): Promise<boolean> {
    return this.accountRepository.delete(id);
  }

  async deleteAccountsByUserId(userId: string): Promise<boolean> {
    return this.accountRepository.deleteByUserId(userId);
  }
}
