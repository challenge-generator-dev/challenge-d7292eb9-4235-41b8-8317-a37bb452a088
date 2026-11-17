// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LoanService } from '../../application/services/loan.service';
import { LoanBookRequest } from '../../domain/models/loan-book-request.model';
import { ReturnBookRequest } from '../../domain/models/return-book-request.model';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async loanBook(@Body() body: LoanBookRequest, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id/return')
  async returnBook(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Put');
  }
}