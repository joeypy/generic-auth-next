# 🏗️ Clean Architecture & SOLID Principles Implementation

Este proyecto implementa **Clean Architecture** y **principios SOLID** en Next.js con una estructura modular que facilita el mantenimiento, testing y escalabilidad.

## 🎯 Principios SOLID Aplicados

### 1. **Single Responsibility Principle (SRP)**

- Cada clase tiene una única responsabilidad
- `UserService`: Solo lógica de negocio de usuarios
- `UserRepository`: Solo acceso a datos de usuarios
- `DatabaseConnection`: Solo manejo de conexión

### 2. **Open/Closed Principle (OCP)**

- Las clases están abiertas para extensión, cerradas para modificación
- `BaseRepository` puede extenderse para nuevos repositorios
- Interfaces permiten nuevas implementaciones

### 3. **Liskov Substitution Principle (LSP)**

- Las subclases pueden sustituir a sus clases base
- `UserRepository` puede sustituir a `BaseRepository`

### 4. **Interface Segregation Principle (ISP)**

- Interfaces específicas y cohesivas
- `DatabaseRepository<T>` es específica para operaciones CRUD
- `DatabaseConnection` es específica para conexión

### 5. **Dependency Inversion Principle (DIP)**

- Dependencias hacia abstracciones, no implementaciones concretas
- `UserService` depende de `UserRepository` (interfaz)
- `RepositoryFactory` maneja la inyección de dependencias

## 🏛️ Arquitectura por Capas

```
┌─────────────────────────────────────┐
│           Presentation Layer        │ ← Next.js API Routes, Pages
├─────────────────────────────────────┤
│           Application Layer         │ ← Services, Use Cases
├─────────────────────────────────────┤
│            Domain Layer             │ ← Entities, Types, Interfaces
├─────────────────────────────────────┤
│         Infrastructure Layer        │ ← Repositories, Database
└─────────────────────────────────────┘
```

## 📁 Estructura Modular

```
src/
├── features/                    # Módulos de funcionalidades
│   ├── users/
│   │   ├── db/
│   │   │   ├── schema.ts        # Esquema de base de datos
│   │   │   └── repository.ts    # Capa de acceso a datos
│   │   ├── services/
│   │   │   └── user-service.ts  # Lógica de negocio
│   │   ├── types/
│   │   │   └── user.ts          # Tipos de dominio
│   │   └── index.ts             # Exportaciones del módulo
│   ├── sessions/
│   │   ├── db/
│   │   │   ├── schema.ts        # Esquema de sesiones
│   │   │   └── repository.ts    # Repositorio de sesiones
│   │   ├── services/
│   │   │   └── session-service.ts # Lógica de sesiones
│   │   ├── types/
│   │   │   └── session.ts       # Tipos de sesión
│   │   └── index.ts             # Exportaciones
│   └── email-verification/
│       ├── db/
│       │   ├── schema.ts        # Esquema de verificaciones
│       │   └── repository.ts    # Repositorio de verificaciones
│       ├── services/
│       │   └── email-verification-service.ts # Lógica de verificaciones
│       ├── types/
│       │   └── email-verification.ts # Tipos de verificación
│       └── index.ts             # Exportaciones
├── shared/                      # Código compartido
│   ├── database/
│   │   ├── connection.ts        # Conexión a BD
│   │   ├── base-repository.ts   # Clase base abstracta
│   │   ├── repository-factory.ts # Factory de repositorios
│   │   ├── migrations/          # Migraciones
│   │   └── index.ts
│   └── types/
│       └── database.ts          # Interfaces base
└── examples/                    # Ejemplos de uso
```

## 🔄 Flujo de Datos

1. **API Route** recibe request
2. **Service** procesa lógica de negocio
3. **Repository** accede a datos
4. **Database** persiste información
5. **Response** retorna resultado

## 🧪 Beneficios para Testing

- **Mocking fácil**: Interfaces permiten mocks simples
- **Unit testing**: Cada capa se puede testear independientemente
- **Integration testing**: Factory permite inyección de dependencias de test

## 🚀 Escalabilidad

- **Nuevas features**: Solo agregar nueva carpeta en `features/`
- **Cambio de BD**: Solo cambiar implementación de `DatabaseConnection`
- **Nuevos repositorios**: Extender `BaseRepository`

## 💡 Ejemplo de Uso

```typescript
// 1. Obtener repositorio del factory
const userRepository = RepositoryFactory.getUserRepository();

// 2. Crear servicio con inyección de dependencias
const userService = new UserService(userRepository);

// 3. Usar servicio para lógica de negocio
const user = await userService.createUser({
  email: "user@example.com",
  password: "hashed_password",
  name: "John Doe",
});
```

## 🔧 Configuración

La configuración de Drizzle está actualizada para usar la nueva estructura modular:

```typescript
// drizzle.config.ts
export default defineConfig({
  schema: [
    "./src/features/users/db/schema.ts",
    "./src/features/sessions/db/schema.ts",
    "./src/features/email-verification/db/schema.ts",
  ],
  out: "./src/shared/database/migrations",
  // ...
});
```

Esta arquitectura garantiza que el código sea **mantenible**, **testeable** y **escalable** siguiendo las mejores prácticas de desarrollo de software.
