# Questions Frontend - Ejercicio #1

El objetivo de este ejercicio es que te familiarices con las herramientas de desarrollo de los browsers, en particular
con Chrome Devtools.

## Qué hay que hacer

El autocomplete / search field debe andar correctamente.

Adicionalmente, te pedimos:
- Que nos indiques los pasos que hiciste para solucionarlo.
    Lo primero fue obviamente abrir la página en el navegador y abrir la consola. Ahi fue leer el error que se mostraba, en este caso un error de que no se podia acceder a una property de un objeto null. Dicho error estaba marcado en el archivo index.js en la linea 53. Me dirigi a dicho archivo y a la linea marcada y analice la función que contenia el objeto problematico.
    Usando la solapa Sources de la consola del navegador, coloque un breakpoint al inicio de la función 'setupAutocomplete' y observe el comportamiento de la página a lo largo de la ejecución de dicha función. Esto me dio la pista de lo que estaba realmente ocurriendo. 

- Por qué es que no funcionaba en un primer lugar.
    Habia 2 problemas:
    * El mas facil de detectar fue que el selector utilizado estaba mal implementado. En el código original, el selector busca un DOM del tipo "autocomplete". Mirando el html de la página, vi que "autocomplete" es en realidad una class usada por un div, por lo cual modifique el código para incluir el selector para clases adelante (${selector} input ===> .${selector} input)
    * El segundo problema lo detecte al momento de debuggear la función 'setupAutocomplete'. Al momento de buscar los elementos relacionados con el div de autocomplete, la página aún está en blanco. Nuevamente checkeo el html y noto que el tag de script que incluye al archivo index.js a la página esta declarado en el header de la misma. Esto hace que el script se ejecute antes de que la página tenga chances de terminar de cargar todos los elementos que contiene. Por lo tanto, cuando se intenta buscar el div con la class "autocomplete", este aun no fue renderizado y por lo tanto el query devuelve 'null'
    Esto se solucionó agregando la propiedad 'defer' al tag, lo que hace que solo se ejecute luego de los elementos de la página terminaron de cargar. También se puede poner el script al final del <body>, pero en algunos casos, puede causar problemas de performance. (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)

- Nos digas una mejora que le harías (fuera de lo que es estilo o gráfica) al código para que funcione mejor.
    1) Para que la experiencia de básqueda sea más fluida, yo implementaría una búsqueda en memoria en lugar de hacer un request por cada caracter que se ingresa en el input.
        En index.js, luego de la linea 67 pueden ver mi idea de implementación. Basicamente, solo hago un fetch al cargar la página. El resultado de ese fetch lo almaceno en un sessionStorage (https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Finalmente, al momento de realizar una búsqueda, en lugar de recurrir al fetch, simplemente recupero mi data en cache y filtro de ahi. Esto acelera considerablemente la velocidad en la que aparecen los resultados en pantalla cuando uno tipea en el input.
        Para asegurar que los datos sean actuales, talvez se podría implementar un setTimeout que corra cada x minutos para refrescar el cache con nuevos datos.
    2) No estaría mal incluir un mensaje de alerta en caso de que no se encuentren resultados.
    3) Tampoco estaria mal incluir una alerta en caso de que el fetch falle.
    4) A mi punto de vista, no creo que sea correcto mostrar todos los resultados si es que el input esta vacio. En el codigo pueden ver que en mi function de devolver los resultados, si el texto que ingresa es vacio, simplemente devuelvo una lista vacia.



