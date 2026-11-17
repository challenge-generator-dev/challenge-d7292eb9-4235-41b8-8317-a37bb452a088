import { ValidationMiddleware } from '../infrastructure/middlewares/validation.middleware';
import { ErrorHandler } from '../infrastructure/exceptions/error.handler';
import { BusinessError } from '../infrastructure/exceptions/business.error';
import { NotFoundError } from '../infrastructure/exceptions/not-found.error';
import { PersistenceError } from '../infrastructure/exceptions/persistence.error';

describe('ValidationMiddleware', () => {
  let validationMiddleware: ValidationMiddleware;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    validationMiddleware = new ValidationMiddleware();
    mockNext = jest.fn();
  });

  describe('Permitir solicitud con datos válidos para registro de libro', () => {
    it('debe delegar al siguiente middleware cuando los datos son válidos', () => {
      mockRequest = {
        body: {
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publicationYear: 2008,
          isbn: '978-0132350884',
          quantity: 5,
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validationMiddleware.validateRegisterBook(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('Rechazar solicitud con ISBN faltante', () => {
    it('debe devolver código 400 cuando ISBN no está presente', () => {
      mockRequest = {
        body: {
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publicationYear: 2008,
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validationMiddleware.validateRegisterBook(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'ISBN is required when provided' });
    });
  });

  describe('Rechazar solicitud con cantidad no positiva', () => {
    it('debe devolver código 400 cuando cantidad es cero', () => {
      mockRequest = {
        body: {
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publicationYear: 2008,
          isbn: '978-0132350884',
          quantity: 0,
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validationMiddleware.validateRegisterBook(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Quantity must be a positive number' });
    });
  });

  describe('Permitir solicitud con datos válidos para préstamo', () => {
    it('debe delegar al siguiente middleware cuando bookId y userId son válidos', () => {
      mockRequest = {
        body: {
          bookId: 'book-123',
          userId: 'user-456',
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validationMiddleware.validateLoanBook(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('Rechazar solicitud con bookId faltante', () => {
    it('debe devolver código 400 cuando bookId no está presente', () => {
      mockRequest = {
        body: {
          userId: 'user-456',
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validationMiddleware.validateLoanBook(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Book ID is required' });
    });
  });
});

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    errorHandler = new ErrorHandler();
    mockNext = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('Manejar excepción de negocio', () => {
    it('debe devolver código 400 con mensaje de error', () => {
      const error = new BusinessError('Book not available');
      mockRequest = { method: 'POST', url: '/loans' };

      errorHandler.handleError(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Book not available',
        type: 'BusinessError',
      });
    });
  });

  describe('Manejar excepción de recurso no encontrado', () => {
    it('debe devolver código 404 con mensaje de error', () => {
      const error = new NotFoundError('Book not found');
      mockRequest = { method: 'GET', url: '/books/123' };

      errorHandler.handleError(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Book not found',
        type: 'NotFoundError',
      });
    });
  });

  describe('Manejar excepción de persistencia', () => {
    it('debe devolver código 500 con mensaje genérico', () => {
      const error = new PersistenceError('Database connection failed');
      mockRequest = { method: 'POST', url: '/books' };

      errorHandler.handleError(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        type: 'PersistenceError',
      });
    });
  });

  describe('Manejar excepción no controlada', () => {
    it('debe devolver código 500 con mensaje genérico para errores desconocidos', () => {
      const error = new Error('Unknown error');
      mockRequest = { method: 'GET', url: '/test' };

      errorHandler.handleError(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        type: 'UnknownError',
      });
    });
  });
});