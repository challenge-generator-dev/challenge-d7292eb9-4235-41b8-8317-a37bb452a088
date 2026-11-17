import { LoanNotFoundError as BusinessLoanNotFoundError } from './business.error';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BookNotFoundError extends NotFoundError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' not found`);
    this.name = 'BookNotFoundError';
    Object.setPrototypeOf(this, BookNotFoundError.prototype);
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super(`User with ID '${userId}' not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class LoanNotFoundError extends BusinessLoanNotFoundError {
  constructor(loanId: string) {
    super(loanId);
    this.name = 'LoanNotFoundError';
    Object.setPrototypeOf(this, LoanNotFoundError.prototype);
  }
}