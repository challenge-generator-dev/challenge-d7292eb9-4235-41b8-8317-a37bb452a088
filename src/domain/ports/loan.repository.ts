import { Loan } from '../models/loan.model';
import { Book, BookStatus } from '../models/book.model';

export type BookId = string;

export interface LoanRepositoryPort {
  save(loan: Loan): Promise<Loan>;
  findById(id: string): Promise<Loan | null>;
  findByBookId(bookId: BookId): Promise<Loan | null>;
  findByUserId(userId: string): Promise<Loan[]>;
  findActiveLoans(): Promise<Loan[]>;
  update(loan: Loan): Promise<Loan>;
  delete(id: string): Promise<void>;
}

export interface LoanRepository extends LoanRepositoryPort {}