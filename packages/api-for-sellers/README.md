API for Sellers
===============

<!-- TOC -->

- [Intro](#intro)
- [Modalidad de Entrega](#modalidad-de-entrega)
- [Formato](#formato)
- [Requerimientos Técnicos](#requerimientos-técnicos)
    - [Must](#must)
    - [Nice to have](#nice-to-have)
- [Development](#development)
    - [Requisitos de instalación](#requisitos-de-instalación)
    - [Ejecución del servidor](#ejecución-del-servidor)

<!-- /TOC -->

# Intro

Nuestra oficina de ventas se encuentra necesitando generar un breve reporte de
las zonas a las que concurriremos a tasar. Para ello, encargaron una pequeña
herramienta que les brinde estadísticas de algunas zonas (que generosamente han
provisto en un `.CSV`).

Este ejercicio consta en otorgar una API que será consumida internamente por un
dashboard. Se provee una base del servicio (que puede ser libremente modificada)
y el endpoint donde se le pedirá la data.

# Modalidad de Entrega

Para realizar este ejercicio, debés forkear el repo y mandarnos el hash del
commit que vas a entregar como final, junto con la dirección al repo.

# Formato

Se realiza un `GET` a `/api/v1/zone/:place/valuation`, con `:place` siendo
*cualquiera de las zonas de los datos provistos*, es decir, `province`, `area` o
`county`.

El servicio debe procesar la totalidad de los elementos levantados desde el
`.CSV`, y retornar un json con el siguiente formato:

```json
{
    "tipo de operación": {
        "tipo de propiedad": {
            ...
        }
    }
}
```

La información estadística que se solicita es en base a las valuaciones de las propiedades.

Se puede agregar keys bajo tipo de propiedad dentro de la key `"extra"`. **Este campo es opcional**.

Por simplicidad, si la zona no existe o existe más de una zona, la respuesta debe ser un json con el mensaje de error correspondiente y el status code 418.

```json
{
    "2": {
        "7": {
            "min": 78000,
            "max": 190000,
            "mean": 134000,
            "stddev": 5400
        },
        "2": {
            "min": 78000,
            "max": 190000,
            "mean": 134000,
            "stddev": 5400,
            "extra": { ... }
        },
        ...
    },
    "1": { ... }
}
```

# Requerimientos Técnicos

## Must
- Agregar una librería de estadísticas al proyecto en Node.js.
- Filtrar la lista y operar el `datasource` usando RxJS.
- Devolver una response en json con el formato solicitado.

## Nice to have
- Información estadística sobre la superficie total.
- Correlación entre superficie total y valuación.

# Development

## Requisitos de instalación

- NodeJS 8.x
- NPM 5.x

## Ejecución del servidor

Se puede ejecutar el servidor utilizando los comandos de npm:

- `npm start` para correr la aplicación. Este modo se utilizará para evaluar la entrega.

- `npm run dev` recarga automáticamente el servidor y es el recomendado para el desarrollo.

