import { RepositoryFactory } from "@/shared/database/repository-factory";
import { UserService } from "@/features/users";
import { RegisterFormData, LoginFormData } from "../types/auth";

// Auth service implementing business logic (SOLID - Single Responsibility)
export class AuthService {
  private userService: UserService;

  constructor() {
    const userRepository = RepositoryFactory.getUserRepository();
    this.userService = new UserService(userRepository);
  }

  async register(data: RegisterFormData): Promise<void> {
    try {
      // Create user using the user service
      await this.userService.createUser({
        email: data.email,
        password: data.password, // TODO: Hash password before storing
        name: data.name,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  }

  async login(data: LoginFormData): Promise<void> {
    try {
      // Find user by email
      const user = await this.userService.getUserByEmail(data.email);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // TODO: Verify password hash
      // TODO: Create session
      // TODO: Set authentication cookies/tokens

      console.log("User logged in:", user);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  }

  async logout(): Promise<void> {
    try {
      // TODO: Invalidate session
      // TODO: Clear authentication cookies/tokens
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Logout failed. Please try again.");
    }
  }
}
