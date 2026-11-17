import { Request, Response, NextFunction } from 'express';
import { RegisterBookRequest } from '../../domain/models/register-book-request.model';
import { LoanBookRequest } from '../../domain/models/loan-book-request.model';

export class ValidationMiddleware {
  validateRegisterBook(req: Request, res: Response, next: NextFunction): void {
    try {
      const body = req.body;
      
      if (!body.title || body.title.trim().length === 0) {
        res.status(400).json({ message: 'Title is required' });
        return;
      }

      if (!body.author || body.author.trim().length === 0) {
        res.status(400).json({ message: 'Author is required' });
        return;
      }

      if (!body.publicationYear || typeof body.publicationYear !== 'number') {
        res.status(400).json({ message: 'Publication year is required' });
        return;
      }

      if (body.publicationYear < 1000 || body.publicationYear > new Date().getFullYear()) {
        res.status(400).json({ message: 'Publication year must be between 1000 and current year' });
        return;
      }

      if (body.isbn !== undefined) {
        if (!body.isbn || body.isbn.trim().length === 0) {
          res.status(400).json({ message: 'ISBN is required when provided' });
          return;
        }
      }

      if (body.quantity !== undefined) {
        if (typeof body.quantity !== 'number' || body.quantity <= 0) {
          res.status(400).json({ message: 'Quantity must be a positive number' });
          return;
        }
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Validation error' });
    }
  }

  validateLoanBook(req: Request, res: Response, next: NextFunction): void {
    try {
      const body = req.body;

      if (!body.bookId || body.bookId.trim().length === 0) {
        res.status(400).json({ message: 'Book ID is required' });
        return;
      }

      if (!body.userId || body.userId.trim().length === 0) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Validation error' });
    }
  }
}