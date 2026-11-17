export class PersistenceError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'PersistenceError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatabaseConnectionError extends PersistenceError {
  constructor(message: string = 'Database connection failed', cause?: Error) {
    super(message, cause);
    this.name = 'DatabaseConnectionError';
  }
}

export class QueryExecutionError extends PersistenceError {
  constructor(message: string = 'Failed to execute database query', cause?: Error) {
    super(message, cause);
    this.name = 'QueryExecutionError';
  }
}

export class TransactionError extends PersistenceError {
  constructor(message: string = 'Database transaction failed', cause?: Error) {
    super(message, cause);
    this.name = 'TransactionError';
  }
}

export class EntityNotFoundError extends PersistenceError {
  constructor(entityType: string, entityId: string) {
    super(`${entityType} with id ${entityId} not found`);
    this.name = 'EntityNotFoundError';
  }
}

export class DuplicateEntityError extends PersistenceError {
  constructor(entityType: string, field: string, value: string) {
    super(`${entityType} with ${field} '${value}' already exists`);
    this.name = 'DuplicateEntityError';
  }
}