import { Book } from '../models/book.model';
import { RegisterBookRequest } from '../models/register-book-request.model';

export interface BookRepository {
  save(book: Book): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  register(request: RegisterBookRequest): Promise<Book>;
  updateStatus(id: string, status: string): Promise<void>;
}