import { LoanService } from '../application/services/loan.service';
import { LoanController } from '../infrastructure/controllers/loan.controller';
import { LoanBookRequest } from '../domain/models/loan-book-request.model';
import { ReturnBookRequest } from '../domain/models/return-book-request.model';
import { Book, BookStatus } from '../domain/models/book.model';
import { Loan } from '../domain/models/loan.model';
import { BusinessError } from '../infrastructure/exceptions/business.error';
import { NotFoundError } from '../infrastructure/exceptions/not-found.error';
import { PersistenceError } from '../infrastructure/exceptions/persistence.error';

describe('LoanService', () => {
  let loanService: LoanService;
  let mockLoanRepository: any;
  let mockBookRepository: any;

  beforeEach(() => {
    mockLoanRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    mockBookRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      updateStatus: jest.fn(),
    };
    loanService = new LoanService(mockLoanRepository, mockBookRepository);
  });

  describe('Registrar préstamo exitosamente', () => {
    it('debe registrar un préstamo cuando el libro está disponible', async () => {
      const bookId = 'book-123';
      const userId = 'user-456';
      const book = new Book(bookId, 'Test Book', 'Test Author', 2020, BookStatus.AVAILABLE);
      const loanDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      mockBookRepository.findById.mockResolvedValue(book);
      mockLoanRepository.save.mockImplementation((loan: Loan) => Promise.resolve(loan));

      const result = await loanService.loanBook(bookId, userId);

      expect(result).toBeDefined();
      expect(result.userId).toBe(userId);
      expect(result.book.id).toBe(bookId);
      expect(mockBookRepository.updateStatus).toHaveBeenCalledWith(bookId, 'LOANED');
    });
  });

  describe('Rechazar préstamo de libro no disponible', () => {
    it('debe lanzar BusinessError cuando el libro no está disponible', async () => {
      const bookId = 'book-123';
      const userId = 'user-456';
      const book = new Book(bookId, 'Test Book', 'Test Author', 2020, BookStatus.LOANED);

      mockBookRepository.findById.mockResolvedValue(book);

      await expect(loanService.loanBook(bookId, userId)).rejects.toThrow(BusinessError);
    });
  });

  describe('Registrar devolución exitosamente', () => {
    it('debe registrar la devolución de un préstamo existente', async () => {
      const loanId = 'loan-123';
      const bookId = 'book-456';
      const book = new Book(bookId, 'Test Book', 'Test Author', 2020, BookStatus.LOANED);
      const loanDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const loan = new Loan(loanId, 'user-789', book, loanDate, dueDate);

      mockLoanRepository.findById.mockResolvedValue(loan);
      mockLoanRepository.save.mockImplementation((l: Loan) => Promise.resolve(l));
      mockBookRepository.updateStatus.mockResolvedValue(undefined);

      const result = await loanService.returnBook(loanId);

      expect(result).toBeDefined();
      expect(result.returnDate).toBeDefined();
      expect(mockBookRepository.updateStatus).toHaveBeenCalledWith(bookId, 'AVAILABLE');
    });
  });

  describe('Rechazar devolución de préstamo inexistente', () => {
    it('debe lanzar NotFoundError cuando el préstamo no existe', async () => {
      const loanId = 'non-existent-loan';

      mockLoanRepository.findById.mockResolvedValue(null);

      await expect(loanService.returnBook(loanId)).rejects.toThrow(NotFoundError);
    });
  });

  describe('Manejar fallo en la persistencia', () => {
    it('debe lanzar PersistenceError cuando el repositorio falla', async () => {
      const bookId = 'book-123';
      const userId = 'user-456';
      const book = new Book(bookId, 'Test Book', 'Test Author', 2020, BookStatus.AVAILABLE);

      mockBookRepository.findById.mockResolvedValue(book);
      mockLoanRepository.save.mockRejectedValue(new Error('Database connection failed'));

      await expect(loanService.loanBook(bookId, userId)).rejects.toThrow(PersistenceError);
    });
  });
});

describe('LoanController', () => {
  let loanController: LoanController;
  let mockLoanService: any;
  let mockResponse: any;

  beforeEach(() => {
    mockLoanService = {
      loanBook: jest.fn(),
      returnBook: jest.fn(),
    };
    loanController = new LoanController(mockLoanService);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('Registrar préstamo exitosamente', () => {
    it('debe devolver código 201 y el préstamo registrado', async () => {
      const request = new LoanBookRequest('user-123', 'book-456');
      const book = new Book('book-456', 'Test Book', 'Test Author', 2020, BookStatus.AVAILABLE);
      const loanDate = new Date();
      const dueDate = new Date();
      const loan = new Loan('loan-789', 'user-123', book, loanDate, dueDate);

      mockLoanService.loanBook.mockResolvedValue(loan);

      await loanController.loanBook({ body: request } as any, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(loan);
    });
  });

  describe('Rechazar préstamo de libro no disponible', () => {
    it('debe devolver código 400 con mensaje de error', async () => {
      const request = new LoanBookRequest('user-123', 'book-456');

      mockLoanService.loanBook.mockRejectedValue(new BusinessError('Book not available'));

      await loanController.loanBook({ body: request } as any, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Registrar devolución exitosamente', () => {
    it('debe devolver código 200 y el préstamo actualizado', async () => {
      const book = new Book('book-456', 'Test Book', 'Test Author', 2020, BookStatus.LOANED);
      const loanDate = new Date();
      const dueDate = new Date();
      const loan = new Loan('loan-789', 'user-123', book, loanDate, dueDate);
      loan.returnDate = new Date();

      mockLoanService.returnBook.mockResolvedValue(loan);

      await loanController.returnBook({ params: { id: 'loan-789' } } as any, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(loan);
    });
  });

  describe('Rechazar devolución de préstamo inexistente', () => {
    it('debe devolver código 404 con mensaje de error', async () => {
      mockLoanService.returnBook.mockRejectedValue(new NotFoundError('Loan not found'));

      await loanController.returnBook({ params: { id: 'non-existent' } } as any, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('Manejar fallo interno', () => {
    it('debe devolver código 500 cuando el servicio falla', async () => {
      const request = new LoanBookRequest('user-123', 'book-456');

      mockLoanService.loanBook.mockRejectedValue(new Error('Internal error'));

      await loanController.loanBook({ body: request } as any, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });
});