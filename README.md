# API-Express
Práctica de API con Express del curso Samsung Desarrolladoras

En esta práctica se debe modificar el proyecto sobre un API CRUD elaborado en la
nota técnica 7.10, para utilizar una agenda de datos personales más completa, incluyendo
más datos sobre las personas y validándolos:

Persona
Nombre
Apellidos
Edad
DNI
Cumpleaños
Color favorito
Sexo

Siguiendo el patrón definido en la nota técnica, el API modificado será capaz de listar,
crear, editar y borrar personas. Se utilizará la base de datos MongoDB utilizada
en las notas técnicas para almacenar los datos.

A la hora de crear o editar una persona será necesario realizar las siguientes validaciones
sobre los parámetros:

 Nombre: no puede incluir números y la longitud debe ser superior a 3.
 Apellidos: no puede incluir números y la longitud debe ser superior a 3.
 Edad: número comprendido entre 0 y 125.
 DNI: cadena alfanumérica de 9 caracteres.
 Cumpleaños: fecha en formato ISO8601.
 ColorFavorito: no puede incluir números y la longitud debe ser superior a 3.
 Sexo: cadena de texto comprendida en la siguiente lista: Hombre, Mujer, Otro,
No especificado.

El funcionamiento del API se puede comprobar con la aplicación Postman, al igual
que se describió en la nota técnica.
