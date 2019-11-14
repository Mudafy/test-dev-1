# Questions Backend - Ejercicio #3

El objetivo de este ejercicio es completar la API. En el ejercicio anterior
vimos cómo podíamos consumir de una lista de consultas y ver sus detalles; en
este, queremos tener el componente server-side.


## Qué hay que hacer

Los puntos a implementar son:
- QuestionsResource: get (listado) y post (creación).
- submit_question_fields: el form (serializador) para cuando queremos submittear una consulta.
- question_fields: los campos de una respuesta de una consulta.
- QuestionResource: get (una consulta) y delete (una consulta)

La API está implementada en Flask con Flask-Restplus. Authentication mediante
Flask JWT Extended.


### Criterio de evaluación

- Implementar los endpoints.
- Implementar control de acceso. Un broker sólo debería poder leer consultas a su inmobiliaria, por ejemplo.

### The Extra Mile

Si resolviste los puntos anteriores, te sugerimos que intentes volver al Ejercicio #2 e implementes esta API
en el desarrollo anterior.


## Cómo instalar y correr el proyecto

### Python 3.7
Primero, es necesario instalar python 3.7 y pip.

Recomendamos usar un virtualenv.
- Para armar el entorno, `python3 -m venv venv`.
- Para activarlo, `source venv/bin/activate`.
- Para instalar las dependencias, `pip install -r requirements.txt`.
- Para correr el server, `python3 app.py`.


### Docker y Docker Compose

Sólo basta hacer `docker-compose up`.

