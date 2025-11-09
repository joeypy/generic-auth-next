import { PasskeyRepository } from "./db/repository";
import { Passkey, CreatePasskeyData, UpdatePasskeyData } from "./types/passkey";

export class PasskeyService {
  constructor(private passkeyRepository: PasskeyRepository) {}

  async createPasskey(data: CreatePasskeyData): Promise<Passkey> {
    // Check if credential ID already exists
    const existingPasskey = await this.passkeyRepository.findByCredentialId(
      data.credentialID
    );
    if (existingPasskey) {
      throw new Error("Passkey with this credential ID already exists");
    }

    return this.passkeyRepository.create(data);
  }

  async getPasskeyById(id: string): Promise<Passkey | null> {
    return this.passkeyRepository.findById(id);
  }

  async getPasskeyByCredentialId(
    credentialId: string
  ): Promise<Passkey | null> {
    return this.passkeyRepository.findByCredentialId(credentialId);
  }

  async getPasskeysByUserId(userId: string): Promise<Passkey[]> {
    return this.passkeyRepository.findByUserId(userId);
  }

  async updatePasskey(
    id: string,
    data: UpdatePasskeyData
  ): Promise<Passkey | null> {
    return this.passkeyRepository.update(id, data);
  }

  async deletePasskey(id: string): Promise<boolean> {
    return this.passkeyRepository.delete(id);
  }

  async deletePasskeysByUserId(userId: string): Promise<boolean> {
    return this.passkeyRepository.deleteByUserId(userId);
  }

  async updateCounter(
    credentialId: string,
    newCounter: number
  ): Promise<Passkey | null> {
    const passkey = await this.passkeyRepository.findByCredentialId(
      credentialId
    );
    if (!passkey) {
      throw new Error("Passkey not found");
    }

    return this.passkeyRepository.update(passkey.id, { counter: newCounter });
  }

  async validateCounter(
    credentialId: string,
    receivedCounter: number
  ): Promise<boolean> {
    const passkey = await this.passkeyRepository.findByCredentialId(
      credentialId
    );
    if (!passkey) {
      return false;
    }

    // Counter should be greater than the stored counter
    return receivedCounter > passkey.counter;
  }
}
