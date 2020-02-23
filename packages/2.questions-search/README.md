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


## Cosas hechas
- Se hizo una unica vista dividida en 2
    - La mitad izquierda muestra una tabla con todas las consultas disponibles y las diferentes acciones disponibles:
        - Filtrar
        - Crear una consulta
        - Ver los detalles de una consulta
        - Editar una consulta
        - Borrar una consulta
        - Ordernar consultas por id o nombre
    - La mitad derecha mostrara un card con la información de la consulta seleccionada (ya sea para ver o editar) o bien, un formulario vacio para crear una nueva.
        - Para editar y crear, se mostraran 2 botones:
            - Aceptar: guardara los cambios y pasará a mostrar la card de detalles
            - Cancelar: vuelve a la card de detalles sin guardar ningun cambioç
        - Tanto para editar como crear, los campos nombre y email son requeridos
- Todo se hizo utilizando angular material
    - cree un archivo específico para los imports de los modules de angular material ("material.ts")
    - la tabla principal es un data table con paginator y sort header
    - los detalles son cards
    - botones, iconos y tooltips
- Se agregaron unos pequeños cambios de estilos tanto al header como al footer que estaban por defecto

## Cosas para mejorar/implementar
- Mejorar el filtrado
- Mensaje de confirmación antes de borrar una consulta
- Mejorar compatibilidad mobile (en portrait mode puede que la pagina no se vea correctamente)
- La pantalla en si puede que se vea un poco vacia, explorar mejores alternativas en el estilado
- Soporte multilenguaje en lugar de hardcodear frases en español
- Implementar algun enmascaramiento en los inputs de teléfono, email para que no puedan ingresar datos incorrectos
- Mejorar el management de los brokers (crear una clase con datos mas significativos, un service y mostrar un dropdown al momento de crear una consulta)

