import { IsString, IsInt, IsEnum } from 'class-validator';

export type BookId = string;

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
}

export class Book {
  id: BookId;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  publicationYear: number;

  @IsEnum(BookStatus)
  status: BookStatus;

  constructor(
    id: BookId,
    title: string,
    author: string,
    publicationYear: number,
    status: BookStatus = BookStatus.AVAILABLE,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.status = status;
  }

  loan(): void {
    if (this.status !== BookStatus.AVAILABLE) {
      throw new Error('Book is not available for loan');
    }
    this.status = BookStatus.LOANED;
  }

  return(): void {
    if (this.status !== BookStatus.LOANED) {
      throw new Error('Book was not loaned');
    }
    this.status = BookStatus.AVAILABLE;
  }

  isAvailable(): boolean {
    return this.status === BookStatus.AVAILABLE;
  }

  isLoaned(): boolean {
    return this.status === BookStatus.LOANED;
  }

  canBeLoaned(): boolean {
    return this.isAvailable();
  }

  canBeReturned(): boolean {
    return this.isLoaned();
  }
}