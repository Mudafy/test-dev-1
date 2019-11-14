Parse Large Feeds
=================

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

En este escenario, somos una pequeña empresa que publica propiedades en avisos
de Internet, mediante un reconocido startup regional.

Siprop nos provee un [feed: http://panel.siprop.com/propiedades/export/id/utq0yl2wda](http://panel.siprop.com/propiedades/export/id/utq0yl2wda) para importar sus propiedades. El feed contiene una
inmensa cantidad de data, con información sobre muchísimas propiedades, por lo
que nos daría un impulso enorme incorporarlo en nuestra base de datos.

Debemos desarrollar un *feed parser* en NodeJS que nos permita consumir el feed,
procesar las propiedades y almacenarlas en distintos archivos dependiendo del
tipo de operación y de propiedad.

# Modalidad de Entrega

Para realizar este ejercicio, debés forkear el repo y mandarnos el hash del
commit que vas a entregar como final, junto con la dirección al repo.

No se debe entregar la carpeta `/dist`,
pero se debe proveer un método para generarla. Si no se especifica, se usará
el comando `npm run build && npm start` para evaluar la entrega.

# Formato

El formato del feed está definido. Recomendamos bajar el feed en vez de pedirlo
siempre a la URL.

El formato de salida es libre, pero se recomienda que sea en archivos json con
la data separada por tipo de operación y propiedad, o bien en una base de datos
en sqlite.

# Requerimientos Técnicos

## Must
- El feed entrega todas las propiedades. No se debe repetir la información de
  las mismas, es decir, no puede guardarse dos veces la misma propiedad.
- Parsear el feed sin cargarlo en su totalidad en memoria. Investigar SAX.
  No es válido almacenarlo sin transformarlo.
- Generar algún formato (a libertad) de salida de los datos procesados. Si bien
  la elección es libre, se debe proveer una forma de visualizar esos datos.

## Nice to have
- Caching del feed. Baja el feed si es que no está presente o si el archivo
  tiene una antigüedad mayor a 12hs.
- Parseo del campo `extras` al medio donde almacena los datos.


# Development

## Requisitos de instalación

- NodeJS 8.x
- NPM 5.x

## Ejecución del servidor

Se otorgan varios scripts:

- `test`: Ejecuta las pruebas usando `mocha` y `babel`.
- `build`: Genera los archivos en `/dist` usando `babel`.
- `start`: `node dist/index.js`
- `watch`: `nodemon src/index.js --exec babel-node`
- `lint`: Lintea usando eslint.
