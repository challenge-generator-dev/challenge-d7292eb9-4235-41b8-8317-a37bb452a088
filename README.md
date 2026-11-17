# Desarrollo de API REST para gestión de inventario de biblioteca

El sistema debe registrar libros, préstamos y devoluciones en una biblioteca. Los libros tienen título, autor, año de publicación y estado (disponible o prestado). Los préstamos y devoluciones deben estar asociados a un usuario y un libro específico. El sistema debe manejar errores como intentos de préstamo de libros no disponibles o devoluciones de libros que no fueron prestados.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Inventario de biblioteca |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Stack

- **Lenguaje:** TypeScript
- **Framework:** NestJS 10
- **Version:** Node 22

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `npm install --no-audit --no-fund && npm run build` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `npm install --no-audit --no-fund && npm run build`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Registro de libros

**Objetivo:** Implementar la funcionalidad para registrar libros en el inventario.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Crear un endpoint para registrar un nuevo libro con título, autor, año de publicación y estado inicial 'disponible'.
- Validar que el título y el autor no estén vacíos y que el año de publicación sea un número válido.

**Entregable:** Endpoint funcional para registrar libros.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar la validación de datos en el servidor.
- Piensa en cómo representar el estado del libro en la base de datos.

</details>

### Fase 2: Gestión de préstamos y devoluciones

**Objetivo:** Implementar la funcionalidad para gestionar préstamos y devoluciones de libros.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Crear endpoints para registrar un préstamo y una devolución de libro.
- Validar que el libro esté disponible antes de permitir un préstamo y que el libro haya sido prestado antes de permitir una devolución.
- Actualizar el estado del libro después de un préstamo o devolución.

**Entregable:** Endpoints funcionales para gestionar préstamos y devoluciones de libros.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los estados de los libros para evitar préstamos de libros no disponibles.
- Piensa en cómo representar las relaciones entre usuarios, libros y préstamos en la base de datos.

</details>

### Fase 3: Optimización y manejo de errores

**Objetivo:** Optimizar la API y manejar adecuadamente los errores.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Refactorizar las piezas p1 y p3 para centralizar la validación de entradas en un middleware exclusivo (pieza p5).
- Implementar un manejador de errores global (pieza p6) que transforme excepciones de negocio en respuestas HTTP adecuadas.
- Agregar casos de aceptación para validar que los errores se manejan según el contrato de la API.
- Verificar que las piezas p5 y p6 se prueban con al menos 4 casos de aceptación, incluyendo 2 de error o borde.

**Entregable:** API optimizada con manejo de errores documentado.

<details>
<summary>Pistas de conocimiento</summary>

- Considera técnicas de optimización como caching o indexación de la base de datos.
- Piensa en cómo comunicar claramente los errores al usuario final.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un endpoint y cuál es su propósito en una API REST?
- **paraQueSirve**: ¿Para qué sirve validar los datos en el servidor antes de procesar una solicitud?
- **comoSeUsa**: ¿Cómo se usa un endpoint para registrar un nuevo libro en el inventario?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al intentar prestar un libro no disponible?
- **queDecisionesImplica**: ¿Qué decisiones implica el manejo de errores en una API REST?

## Criterios de Evaluacion

- Implementación correcta del endpoint para registrar libros.
- Validación adecuada de datos en el servidor.
- Implementación correcta de endpoints para gestionar préstamos y devoluciones.
- Manejo adecuado de errores en la API.
- Optimización de la API para reducir la latencia y mejorar la eficiencia.

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

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install --no-audit --no-fund && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
