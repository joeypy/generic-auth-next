import { UserRepository } from "./repository";
import { CreateUserData, UpdateUserData, User } from "../types/user";

// User service implementing business logic (SOLID - Single Responsibility)
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserData): Promise<User> {
    // Business logic: validate email format, check if user exists, etc.
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.userRepository.create(data);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.delete(id);
  }

  async verifyUserEmail(id: string): Promise<User | null> {
    return this.userRepository.update(id, { emailVerified: true });
  }
}
