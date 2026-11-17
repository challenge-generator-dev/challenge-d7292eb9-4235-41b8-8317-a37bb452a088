import { Injectable } from '@nestjs/common';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepositoryPort } from '../../domain/ports/loan.repository';
import { BookNotFoundError } from '../exceptions/not-found.error';
import { LoanNotFoundError } from '../exceptions/not-found.error';
import { PersistenceError } from '../exceptions/persistence.error';

@Injectable()
export class LoanRepository implements LoanRepositoryPort {
  private loans: Map<string, Loan> = new Map();

  async save(loan: Loan): Promise<Loan> {
    try {
      this.loans.set(loan.id, loan);
      return loan;
    } catch (error) {
      throw new PersistenceError('Failed to save loan');
    }
  }

  async findById(id: string): Promise<Loan | null> {
    try {
      const loan = this.loans.get(id);
      return loan || null;
    } catch (error) {
      throw new PersistenceError('Failed to find loan by id');
    }
  }

  async findByBookId(bookId: string): Promise<Loan | null> {
    try {
      for (const loan of this.loans.values()) {
        if (loan.book.id === bookId) {
          return loan;
        }
      }
      return null;
    } catch (error) {
      throw new PersistenceError('Failed to find loan by book id');
    }
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    try {
      const userLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (loan.userId === userId) {
          userLoans.push(loan);
        }
      }
      return userLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find loans by user id');
    }
  }

  async findActiveLoans(): Promise<Loan[]> {
    try {
      const activeLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (!loan.returnDate) {
          activeLoans.push(loan);
        }
      }
      return activeLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find active loans');
    }
  }

  async update(loan: Loan): Promise<Loan> {
    try {
      if (!this.loans.has(loan.id)) {
        throw new LoanNotFoundError(loan.id);
      }
      this.loans.set(loan.id, loan);
      return loan;
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to update loan');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      if (!this.loans.has(id)) {
        throw new LoanNotFoundError(id);
      }
      this.loans.delete(id);
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to delete loan');
    }
  }

  async findAll(): Promise<Loan[]> {
    try {
      return Array.from(this.loans.values());
    } catch (error) {
      throw new PersistenceError('Failed to find all loans');
    }
  }

  async findActiveLoansByBookId(bookId: string): Promise<Loan[]> {
    try {
      const activeLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (loan.book.id === bookId && !loan.returnDate) {
          activeLoans.push(loan);
        }
      }
      return activeLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find active loans by book id');
    }
  }

  async updateReturnDate(loanId: string, returnDate: Date): Promise<Loan> {
    try {
      const loan = this.loans.get(loanId);
      if (!loan) {
        throw new LoanNotFoundError(loanId);
      }
      const updatedLoan = new Loan(
        loan.id,
        loan.userId,
        loan.book,
        loan.loanDate,
        loan.dueDate,
        returnDate,
      );
      this.loans.set(loanId, updatedLoan);
      return updatedLoan;
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to update loan return date');
    }
  }
}