// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from '../../application/services/book.service';
import { RegisterBookRequest } from '../../domain/models/register-book-request.model';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async registerBook(@Body() body: RegisterBookRequest, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }
}