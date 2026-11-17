# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/application/services/book.service.ts` — La pieza p1 (Registro de libros con validación de negocio, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/controllers/book.controller.ts` — La pieza p2 (Exposición de endpoint REST para registro de libros, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/application/services/loan.service.ts` — La pieza p3 (Gestión de préstamos y devoluciones con validación de negocio, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/controllers/loan.controller.ts` — La pieza p4 (Exposición de endpoints REST para préstamos y devoluciones, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Como saber que terminaste

```bash
npm install --no-audit --no-fund && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
API REST para registrar libros, prestamos y devoluciones de una biblioteca

### Reto
- Tema: Inventario de biblioteca
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para gestión de inventario de biblioteca
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Registro de libros — objetivo: Implementar la funcionalidad para registrar libros en el inventario. — entregable (NO resolver): Endpoint funcional para registrar libros.
- Fase 2: Gestión de préstamos y devoluciones — objetivo: Implementar la funcionalidad para gestionar préstamos y devoluciones de libros. — entregable (NO resolver): Endpoints funcionales para gestionar préstamos y devoluciones de libros.
- Fase 3: Optimización y manejo de errores — objetivo: Optimizar la API y manejar adecuadamente los errores. — entregable (NO resolver): API optimizada con manejo de errores documentado.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "pg": "8.23.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: src/domain/models/book.model.ts ===
import { IsString, IsInt, IsEnum } from 'class-validator';

export type BookId = string;

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
}

export class Book {
  id: BookId;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  publicationYear: number;

  @IsEnum(BookStatus)
  status: BookStatus;

  constructor(
    id: BookId,
    title: string,
    author: string,
    publicationYear: number,
    status: BookStatus = BookStatus.AVAILABLE,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.status = status;
  }

  loan(): void {
    if (this.status !== BookStatus.AVAILABLE) {
      throw new Error('Book is not available for loan');
    }
    this.status = BookStatus.LOANED;
  }

  return(): void {
    if (this.status !== BookStatus.LOANED) {
      throw new Error('Book was not loaned');
    }
    this.status = BookStatus.AVAILABLE;
  }

  isAvailable(): boolean {
    return this.status === BookStatus.AVAILABLE;
  }

  isLoaned(): boolean {
    return this.status === BookStatus.LOANED;
  }

  canBeLoaned(): boolean {
    return this.isAvailable();
  }

  canBeReturned(): boolean {
    return this.isLoaned();
  }
}

// === ARCHIVO: src/domain/models/loan.model.ts ===
import { IsString, IsDate, IsOptional } from 'class-validator';
import { Book, BookStatus } from './book.model';

export class Loan {
  id: string;

  @IsString()
  userId: string;

  book: Book;

  @IsDate()
  loanDate: Date;

  @IsDate()
  dueDate: Date;

  @IsDate()
  @IsOptional()
  returnDate?: Date;

  constructor(
    id: string,
    userId: string,
    book: Book,
    loanDate: Date,
    dueDate: Date,
    returnDate?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.book = book;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }

  isOverdue(): boolean {
    if (this.returnDate !== undefined) {
      return false;
    }
    const now = new Date();
    return now > this.dueDate;
  }

  isActive(): boolean {
    return this.returnDate === undefined;
  }

  isReturned(): boolean {
    return this.returnDate !== undefined;
  }

  getDaysOverdue(): number {
    if (!this.isOverdue()) {
      return 0;
    }
    const now = new Date();
    const diffTime = now.getTime() - this.dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getDaysUntilDue(): number {
    if (this.returnDate !== undefined) {
      return 0;
    }
    const now = new Date();
    const diffTime = this.dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  canBeReturned(): boolean {
    return this.returnDate === undefined && this.book.status === BookStatus.LOANED;
  }

  getLoanDurationDays(): number {
    const endDate = this.returnDate || new Date();
    const diffTime = endDate.getTime() - this.loanDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  wasReturnedOnTime(): boolean {
    if (this.returnDate === undefined) {
      return false;
    }
    return this.returnDate <= this.dueDate;
  }

  getStatus(): 'active' | 'returned' | 'overdue' {
    if (this.returnDate !== undefined) {
      return 'returned';
    }
    if (this.isOverdue()) {
      return 'overdue';
    }
    return 'active';
  }
}

// === ARCHIVO: src/domain/models/register-book-request.model.ts ===
import { IsString, IsInt, Min, Max } from 'class-validator';

export class RegisterBookRequest {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  constructor(title: string, author: string, publicationYear: number) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;

    if (publicationYear < 1000 || publicationYear > new Date().getFullYear()) {
      throw new Error('Publication year must be between 1000 and current year');
    }
  }

  validate(): void {
    const errors: string[] = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!this.author || this.author.trim().length === 0) {
      errors.push('Author is required');
    }

    if (this.publicationYear < 1000 || this.publicationYear > new Date().getFullYear()) {
      errors.push('Publication year must be between 1000 and current year');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  toBook(id: string): { id: string; title: string; author: string; publicationYear: number } {
    return {
      id,
      title: this.title,
      author: this.author,
      publicationYear: this.publicationYear,
    };
  }
}

// === ARCHIVO: src/domain/models/loan-book-request.model.ts ===
import { IsString } from 'class-validator';

export class LoanBookRequest {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;

  constructor(userId: string, bookId: string) {
    this.userId = userId;
    this.bookId = bookId;

    if (!userId || userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    if (!bookId || bookId.trim().length === 0) {
      throw new Error('Book ID is required');
    }
  }

  validate(): void {
    const errors: string[] = [];

    if (!this.userId || this.userId.trim().length === 0) {
      errors.push('User ID is required');
    }

    if (!this.bookId || this.bookId.trim().length === 0) {
      errors.push('Book ID is required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  toLoan(id: string, book: { id: string; title: string; author: string; publicationYear: number; status: string }, loanDate: Date, dueDate: Date): { id: string; userId: string; book: { id: string; title: string; author: string; publicationYear: number; status: string }; loanDate: Date; dueDate: Date } {
    return {
      id,
      userId: this.userId,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear,
        status: book.status,
      },
      loanDate,
      dueDate,
    };
  }
}

// === ARCHIVO: src/domain/models/return-book-request.model.ts ===
import { IsString } from 'class-validator';

export class ReturnBookRequest {
  @IsString()
  loanId: string;

  constructor(loanId: string) {
    this.loanId = loanId;

    if (!loanId || loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
  }

  validate(): void {
    if (!this.loanId || this.loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
  }

  toReturnPayload(returnDate: Date): { loanId: string; returnDate: Date } {
    return {
      loanId: this.loanId,
      returnDate,
    };
  }

  static createFromPartial(data: { loanId?: string }): ReturnBookRequest {
    if (!data.loanId || data.loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
    return new ReturnBookRequest(data.loanId);
  }
}

// === ARCHIVO: src/domain/ports/book.repository.ts ===
import { Book } from '../models/book.model';
import { RegisterBookRequest } from '../models/register-book-request.model';

export interface BookRepository {
  save(book: Book): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  register(request: RegisterBookRequest): Promise<Book>;
  updateStatus(id: string, status: string): Promise<void>;
}

// === ARCHIVO: src/application/services/book.service.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/book.controller.ts ===
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

// === ARCHIVO: src/application/services/loan.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { Loan } from '../../domain/models/loan.model';
import { Book } from '../../domain/models/book.model';
import { BookStatus } from '../../domain/models/book.model';
import { LoanRepository } from '../../domain/ports/loan.repository';
import { BookRepository } from '../../domain/ports/book.repository';

@Injectable()
export class LoanService {
  constructor(
    private readonly loanRepository: LoanRepository,
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async loanBook(bookId: string, userId: string): Promise<Loan> {
    throw new Error('TODO(reto): loanBook');
  }

  async returnBook(loanId: string): Promise<Loan> {
    throw new Error('TODO(reto): returnBook');
  }

  private generateId(): string {
    throw new Error('TODO(reto): generateId');
  }
}

// === ARCHIVO: src/infrastructure/controllers/loan.controller.ts ===
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

// === ARCHIVO: src/infrastructure/middlewares/validation.middleware.ts ===
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

// === ARCHIVO: src/infrastructure/exceptions/error.handler.ts ===
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

// === ARCHIVO: src/acceptance/f1.test.ts ===
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

// === ARCHIVO: src/acceptance/f2.test.ts ===
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

// === ARCHIVO: src/acceptance/f3.test.ts ===
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

// === ARCHIVO: src/domain/ports/loan.repository.ts ===
import { Loan } from '../models/loan.model';
import { Book, BookStatus } from '../models/book.model';

export type BookId = string;

export interface LoanRepositoryPort {
  save(loan: Loan): Promise<Loan>;
  findById(id: string): Promise<Loan | null>;
  findByBookId(bookId: BookId): Promise<Loan | null>;
  findByUserId(userId: string): Promise<Loan[]>;
  findActiveLoans(): Promise<Loan[]>;
  update(loan: Loan): Promise<Loan>;
  delete(id: string): Promise<void>;
}

export interface LoanRepository extends LoanRepositoryPort {}

// === ARCHIVO: src/infrastructure/repositories/loan.repository.ts ===
import { Injectable } from '@nestjs/common';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepositoryPort } from '../../domain/ports/loan.repository';
import { BookNotFoundError } from '../exceptions/not-found.error';
import { LoanNotFoundError } from '../exceptions/not-found.error';
import { PersistenceError } from '../exceptions/persistence.error';

@Injectable()
export class LoanRepository implements LoanRepositoryPort {
  private loans: Map<string, Loan> = new Map();

  async save(loan: Loan): Promise<Loan> {
    try {
      this.loans.set(loan.id, loan);
      return loan;
    } catch (error) {
      throw new PersistenceError('Failed to save loan');
    }
  }

  async findById(id: string): Promise<Loan | null> {
    try {
      const loan = this.loans.get(id);
      return loan || null;
    } catch (error) {
      throw new PersistenceError('Failed to find loan by id');
    }
  }

  async findByBookId(bookId: string): Promise<Loan | null> {
    try {
      for (const loan of this.loans.values()) {
        if (loan.book.id === bookId) {
          return loan;
        }
      }
      return null;
    } catch (error) {
      throw new PersistenceError('Failed to find loan by book id');
    }
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    try {
      const userLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (loan.userId === userId) {
          userLoans.push(loan);
        }
      }
      return userLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find loans by user id');
    }
  }

  async findActiveLoans(): Promise<Loan[]> {
    try {
      const activeLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (!loan.returnDate) {
          activeLoans.push(loan);
        }
      }
      return activeLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find active loans');
    }
  }

  async update(loan: Loan): Promise<Loan> {
    try {
      if (!this.loans.has(loan.id)) {
        throw new LoanNotFoundError(loan.id);
      }
      this.loans.set(loan.id, loan);
      return loan;
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to update loan');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      if (!this.loans.has(id)) {
        throw new LoanNotFoundError(id);
      }
      this.loans.delete(id);
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to delete loan');
    }
  }

  async findAll(): Promise<Loan[]> {
    try {
      return Array.from(this.loans.values());
    } catch (error) {
      throw new PersistenceError('Failed to find all loans');
    }
  }

  async findActiveLoansByBookId(bookId: string): Promise<Loan[]> {
    try {
      const activeLoans: Loan[] = [];
      for (const loan of this.loans.values()) {
        if (loan.book.id === bookId && !loan.returnDate) {
          activeLoans.push(loan);
        }
      }
      return activeLoans;
    } catch (error) {
      throw new PersistenceError('Failed to find active loans by book id');
    }
  }

  async updateReturnDate(loanId: string, returnDate: Date): Promise<Loan> {
    try {
      const loan = this.loans.get(loanId);
      if (!loan) {
        throw new LoanNotFoundError(loanId);
      }
      const updatedLoan = new Loan(
        loan.id,
        loan.userId,
        loan.book,
        loan.loanDate,
        loan.dueDate,
        returnDate,
      );
      this.loans.set(loanId, updatedLoan);
      return updatedLoan;
    } catch (error) {
      if (error instanceof LoanNotFoundError) {
        throw error;
      }
      throw new PersistenceError('Failed to update loan return date');
    }
  }
}

// === ARCHIVO: src/infrastructure/repositories/book.repository.ts ===
import { Injectable } from '@nestjs/common';
import { Book, BookStatus } from '../../domain/models/book.model';
import { RegisterBookRequest } from '../../domain/models/register-book-request.model';
import { BookRepository } from '../../domain/ports/book.repository';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  private books: Map<string, Book> = new Map();

  async save(book: Book): Promise<Book> {
    this.books.set(book.id, book);
    return book;
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.get(id) || null;
  }

  async findAll(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async register(request: RegisterBookRequest): Promise<Book> {
    const id = this.generateId();
    const bookData = request.toBook(id);
    
    const book = new Book(
      bookData.id,
      bookData.title,
      bookData.author,
      bookData.publicationYear,
      BookStatus.AVAILABLE
    );
    
    this.books.set(book.id, book);
    return book;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    const book = this.books.get(id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    
    if (status === 'AVAILABLE') {
      book.return();
    } else if (status === 'LOANED') {
      book.loan();
    }
  }

  private generateId(): string {
    return `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

