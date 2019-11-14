Searching ++
============

<!-- TOC -->

- [Intro](#intro)
- [Modalidad de Entrega](#modalidad-de-entrega)
- [Requerimientos Técnicos](#requerimientos-técnicos)
    - [Must](#must)
    - [Nice to have](#nice-to-have)
- [Development](#development)
    - [Requisitos de instalación](#requisitos-de-instalación)
    - [Ejecución del servidor](#ejecución-del-servidor)

<!-- /TOC -->

# Intro

Este ejercicio consta en una pequeña utilidad de búsqueda. Para ello, se debe
ampliar la API de búsqueda (que sólo devuelve algunas propiedades y no filtra).
Este endpoint está en `/api/v1/search`, localizado en el archivo
`/app/controllers/search.js`.

La aplicación cliente se encuentra en `/client` (está hecha en React), y se
requiere mejorar su interfaz. A modo de detalle, el css se encuentra en
`/client/styles/index.css`, y el template de los resultados en
`/client/components/result.jsx`.

# Modalidad de Entrega

Para realizar este ejercicio, debés forkear el repo y mandarnos el hash del
commit que vas a entregar como final, junto con la dirección al repo.

No se debe entregar la carpeta `/dist`,
pero se debe proveer un método para generarla. Si no se especifica, se usará
el comando `npm run build && npm start` para evaluar la entrega.


# Requerimientos Técnicos

Se provee de una API y una webapp en React (+Redux). El ejercicio consta de
completar la API y en dar formato a la webapp.

## Must

Para la API es necesario parsear los campos extra en cada elemento. Se provee
del loader en el archivo `extras-parser.js`, que levanta strings serializados
de PHP. Es necesario realizar una implementación propia para interpretar esta
data.

Adicionalmente, la API requiere completar el endpoint de búsqueda. Recibe por
query string en el parámetro `q` el texto a buscar, por el que se debe filtrar
las propiedades en cualquiera de sus campos. Investigar las funciones `filter`
y `map` de RxJS va a ser de gran utilidad.

Se debe retornar a lo sumo 100 propiedades en el cuadro de búsqueda por página.

Del lado frontend, debés mostrar toda la data de las propiedades, *incluyendo
los campos extra*. El template de cada resultado está en el archivo
`result.jsx`. Es necesario darle formato con CSS a los resultados.

## Nice to have
- Buscar en los campos mientras se escribe en el cuadro de búsqueda,
  con debouncing.
- Diferenciar el formato según la data de cada propiedad.
- Aplicar formato en CSS usando flex y/o grid.


# Development

## Requisitos de instalación

- NodeJS 8.x
- NPM 5.x

## Ejecución del servidor

- `start`: sirve la aplicación. Se utilizará en la evaluación.
