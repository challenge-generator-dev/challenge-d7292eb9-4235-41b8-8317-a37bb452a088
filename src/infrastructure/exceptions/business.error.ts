export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}

export class DuplicateIsbnError extends BusinessError {
  constructor(isbn: string) {
    super(`ISBN '${isbn}' already exists in the library`);
    this.name = 'DuplicateIsbnError';
    Object.setPrototypeOf(this, DuplicateIsbnError.prototype);
  }
}

export class InvalidQuantityError extends BusinessError {
  constructor(quantity: number) {
    super(`Quantity must be positive, got: ${quantity}`);
    this.name = 'InvalidQuantityError';
    Object.setPrototypeOf(this, InvalidQuantityError.prototype);
  }
}

export class BookNotAvailableError extends BusinessError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' is not available for loan`);
    this.name = 'BookNotAvailableError';
    Object.setPrototypeOf(this, BookNotAvailableError.prototype);
  }
}

export class LoanNotFoundError extends BusinessError {
  constructor(loanId: string) {
    super(`Loan with ID '${loanId}' not found`);
    this.name = 'LoanNotFoundError';
    Object.setPrototypeOf(this, LoanNotFoundError.prototype);
  }
}

export class BookNotLoanedError extends BusinessError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' is not currently loaned`);
    this.name = 'BookNotLoanedError';
    Object.setPrototypeOf(this, BookNotLoanedError.prototype);
  }
}