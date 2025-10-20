// Base interfaces for database operations following SOLID principles
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseRepository<T extends BaseEntity> {
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail?(email: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}
