# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST para gestión de inventario de biblioteca**.

| | |
|---|---|
| Tema | Inventario de biblioteca |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | capas estándar |
| Tiempo estimado | 10 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 10.4.22
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- class-validator 0.15.1
- express 5.3.0
- pg 8.23.1
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install --no-audit --no-fund && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install --no-audit --no-fund && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Registro de libros**: Endpoint funcional para registrar libros.
- **Fase 2 — Gestión de préstamos y devoluciones**: Endpoints funcionales para gestionar préstamos y devoluciones de libros.
- **Fase 3 — Optimización y manejo de errores**: API optimizada con manejo de errores documentado.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/application/services/book.service.ts` — La pieza p1 (Registro de libros con validación de negocio, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/infrastructure/controllers/book.controller.ts` — La pieza p2 (Exposición de endpoint REST para registro de libros, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/application/services/loan.service.ts` — La pieza p3 (Gestión de préstamos y devoluciones con validación de negocio, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/infrastructure/controllers/loan.controller.ts` — La pieza p4 (Exposición de endpoints REST para préstamos y devoluciones, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Registro de libros | Registro de libros con validación de negocio | `src/application/services/book.service.ts:BookService` | El endpoint POST /books registra un libro con título, autor, ISBN y cantidad disponible.; El sistema valida que el ISBN no esté duplicado y que la cantidad sea positiva.; El sistema devuelve un error 400 si la validación falla.; El sistema devuelve un error 500 si ocurre un fallo en la persistencia. | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Registro de libros | Exposición de endpoint REST para registro de libros | `src/infrastructure/controllers/book.controller.ts:BookController` | El endpoint POST /books registra un libro con título, autor, ISBN y cantidad disponible.; El sistema valida que el ISBN no esté duplicado y que la cantidad sea positiva.; El sistema devuelve un error 400 si la validación falla.; El sistema devuelve un error 500 si ocurre un fallo en la persistencia. | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Gestión de préstamos y devoluciones | Gestión de préstamos y devoluciones con validación de negocio | `src/application/services/loan.service.ts:LoanService` | El endpoint POST /loans registra un préstamo de un libro disponible.; El endpoint PUT /loans/:id/return registra la devolución de un préstamo.; El sistema valida que el libro esté disponible para préstamo y que el préstamo exista para devolución.; El sistema devuelve un error 400 si la validación falla.; El sistema devuelve un error 404 si el préstamo no existe.; El sistema devuelve un error 500 si ocurre un fallo en la persistencia. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Gestión de préstamos y devoluciones | Exposición de endpoints REST para préstamos y devoluciones | `src/infrastructure/controllers/loan.controller.ts:LoanController` | El endpoint POST /loans registra un préstamo de un libro disponible.; El endpoint PUT /loans/:id/return registra la devolución de un préstamo.; El sistema valida que el libro esté disponible para préstamo y que el préstamo exista para devolución.; El sistema devuelve un error 400 si la validación falla.; El sistema devuelve un error 404 si el préstamo no existe.; El sistema devuelve un error 500 si ocurre un fallo en la persistencia. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f3 — Optimización y manejo de errores | Centralización de validación de entradas | — | La API centraliza la validación de entradas en un middleware reusable.; La API maneja errores de negocio con respuestas HTTP consistentes (400, 404, 500).; La API devuelve mensajes de error descriptivos para casos de entrada inválida.; La API devuelve un error 404 si un recurso solicitado no existe.; La API devuelve un error 500 si ocurre un fallo interno no controlado. | `src/acceptance/f3.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |
| f3 — Optimización y manejo de errores | Mapeo de excepciones a respuestas HTTP | — | La API centraliza la validación de entradas en un middleware reusable.; La API maneja errores de negocio con respuestas HTTP consistentes (400, 404, 500).; La API devuelve mensajes de error descriptivos para casos de entrada inválida.; La API devuelve un error 404 si un recurso solicitado no existe.; La API devuelve un error 500 si ocurre un fallo interno no controlado. | `src/acceptance/f3.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (25)

- `package.json`
- `tsconfig.json`
- `src/domain/models/book.model.ts`
- `src/domain/models/loan.model.ts`
- `src/domain/models/register-book-request.model.ts`
- `src/domain/models/loan-book-request.model.ts`
- `src/domain/models/return-book-request.model.ts`
- `src/domain/ports/book.repository.ts`
- `src/application/services/book.service.ts`
- `src/infrastructure/controllers/book.controller.ts`
- `src/application/services/loan.service.ts`
- `src/infrastructure/controllers/loan.controller.ts`
- `src/infrastructure/middlewares/validation.middleware.ts`
- `src/infrastructure/exceptions/error.handler.ts`
- `src/acceptance/f1.test.ts`
- `src/acceptance/f2.test.ts`
- `src/acceptance/f3.test.ts`
- `src/domain/ports/loan.repository.ts`
- `src/infrastructure/repositories/loan.repository.ts`
- `src/infrastructure/repositories/book.repository.ts`
- `src/infrastructure/exceptions/business.error.ts`
- `src/infrastructure/exceptions/not-found.error.ts`
- `src/infrastructure/exceptions/persistence.error.ts`
- `src/app.module.ts`
- `src/main.ts`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `src/domain/models` (presente)
- `src/domain/ports` (presente)
- `src/application/services` (presente)
- `src/infrastructure/repositories` (presente)
- `src/infrastructure/controllers` (presente)
- `src/infrastructure/middlewares` (presente)
- `src/infrastructure/exceptions` (presente)

## Verificacion

```bash
npm install --no-audit --no-fund && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: API REST para registrar libros, prestamos y devoluciones de una biblioteca

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
