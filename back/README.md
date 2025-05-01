 # 🏊‍♂️ 🚴‍♂️ 🏃‍♂️  API de Gestión de Routinas 🏊‍♂️ 🚴‍♂️ 🏃‍♂️ 

La aplicación permite organizar rutinas semanales, agendando tareas que completan objetivos de algun interes particular.

Para ello tenemos 3 piezas:

## Persistencia

La bbdd es sobre mysql, en el raiz podemos encontrar un archivo dump que bastan con importarlo en nuestro equipo local y ejecutarlo sobre la bbdd: ```rutinmas``

## Back

El back esta hecho sobre node, para su lanzamiento en local bastaria con colocarse en la carpeta back y ejecutar:

```npm install``

``node index.js``

### Front

El front de la aplicación está desarrollado en angular, para su lanzamiento en local bastaria con colocarse en la carpeta back y ejecutar:

```npm install``

``ng serve``