// === ARCHIVO: src/infrastructure/exceptions/business.error.ts ===
export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}

export class DuplicateIsbnError extends BusinessError {
  constructor(isbn: string) {
    super(`ISBN '${isbn}' already exists in the library`);
    this.name = 'DuplicateIsbnError';
    Object.setPrototypeOf(this, DuplicateIsbnError.prototype);
  }
}

export class InvalidQuantityError extends BusinessError {
  constructor(quantity: number) {
    super(`Quantity must be positive, got: ${quantity}`);
    this.name = 'InvalidQuantityError';
    Object.setPrototypeOf(this, InvalidQuantityError.prototype);
  }
}

export class BookNotAvailableError extends BusinessError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' is not available for loan`);
    this.name = 'BookNotAvailableError';
    Object.setPrototypeOf(this, BookNotAvailableError.prototype);
  }
}

export class LoanNotFoundError extends BusinessError {
  constructor(loanId: string) {
    super(`Loan with ID '${loanId}' not found`);
    this.name = 'LoanNotFoundError';
    Object.setPrototypeOf(this, LoanNotFoundError.prototype);
  }
}

export class BookNotLoanedError extends BusinessError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' is not currently loaned`);
    this.name = 'BookNotLoanedError';
    Object.setPrototypeOf(this, BookNotLoanedError.prototype);
  }
}

