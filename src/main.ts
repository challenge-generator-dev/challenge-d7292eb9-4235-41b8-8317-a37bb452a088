import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationMiddleware } from './infrastructure/middlewares/validation.middleware';
import { ErrorHandler } from './infrastructure/exceptions/error.handler';
import { Request, Response, NextFunction } from 'express';
import { ExceptionFilter } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';

class GlobalExceptionFilter implements ExceptionFilter {
  private errorHandler: ErrorHandler;

  constructor() {
    this.errorHandler = new ErrorHandler();
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const next = ctx.getNext();

    const err = exception instanceof Error ? exception : new Error(String(exception));
    this.errorHandler.handleError(err, request, response, next);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    const validationMiddleware = new ValidationMiddleware();
    if (req.path === '/books' && req.method === 'POST') {
      return validationMiddleware.validateRegisterBook(req, res, next);
    }
    if (req.path.startsWith('/loans') && req.method === 'POST') {
      return validationMiddleware.validateLoanBook(req, res, next);
    }
    next();
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();