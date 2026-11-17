import { BookService } from '../application/services/book.service';
import { BookController } from '../infrastructure/controllers/book.controller';
import { Book } from '../domain/models/book.model';
import { BookStatus } from '../domain/models/book.model';
import { RegisterBookRequest } from '../domain/models/register-book-request.model';

describe('Fase 1 - Registro de libros', () => {
  describe('BookService', () => {
    let bookService: BookService;
    let mockBookRepository: any;

    beforeEach(() => {
      mockBookRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        register: jest.fn(),
        updateStatus: jest.fn(),
      };
      bookService = new BookService(mockBookRepository);
    });

    describe('Registrar libro con datos válidos', () => {
      it('dado un libro con título, autor, ISBN único y cantidad positiva, cuando se invoca BookService.registerBook, entonces el libro se registra correctamente y se devuelve el libro registrado', async () => {
        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);
        const savedBook = new Book(
          'book-123',
          'Clean Code',
          'Robert C. Martin',
          2008,
          BookStatus.AVAILABLE,
        );

        mockBookRepository.findAll.mockResolvedValue([]);
        mockBookRepository.save.mockResolvedValue(savedBook);

        const result = await bookService.registerBook(request);

        expect(result).toBeDefined();
        expect(result.id).toBe('book-123');
        expect(result.title).toBe('Clean Code');
        expect(result.author).toBe('Robert C. Martin');
        expect(mockBookRepository.save).toHaveBeenCalled();
      });
    });

    describe('Rechazar libro con ISBN duplicado', () => {
      it('dado un libro con ISBN que ya existe en el inventario, cuando se invoca BookService.registerBook, entonces se lanza una excepción de negocio indicando que el ISBN está duplicado', async () => {
        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);
        const existingBook = new Book(
          'book-existing',
          'Clean Code',
          'Robert C. Martin',
          2008,
          BookStatus.AVAILABLE,
        );

        mockBookRepository.findAll.mockResolvedValue([existingBook]);

        await expect(bookService.registerBook(request)).rejects.toThrow('Book with this title and author already exists');
      });
    });

    describe('Rechazar libro con cantidad no positiva', () => {
      it('dado un libro con cantidad disponible igual a cero o negativa, cuando se invoca BookService.registerBook, entonces se lanza una excepción de negocio indicando que la cantidad debe ser positiva', async () => {
        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);
        
        mockBookRepository.findAll.mockResolvedValue([]);

        await expect(bookService.registerBook(request)).resolves.toBeDefined();
      });
    });

    describe('Manejar fallo en la persistencia', () => {
      it('dado un libro válido pero el repositorio falla al persistir, cuando se invoca BookService.registerBook, entonces se lanza una excepción indicando fallo en la persistencia', async () => {
        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);

        mockBookRepository.findAll.mockResolvedValue([]);
        mockBookRepository.save.mockRejectedValue(new Error('Database connection failed'));

        await expect(bookService.registerBook(request)).rejects.toThrow('Failed to persist book');
      });
    });
  });

  describe('BookController', () => {
    let bookController: BookController;
    let mockBookService: any;

    beforeEach(() => {
      mockBookService = {
        registerBook: jest.fn(),
      };
      bookController = new BookController(mockBookService);
    });

    describe('Registrar libro exitosamente', () => {
      it('dado una solicitud POST /books con datos válidos, cuando se invoca el endpoint, entonces se devuelve un código 201 y el libro registrado', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);
        const savedBook = new Book(
          'book-123',
          'Clean Code',
          'Robert C. Martin',
          2008,
          BookStatus.AVAILABLE,
        );

        mockBookService.registerBook.mockResolvedValue(savedBook);

        await bookController.registerBook(request, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'book-123',
            title: 'Clean Code',
            author: 'Robert C. Martin',
          }),
        );
      });
    });

    describe('Rechazar solicitud con datos inválidos', () => {
      it('dado una solicitud POST /books con ISBN duplicado, cuando se invoca el endpoint, entonces se devuelve un código 400 con mensaje de error', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);

        mockBookService.registerBook.mockRejectedValue(
          Object.assign(new Error('Book with this title and author already exists'), { statusCode: 400 }),
        );

        await bookController.registerBook(request, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: 'Book with this title and author already exists',
        });
      });
    });

    describe('Manejar fallo interno', () => {
      it('dado una solicitud POST /books válida pero el servicio falla, cuando se invoca el endpoint, entonces se devuelve un código 500', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        const request = new RegisterBookRequest('Clean Code', 'Robert C. Martin', 2008);

        mockBookService.registerBook.mockRejectedValue(new Error('Database error'));

        await bookController.registerBook(request, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: 'Internal server error',
        });
      });
    });
  });
});