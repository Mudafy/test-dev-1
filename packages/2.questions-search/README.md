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

## Realizado:
- Los datos se encuentran en una tabla, mostrando su nombre, email y telefono.
- Eliminar consultas.
- Agregar nuevas consultas.
- Editar consultas.
- Seleccionar la cantidad de registros que quieren verse (Paginado).
- Ordenar las columnas de manera ascendente y descendente.
- Filtrar las consultas segun Nombre, Telefono y Email.
- Se utilizan los metodos provistos en el services para realizar el borrado, editado y creación de consultas.
- Acceder al detalle de cada consulta.

## Detalles que me hubiera gustado agregar
- Filtrado por Broker.
- Modificar el icono que muestra la pestaña en el navegador.
- Trabajar un poco mas con lo responsive.
- Traer los brokers desde un servicio.
- Mostrar el broker en el detalle.
- Mostrar en español la paginación.

## Falta arreglar:
- La limpieza de los filtros funciona, pero en el caso de que se edite, cree o borre luego del filtrado, no esta funcionando correctamente.




