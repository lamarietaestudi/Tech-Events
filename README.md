# Digital Library

## Description

Tech Events es una aplicación de frontend y backend para consultar y gestionar eventos relacionados con la tecnología, tanto para usuarios registrados como para aquellos que solo estén realizando una búsqueda.

## Tecnologías utilizadas

## Instalación

## Uso

Una vez que la aplicación esté ejecutándose, se accede a ella mediante `http://localhost:3000`

## Scripts disponibles

- npm run start: inicia la aplicación.
- npm run dev: inicia la aplicación en modo desarrollo con nodemon.
- npm run userssSeed: carga en la BBDD datos de usuarios.

## EndPoints

PENDIENTE DE ACTUALIZAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

### Colección Autores (Authors)

| Método     | URL            | Descripción                          | Permisos          |
| ---------- | -------------- | ------------------------------------ | ----------------- |
| **GET**    | `/authors`     | Carga a todos los autores de la BBDD | Cualquier usuario |
| **POST**   | `/authors`     | Crea un nuevo autor en la BBDD       | Cualquier usuario |
| **PUT**    | `/authors/:id` | Actualiza los datos de un autor      | Cualquier usuario |
| **DELETE** | `/authors/:id` | Borra un autor de la BBDD            | Cualquier usuario |

### Colección Libros (Books)

| Método     | URL          | Descripción                         | Permisos          |
| ---------- | ------------ | ----------------------------------- | ----------------- |
| **GET**    | `/books`     | Carga a todos los libros de la BBDD | Cualquier usuario |
| **POST**   | `/books`     | Crea un nuevo libro en la BBDD      | Cualquier usuario |
| **PUT**    | `/books/:id` | Actualiza los datos de un libro     | Cualquier usuario |
| **DELETE** | `/books/:id` | Borra un libro de la BBDD           | Cualquier usuario |

## Aviso Legal

### Proyecto Práctico

Este proyecto es una práctica personal y no representa un producto comercial. Está destinado a la demostración de habilidades técnicas y el aprendizaje.
