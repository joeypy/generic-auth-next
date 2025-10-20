# Database Setup Instructions

## Prerequisites

- PostgreSQL server running locally or remotely
- Database created (e.g., `generic_auth_db`)

## Environment Configuration

1. Update the `.env` file with your actual PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/generic_auth_db"
   ```

## Database Commands

### Generate Migration Files

```bash
bun run db:generate
```

This creates migration files based on your schema changes.

### Apply Migrations

```bash
bun run db:migrate
```

This applies pending migrations to your database.

### Push Schema Directly (Development)

```bash
bun run db:push
```

This pushes your schema directly to the database without creating migration files. Useful for development.

### Open Drizzle Studio

```bash
bun run db:studio
```

This opens Drizzle Studio, a web-based database browser and editor.

## Modular Architecture Structure

The project follows Clean Architecture and SOLID principles with modular organization:

```
src/
├── features/
│   ├── users/
│   │   ├── db/
│   │   │   ├── schema.ts          # Database schema
│   │   │   └── repository.ts      # Data access layer
│   │   ├── services/
│   │   │   └── user-service.ts    # Business logic layer
│   │   ├── types/
│   │   │   └── user.ts            # Domain types
│   │   └── index.ts               # Module exports
│   ├── sessions/
│   │   ├── db/schema.ts
│   │   ├── types/session.ts
│   │   └── index.ts
│   └── email-verification/
│       ├── db/schema.ts
│       ├── types/email-verification.ts
│       └── index.ts
├── shared/
│   ├── database/
│   │   ├── connection.ts          # Database connection
│   │   ├── repository-factory.ts  # Repository factory
│   │   ├── migrations/            # Migration files
│   │   └── index.ts
│   └── types/
│       └── database.ts            # Base interfaces
└── examples/
    └── user-example.ts            # Usage examples
```

## Database Connection

### Using the Repository Factory (Recommended)

```typescript
import { RepositoryFactory } from "@/shared/database/repository-factory";
import { UserService } from "@/features/users";

// Get repository from factory
const userRepository = RepositoryFactory.getUserRepository();

// Create service with dependency injection
const userService = new UserService(userRepository);

// Use the service
const user = await userService.createUser({
  email: "user@example.com",
  password: "hashed_password",
  name: "John Doe",
});
```

### Direct Database Access

```typescript
import { databaseConnection } from "@/shared/database";

// Initialize connection
await databaseConnection.connect();

// Get database instance
const db = databaseConnection.getDb();
```

## Benefits of This Architecture

1. **Modularity**: Each feature is self-contained
2. **SOLID Principles**: Single responsibility, dependency inversion
3. **Testability**: Easy to mock dependencies
4. **Scalability**: Easy to add new features
5. **Maintainability**: Clear separation of concerns
6. **Database Agnostic**: Easy to switch databases by changing implementations
