# Nx Template

## Overview

This **Nx Project Template** serves as a reference for building scalable, modular applications using state-of-the-art technologies. The template incorporates best practices, a modular architecture, and robust tools to facilitate development and operations for similar applications. It includes key features like **API integration**, **webhooks**, **messaging**, and **CQRS (Command Query Responsibility Segregation)** for clear separation of command (write) and query (read) operations.

This template is built using **NestJS**, a progressive Node.js framework for server-side applications, with support for **Nx Monorepos** for enhanced modularity and scalability.

## What’s Included?

🚀 **Use Cases** - Detailed scenarios and applications for the project.  
💻 **Technology Stack** - Overview of the tools and frameworks used.  
🌟 **Key Features** - Highlights of the project’s capabilities.  
📁 **Folder Structure** - Organized layout for easy navigation and development.  
🌐 **Environment Variables** - Centralized configuration for smooth deployment.  
📜 **Package Scripts** - Ready-to-use scripts to streamline development and deployment.  
🗄️ **Database Configuration** - Comprehensive setup with flexibility for scaling.  
🔖 **Versioning** - Semantic and automated versioning for better release management.  
🤝 **Contribution Guidelines** - Clear steps for collaboration and contribution.

---

## Use Cases

This template supports various use cases, including but not limited to:

- **User Management**: Register, authenticate, and view registered users.
- **Log Messaging**: Leverage Kafka for reliable messaging and inter-service communication to store logs.

---

## Technology Stack

This template is built with the following technologies:

- **NestJS**: Server-side application framework.
- **PostgreSQL**: Relational database.
- **Mikro-ORM**: Object-relational mapping (ORM) library.
- **Bull**: Queue management for background jobs.
- **Redis**: Cache and queue storage.
- **Kafka**: Messaging platform for event-driven architecture.
- **Nx Monorepo**: Tool for managing multiple projects in a single repository.
- **Docker**: Containerization for consistent deployment environments.

---

## Key Features

### Modular Architecture

- Follows a modular structure for scalability and maintainability.
- Divided into reusable packages for domain, infrastructure, and application logic.

### CQRS Design Pattern

- Ensures separation of concerns by using Command and Query handlers.
- Improves scalability and clarity in the codebase.

### Database Configuration

- Configured with PostgreSQL using Mikro-ORM.
- Schema-based approach for better organization and isolation of data.

### Messaging and Event Handling

- Kafka integration for distributed messaging.
- Includes producers and consumers for event-driven workflows.

### Dockerized Deployment

- Pre-configured Dockerfiles for containerization.
- Scripts for building and publishing Docker images.

### Robust Testing

- Integration and unit tests using Jest.
- Support for in-memory databases and test containers.

---

## Folder Structure

```plaintext
root/
├── apps/
│   ├── api/          # Backend API
│   ├── action-log-service/  # Action Log Microservice
│   ├── frontend/     # Web application built with Next.js
├── packages/
│   ├── domain/       # Core business logic and entities
│   ├── application/  # CQRS command and query handlers
│   ├── infrastructure/ # Data persistence, messaging, and utilities
├── tools/
│   ├── database/     # Database migration and seed scripts
│   ├── docker/       # Docker-related utilities
├── .env/             # Environment variable files
└── nx.json           # Nx Monorepo configuration
```

---

## Environment Variables

Environment variables are stored in `.env` files, organized per service.

### Common Variables

| Variable Name       | Description                |
| ------------------- | -------------------------- |
| `JWT_SECRET`        | Secret key for JWT tokens. |
| `DATABASE_HOST`     | Database hostname.         |
| `DATABASE_USER`     | Database username.         |
| `DATABASE_PASSWORD` | Database password.         |
| `REDIS_HOST`        | Redis server hostname.     |
| `KAFKA_BROKER`      | Kafka broker address.      |

---

## Package Scripts

### Development

- `start:all`: Run all services in parallel.
- `start:frontend`: Start the frontend application.
- `start:api`: Start the main API service.
- `start:action-log-service`: Start the action log service.

### Build

- `build:all`: Build all services for production.
- `build:api`: Build the API service.
- `build:frontend`: Build the frontend application.
- `build:action-log-service`: Build the action log application.

### Database

- `migration:generate`: Generate database migration files.
- `migration:apply`: Apply database migrations.
- `schema:dump`: Dump the current database schema.

### Docker

- `docker:build:all`: Build Docker images for all services.
- `docker:push:all`: Push all Docker images to the registry.

---

## Database Configuration

This template uses Mikro-ORM for database interaction. Multiple schemas can be defined for modularity.

### Configuration File Example

**mikro-orm.config.ts**

```typescript
export default {
  type: 'postgresql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['./dist/**/*.entity.js'],
  migrations: {
    path: './tools/database/migrations',
    pattern: /^[\w-]+\.js$/,
  },
};
```

---

## Versioning

Versioning is managed using **@jscutlery/semver** for semantic versioning. Key features include:

- Automatic changelog generation.
- Tagging and pushing to remote repositories.
- Integration with Docker for versioned image tags.

---

## Contribution Guidelines

1. **Fork the Repository**: Create a fork on GitHub.
2. **Feature Branching**: Use a feature-based branching strategy:
   ```bash
   git checkout -b feature/<feature-name>
   ```
3. **Write Tests**: Ensure all new features include tests.
4. **Commit Messages**: Use conventional commit messages:
   ```
   feat(api): add support for new webhook feature
   fix(auth): resolve JWT expiration issue
   ```
5. **Pull Request**: Submit a detailed pull request with your changes.
6. **Review and Merge**: Address feedback, ensure tests pass, and merge after approval.
