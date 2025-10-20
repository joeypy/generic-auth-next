import { DatabaseRepository, BaseEntity } from "@/shared/types/database";

// Abstract base repository following SOLID principles
export abstract class BaseRepository<T extends BaseEntity>
  implements DatabaseRepository<T>
{
  constructor(protected db: any) {}

  abstract create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract update(id: string, data: Partial<T>): Promise<T | null>;
  abstract delete(id: string): Promise<boolean>;
}
