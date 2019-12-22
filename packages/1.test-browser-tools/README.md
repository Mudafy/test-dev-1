# Questions Frontend - Ejercicio #1

El objetivo de este ejercicio es que te familiarices con las herramientas de desarrollo de los browsers, en particular
con Chrome Devtools.

## Qué hay que hacer

El autocomplete / search field debe andar correctamente.

Adicionalmente, te pedimos:
- Que nos indiques los pasos que hiciste para solucionarlo.

    a) En la mayoria de los casos es conveniente poner el <script src="index.js"></script> fuera del header, por lo que lo ponemos justo antes del </body>.
    b) Para encontrar el error que provocaba el mal funcionamiento del autocomplete, inspeccioné en la consola de Chrome Devtools, en donde se indicaba que el addEventListener no se podía aplicar a algo que se encontraba nulo. Esto me sirvió para detectar las lineas que fue ejecutando hasta llegar al error.
    c) Debuggeando mediante la pestaña de Source, pude ver que al momento de cargar el autocompleteInput directamente lo cargaba con null, por lo que investigue el funcionamiento del document.querySelector,y me di cuenta que el parametro que le estaba enviando estaba mal.
    d) En la funcion init() modifico el setupAutocomplete("autocomplete") por setupAutocomplete(".autocomplete") y modifico el document.querySelector(`${selector} input`) por document.querySelector(selector + ' input') y el document.querySelector(`${selector} .results`) por el document.querySelector(selector + ' .results').
    e) Elimino el fetchData(text).then(showResults) para que no muestre toda la lista cuando el input está vacío.
    f) Hacemos que realice el fetchData(text).then(showResults) unicamente cuando el text es distinto de "", de lo contrario borramos la lista.

- Por qué es que no funcionaba en un primer lugar.

    - El <script src="index.js"></script> se encontraba en el header, y eso está mal.
    - El document.querySelector estaba recibiendo mal el parametro, tanto en el caso del autocompleteInput como en el autocompleteOutput.

- Nos digas una mejora que le harías (fuera de lo que es estilo o gráfica) al código para que funcione mejor.

    - Eliminar el fetchData(text).then(showResults) que está dentro del setupAutocomplete, y realizar la búsqueda unicamente cuando el input es distinto del "". Si bien el autocomplete funcionaría sin estos dos arreglos, es mas performante de esta manera.
    - En ciertas ocasiones, cuando se ingresan mas de un caracter y luego se los borra rápidamente, aún quedando vacío el input, sigue mostrando algún resultado. Por lo que puedo imaginar y lo que pude buscar, puede ser debido al tiempo que tarda en realizar la búsqueda o a que queda algo en el buffer a pesar de que se este borrando lo escrito.
    Debería investigar un poco para ver de que manera podría solucionarlo, ya que si bien sucede en pocas ocasiones, no deja de ser un error.