// === ARCHIVO: src/infrastructure/exceptions/not-found.error.ts ===
import { LoanNotFoundError as BusinessLoanNotFoundError } from './business.error';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BookNotFoundError extends NotFoundError {
  constructor(bookId: string) {
    super(`Book with ID '${bookId}' not found`);
    this.name = 'BookNotFoundError';
    Object.setPrototypeOf(this, BookNotFoundError.prototype);
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super(`User with ID '${userId}' not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class LoanNotFoundError extends BusinessLoanNotFoundError {
  constructor(loanId: string) {
    super(loanId);
    this.name = 'LoanNotFoundError';
    Object.setPrototypeOf(this, LoanNotFoundError.prototype);
  }
}

// === ARCHIVO: src/infrastructure/exceptions/persistence.error.ts ===
export class PersistenceError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'PersistenceError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatabaseConnectionError extends PersistenceError {
  constructor(message: string = 'Database connection failed', cause?: Error) {
    super(message, cause);
    this.name = 'DatabaseConnectionError';
  }
}

export class QueryExecutionError extends PersistenceError {
  constructor(message: string = 'Failed to execute database query', cause?: Error) {
    super(message, cause);
    this.name = 'QueryExecutionError';
  }
}

export class TransactionError extends PersistenceError {
  constructor(message: string = 'Database transaction failed', cause?: Error) {
    super(message, cause);
    this.name = 'TransactionError';
  }
}

export class EntityNotFoundError extends PersistenceError {
  constructor(entityType: string, entityId: string) {
    super(`${entityType} with id ${entityId} not found`);
    this.name = 'EntityNotFoundError';
  }
}

export class DuplicateEntityError extends PersistenceError {
  constructor(entityType: string, field: string, value: string) {
    super(`${entityType} with ${field} '${value}' already exists`);
    this.name = 'DuplicateEntityError';
  }
}

// === ARCHIVO: src/app.module.ts ===
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

// === ARCHIVO: src/main.ts ===
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
```
