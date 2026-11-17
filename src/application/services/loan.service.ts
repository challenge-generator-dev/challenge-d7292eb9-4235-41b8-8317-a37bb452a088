// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { Loan } from '../../domain/models/loan.model';
import { Book } from '../../domain/models/book.model';
import { BookStatus } from '../../domain/models/book.model';
import { LoanRepository } from '../../domain/ports/loan.repository';
import { BookRepository } from '../../domain/ports/book.repository';

@Injectable()
export class LoanService {
  constructor(
    private readonly loanRepository: LoanRepository,
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async loanBook(bookId: string, userId: string): Promise<Loan> {
    throw new Error('TODO(reto): loanBook');
  }

  async returnBook(loanId: string): Promise<Loan> {
    throw new Error('TODO(reto): returnBook');
  }

  private generateId(): string {
    throw new Error('TODO(reto): generateId');
  }
}