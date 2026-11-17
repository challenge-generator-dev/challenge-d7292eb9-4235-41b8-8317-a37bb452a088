// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { Book } from '../../domain/models/book.model';
import { BookStatus } from '../../domain/models/book.model';
import { RegisterBookRequest } from '../../domain/models/register-book-request.model';
import { BookRepository } from '../../domain/ports/book.repository';

@Injectable()
export class BookService {
  constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

  async registerBook(request: RegisterBookRequest): Promise<Book> {
    throw new Error('TODO(reto): registerBook');
  }

  private generateId(): string {
    throw new Error('TODO(reto): generateId');
  }
}