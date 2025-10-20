// User module exports - Clean Architecture
export { DrizzleUserRepository as UserRepository } from "./db/drizzle-user-repository";
export { UserService } from "./services/user-service";
export { users } from "./db/schema";
export type { User, CreateUserData, UpdateUserData } from "./types/user";
