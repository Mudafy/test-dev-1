# Questions Frontend - Ejercicio #2

El objetivo de este ejercicio es desarrollar dos pantallas para que una inmobiliaria
pueda leer y filtrar entre sus consultas: la de listado, y la de detalle.

La aplicación de base es una webapp en Angular 7 con Angular Material. El package
manager es yarn.

## Qué hay que hacer

Asumimos que es la vista de un sólo cliente.

Los puntos a implementar son:
- Vista de listado con tabla de consultas para una inmobiliaria.
- Agregar y borrar consultas.
- Ver una consulta particular entrando por un link a la misma.

Te recomendamos que veas las tablas de [Angular](https://material.angular.io/components/table/overview).

### Criterio de evaluación
Un cliente debería ser capaz de:
- Manejar sus consultas: borrarlas o agregar consultas.
- Ordenar sus consultas: por distintos criterios.
- Filtrar sus consultas: por distintos criterios.


### The Extra Mile
Ya tenés Angular Material, por lo que te sugerimos que juegues con un par de componentes y trates de hacer una
vista de Consultas que nos sorprenda!


## Cómo instalar y correr el proyecto
Necesitás NodeJs 9 o más nuevo, Yarn, Angular CLI y seguir estos pasos:
- `yarn install` en la raíz del proyecto.
- `yarn start` para correrlo.
- `ng generate` para generar componentes y otros.


## Antes de commitear
- `yarn lint` para comprobar la calidad estructural del nuevo código
- `yarn test` para verificar el correcto funcionamiento de los tests


## Levantar con Docker 
- `docker build -t questions-search-frontend .` construir la imágen docker.
- `docker run -p 4200:4200 questions-search-frontend` levantar el contenedor de manera local.


## Deployar en Firebase hosting

### Prerequisitos

- `npm install -g firebase-tools` instalar firebase tools globalmente.
- `firebase login` loguearse en firebase.

### Realizar el deploy

- `yarn deploy` dev environment.
- `yarn deploy:prod` prod environment.