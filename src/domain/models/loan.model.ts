import { IsString, IsDate, IsOptional } from 'class-validator';
import { Book, BookStatus } from './book.model';

export class Loan {
  id: string;

  @IsString()
  userId: string;

  book: Book;

  @IsDate()
  loanDate: Date;

  @IsDate()
  dueDate: Date;

  @IsDate()
  @IsOptional()
  returnDate?: Date;

  constructor(
    id: string,
    userId: string,
    book: Book,
    loanDate: Date,
    dueDate: Date,
    returnDate?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.book = book;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }

  isOverdue(): boolean {
    if (this.returnDate !== undefined) {
      return false;
    }
    const now = new Date();
    return now > this.dueDate;
  }

  isActive(): boolean {
    return this.returnDate === undefined;
  }

  isReturned(): boolean {
    return this.returnDate !== undefined;
  }

  getDaysOverdue(): number {
    if (!this.isOverdue()) {
      return 0;
    }
    const now = new Date();
    const diffTime = now.getTime() - this.dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getDaysUntilDue(): number {
    if (this.returnDate !== undefined) {
      return 0;
    }
    const now = new Date();
    const diffTime = this.dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  canBeReturned(): boolean {
    return this.returnDate === undefined && this.book.status === BookStatus.LOANED;
  }

  getLoanDurationDays(): number {
    const endDate = this.returnDate || new Date();
    const diffTime = endDate.getTime() - this.loanDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  wasReturnedOnTime(): boolean {
    if (this.returnDate === undefined) {
      return false;
    }
    return this.returnDate <= this.dueDate;
  }

  getStatus(): 'active' | 'returned' | 'overdue' {
    if (this.returnDate !== undefined) {
      return 'returned';
    }
    if (this.isOverdue()) {
      return 'overdue';
    }
    return 'active';
  }
}