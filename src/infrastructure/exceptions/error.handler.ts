import { Request, Response, NextFunction } from 'express';
import { BusinessError } from './business.error';
import { NotFoundError } from './not-found.error';
import { PersistenceError } from './persistence.error';

export class ErrorHandler {
  handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(`[ErrorHandler] Error occurred: ${err.message}`, err.stack);

    if (err instanceof BusinessError) {
      res.status(400).json({
        message: err.message,
        type: 'BusinessError',
      });
      return;
    }

    if (err instanceof NotFoundError) {
      res.status(404).json({
        message: err.message,
        type: 'NotFoundError',
      });
      return;
    }

    if (err instanceof PersistenceError) {
      res.status(500).json({
        message: 'Internal server error',
        type: 'PersistenceError',
      });
      return;
    }

    res.status(500).json({
      message: 'Internal server error',
      type: 'UnknownError',
    });
  }
}