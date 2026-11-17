import { IsString } from 'class-validator';

export class LoanBookRequest {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;

  constructor(userId: string, bookId: string) {
    this.userId = userId;
    this.bookId = bookId;

    if (!userId || userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    if (!bookId || bookId.trim().length === 0) {
      throw new Error('Book ID is required');
    }
  }

  validate(): void {
    const errors: string[] = [];

    if (!this.userId || this.userId.trim().length === 0) {
      errors.push('User ID is required');
    }

    if (!this.bookId || this.bookId.trim().length === 0) {
      errors.push('Book ID is required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  toLoan(id: string, book: { id: string; title: string; author: string; publicationYear: number; status: string }, loanDate: Date, dueDate: Date): { id: string; userId: string; book: { id: string; title: string; author: string; publicationYear: number; status: string }; loanDate: Date; dueDate: Date } {
    return {
      id,
      userId: this.userId,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear,
        status: book.status,
      },
      loanDate,
      dueDate,
    };
  }
}