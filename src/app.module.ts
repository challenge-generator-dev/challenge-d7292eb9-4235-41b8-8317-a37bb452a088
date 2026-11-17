import { Module } from '@nestjs/common';
import { BookController } from './infrastructure/controllers/book.controller';
import { LoanController } from './infrastructure/controllers/loan.controller';
import { BookService } from './application/services/book.service';
import { LoanService } from './application/services/loan.service';
import { BookRepositoryImpl } from './infrastructure/repositories/book.repository';
import { LoanRepository } from './infrastructure/repositories/loan.repository';
import { ValidationMiddleware } from './infrastructure/middlewares/validation.middleware';
import { ErrorHandler } from './infrastructure/exceptions/error.handler';

@Module({
  controllers: [BookController, LoanController],
  providers: [
    BookService,
    LoanService,
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
    {
      provide: 'LoanRepository',
      useClass: LoanRepository,
    },
    ValidationMiddleware,
    ErrorHandler,
  ],
})
export class AppModule {}