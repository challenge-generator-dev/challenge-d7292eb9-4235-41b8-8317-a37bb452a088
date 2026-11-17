import { Injectable } from '@nestjs/common';
import { Book, BookStatus } from '../../domain/models/book.model';
import { RegisterBookRequest } from '../../domain/models/register-book-request.model';
import { BookRepository } from '../../domain/ports/book.repository';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  private books: Map<string, Book> = new Map();

  async save(book: Book): Promise<Book> {
    this.books.set(book.id, book);
    return book;
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.get(id) || null;
  }

  async findAll(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async register(request: RegisterBookRequest): Promise<Book> {
    const id = this.generateId();
    const bookData = request.toBook(id);
    
    const book = new Book(
      bookData.id,
      bookData.title,
      bookData.author,
      bookData.publicationYear,
      BookStatus.AVAILABLE
    );
    
    this.books.set(book.id, book);
    return book;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    
    if (status === 'AVAILABLE') {
      book.return();
    } else if (status === 'LOANED') {
      book.loan();
    }
  }

  private generateId(): string {
    return `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}